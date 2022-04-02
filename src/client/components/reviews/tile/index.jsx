import React, { useContext } from 'react';
import Stars from 'react-star-ratings';
import { FaCheck } from 'react-icons/fa';
import moment from 'moment';

import Photos from '../../photos';
import Helpful from '../../layout/Helpful';
import { AppContext } from '../../../contexts';
import Row from '../../layout/Row';

export default function ReviewTile ({ review }) {
  const { setRefetch, product } = useContext(AppContext);

  return (
    <div data-testid="tile" style={{ marginTop: '2em' }}>
      {/* Heading */}
      <Row style={{ justifyContent: 'space-between' }}>
        <Stars
          rating={review.rating}
          starDimension="1em"
          starSpacing="0.1em"
        />
        <small>
          {review.reviewer_name}
          {' - '}
          {moment(review.date).format('MMMM DD, YYYY')}
        </small>
      </Row>

      {/* Body */}
      <h3>{review.summary}</h3>
      <p>{review.body}</p>

      {/* Recommend */}
      {review.recommend && (
        <Row style={{ marginTop: '1em' }}>
          <FaCheck />
          <div style={{ marginLeft: '0.3em' }}>I recommend this product</div>
        </Row>
      )}

      {/* Response */}
      {review.response && (
        <div style={{ background: 'lightgray', padding: '1em', marginTop: '0.5em' }}>
          <strong>Response:</strong>
          <p style={{ marginTop: '1em' }}>{review.response}</p>
        </div>
      )}

      {/* Photos */}
      <Photos photos={review.photos} />

      {/* Footing */}
      <Helpful
        value={review.helpfulness}
        action="Report"
        onActionClick={async () => {
          await fetch(`/api/reviews/${review.review_id}/report`, {
            method: 'PUT'
          });
          await setRefetch({ resource: 'reviews', args: [product.id] });
        }}
        onHelpfulClick={async () => {
          await fetch(`/api/reviews/${review.review_id}/helpful`, {
            method: 'PUT'
          });
          await setRefetch({ resource: 'reviews', args: [product.id] });
        }}
      />
      <hr />
    </div >
  );
}
