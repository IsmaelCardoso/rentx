import React from 'react';
import { MaterialIcons } from "@expo/vector-icons"
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components'

import { Container } from './BackButton.styles';

interface IButton extends BorderlessButtonProps {
    color?: string;
}

const BackButton = ({ color, ...rest }: IButton) => {
    const theme = useTheme();

    return (
        <Container {...rest}>
            <MaterialIcons 
                name='chevron-left'
                size={24}
                color={color ? color : theme.colors.text}
            />
        </Container>
    );
}

export default BackButton;