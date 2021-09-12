import axios from 'axios';

export const ENDPOINT = ' https://api.giphy.com/v1/gifs/trending';
export const API_KEY = 'tBjT70lzwGwkMwG7xZSt91e8qMNkIQ22';
export const LIMIT_ITEMS = 20;

export const getGifItems = async(offset = 0) => {
  const result =  await axios(ENDPOINT, {
    params: {
      api_key: API_KEY,
      limit: LIMIT_ITEMS,
      offset: offset,
    },
  });
  const { data, pagination } = result.data;
  return { data, pagination };
};
