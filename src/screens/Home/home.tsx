import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import database from "../../database";
import api from "../../services/api";

import { CarDTO } from "../../dtos/CarDTO";

import LoadAnimated from "../../components/LoadAnimated";

import Logo from "../../assets/logo.svg";
import Car from "../../components/Car";

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from "./home.styles";
import CarModel from "../../database/model/CarModel";
import Button from "../../components/Button";

const Home = () => {
  const [cars, setCars] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const handlerCarDetail = (car: CarDTO) => {
    navigation.navigate("CarDetails" as never, { car } as never);
  };

  const offlineSynchronize = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const {
          data: { changes, latestVersion },
        } = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;

        if (user.updated.length > 0) {
          await api.post("users/sync", user);
        }
      },
    });
  };

  useEffect(() => {
    // Esta variavel garante que o estado não será atualizado caso esta interface não esteja mais em execução
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<CarModel>("cars");
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && (
            <TotalCars>
              Total {cars?.length} carro{cars?.length > 1 && "s"}
            </TotalCars>
          )}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimated />
      ) : (
        <CarList
          data={cars}
          renderItem={({ item }: any): JSX.Element => (
            <Car data={item} onPress={() => handlerCarDetail(item)} />
          )}
          keyExtractor={(item: CarDTO) => item.id}
        />
      )}
    </Container>
  );
};

export default Home;
