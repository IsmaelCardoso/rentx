import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface IButton {
  color?: string;
}

interface ITitle {
  light: boolean;
}

export const Container = styled(RectButton)<IButton>`
  width: 100%;
  min-height: 56px;

  padding: 19px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.main};

  border-radius: 2px;

  margin-bottom: 8px;
`;
export const Title = styled.Text<ITitle>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
`;
