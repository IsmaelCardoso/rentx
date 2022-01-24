import React from 'react';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import Accessory from '../../components/Accessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';

import speedSVG from '../../assets/speed.svg'
import accelerationSVG from '../../assets/acceleration.svg'
import forceSVG from '../../assets/force.svg'
import gasolineSVG from '../../assets/gasoline.svg'
import exchangeSVG from '../../assets/exchange.svg'
import peopleSVG from '../../assets/people.svg'

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
import Button from '../../components/Button';

const SchedulingDetails = () => {
    const theme = useTheme();

    return (
        <Container>
            <Header>
              <BackButton onPress={() => {}} />
            </Header>

            <CarImageContainer>
              <ImageSlider imagesUrl={["https://beta.alpes.one/storage/app/uploads/public/608/ad6/90f/608ad690f418e968296549.png"]} />
            </CarImageContainer>

            <Content>
              <Details>
                <Description>
                    <Brand>Lamborghini</Brand>
                    <Name>Huracan</Name>
                </Description>

                <Rent>
                    <Period>Ao dia</Period>
                    <Price>R$ 500</Price>
                </Rent>
              </Details>

              <Accessories>
                <Accessory name='380Km/h' icon={speedSVG}/>
                <Accessory name='3.2s' icon={accelerationSVG}/>
                <Accessory name='800 HP' icon={forceSVG}/>
                <Accessory name='Gasolina' icon={gasolineSVG}/>
                <Accessory name='Auto' icon={exchangeSVG}/>
                <Accessory name='2 pessoas' icon={peopleSVG}/>
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
                  <DateValue>18/06/2021</DateValue>
                </DateInfo>

                <Feather
                    name='chevron-right'
                    size={RFValue(10)}
                    color={theme.colors.text}
                />

                <DateInfo>
                  <DateTitle>ATÉ</DateTitle>
                  <DateValue>18/06/2021</DateValue>
                </DateInfo>
              </RentalPeriod>

              <RentalPrice>
                <RentalPriceLabel>Total</RentalPriceLabel>
                <RentalPriceDetail>
                  <RentalPriceQuota>R$ 580 3x diária</RentalPriceQuota>
                  <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                </RentalPriceDetail>
              </RentalPrice>
            </Content>

            <Footer>
              <Button title="Alugar agora" color={theme.colors.success} />
            </Footer>
        </Container>
    );
}

export default SchedulingDetails;
