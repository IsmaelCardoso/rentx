import React from 'react';

import { 
    Container, 
    ImageIndexs, 
    ImageIndex, 
    CarImageWrapper, 
    CarImage 
} from './ImageSlider.styles';

interface IImages {
    imagesUrl: string[],
}

const ImageSlider = ({ imagesUrl }: IImages) => {
    return (
        <Container>
            <ImageIndexs>
                <ImageIndex active={true} />
                <ImageIndex active={false} />
                <ImageIndex active={false} />
                <ImageIndex active={false} />
            </ImageIndexs>

            <CarImageWrapper>
                <CarImage 
                    source={{ uri: imagesUrl[0] }}
                    resizeMode='contain'
                />
            </CarImageWrapper>
        </Container>
    );
}

export default ImageSlider;