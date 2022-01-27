import React, { useState } from 'react';
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'

import { Alert, StatusBar } from 'react-native';
import BackButton from '../../components/BackButton';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './Scheduling.styles';

import { Calendar, IDayProps, generateInterval, MarkedDatesType } from '../../components/Calendar';
import Button from '../../components/Button';
import getPlatformDate from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

interface IRentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface IParams {
  car: CarDTO;
}

const Scheduling = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<IDayProps>({} as IDayProps)
  const [markedDate, setMarkedDate] = useState<MarkedDatesType>({} as MarkedDatesType)
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod)

  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();

  const { car } = route.params as IParams

  const handlerConfirmPeriod = () => {
    if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert("Atenção", "Selecione uma data para alugar")
    } else {
      navigation.navigate(
        'SchedulingDetails' as never,
        {
          car,
          dates: Object.keys(markedDate)
        } as never
      );
    }
  }

  const handlerGoBack = () => {
    navigation.goBack();
  }

  const handlerChangeDate = (date: IDayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end)
    setMarkedDate(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length -1];
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
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
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>

      </Header>

      <Content>
        <Calendar
          markedDates={markedDate}
          onDayPress={handlerChangeDate}
        />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handlerConfirmPeriod}/>
      </Footer>
    </Container>
  );
}

export default Scheduling;
