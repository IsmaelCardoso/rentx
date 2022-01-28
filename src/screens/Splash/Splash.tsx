import React from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import Button from '../../components/Button';

import { Container } from './Splash.styles';

const WIDTH = Dimensions.get('window').width;

const Splash = () => {
  const animation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 3000,
            easing: Easing.bezier(0,1.49,1,-0.53),
            //.bizer é personalizado e podemos obter o cod apartir do site: https://cubic-bezier.com/
          })
      }]
    }
  })

  const handlerAnimationPosition = () => {
    animation.value = Math.random() * (WIDTH - 100);
  }

  return (
    <Container>
      <Animated.View style={[style.box, animatedStyle]}/>

      <Button title="Mover" color="brown" onPress={handlerAnimationPosition}/>
    </Container>
  );
}

export default Splash;

const style = StyleSheet.create({
  box: {
    width: 100,
    height: 100,

    backgroundColor: 'red',
  }
})
