import React from 'react';
import { toPercentage } from '../../utils';
import Row from './Row';

export default function SplitScreen ({ children, widths = [50, 50] }) {
  return (
    <Row>
      {React.Children.map(children, (child, index) => (
        Boolean(widths[index]) && (
          <div style={{ width: toPercentage(widths[index], 100), margin: '1em' }}>
            {child}
          </div>
        )
      ))}
    </Row>
  );
}
