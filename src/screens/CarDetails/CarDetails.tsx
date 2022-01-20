import React from 'react';
import { StatusBar } from 'react-native';

import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';

import { 
    Container, 
    Header,
    CarImageContainer,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
} from './CarDetails.styles';

const CarDetails = () => {
    return (
        <Container>
            <Header>
              <BackButton onPress={() => {}} />
            </Header>

            <CarImageContainer>
              <ImageSlider imagesUrl={["https://beta.alpes.one/storage/app/uploads/public/608/ad6/90f/608ad690f418e968296549.png"]} />
            </CarImageContainer>

            <Content>
              <Details>
                <Description>
                    <Brand>Lamborghini</Brand>
                    <Name>Huracan</Name>
                </Description>

                <Rent>
                    <Period>Ao dia</Period>
                    <Price>R$ 580</Price>
                </Rent>
              </Details>



              <About>
                Este é automóvel desportivo. Surgiu do lendário 
                touro de lide indultado na praça Real Maestranza de Sevilla. 
                É um belíssimo carro para quem gosta de acelerar.
              </About>
            </Content>
        </Container>
    );
}

export default CarDetails;