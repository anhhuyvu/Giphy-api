import { useState, useEffect } from 'react';
import { LIMIT_ITEMS, getGifItems } from '../api/giphy';

const useInfiniteScroll = (page) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const fetchDataByPage = async (page) => {
    setIsLoading(true);
    const offset = (page - 1) * LIMIT_ITEMS;
    const response = await getGifItems(offset);

    const { data, pagination } = response;
    if (data && pagination) {
      setData((prevItem) => [...prevItem, ...data]);
      setIsLoading(false);
      setHasMore(page < pagination.total_count);
    }
  };

  useEffect(() => {
    fetchDataByPage(page);
  }, [page]);

  return { isLoading, data, hasMore };
};

export default useInfiniteScroll;
