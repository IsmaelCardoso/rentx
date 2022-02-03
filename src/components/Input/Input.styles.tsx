import styled from 'styled-components/native';

export const Container = styled.View`

  padding: 20px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  border-radius: 5px;
`
export const Title = styled.Text``;
