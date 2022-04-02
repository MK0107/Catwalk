import React, { useContext, useEffect } from 'react';

import Display from './Display';
import Thumbnails from './Thumbnails';
import { AppContext } from '../../../contexts';
import { PhotoScrollButton } from './ScrollButton';
import { increment, decrement } from '../../../utils';


export default function Carousel () {
  const { setFullCarousel, fullCarousel } = useContext(AppContext);

  const {
    product, selectedStyle, selectedPhoto, thumbnailStart, setThumbnailStart
  } = useContext(AppContext);

  const style = product.styles[selectedStyle];


  useEffect(() => {
    if (selectedPhoto < thumbnailStart) {
      setThumbnailStart(selectedPhoto);
    } else if (selectedPhoto - thumbnailStart === 7) {
      setThumbnailStart(thumbnailStart + 1);
    }
  }, [selectedPhoto]);


  return (
    <div
      onClick={() => { setFullCarousel(!fullCarousel); }}
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'lightgray'
      }}
    >
      {selectedPhoto > 0 && <PhotoScrollButton label={'<'} change={decrement} />}

      <Thumbnails />
      <Display />

      {selectedPhoto < (style.photos.length - 1) && <PhotoScrollButton label={'>'} change={increment} />}
    </div>
  );
}
