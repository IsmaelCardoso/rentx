import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import Bullets from '../Bullets';

import {
    Container,
    ImageIndexs,
    CarImageWrapper,
    CarImage
} from './ImageSlider.styles';

interface IImage {
  id: string;
  photo: string;
}

interface IImages {
    imagesUrl: IImage[],
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
          {imagesUrl?.map((item, idx) => (
            <Bullets
              key={item.id}
              active={imageIdx === idx}
            />
          ))}
        </ImageIndexs>

        <FlatList
          data={imagesUrl}
          keyExtrator={(item: IImage) => item.id}
          renderItem={({ item }) => (
            <CarImageWrapper>
              <CarImage
                source={{ uri: item.photo }}
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
