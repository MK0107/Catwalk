/* eslint-disable prefer-reflect */
import React from 'react';

export default function User ({ errors, formData, setFormData }) {
  const { name, email } = formData;

  return (
    <>
      <h3>Nickname*</h3>
      <small style={{ color: 'red' }}>{errors.name}</small>
      <input
        placeholder="Example: jackson11!"
        value={name}
        onChange={(event) => { setFormData({ ...formData, name: event.target.value }); }}
      />
      <small style={{ marginTop: '0.3em' }}>For privacy reasons, do not use your full name or email address</small>

      <h3>Email*</h3>
      <small style={{ color: 'red' }}>{errors.email}</small>
      <input
        placeholder="jackson11@email.com"
        value={email}
        onChange={(event) => { setFormData({ ...formData, email: event.target.value }); }}
      />
      <small style={{ marginTop: '0.3em' }}>For authentication reasons, you will not be emailed</small>
    </>
  );
}
