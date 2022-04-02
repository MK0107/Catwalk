import React, { useContext } from 'react';

import Heading from './Heading';
import Filters from './Filters';
import Breakdown from './Breakdown';
import Characteristics from './Characteristics';

import { AppContext } from '../../../contexts';
import { toPercentage } from '../../../utils';

export default function Ratings () {
  const { product } = useContext(AppContext);

  const percentRecommend = toPercentage(
    product.reviews.filter(review => review.recommend).length,
    product.reviews.length
  );

  return (
    <div>
      <Heading />

      {/* Recommenders */}
      <div style={{ marginTop: '0.3em', marginBottom: '0.3em' }}>
        <small>{percentRecommend} of reviewers recommend this product</small>
      </div>

      <Filters />
      <Breakdown />
      <Characteristics />
    </div>
  );
}
