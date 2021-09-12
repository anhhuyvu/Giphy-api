import { useCallback, useRef, useState } from 'react';
import useInfiniteScroll from '../../hook/useInfiniteScroll';

import GifContainer from '../../components/gifContainer/GifContainer';
import Spinner from '../../components/spinner/Spinner';
import FullScreenImage from '../../components/fullScreenImage/FullScreenImage';

import './Giphy.scss';

const Giphy = () => {
  const [page, setPage] = useState(1);
  const lastElementObserver = useRef(null);
  const { data, isLoading, hasMore } = useInfiniteScroll(page);
  const [overlay, setOverlay] = useState(false);
  const [selectedGif, setSelectedGif] = useState('');

  const lastElementRef = useCallback(
    (element) => {
      if (isLoading) return;
      if (lastElementObserver.current) {
        lastElementObserver.current.disconnect();
      }
      lastElementObserver.current = new IntersectionObserver((items) => {
        if (items[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (element) {
        lastElementObserver.current.observe(element);
      }
    },
    [isLoading, hasMore],
  );
  const toggle = () =>
    setOverlay((prevState) => {
      if (prevState) {
        setSelectedGif('');
      }
      return !prevState;
    });
  const handleOnClick = (url) => {
    setSelectedGif(url);
    toggle();
  };

  return (
    <div className="gif-page-container">
      {isLoading && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
      <h1 className="d-flex justify-content-center">
        <b>Trending Gifs</b>
      </h1>
      <div className="giphy-container">
        {data.map((items, index) => {
          const { id, images } = items;
          const { url, title } = images.downsized;
          if (data.length - 1 === index) {
            return (
              <GifContainer key={id} url={url} title={title} ref={lastElementRef} onclick={() => handleOnClick(url)} />
            );
          }

          return <GifContainer key={id} url={url} title={title} onclick={() => handleOnClick(url)} />;
        })}
      </div>
      <FullScreenImage url={selectedGif} isOpen={overlay} toggle={toggle} />
    </div>
  );
};
export default Giphy;
