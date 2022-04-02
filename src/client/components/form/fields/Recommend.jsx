import React from 'react';
import Row from '../../layout/Row';

export default function Recommend ({ formData, setFormData }) {
  const { recommend } = formData;

  return (
    <>
      <h3>Do you recommend this product?*</h3>
      <Row>
        <input
          value
          type="radio"
          checked={recommend}
          onChange={() => setFormData({ ...formData, recommend: true })}
        /> Yes
        <input
          style={{ marginLeft: '1em' }}
          type="radio"
          value={false}
          onChange={() => setFormData({ ...formData, recommend: false })}
          checked={!recommend}
        /> No
      </Row>
    </>
  );
}
