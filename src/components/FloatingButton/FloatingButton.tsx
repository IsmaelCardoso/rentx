import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { Container } from "./FloatingButton.styles";

interface FloatingButton extends RectButtonProps {
  background?: string;
  children: JSX.Element | any;
}

const FloatingButton = ({ background, children, ...rest }: FloatingButton) => {
  const theme = useTheme();

  return (
    <Container {...rest} background={background}>
      {children}
    </Container>
  );
};
export default FloatingButton;
