import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler'

import { Container, Title } from './Button.styles';

interface IButton {
  title: string;
  color?: string;
}

const Button = ({ title, color,...rest }: IButton) => {
  return (
    <Container
      {...rest}
      color={color}
    >
      <Title>
        {title}
      </Title>
    </Container>
  );
}

export default Button;
