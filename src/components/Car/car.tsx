import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import CarModel from '../../database/model/CarModel';

import getAccessoryIcon from '../../utils/getAccessoryIcon';

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from './car.styles';

interface Props extends RectButtonProps {
    data: CarModel;
}

const Car = ({ data, ...rest }: Props) => {
  const { brand, name, period, price, thumbnail, fuel_type } = data

  const MotorIcon = getAccessoryIcon(fuel_type);

  return (
    <Container { ...rest }>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{period}</Period>
            <Price>{`R$${price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
          source={{ uri: thumbnail }}
          resizeMode='contain'
      />
    </Container>
  );
}
export default Car;
