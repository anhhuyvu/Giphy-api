import React from 'react';

const GifContainer = React.forwardRef(({ url, title, onclick }, ref) => {
  return (
    <div className="img-container" ref={ref} onClick={onclick}>
      <img src={url} alt={title} />
    </div>
  );
});

export default GifContainer;
