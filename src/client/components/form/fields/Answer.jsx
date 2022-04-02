import React from 'react';

export default function Answer ({ errors, formData, setFormData }) {
  const { body } = formData;

  return (
    <>
      <h3>Your Answer*</h3>
      <small style={{ color: 'red' }}>{errors.body}</small>
      <textarea
        style={{ width: '100%', height: '10%', fontSize: '1.25em' }}
        value={body}
        placeholder="Please, what is the answer?"
        onChange={(event) => setFormData({ ...formData, body: event.target.value })}
      />

      {body.length > 0 && (
        <small style={{ marginTop: '0.3em' }}>Characters remaining: {1000 - body.length}</small>
      )}
    </>
  );
}
