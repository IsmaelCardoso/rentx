import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import BackButton from '../../../components/BackButton';
import Bullets from '../../../components/Bullets';
import PasswordInput from '../../../components/PasswordInput';
import Button from '../../../components/Button';

import api from '../../../services/api';

import {
  Container,
  Header,
  Title,
  Steps,
  SubTitle,
  Form,
  FormTitle,
} from './SignupSecondStep.styles';


interface Params {
  user: {
    name: string,
    email: string,
    driverLicense: string,
  }
}

export const SignupSecondStep = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params

  const handleBack = () => {
    navigation.goBack();
  }

  const handleSecondStep = () => {
    navigation.navigate('SignupSecondStep' as never);
  }

  const handleRegister = async() => {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e confirme')
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais')
    }

    if (password === passwordConfirm) {
      try {
        // await api.post('user-register', user)

        navigation.navigate('SchedulingComplete' as never)
      } catch(err) {
        Alert.alert(
          'Erro ao finalizar cadastro',
          'Ocorreu um erro ao finalizar o cadastro, verifique as informações.'
        )
      }
    }
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
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName='lock'
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
