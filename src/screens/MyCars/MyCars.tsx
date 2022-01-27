import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { AntDesign } from '@expo/vector-icons'

import BackButton from '../../components/BackButton';
import Car from '../../components/Car';
import Load from '../../components/Load';

import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
 } from './MyCars.styles';

interface IUserCar {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

const MyCars = () => {
  const [userCars, setUserCars] = useState<IUserCar[]>([] as IUserCar[]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation();

  const handlerGoBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const resp = await api.get(`schedules_byuser?user_id=2`);

        setUserCars(resp.data)
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [])

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={handlerGoBack}
          color={theme.colors.shape}
        />

        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>

      {loading ?
        <Load /> :
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos realizados</AppointmentsTitle>
            <AppointmentsQuantity>
              {
                `${userCars.length < 10 && '0'}${userCars.length || '0'}`
              }
              </AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={userCars}
            renderItem={({ item }): JSX.Element =>
              <CarWapper>
                <Car data={item.car} onPress={() => {}}/>
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>

                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWapper>
            }
            keyExtractor={(item: IUserCar) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </Content>
      }
    </Container>
  );
}

export default MyCars;
