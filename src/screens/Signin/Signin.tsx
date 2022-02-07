import React from 'react';
import { StatusBar } from 'react-native';

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

const Signin = () => {
  return (
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
        />

        <PasswordInput
          iconName='lock'
          placeholder='Senha'
        />
      </Form>

      <Footer>
        <Button
          title="Login"
          enabled={true}
          loading={false}
          onPress={() => {}}
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
  );
}

export default Signin;
