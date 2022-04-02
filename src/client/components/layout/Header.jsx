import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Header () {
  return (
    <header style={{
      width: '100%',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      background: '#232323',
      color: '#ccc'
    }}>
      <h1 data-testid="header">CATWALK</h1>
      <ul style={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '20%'
      }}>
        <input style={{ width: '100%' }} />
        <FaSearch style={{ padding: '1em' }} />
      </ul>
    </header>
  );
}
