import React from 'react';

export const STOCK_IMAGE = 'https://ih1.redbubble.net/image.846665687.1283/flat,750x1000,075,f.jpg';
export const STOCK_FAVORITE = 'https://printables.space/files/uploads/download-and-print/large-printable-numbers/plus-a4-1200x1697.jpg';

export function increment (index) {
  return index + 1;
}

export function decrement (index) {
  return index - 1;
}

export function getFavorites () {
  const favorites = JSON.parse(localStorage.getItem('favorites'));

  if (!favorites || !Array.isArray(favorites)) {
    localStorage.setItem('favorites', '[]');
    return [];
  } else {
    return favorites;
  }
}

export function setFavorites (data) {
  localStorage.setItem('favorites', JSON.stringify(data));
}

export function removeFavoriteAndReturn (product) {
  return getFavorites().filter(otherProduct => otherProduct !== product);
}

export function forgetFavorite (product) {
  setFavorites(removeFavoriteAndReturn(product));
}

export function persistFavorite (product) {
  setFavorites(removeFavoriteAndReturn(product).concat(product));
}


export function extractFeatures (product) {
  return product.features.reduce((features, { feature, value }) => {
    return { ...features, [feature]: value };
  }, {});
}

export function flattenStarFilters (starFilters) {
  return Object
    .entries(starFilters)
    .filter(([_, selected]) => selected)
    .map(([star]) => Number(star))
    .reverse();
}

export function searchHit (text, query) {
  const lt = text.toLowerCase();
  const lq = query.toLowerCase();

  return lt === lq || lt.includes(lq);
}

// Highlight all occurences of query within text
export function highlight (text, query) {
  if (!query || query.length < 3) return text;

  return text
    .split(new RegExp(`(${query})`, 'gi'))
    .map((phrase, index) =>
      searchHit(phrase, query) ? <mark key={phrase + index}>{phrase}</mark> : phrase
    );
}

export async function get (endpoint) {
  const response = await fetch(endpoint, { cache: 'reload' });
  return response.json();
}

export async function getRefetch (resource, args) {
  switch (resource) {
  case 'styles': return getStyles(...args);
  case 'related': return getRelated(...args);
  case 'reviews': return getReviews(...args);
  case 'questions': return getQuestions(...args);
  case 'reviewMeta': return getReviewMeta(...args);
  default: return null;
  }
}

export async function getRelated (id) {
  const related = await get(`/api/products/${id}/related`);

  return Promise.all(related.map(getProductStub));
}

export async function getReviews (id, sortedBy = "relevant") {
  return (await get(`/api/reviews?product_id=${id}&count=100000&sort=${sortedBy}`)).results;
}

export async function getReviewMeta (id) {
  return get(`/api/reviews/meta?product_id=${id}`);
}

export async function getStyles (id) {
  return (await get(`/api/products/${id}/styles`)).results;
}

export async function getQuestions (id) {
  return (await get(`/api/qa/questions?product_id=${id}&count=100`)).results;
}

export async function getProduct (id) {
  return get(`/api/products/${id}`);
}

export async function getProductStub (id) {
  const [product, reviews, styles] = await Promise.all([
    getProduct(id),
    getReviews(id),
    getStyles(id)
  ]);

  product.reviews = reviews;
  product.styles = styles;

  return product;
}

export async function getFullProduct (id, cache, setCache) {
  if (id in cache) return cache[id];

  const [product, styles, related, reviews, questions, reviewMeta] = await Promise.all([
    getProduct(id),
    getStyles(id),
    getRelated(id),
    getReviews(id),
    getQuestions(id),
    getReviewMeta(id)
  ]);

  product.styles = styles;
  product.related = related;
  product.reviews = reviews;
  product.questions = questions;
  product.reviewMeta = reviewMeta;

  setCache({ ...cache, id: product });

  return product;
}

export function getRandomInteger (min = 0, max = 10000) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function toPercentage (numerator, denominator) {
  return ((numerator / denominator) * 100).toFixed(0) + '%';
}

export function reviewsByRating (reviews) {
  const ratings = {};

  reviews.forEach(review => {
    ratings[review.rating] = (ratings[review.rating] || 0) + 1;
  });

  return ratings;
}

export function averageRating (reviews) {
  if (!reviews.length) return 0;

  const totalRating = reviews.reduce(function (totalRating, { rating }) {
    if (Number(rating) < 1 || Number(rating) > 5) {
      return totalRating;
    }

    return totalRating + rating;
  }, 0);


  return Number((totalRating / reviews.length).toFixed(2));
}

export const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export const starDescriptions = {
  1: 'Poor',
  2: 'Fair',
  3: 'Average',
  4: 'Good',
  5: 'Great'
};

export const productCharacteristics = {
  Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
  Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
  Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
  Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
  Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
};
