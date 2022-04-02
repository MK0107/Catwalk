import React from 'react';

export default function Column ({ style, onClick, children }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {children}
    </div>
  );
}
