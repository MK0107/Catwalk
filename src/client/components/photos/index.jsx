import React, { useState } from 'react';
import Row from '../layout/Row';
import PhotoModal from './Modal';

export default function Photos ({ photos }) {
  const [dims, setDims] = useState({});
  const [image, setImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Row>
        {photos.map(photo => (
          <img
            key={photo.id || photo}
            src={photo.url || photo}
            style={{ padding: '1em', width: '100px', height: '100px' }}
            onClick={(event) => {
              setImage(photo.url || photo);

              setDims({
                width: event.target.naturalWidth,
                height: event.target.naturalHeight
              });

              setShowModal(true);
            }}
          />
        ))}
      </Row>

      <PhotoModal
        dims={dims}
        image={image}
        showModal={showModal}
        onClick={() => setShowModal(false)}
      />
    </>
  );
}
