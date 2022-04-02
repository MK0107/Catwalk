import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { AppContext } from '../contexts';
import { getFavorites, getFullProduct, getProductStub, getRandomInteger, getRefetch } from '../utils';
import Header from './layout/Header';
import Reviews from './reviews';
import Overview from './overview';
import RelatedProducts from './related';
import QuestionsAndAnswers from './qaa';

export default function App () {
  // const { params: { product: id } } = useRouteMatch();
  const id = 44388;

  // Cache
  const [cache, setCache] = useState({});
  const [refetch, setRefetch] = useState();

  // Product state
  const [product, setProduct] = useState();
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [thumbnailStart, setThumbnailStart] = useState(0);
  const [fullCarousel, setFullCarousel] = useState(false);

  console.log('product:', product);

  // Product review state
  const [reviewStarFilters, setReviewStarFilters] = useState({
    1: false, 2: false, 3: false, 4: false, 5: false
  });

  // Related state
  const [related, setRelated] = useState();
  const [favorites, setFavorites] = useState();

  // Cookie state
  const [userToken] = useState(getRandomInteger());

  // Product
  useEffect(() => {
    getFullProduct(id, cache, setCache).then(setProduct);
  }, [id]);

  // Refetch
  useEffect(() => {
    if (!refetch) return;
    const { resource, args = [] } = refetch;

    getRefetch(resource, args)
      .then(data => {
        const updatedProduct = { ...product, [resource]: data };
        setCache({ ...cache, [product.id]: updatedProduct });
        setProduct(updatedProduct);
      });
  }, [refetch]);

  // Favorites
  useEffect(() => {
    Promise.all(getFavorites().map(getProductStub)).then(setFavorites);
  }, []);

  if (!product || !favorites) {
    return <div>Loading</div>;
  }

  return (
    <AppContext.Provider value={{
      userToken,
      cache, setCache,
      refetch, setRefetch,
      product, setProduct,
      related, setRelated,
      favorites, setFavorites,
      fullCarousel, setFullCarousel,
      selectedStyle, setSelectedStyle,
      selectedPhoto, setSelectedPhoto,
      thumbnailStart, setThumbnailStart,
      reviewStarFilters, setReviewStarFilters
    }}>
      <div style={{ padding: '0 20%' }}>
        <Header />
        <Overview />
        {/* <RelatedProducts /> */}
        {/* <QuestionsAndAnswers /> */}
        <Reviews />
      </div>

    </AppContext.Provider>
  );
}

