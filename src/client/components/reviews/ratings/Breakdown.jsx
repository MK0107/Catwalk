import React, { useContext } from 'react';
import { AppContext } from '../../../contexts';
import { reviewsByRating } from '../../../utils';
import Column from '../../layout/Column';
import Row from '../../layout/Row';

export default function Breakdown () {
  const { product, reviewStarFilters, setReviewStarFilters } = useContext(AppContext);
  const ratingsCount = reviewsByRating(product.reviews);

  return (
    <Column>
      {[...new Array(5).keys()].map(star => star + 1).reverse().map(star => (
        <Row
          key={star}
          onClick={() => {
            setReviewStarFilters({
              ...reviewStarFilters,
              [star]: !reviewStarFilters[star]
            });
          }}
        >
          <small style={{ width: '10%', margin: 0, textDecoration: 'underline' }}>{star} stars</small>
          <progress style={{ width: '85%' }} value={ratingsCount[star] || 0} max={product.reviews.length} />
        </Row>
      ))}
    </Column>
  );
}
