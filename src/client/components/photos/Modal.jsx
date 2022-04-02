import React from 'react';
import Modal from '../layout/Modal';

export default function PhotoModal ({ image, dims, onClick, showModal }) {
  const [modalOrientation, imageOrientation] = dims.width > dims.height ?
    [{ width: '70%' }, { maxWidth: '100%', height: 'auto' }] :
    [{ height: '70%' }, { maxHeight: '100%', width: 'auto' }];

  return (
    <Modal
      onClick={onClick}
      style={modalOrientation}
      showModal={showModal}
    >
      <img src={image} style={imageOrientation} />
    </Modal>
  );
}
