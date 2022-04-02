import React, { useContext } from 'react';
import { AppContext } from '../../../contexts';
import { productCharacteristics, toPercentage } from '../../../utils';

import Row from '../../layout/Row';
import Column from '../../layout/Column';

export default function Styles () {
  const { product } = useContext(AppContext);

  return (
    <Column>
      {Object.entries(product.reviewMeta.characteristics).map(([characteristic, { id, value }]) => (
        <Column key={id}>
          <div style={{ marginBottom: '0.2em' }}>{characteristic}</div>
          <div style={{ width: '100%', height: '10px', backgroundColor: 'lightgray' }}>
            <div
              style={{
                width: '2px',
                height: '100%',
                position: 'relative',
                backgroundColor: 'black',
                left: toPercentage((value - 1) * 25, 100)
              }}
            />
          </div>
          <Row style={{ justifyContent: 'space-between' }}>
            <small>{productCharacteristics[characteristic][0]}</small>
            <small>{productCharacteristics[characteristic][4]}</small>
          </Row>
        </Column>
      ))}
    </Column>
  );
}
