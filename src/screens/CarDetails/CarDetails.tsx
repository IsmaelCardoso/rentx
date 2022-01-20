import React from 'react';
import Accessory from '../../components/Accessory';

import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';

import speedSVG from '../../assets/speed.svg'
import accelerationSVG from '../../assets/acceleration.svg'
import forceSVG from '../../assets/force.svg'
import gasolineSVG from '../../assets/gasoline.svg'
import exchangeSVG from '../../assets/exchange.svg'
import peopleSVG from '../../assets/people.svg'

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
    Accessories,
    About,
    Footer,
} from './CarDetails.styles';
import Button from '../../components/Button';

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
                    <Price>R$ 500</Price>
                </Rent>
              </Details>

              <Accessories>
                <Accessory name='380Km/h' icon={speedSVG}/>
                <Accessory name='3.2s' icon={accelerationSVG}/>
                <Accessory name='800 HP' icon={forceSVG}/>
                <Accessory name='Gasolina' icon={gasolineSVG}/>
                <Accessory name='Auto' icon={exchangeSVG}/>
                <Accessory name='2 pessoas' icon={peopleSVG}/>
              </Accessories>

              <About>
                Este é automóvel desportivo. Surgiu do lendário
                touro de lide indultado na praça Real Maestranza de Sevilla.
                É um belíssimo carro para quem gosta de acelerar.
              </About>
            </Content>

            <Footer>
              <Button title="Confirmar" color="green" />
            </Footer>
        </Container>
    );
}

export default CarDetails;
