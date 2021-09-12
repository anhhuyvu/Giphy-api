import React, { useEffect } from 'react';
import './FullScreenImage.scss';

const FullScreenImage = ({ isOpen, url, toggle }) => {
  useEffect(() => {
    const handleOnClick = (event) => {
      const container = document.getElementById('fullscreen-container');

      if (container && container.isEqualNode(event.target)) {
        toggle();
      }
    };

    document.addEventListener('mousedown', handleOnClick);

    return () => {
      document.removeEventListener('mousedown', handleOnClick);
    };
  }, [toggle]);

  return (
    <div className={`fullscreen-container ${isOpen ? 'show' : ''}`} id="fullscreen-container">
      <img alt={url} src={url} />
    </div>
  );
};

export default FullScreenImage;
