import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg';
import Car from '../../components/Car';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars
} from './home.styles';

const Home = () => {
    const CarDataMoc = {
        brand: "Audi",
        name: "RS 5 Coupé",
        rent: {
            period: "ao dia",
            price: "120",
        },
        thumbnail: "https://beta.alpes.one/storage/app/uploads/public/608/ad6/90f/608ad690f418e968296549.png"
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>
                        Total 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>
            <Car data={CarDataMoc} />
            <Car data={CarDataMoc} />
        </Container>
    );
}
export default Home;