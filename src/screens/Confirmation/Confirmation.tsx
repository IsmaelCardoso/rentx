import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useWindowDimensions, StatusBar } from "react-native";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
} from "./Confirmation.styles";
import ConfirmButton from "../../components/ConfirmButton";

interface IParams {
  title: string;
  message: string;
  nextScreenRoute: string;
}

const Confirmation = () => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();
  const route = useRoute();

  const { title, message, nextScreenRoute } = route.params as IParams;

  const handlerGoToHome = () => {
    navigation.navigate(nextScreenRoute as never);
  };

  // {
  //   title: 'Carro Alugado',
  //   message: 'Agora você só precisa ir {"\n"} até a concessionária a RENTX  {"\n"} pegar o seu automóvel.',
  // }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />

        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handlerGoToHome} />
      </Footer>
    </Container>
  );
};

export default Confirmation;
