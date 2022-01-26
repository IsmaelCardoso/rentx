import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import Accessory from '../../components/Accessory';

import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';

import getAccessoryIcon from '../../utils/getAccessoryIcon'

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
    About,
    Footer,
} from './CarDetails.styles';
import Button from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';

interface IParams {
  car: CarDTO;
}

const CarDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { car } = route.params as IParams
  const {
    name,
    about,
    rent,
    photos,
    brand,
    accessories,
  } = car;

  const handlerConfirmRental = () => {
    navigation.navigate('Scheduling' as never, { car } as never);
  }

  const handlerGoBack = () => {
    navigation.goBack();
  }

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

            <About>{about}</About>
          </Content>

          <Footer>
            <Button
              title="Escolher período de aluguel"
              onPress={handlerConfirmRental}
            />
          </Footer>
      </Container>
  );
}

export default CarDetails;
