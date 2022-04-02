import React, { useContext } from 'react';
import { AppContext } from '../../../contexts';

export function ScrollButton ({ label, change, setCounter }) {
  return (
    <button onClick={(event) => {
      event.stopPropagation();
      setCounter(counter => change(counter));
    }}>{label}</button>
  );
}

export function PhotoScrollButton ({ label, change }) {
  const { setSelectedPhoto } = useContext(AppContext);
  return (
    <ScrollButton label={label} change={change} setCounter={setSelectedPhoto} />
  );
}

export function ThumbnailScrollButton ({ label, change }) {
  const { setThumbnailStart } = useContext(AppContext);
  return (
    <ScrollButton label={label} change={change} setCounter={setThumbnailStart} />
  );
}
