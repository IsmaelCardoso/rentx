import React from 'react';
import { SvgProps } from 'react-native-svg';

import {
  Container,
  Name,
} from './Accessory.styles';

interface IAccessory{
  name: string;
  icon: React.FC<SvgProps>;
}

/**
 * icon => Icon -> Alias para transformar. Assim podemos usar como component
 */
const Accessory = ({ name, icon: Icon }: IAccessory) => {
  return (
    <Container>
      <Icon width={32} height={32}/>
      <Name>{name}</Name>
    </Container>
  );
}

export default Accessory;
