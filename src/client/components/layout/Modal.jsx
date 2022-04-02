import React, { useEffect, useRef } from 'react';


export default function Modal ({ style = {}, children, showModal, onClick }) {
  const modal = useRef(null);

  useEffect(() => {
    if (!modal || !modal.current) return;

    if (showModal) modal.current.showModal();
    else modal.current.close();
  }, [showModal]);

  return (
    <dialog
      className="modal"
      style={{ ...style }}
      onClick={onClick}
      ref={modal}
    >
      {children}
    </dialog>
  );
}
