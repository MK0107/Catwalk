import React, { useContext } from 'react';
import { AppContext } from '../../../contexts';
import { productCharacteristics } from '../../../utils';

import Row from '../../layout/Row';
import Column from '../../layout/Column';

export default function Characteristics ({ formData, setFormData, errors }) {
  const { product } = useContext(AppContext);
  const { characteristics } = formData;

  return (
    <>
      <h3 style={{ marginBottom: 0 }}>Characteristics*</h3>

      <small style={{ color: 'red' }}>{errors.characteristics}</small>

      <Column style={{ padding: '0 2em' }}>
        {/* Map over the characteristics for the given product */}
        {Object.entries(product.reviewMeta.characteristics).map(([characteristic, { id }]) => (
          <div key={id}>
            <h5>{characteristic}</h5>
            <Row style={{ justifyContent: 'space-around' }}>
              {/* Map over the rating descriptions for a given characteristic  */}
              {productCharacteristics[characteristic].map((label, index) => (
                <Column key={id + label} style={{ width: '7%' }}>
                  <small>{label}</small>

                  <input
                    value={label}
                    type="radio"
                    checked={characteristics[id] === (index + 1)}
                    onChange={() => {
                      setFormData({
                        ...formData, characteristics: { ...characteristics, [id]: index + 1 }
                      });
                    }}
                  />
                </Column>
              ))}
            </Row>
          </div>
        ))}
      </Column>
    </>
  );
}
