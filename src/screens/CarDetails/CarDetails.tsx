import React, { useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useNetInfo } from "@react-native-community/netinfo";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import Accessory from "../../components/Accessory";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";

import getAccessoryIcon from "../../utils/getAccessoryIcon";

import CarModel from "../../database/model/CarModel";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";

import {
  Container,
  Header,
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
  OfflineInfo,
} from "./CarDetails.styles";
interface IParams {
  car: CarModel;
}

const CarDetails = () => {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const route = useRoute();

  const { car } = route.params as IParams;
  const { name, about, period, price, brand } = car;

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const headerStyleAnimated = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  const handlerConfirmRental = () => {
    navigation.navigate("Scheduling" as never, { car } as never);
  };

  const handlerGoBack = () => {
    navigation.goBack();
  };

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
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View style={[headerStyleAnimated]}>
        <Header>
          <BackButton onPress={handlerGoBack} />
        </Header>

        <Animated.View
          style={[
            sliderCarStyleAnimation,
            { marginTop: getStatusBarHeight() + 32 },
          ]}
        >
          <ImageSlider
            imagesUrl={
              !!carUpdated.photos
                ? carUpdated.photos
                : [{ id: car.thumbnail, photo: car.thumbnail }]
            }
          />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{brand}</Brand>
            <Name>{name}</Name>
          </Description>

          <Rent>
            <Period>{period}</Period>
            <Price>R$ {netInfo.isConnected === true ? price : "..."}</Price>
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

        <About>{about}</About>
      </Animated.ScrollView>

      <Footer
        style={{
          paddingBottom: Platform.OS === "ios" ? useBottomTabBarHeight() : 24,
        }}
      >
        <Button
          title="Escolher período de aluguel"
          onPress={handlerConfirmRental}
          enabled={netInfo.isConnected === true}
        />

        {netInfo.isConnected === false && (
          <OfflineInfo>
            Conecte-se a Internet para ver mais detalhes e agendar seu carros
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
};

export default CarDetails;
