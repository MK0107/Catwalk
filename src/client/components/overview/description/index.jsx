import React, { useContext } from 'react';
import { AppContext } from '../../../contexts';
import Column from '../../layout/Column';
import Row from '../../layout/Row';

export default function Description () {
  const { product } = useContext(AppContext);
  return (
    <Row style={{ margin: '2%' }}>
      <Column style={{ width: '50%' }}>
        <h3>{product.slogan}</h3>
        <p>{product.description}</p>
      </Column>
      <hr width="0.1" size="100" style={{ marginLeft: '3em', marginRight: '3em' }} />
      <Column>
        {product.features.map(({ feature, value }) => (
          <li key={feature + value}>{feature} {value}</li>
        ))}
      </Column>
    </Row>
  );
}
