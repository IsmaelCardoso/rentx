import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'

import api from '../services/api';
import database from '../database'
import ModelUser from '../database/model/ModelUser'

interface IUser {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface ISigInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn: (credentials: ISigInCredentials) => Promise<void>
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [data, setData] = useState<IUser>({} as IUser);

  const signIn = async({ email, password }: ISigInCredentials) => {
    try {
      const resp = await api.post('sessions', {
        email,
        password,
      });

      const { token, user } = resp.data
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');
      await database.write(async() => {
        await userCollection.create((newUser) => {
          newUser.user_id = user.id,
          newUser.name = user.name,
          newUser.email = user.email,
          newUser.driver_license = user.driver_license,
          newUser.avatar = user?.avatar,
          newUser.token = token
        })
      });

      setData({ ...user, token });

    } catch (error: any) {
        throw new Error(error);
    };
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users');
      const resp = await userCollection.query().fetch();

      if (resp.length > 0) {
        const userData = resp[0]._raw as unknown as IUser;

        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        setData(userData);
      }
    }

    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }
