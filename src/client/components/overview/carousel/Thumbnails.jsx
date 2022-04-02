import React, { useContext } from 'react';
import { AppContext } from '../../../contexts';
import { increment, decrement } from '../../../utils';
import Column from '../../layout/Column';
import { ThumbnailScrollButton } from './ScrollButton';

export default function Thumbnails () {
  const {
    thumbnailStart, setSelectedPhoto, selectedPhoto, selectedStyle, product
  } = useContext(AppContext);

  const style = product.styles[selectedStyle];

  return (
    <Column>
      {thumbnailStart > 0 && (
        <ThumbnailScrollButton label={'/\\'} change={decrement} />
      )}

      {style.photos.slice(thumbnailStart, thumbnailStart + 7).map((photo, photoIndex) => (
        <img
          onClick={(event) => {
            event.stopPropagation();
            setSelectedPhoto(thumbnailStart + photoIndex);
          }}
          key={photo.thumbnail_url}
          src={photo.thumbnail_url}
          style={{
            border: thumbnailStart + photoIndex === selectedPhoto && '5px solid orange',
            margin: '0.5em',
            width: '70px',
            height: '70px'
          }}
        />
      ))}

      {thumbnailStart + 7 < style.photos.length && (
        <ThumbnailScrollButton label={'\\/'} change={increment} />
      )}
    </Column>

  );
}
