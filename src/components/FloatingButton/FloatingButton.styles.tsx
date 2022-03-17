import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import styled from "styled-components/native";

interface IContainer {
  background?: string;
}

export const Container = styled(RectButton)<IContainer>`
  width: 60px;
  height: 60px;

  background-color: ${({ theme, background }) =>
    background ? background : theme.colors.main};

  border-radius: 30px;

  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 13px;
  right: 22px;
`;
