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
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export const SignupFirstStep = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  }

  const handleNextStep = () => {
    navigation.navigate('SignupSecondStep' as never);
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <Input
              iconName='user'
              placeholder="Nome"
              autoCapitalize='words'
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType='numeric'
            />

          </Form>

          <Button
            title="Próximo"
            onPress={handleNextStep}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
