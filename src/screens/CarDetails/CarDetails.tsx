import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import Accessory from '../../components/Accessory';

import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';

import getAccessoryIcon from '../../utils/getAccessoryIcon'

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
} from './CarDetails.styles';
import Button from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import { StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

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

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  })
  const headerStyleAnimated = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP,
      )
    }
  })

  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP,
      )
    }
  })

  const handlerConfirmRental = () => {
    navigation.navigate('Scheduling' as never, { car } as never);
  }

  const handlerGoBack = () => {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={[headerStyleAnimated]}
      >
        <Header>
          <BackButton onPress={handlerGoBack} />
        </Header>

        <Animated.View
          style={[
            sliderCarStyleAnimation,
            { marginTop: getStatusBarHeight() + 32 }
          ]}
        >
          <ImageSlider imagesUrl={photos} />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          alignItems: 'center',
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

        <About>
          {about}
          {about}
          {about}
          {about}
          {about}
          {about}
        </About>
      </Animated.ScrollView>

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
