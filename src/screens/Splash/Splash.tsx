import React, { useEffect } from 'react';

import BrandSVG from '../../assets/brand.svg';
import LogoSVG from '../../assets/logo.svg';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { Container } from './Splash.styles'

const Splash = () => {
  const splashAnimation = useSharedValue(0);

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

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      {
        duration: 5000
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
