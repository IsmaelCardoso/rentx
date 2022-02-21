import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

import api from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';
import Car from '../../components/Car';
import LoadAnimated from '../../components/LoadAnimated';

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
  }, [api]);

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
                {
                  !loading &&
                  <TotalCars>
                      Total {cars.length} carro{cars.length > 1 && 's'}
                  </TotalCars>
                }
            </HeaderContent>
        </Header>

        {loading ? <LoadAnimated /> :
          <CarList
              data={cars}
              renderItem={({ item }): JSX.Element =>
                <Car data={item} onPress={() => handlerCarDetail(item)} />
              }
            keyExtractor={(item: CarDTO) => item.id}
          />
        }
    </Container>
  );
}

export default Home;
