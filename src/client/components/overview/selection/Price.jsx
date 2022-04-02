import React from 'react';
import { moneyFormatter } from '../../../utils';

export default function Price ({ style }) {
  return (
    <>
      <h5 style={{ margin: '0.3em', textDecoration: style.sale_price && 'line-through' }}>
        {moneyFormatter.format(style.original_price)}
      </h5>

      {style.sale_price && <h5 style={{ margin: '0.3em', color: 'red' }}>
        {moneyFormatter.format(style.sale_price)}
      </h5>}
    </>
  );
}
