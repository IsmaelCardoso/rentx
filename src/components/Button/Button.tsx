import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { RectButtonProps } from 'react-native-gesture-handler'

import { Container, Title } from './Button.styles';

interface IButton  extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean,
  loading?: boolean,
}

const Button = ({
  title,
  color,
  enabled = true,
  loading = false,
  ...rest
}: IButton) => {
  const theme = useTheme();

  return (
    <Container
      {...rest}
      color={color}
      enabled={enabled}
      style={{ opacity: (enabled === false || loading === true) ? 0.5 : 1 }}
    >
      {
        loading ?
        <ActivityIndicator
          color={theme.colors.shape}
        /> :
        <Title>
          {title}
        </Title>
      }
    </Container>
  );
}

export default Button;
