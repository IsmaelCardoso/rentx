import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import BrandSVG from '../../assets/brand.svg';
import LogoSVG from '../../assets/logo.svg';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';

import { Container } from './Splash.styles'

const Splash = () => {
  const splashAnimation = useSharedValue(0);

  const navigation = useNavigation();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 25, 50],
        [1, .3, 0],
      ),
      transform: [
        {
          translateX:interpolate(
            splashAnimation.value,
            [0, 25, 50],
            [0, -25, -50],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 25, 50],
        [0, .3, 1],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 25, 50],
            [-50, -25, 0],
            Extrapolate.CLAMP
          )
        }
    ]
    }
  })

  const startApp = () => {
    navigation.navigate('Signin' as never);
  }

  /*
  * O Splash roda em uma THRED diferente que a aplicação por uma questão de performance
  * Neste caso é preciso umsar o 'worklet'
  * É preciso usar uma função(runOnJs) do reanimated para dizer que vamos roda no JS
  * Ao final do runOnJs é precis colocar () para invocar a função.
  **/
  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      {
        duration: 1000
      },
      () => {
        'worklet'
        runOnJS(startApp)();
      }
    )
  }, [])

  return (
    <Container>
      <Animated.View style={[brandStyle, {position: 'absolute'}]}>
        <BrandSVG width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, {position: 'absolute'}]}>
        <LogoSVG width={180} height={20} />
      </Animated.View>

    </Container>
  );
}

export default Splash;
