import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

import api from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';
import Car from '../../components/Car';
import Load from '../../components/Load';
import FloatingButton from '../../components/FloatingButton';

import { useTheme } from 'styled-components'

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
} from './home.styles';

const Home = () => {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const theme = useTheme();

  const handlerCarDetail = (car: CarDTO) => {
    navigation.navigate('CarDetails' as never, { car } as never);
  }

  const handlerOpenMyCar = () => {
    navigation.navigate('MyCars' as never);
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

          <FloatingButton
            onPress={handlerOpenMyCar}
          >
            <Ionicons
              name='ios-car-sport'
              color={theme.colors.shape}
              size={32}
            />
          </FloatingButton>
      </Container>
  );
}
export default Home;
