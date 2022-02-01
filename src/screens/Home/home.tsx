import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'
import { StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated'

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

import api from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';
import Car from '../../components/Car';
import Load from '../../components/Load';

import { useTheme } from 'styled-components'
import globalTheme from '../../styles/theme'

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
} from './home.styles';

const Home = () => {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionY.value },
        { translateY:  positionX.value },
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, ctx: any) {
      ctx.positionY = positionY.value;
      ctx.positionX = positionX.value;
    },
    onActive(event, ctx: any) {
      positionY.value = ctx.positionY + event.translationY;
      positionX.value = ctx.positionX + event.translationX;
    },
    onEnd(event, ctx: any) {
      positionY.value = withSpring(0);
      positionX.value = withSpring(0);
    },
  });

  const handlerCarDetail = (car: CarDTO) => {
    navigation.navigate('CarDetails' as never, { car } as never);
  }

  const handlerOpenMyCar = () => {
    navigation.navigate('MyCars' as never);
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const resp = await api.get('cars')

        setCars(resp.data);
      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [api])

  return (
    <Container>
        <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
        />
        <Header>
            <HeaderContent>
                <Logo
                    width={RFValue(108)}
                    height={RFValue(12)}
                />
                <TotalCars>
                    Total {cars.length} carro{cars.length > 1 && 's'}
                </TotalCars>
            </HeaderContent>
        </Header>

        {loading ? <Load /> :
          <CarList
              data={cars}
              renderItem={({ item }): JSX.Element =>
                <Car data={item} onPress={() => handlerCarDetail(item)} />
              }
            keyExtractor={(item: CarDTO) => item.id}
          />
        }

        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[
              myCarsButtonStyle,
              {
                position: 'absolute',
                bottom: 13,
                right: 22,
              }
            ]}
          >
            <ButtonAnimated
            style={styles.button}
              onPress={handlerOpenMyCar}
            >
              <Ionicons
                name='ios-car-sport'
                color={theme.colors.shape}
                size={32}
              />
            </ButtonAnimated>
          </Animated.View>
        </PanGestureHandler>
    </Container>
  );
}

export default Home;

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,

    backgroundColor: globalTheme.colors.main,

    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',
  }
})
