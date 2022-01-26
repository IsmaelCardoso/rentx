import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'

import { useTheme } from 'styled-components';
import Accessory from '../../components/Accessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Button from '../../components/Button';

import api from '../../services/api';

import { CarDTO } from '../../dtos/CarDTO';
import getAccessoryIcon from '../../utils/getAccessoryIcon';
import getPlatformDate from '../../utils/getPlatformDate';
import { format } from 'date-fns';

import {
  Container,
  Header,
  CarImageContainer,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetail,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './SchedulingDetails.styles';

interface IParams {
  car: CarDTO;
  dates: string[];
}

interface IRentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface IScheduleByCar {
  data: {
    id: string;
    unavailable_dates: string[];
  }
}

const SchedulingDetails = () => {
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();

  const { car, dates } = route.params as IParams
  const {
    id,
    name,
    rent,
    photos,
    brand,
    accessories,
  } = car;

  const rentTotal = Number(dates.length * Number(rent.price))

  const handlerSchedulingComplete = async() => {
    const scheduleByCar: IScheduleByCar = await api.get(`schedules_bycars/${id}`)

    const unavailable_dates = [
      ...scheduleByCar.data.unavailable_dates,
      ...dates
    ]

    await api.put(`schedules_bycars/${id}`, {
      id,
      unavailable_dates
    })
    .then(resp => navigation.navigate('SchedulingComplete' as never))
    .catch((error) => Alert.alert(
      "Atenção",
      "Não foi possivel realizar o agendamento, por favor tente novamente"
    ))
  }

  const handlerGoBack = () => {
    navigation.goBack();
  }

  const handlerDateFormat = () => {
    if(dates.length > 0) {
      const startFormatted = format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy')
      const endFormatted = format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')

      setRentalPeriod({ startFormatted, endFormatted })
    }
  }

  useEffect(() => {
    handlerDateFormat();
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={handlerGoBack} />
      </Header>

      <CarImageContainer>
        <ImageSlider imagesUrl={photos} />
      </CarImageContainer>

      <Content>
        <Details>
          <Description>
            <Brand>{brand}</Brand>
            <Name>{name}</Name>
          </Description>

          <Rent>
            <Period>{rent.period}</Period>
            <Price>R$ {rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {accessories.map((accessory) =>
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          )}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetail>
            <RentalPriceQuota>
              {`R$ ${rent.price} x${dates.length} diária`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetail>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handlerSchedulingComplete}
        />
      </Footer>
    </Container>
  );
}

export default SchedulingDetails;
