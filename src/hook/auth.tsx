import React, { createContext, useState, useContext, ReactNode } from 'react'
import api from '../services/api';


interface IUser {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ISigInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  token: string;
  signIn: (credentials: ISigInCredentials) => Promise<void>
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState);

  const signIn = async({ email, password }: ISigInCredentials) => {
    console.log("SignIn entrou");

    const resp = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = resp.data
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setData({ token, user });
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
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
