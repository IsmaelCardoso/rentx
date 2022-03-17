import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./ConfirmButton.styles";

interface IConfirmButton extends RectButtonProps {
  title: string;
}

const ConfirmButton = ({ title, ...rest }: IConfirmButton) => {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};

export default ConfirmButton;
