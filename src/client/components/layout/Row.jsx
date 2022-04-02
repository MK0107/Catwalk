import React from 'react';

export default function Row ({ style, children, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'row', ...style }}>
      {children}
    </div>
  );
}
