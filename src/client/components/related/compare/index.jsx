import React from 'react';
import { extractFeatures } from '../../../utils';

import Modal from '../../layout/Modal';

export default function ComparisonModal ({ showModal, onClick, product, otherProduct }) {
  const allFeatures = [...new Set(
    product.features.concat(otherProduct.features).map(({ feature }) => feature)
  )];

  const productFeatures = extractFeatures(product);
  const otherProductFeatures = extractFeatures(otherProduct);

  return (
    <Modal
      style={{ width: '60%', height: '60%' }}
      onClick={onClick}
      showModal={showModal}
    >
      <h1>Comparing</h1>

      <table style={{
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '1em',
        fontSize: '1.5em'
      }}>
        <tbody>
          <tr>
            <th>{product.name}</th>
            <th />
            <th>{otherProduct.name}</th>
          </tr>
          {allFeatures.map(feature => (
            <tr key={feature}>
              <td style={{ textAlign: 'center' }}>{productFeatures[feature]}</td>
              <td style={{ textAlign: 'center' }}>{feature}</td>
              <td style={{ textAlign: 'center' }}>{otherProductFeatures[feature]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}
