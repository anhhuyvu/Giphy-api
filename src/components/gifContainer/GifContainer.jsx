import React from 'react';

const GifContainer = React.forwardRef(({ url, title, onclick }, ref) => {
  return (
    <div data-testid="gif-container-id" className="img-container" ref={ref} onClick={onclick}>
      <img src={url} alt={title} />
    </div>
  );
});

export default GifContainer;
