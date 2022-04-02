import React, { useState } from 'react';

import Modal from '../layout/Modal';
import Column from '../layout/Column';

export default function CreateFormModal ({
  showModal,
  onClick,
  onSubmit,
  title,
  subtitle,
  fields,
  endpoint,
  initial,
  validations,
  style
}) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ ...initial });

  return (
    <Modal showModal={showModal} onClick={onClick} style={style}>
      <Column onClick={(event) => event.stopPropagation()}>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>

        {fields.map((Field, index) => (
          <Field
            key={index}
            errors={errors}
            setErrors={setErrors}
            formData={formData}
            setFormData={setFormData}
          />
        ))}

        <button
          onClick={async () => {
            // Check for validation errors
            const validationErrors = Object.entries(validations).map(([field, validate]) => {
              const message = validate(formData[field]);

              return message ? [field, message] : null;
            }).filter(Boolean);

            // Do we have any??
            if (validationErrors.length) {
              setErrors(Object.fromEntries(validationErrors));
              return;
            }

            await fetch(endpoint, {
              method: 'POST',
              body: JSON.stringify(formData),
              headers: { 'Content-Type': 'application/json' }
            });

            await onSubmit();

            setFormData({ ...initial });
          }}
          style={{ marginTop: '1em' }}
        >
          Submit
        </button>
      </Column>
    </Modal>
  );
}
