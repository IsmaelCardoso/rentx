import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';

import {
  Container,
  IconContainer,
  InputText
} from './Input.styles';
interface IInput extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

const Input = ({ iconName, value, ...rest }: IInput) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  const handlerInputFocus = () => {
    setIsFocused(true)
  }

  const handlerInputBlur = () => {
    setIsFocused(false)

    setIsFilled(!!value)
  }

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText
        onFocus={handlerInputFocus}
        onBlur={handlerInputBlur}
        {...rest }
      />

    </Container>
  );
}

export default Input;
