import React from 'react';
import { StatusBar } from 'react-native';

import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';

import { 
    Container, 
    Header,
    CarImageContainer,
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
        </Container>
    );
}

export default CarDetails;