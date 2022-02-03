import React from 'react';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { Container, Title } from './Input.styles';
import { TextInputProps } from 'react-native';

interface IInput extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

const Input = ({ iconName }: IInput) => {
  const theme = useTheme();

  return (
    <Container>
      <Feather
        name={iconName}
        size={24}
        color={theme.colors.text_detail}
      />

    </Container>
  );
}

export default Input;
