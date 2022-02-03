import React from 'react';
import { StatusBar } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';
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
        <Input iconName='mail'/>
      </Form>

      <Footer>
        <Button
          title="Login"
          enabled={false}
          loading={false}
          onPress={() => {}}
        />
        <Button
          title="Criar conta gratuita"
          color={theme.colors.background_secondary}
          light
          enabled={false}
          loading={false}
          onPress={() => {}}
        />
      </Footer>

    </Container>
  );
}

export default Signin;
