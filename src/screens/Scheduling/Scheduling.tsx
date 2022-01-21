import React from 'react';
import { useTheme } from 'styled-components'

import { StatusBar } from 'react-native';
import BackButton from '../../components/BackButton';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DataValue,
  Content,
  Footer,
} from './Scheduling.styles';
import Button from '../../components/Button';

const Scheduling = () => {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton
          onPress={() => {}}
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DataValue selected={false}>
              18/06/2021
            </DataValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DataValue selected={false}>
              18/06/2021
            </DataValue>
          </DateInfo>
        </RentalPeriod>

      </Header>

      <Content>

      </Content>

      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  );
}

export default Scheduling;
