import React from 'react';

export default function Question ({ errors, formData, setFormData }) {
  const { body } = formData;

  return (
    <>
      <h3>Your Question*</h3>
      <small style={{ color: 'red' }}>{errors.body}</small>
      <textarea
        style={{ width: '100%', height: '10%', fontSize: '1.25em' }}
        value={body}
        placeholder="What would you like to know?"
        onChange={(event) => setFormData({ ...formData, body: event.target.value })}
      />

      {Boolean(body.length) && (
        <small style={{ marginTop: '0.3em' }}>Characters remaining: {1000 - body.length}</small>
      )}
    </>
  );
}
