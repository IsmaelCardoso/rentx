import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";

import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { format } from "date-fns";

import Accessory from "../../components/Accessory";
import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import Button from "../../components/Button";

import api from "../../services/api";

import { CarDTO } from "../../dtos/CarDTO";

import getAccessoryIcon from "../../utils/getAccessoryIcon";
import getPlatformDate from "../../utils/getPlatformDate";

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
} from "./SchedulingDetails.styles";
import { useAuth } from "../../hook/auth";

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
  };
}

const SchedulingDetails = () => {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod
  );
  const [loading, setLoading] = useState(false);

  const netInfo = useNetInfo();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const route = useRoute();

  const { car, dates } = route.params as IParams;
  const { id, name, period, price, photos, brand, accessories } = car;

  const rentTotal = Number(dates.length * Number(price));

  const handlerSchedulingComplete = async () => {
    setLoading(true);

    await api
      .post(
        "rentals",
        {
          user_id: user.id,
          car_id: car.id,
          start_date: new Date(dates[0]),
          end_date: new Date(dates[dates.length - 1]),
          total: rentTotal,
        },
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      )
      .then(() => {
        navigation.navigate("Confirmation", {
          nextScreenRoute: "Home",
          title: "Carro alugado!",
          message: `Agora você só precisa ir\naté a concessionária a RENTX\npegar o seu automóvel.`,
        });
      })
      .catch((error) => {
        console.log("error:", error);
        setLoading(false);
        Alert.alert(
          "Atenção",
          "Não foi possivel realizar o agendamento, por favor tente novamente"
        );
      });
  };

  const handlerGoBack = () => {
    navigation.goBack();
  };

  const handlerDateFormat = () => {
    if (dates.length > 0) {
      const startFormatted = format(
        getPlatformDate(new Date(dates[0])),
        "dd/MM/yyyy"
      );
      const endFormatted = format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      );

      setRentalPeriod({ startFormatted, endFormatted });
    }
  };

  useEffect(() => {
    handlerDateFormat();
  }, []);

  useEffect(() => {
    const fetchCarUpdated = async () => {
      const resp = await api.get(`/cars/${car.id}`);

      setCarUpdated(resp.data);
    };

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handlerGoBack} />
      </Header>

      <CarImageContainer>
        <ImageSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImageContainer>

      <Content>
        <Details>
          <Description>
            <Brand>{brand}</Brand>
            <Name>{name}</Name>
          </Description>

          <Rent>
            <Period>{period}</Period>
            <Price>R$ {price}</Price>
          </Rent>
        </Details>

        {carUpdated?.accessories && (
          <Accessories>
            {carUpdated.accessories?.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod?.startFormatted}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod?.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetail>
            <RentalPriceQuota>
              {`R$ ${price} x${dates?.length} diária`}
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
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
};

export default SchedulingDetails;
