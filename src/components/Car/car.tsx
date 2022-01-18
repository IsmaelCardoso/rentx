import React from 'react';

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from './car.styles';

import GasolineSvg from "../../assets/gasoline.svg"

interface CarData {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: string;
    };
    thumbnail: string
}

interface Props {
    data: CarData;
}

const Car = ({ data }: Props) => {
    const { brand, name, rent, thumbnail } = data

    return (
        <Container>
            <Details>
                <Brand>{brand}</Brand>
                <Name>{name}</Name>

                <About>
                    <Rent>
                        <Period>{rent.period}</Period>
                        <Price>{`R$${rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <GasolineSvg />
                    </Type>
                </About>
            </Details>

            <CarImage
                source={{ uri: thumbnail }}
                resizeMode='contain'
            />
        </Container>
    );
}
export default Car;