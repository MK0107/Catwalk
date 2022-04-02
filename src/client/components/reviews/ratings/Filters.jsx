import React, { useContext } from 'react';
import { AppContext } from '../../../contexts';
import { flattenStarFilters } from '../../../utils';
import Row from '../../layout/Row';

export default function Filters () {
  const { reviewStarFilters, setReviewStarFilters } = useContext(AppContext);

  const flattenedStarFilters = flattenStarFilters(reviewStarFilters);

  return flattenedStarFilters.length > 0 && (
    <Row style={{ padding: '1em 1em 1em 0' }}>
      {flattenedStarFilters.map(star => (
        <button
          key={star}
          onClick={() => {
            setReviewStarFilters({ ...reviewStarFilters, [star]: false });
          }}
          style={{
            marginLeft: '0.3em',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '1em',
            height: '2em'
          }}
        >
          {star} stars
          {' '}
          <strong style={{ color: 'red' }}>x</strong>
        </button>
      ))}
    </Row>
  );
}
