import React, { useContext } from 'react';
import Stars from 'react-star-ratings';

import Price from './Price';
import Row from '../../layout/Row';
import { AppContext } from '../../../contexts';
import { averageRating } from '../../../utils';

export default function Features () {
  const { product, selectedStyle } = useContext(AppContext);

  const style = product.styles[selectedStyle];

  return (
    <>
      {/* Stars and reviews */}
      <Row>
        <Stars
          rating={averageRating(product.reviews)}
          starDimension="1em"
          starSpacing="0.1em"
        />
        {product.reviews.length &&
          <div style={{ paddingLeft: '1em', textDecoration: 'underline' }}>
            Read all {product.reviews.length} reviews
          </div>
        }
      </Row>

      <h3>{product.category}</h3>
      <h1>{product.name}</h1>

      <Price style={style} />
    </>
  );
}
