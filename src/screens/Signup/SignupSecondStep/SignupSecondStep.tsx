import React from 'react';
import { useNavigation } from '@react-navigation/native';

import BackButton from '../../../components/BackButton';
import Bullets from '../../../components/Bullets';
import PasswordInput from '../../../components/PasswordInput';
import Button from '../../../components/Button';

import {
  Container,
  Header,
  Title,
  Steps,
  SubTitle,
  Form,
  FormTitle,
} from './SignupSecondStep.styles';

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import theme from '../../../styles/theme';

export const SignupSecondStep = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  }

  const handleSecondStep = () => {
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

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName='lock'
              placeholder="Senha"
            />
            <PasswordInput
              iconName='lock'
              placeholder="Repetir senha"
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleSecondStep}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
