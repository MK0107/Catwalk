import React, { useContext, useState } from 'react';
import Stars from 'react-star-ratings';
import { useHistory } from 'react-router-dom';

import Column from '../../layout/Column';
import ComparisonModal from '../compare';
import { averageRating, STOCK_FAVORITE, STOCK_IMAGE } from '../../../utils';
import Price from '../../overview/selection/Price';
import { AppContext } from '../../../contexts';


export default function RelatedTile ({
  product,
  icon: Icon,
  action,
  onClick = () => { },
  blank = false
}) {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const { product: mainProduct } = useContext(AppContext);

  const tileStyle = {
    position: 'relative',
    margin: '0 1em',
    flexShrink: '0',
    height: '400px',
    width: '275px',
    border: '1px solid black'
  };

  if (blank) {
    return (
      <Column
        onClick={(event) => onClick(event, { history })}
        style={tileStyle}
      >
        <img
          style={{ height: '100%', maxWidth: '100%' }}
          src={STOCK_FAVORITE}
        />
      </Column>
    );
  }

  const { styles: [style], reviews } = product;
  const { photos: [photo] } = style;

  return (
    <Column
      onClick={(event) => onClick(event, { history })}
      style={tileStyle}>

      <>
        <Icon
          color="white"
          onClick={(event) => action(event, { showModal })}
          style={{ position: 'absolute', margin: '0.2em', top: 0, right: 0 }}
        />
        <img
          style={{ height: '70%', maxWidth: '100%' }}
          src={photo.thumbnail_url || STOCK_IMAGE}
        />
      </>

      <h5 style={{ margin: '0.3em' }}>{product.category}</h5>
      <h3 style={{ margin: '0.3em' }}>{product.name}</h3>

      <Price style={style} />

      <div style={{ margin: '0.3em' }}>
        <Stars
          style={{ margin: '0.3em' }}
          rating={averageRating(reviews)}
          starDimension="1em"
          starSpacing="0.1em"
        />
      </div>

      <ComparisonModal
        product={product}
        otherProduct={mainProduct}
        showModal={showModal}
        onClick={(event) => {
          event.stopPropagation();
          setShowModal(false);
        }}
      />
    </Column>
  );
}
