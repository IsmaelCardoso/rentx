import React from 'react';
import { Container, Title } from './ConfirmButton.styles';

interface IConfirmButton {
  title: string;
}

const ConfirmButton = ({title, ...rest}: IConfirmButton) => {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}

export default ConfirmButton;
