import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { useNetInfo } from "@react-native-community/netinfo";

import CarModel from "../../database/model/CarModel";

import getAccessoryIcon from "../../utils/getAccessoryIcon";

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
} from "./car.styles";

interface Props extends RectButtonProps {
  data: CarModel;
}

const Car = ({
  data: { brand, name, period, price, thumbnail, fuel_type },
  ...rest
}: Props) => {
  const netInfo = useNetInfo();

  const MotorIcon = getAccessoryIcon(fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{period}</Period>
            <Price>R$ {netInfo.isConnected === true ? price : "..."}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: thumbnail }} resizeMode="contain" />
    </Container>
  );
};
export default Car;
