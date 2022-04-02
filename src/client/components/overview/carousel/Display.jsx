import React, { useContext, useState } from 'react';
import { AppContext } from '../../../contexts';

export default function Display () {
  const [zoomed, setZoomed] = useState(false);
  const { fullCarousel, selectedPhoto, selectedStyle, product } = useContext(AppContext);

  const style = product.styles[selectedStyle];

  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <img
        onClick={(event) => {
          if (!fullCarousel) return;

          event.stopPropagation();
          setZoomed(!zoomed);
        }}
        src={style.photos[selectedPhoto].thumbnail_url}
        style={{ objectFit: 'cover', margin: 'auto', transform: zoomed && 'scale(2.5)' }}
      />
    </div>
  );
}
