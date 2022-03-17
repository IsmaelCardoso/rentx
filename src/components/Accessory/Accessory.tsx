import React from "react";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components";

import { Container, Name } from "./Accessory.styles";

interface IAccessory {
  name: string;
  icon: React.FC<SvgProps>;
}

/**
 * icon: Icon -> Alias para transformar. Assim podemos usar como component
 */
const Accessory = ({ name, icon: Icon }: IAccessory) => {
  const theme = useTheme();

  return (
    <Container>
      <Icon width={32} height={32} fill={theme.colors.header} />
      <Name>{name}</Name>
    </Container>
  );
};

export default Accessory;
