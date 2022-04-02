import React, { useState } from 'react';

import Row from '../../layout/Row';
import Column from '../../layout/Column';

export default function Photos ({ formData, setFormData }) {
  const { photos } = formData;
  const [currentPhoto, setCurrentPhoto] = useState('');

  return (
    <>
      <h3>Upload Photos</h3>
      {photos.length > 0 && (
        <Row style={{ marginBottom: '1em' }}>
          {photos.map((photo, index) => (
            <img
              key={photo + index}
              style={{ width: '100px', height: '100px', marginLeft: '0.5em' }}
              src={photo}
            />
          ))}
        </Row>
      )}

      {photos.length < 5 && (
        <Column>
          <input
            size="30"
            type="url"
            pattern="https://.*"
            placeholder="https://example-image.com"
            value={currentPhoto}
            onChange={(event) => setCurrentPhoto(event.target.value)}
          />
          <button
            style={{ marginTop: '1em', width: '20%' }}
            onClick={() => {
              if (!currentPhoto) {
                return;
              }

              setFormData({ ...formData, photos: photos.concat(currentPhoto) });
              setCurrentPhoto('');
            }}>
            Add Photo
          </button>
        </Column>
      )}
    </>
  );
}
