import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import BackButton from "../../../components/BackButton";
import Bullets from "../../../components/Bullets";

import {
  Container,
  Header,
  Title,
  Steps,
  SubTitle,
  Form,
  FormTitle,
} from "./SignupFirstStep.styles";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().required("E-mail é obrigatório").email("E-mail invalido"),
  driverLicense: Yup.number().required("CNH é obrigatória"),
});

export const SignupFirstStep = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState(0);

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNextStep = async () => {
    try {
      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate("SignupSecondStep" as never, { user: data } as never);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        Alert.alert("Opa", err.message);
      } else {
        Alert.alert(
          "Erro ao ĩniciar cadastro",
          "Ocorreu um erro ao iniciar o cadastro, verifique as informações."
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullets active={false} />
              <Bullets active />
            </Steps>
          </Header>

          <Title>
            Crie sua{"\n"}
            conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil.
          </SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              autoCapitalize="sentences"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={(value) => setDriverLicense(Number(value))}
              value={String(driverLicense)}
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
