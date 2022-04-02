import React, { useContext, useState } from 'react';
import { AppContext } from '../../../contexts';

import Row from '../../layout/Row';
import Column from '../../layout/Column';
import SplitScreen from '../../layout/SplitScreen';

export default function Cart () {
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showSizes, setShowSizes] = useState(1);
  const { product, selectedStyle, userToken } = useContext(AppContext);

  // Selected style
  const style = product.styles[selectedStyle];

  // Display options (get rid of duplicate sizes)
  const uniqueSkus = new Set();
  const uniqueSizes = new Set();

  // Generate unique list of skus to map over
  const skus = Object.entries(style.skus).filter(([id, sku]) => Boolean(
    uniqueSkus.add(id) && // track each sku id
    !uniqueSizes.has(sku.size) && // check whether we've seen this size
    sku.quantity && // ensure the size has valid quantity
    uniqueSizes.add(sku.size) // add it to the set of unique sizes
  ));

  const quantities = [...new Array(Math.min(style.skus[sku]?.quantity || 0, 15)).keys()];

  return (
    <>
      <SplitScreen>
        {/* Size Selection */}
        <Column>
          <label htmlFor="size">{showSizes > 1 ? 'Please select a size' : 'Choose a size:'}</label>
          <select
            size={showSizes}
            value={sku}
            disabled={!skus.length}
            onChange={(event) => {
              setSku(event.target.value);
              setQuantity(1);
              setShowSizes(1);
            }}
            name="size"
          >
            {skus.length ? <option value={''}>Select Size</option> : <option value={''}>OUT OF STOCK</option>}

            {skus.map(([id, sku]) => (
              <option key={id} value={id}>{sku.size}</option>
            ))}
          </select>
        </Column>

        {/* Quantity Selection */}
        <Column>
          <label htmlFor="quantity">How many?</label>
          <select
            onChange={(event) => setQuantity(event.target.value)}
            value={quantity}
            disabled={!sku}
            name="quantity"
          >
            <option value={''}>-</option>
            {quantities.map(quantity => (
              <option key={quantity} value={quantity + 1}>{quantity + 1}</option>
            ))}
          </select>
        </Column>
      </SplitScreen>


      {/* Add to cart and favorite */}
      <Row style={{ marginTop: '1em', justifyContent: 'space-around' }}>
        {skus.length > 0 &&
          <button
            onClick={() => {
              if (!uniqueSkus.has(sku)) {
                setShowSizes(skus.length + 1);
                return;
              }

              fetch(`/api/cart`, {
                method: 'POST',
                body: JSON.stringify({ sku_id: Number(sku), user_token: userToken }),
                headers: { 'Content-Type': 'application/json' }
              });
            }}
            style={{ width: '50%' }}>
            Add to Bag
          </button>
        }

        <button style={{ marginLeft: '1em', width: skus.length ? '50%' : '100%' }}>Favorite</button>
      </Row>
    </>
  );
}
