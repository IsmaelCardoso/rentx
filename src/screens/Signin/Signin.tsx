import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';

import theme from '../../styles/theme';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer,
} from './Signin.styles';

const schema = Yup.object().shape({
  email: Yup.string().required('E-mail obrigatório.').email('Digite um email válido.'),
  password: Yup.string().required('A senha é obrigatória.'),
})

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignin = async () => {
    try {
      await schema.validate({ email, password })
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        console.log("ERROR:", err.path)
        Alert.alert('Opa', err.message)
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao efetuar o login, verifique as credênciais.'
        )
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              enabled={true}
              loading={false}
              onPress={handleSignin}
            />
            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              enabled={true}
              loading={false}
              onPress={() => {}}
            />
          </Footer>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Signin;
