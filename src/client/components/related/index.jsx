import React, { useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';

import Row from '../layout/Row';
import RelatedTile from './tile';

import { AppContext } from '../../contexts';
import { persistFavorite, forgetFavorite } from '../../utils';

export default function RelatedProducts () {
  const { product, favorites, setFavorites } = useContext(AppContext);

  return (
    <div>
      <h1>Related Products</h1>
      <Row style={{ overflow: 'auto' }}>
        {product.related.map(product => (
          <RelatedTile
            key={product.id}
            product={product}
            icon={FaStar}
            onClick={(_, { history }) => history.push(`/products/${product.id}`)}
            action={(event, { setShowModal }) => {
              event.stopPropagation();

              setShowModal(false);
            }}
          />
        ))}
      </Row>

      <h1>Your Outfit</h1>
      <Row style={{ overflow: 'auto' }}>
        <RelatedTile
          blank
          onClick={() => {
            setFavorites(favorites.filter(favorite => favorite.id !== product.id).concat(product));
            persistFavorite(product.id);
            history.push(`/products/${product.id}`);
          }}
        />

        {favorites.map(product => (
          <RelatedTile
            key={product.id}
            product={product}
            icon={TiDeleteOutline}
            action={(event) => {
              event.stopPropagation();

              setFavorites(favorites.filter(favorite => favorite.id !== product.id));
              forgetFavorite(product.id);
            }}
          />
        ))}
      </Row>

    </div>
  );
}
