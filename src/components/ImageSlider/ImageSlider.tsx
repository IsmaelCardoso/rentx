import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import Bullets from '../Bullets';

import {
    Container,
    ImageIndexs,
    CarImageWrapper,
    CarImage
} from './ImageSlider.styles';

interface IImages {
    imagesUrl: string[],
}

interface IChangeImage {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

const ImageSlider = ({ imagesUrl }: IImages) => {
  const [imageIdx, setImageIdx] = useState(0);


  const indexChange = useRef((info: IChangeImage) => {
    const index = info.viewableItems[0].index!;

    setImageIdx(index);
  })

  return (
      <Container>
        <ImageIndexs>
          {imagesUrl.map((_, idx) => (
            <Bullets
              key={String(idx)}
              active={imageIdx === idx}
            />
          ))}
        </ImageIndexs>

        <FlatList
          data={imagesUrl}
          keyExtrator={(key: string) => key}
          renderItem={({ item }) => (
            <CarImageWrapper>
              <CarImage
                source={{ uri: item }}
                resizeMode='contain'
              />
            </CarImageWrapper>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChange.current}
        />
      </Container>
  );
}

export default ImageSlider;
