import React, { useContext, useState } from 'react';

import { AppContext } from '../../../contexts';
import { flattenStarFilters } from '../../../utils';

import ReviewTile from '../tile';
import SplitScreen from '../../layout/SplitScreen';
import ScrollableList from '../../layout/ScrollableList';

import User from '../../form/fields/User';
import Photos from '../../form/fields/Photos';
import Review from '../../form/fields/Review';
import Overall from '../../form/fields/Overall';
import Recommend from '../../form/fields/Recommend';
import Characteristics from '../../form/fields/Characteristics';
import CreateFormModal from '../../form';
import { REQUIRED_FIELD, validators } from '../../form/utils';

export default function ReviewList () {
  const [showModal, setShowModal] = useState(false);
  const [displayCount, setDisplayCount] = useState(2);
  const [reviewsSortedBy, setReviewsSortedBy] = useState('relevant');

  const { reviewStarFilters, product, setRefetch } = useContext(AppContext);

  // Handle rating filters
  const ratingFilters = new Set(flattenStarFilters(reviewStarFilters));

  // Filter reviews
  const filteredReviews = product.reviews.filter(review => !ratingFilters.size || ratingFilters.has(review.rating));

  return (
    <div>
      {/* Heading */}
      <h4 style={{ margin: 0 }}>{filteredReviews.length} reviews, sorted by
        {' '}
        <select
          value={reviewsSortedBy}
          onChange={async (event) => {
            setReviewsSortedBy(event.target.value);
            await setRefetch({ resource: 'reviews', args: [product.id, event.target.value] });
          }}
        >
          <option value="relevant">relevant</option>
          <option value="newest">newest</option>
          <option value="helpful">helpful</option>
        </select>
      </h4>

      {/* Review List */}
      <ScrollableList style={{ maxHeight: '400px' }}>
        {filteredReviews.slice(0, displayCount).map(review => (
          <ReviewTile key={review.review_id} review={review} />
        ))}
      </ScrollableList>

      {/* Buttons */}
      <SplitScreen>
        {displayCount < filteredReviews.length && (
          <button
            onClick={() => setDisplayCount(displayCount + 2)}
            style={{ width: '100%', height: '30px' }}>
            More Reviews
          </button>
        )}

        <button
          onClick={() => setShowModal(true)}
          style={{ width: '100%', height: '30px' }}
        >
          Add a Review +
        </button>
      </SplitScreen>

      <CreateFormModal
        title="Write your Review"
        subtitle={`... about the ${product.name}`}
        style={{ width: '60%', height: '80%' }}
        endpoint="/api/reviews"
        validations={{
          body: validators.REVIEW_LENGTH,
          name: validators.EMPTY,
          email: validators.INVALID_EMAIL,
          summary: validators.EMPTY,
          characteristics: characteristics => (
            Object.keys(characteristics).length !==
            Object.keys(product.reviewMeta.characteristics).length
          ) && REQUIRED_FIELD
        }}
        initial={{
          body: '',
          name: '',
          email: '',
          rating: 3,
          photos: [],
          summary: '',
          recommend: true,
          characteristics: {},
          product_id: product.id
        }}
        showModal={showModal}
        onClick={() => setShowModal(false)}
        onSubmit={async () => {
          setShowModal(false);
          await setRefetch({ resource: 'reviews', args: [product.id, reviewsSortedBy] });
        }}
        fields={[Overall, Recommend, Characteristics, Review, Photos, User]}
      />
    </div>
  );
}
