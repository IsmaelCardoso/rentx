import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { useWindowDimensions, StatusBar } from 'react-native'

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
 } from './SchedulingComplete.styles';
import ConfirmButton from '../../components/ConfirmButton';

const SchedulingComplete = () => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  const handlerGoToHome= () => {
    navigation.navigate('Home' as never)
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor="transparent"
      />

      <LogoSvg width={width}/>

      <Content>
        <DoneSvg width={80} height={80} />

        <Title>Carro Alugado</Title>
        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária a RENTX  {'\n'}
          pegar o seu automóvel.
          </Message>
      </Content>

      <Footer>
        <ConfirmButton title='OK' onPress={handlerGoToHome} />
      </Footer>
    </Container>
  );
}

export default SchedulingComplete;
