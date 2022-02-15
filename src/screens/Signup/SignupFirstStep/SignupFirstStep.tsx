import React from 'react';
import { useNavigation } from '@react-navigation/native';

import BackButton from '../../../components/BackButton';
import Bullets from '../../../components/Bullets';

import {
  Container,
  Header,
  Title,
  Steps,
  SubTitle,
  Form,
  FormTitle,
} from './SignupFirstStep.styles';

export const SignupFirstStep = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}/>

        <Steps>
          <Bullets active={false}/>
          <Bullets active/>
        </Steps>
      </Header>

      <Title>
        Crie sua{'\n'}
        conta
      </Title>
      <SubTitle>
        Faça seu cadastro de{'\n'}
        forma rápida e fácil.
      </SubTitle>

      <Form>
        <FormTitle>1. Dados</FormTitle>
      </Form>
    </Container>
  );
}
