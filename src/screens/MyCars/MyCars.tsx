import React, { useEffect, useState } from "react";
import { StatusBar, FlatList } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import { useTheme } from "styled-components";
import { AntDesign } from "@expo/vector-icons";

import BackButton from "../../components/BackButton";
import Car from "../../components/Car";
import LoadAnimated from "../../components/LoadAnimated";

import CarModel from "../../database/model/CarModel";
import api from "../../services/api";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./MyCars.styles";

interface DataProps {
  id: string;
  car: CarModel;
  start_date: string;
  end_date: string;
}

const MyCars = () => {
  const [userCars, setUserCars] = useState<DataProps[]>([] as DataProps[]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation();
  const screenIsFocus = useIsFocused(); // useIsFocused é um boolean que informa se estou na screen

  const handlerGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    async function fetchCars() {
      try {
        const resp = await api.get(`rentals`);
        const dataFormatted = resp.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), "dd/MM/yyyy"),
            end_date: format(parseISO(data.end_date), "dd/MM/yyyy"),
          };
        });

        setUserCars(dataFormatted);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [screenIsFocus]);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handlerGoBack} color={theme.colors.shape} />

        <Title>
          Seus agendamentos, {"\n"}
          estão aqui.
        </Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      {loading ? (
        <LoadAnimated />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos realizados</AppointmentsTitle>
            <AppointmentsQuantity>
              {`${userCars.length < 10 && "0"}${userCars.length || "0"}`}
            </AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={userCars}
            keyExtractor={(item: DataProps) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }): JSX.Element => (
              <CarWrapper>
                <Car data={item.car} onPress={() => {}} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>

                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
};

export default MyCars;
