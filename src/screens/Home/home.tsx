import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg';
import Car from '../../components/Car';

import api from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
} from './home.styles';
import Load from '../../components/Load';

const Home = () => {
  const navigation = useNavigation();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const handlerCarDetail = (car: CarDTO) => {
    navigation.navigate('CarDetails' as never, { car } as never);
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const resp = await api.get('cars')

        setCars(resp.data);
      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [api])

  return (
      <Container>
          <StatusBar
              barStyle="light-content"
              backgroundColor="transparent"
              translucent
          />
          <Header>
              <HeaderContent>
                  <Logo
                      width={RFValue(108)}
                      height={RFValue(12)}
                  />
                  <TotalCars>
                      Total {cars.length} carro{cars.length > 1 && 's'}
                  </TotalCars>
              </HeaderContent>
          </Header>

          {loading ?
            <Load /> :
            <CarList
                data={cars}
                keyExtractor={(item: CarDTO) => item.id}
                renderItem={({ item }): JSX.Element =>
                  <Car data={item} onPress={() => handlerCarDetail(item)} />
                }
            />
          }
      </Container>
  );
}
export default Home;
