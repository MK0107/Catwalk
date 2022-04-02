import React, { useContext } from 'react';
import Stars from 'react-star-ratings';
import { AppContext } from '../../../contexts';
import { averageRating } from '../../../utils';
import Row from '../../layout/Row';

export default function Heading () {
  const { product } = useContext(AppContext);

  const average = averageRating(product.reviews);

  return (
    <Row>
      <h1 style={{ margin: '0', paddingRight: '0.5em' }}>{average}</h1>
      <Stars
        rating={average}
        starDimension="1em"
        starSpacing="0.1em"
      />
    </Row>
  );
}
