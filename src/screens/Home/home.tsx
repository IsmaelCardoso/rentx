import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Alert, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'
import { useNetInfo } from '@react-native-community/netinfo';

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
  const netInfo = useNetInfo();

  const handlerCarDetail = (car: CarDTO) => {
    navigation.navigate('CarDetails' as never, { car } as never);
  }

  useEffect(() => {
    // Esta variavel garante que o estado não será atualizado caso esta interface não esteja mais em execução
    let isMounted = true;

    async function fetchCars() {
      try {
        const resp = await api.get('cars')
        if (isMounted) {
          setCars(resp.data);
        }
      } catch(error) {
        console.log(error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    }
  }, [api]);

  useEffect(() => {
    if(netInfo.isConnected) {
      Alert.alert("Atenção", "Você esta On-Line")
    } else {
      Alert.alert("Atenção", "Você esta Off-Line")
    }
  }, [netInfo.isConnected])

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
