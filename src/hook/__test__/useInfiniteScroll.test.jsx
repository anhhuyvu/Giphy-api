import { renderHook, act } from '@testing-library/react-hooks';
import * as api from '../../api/giphy';
import useInfiniteScroll from '../useInfiniteScroll';

const mockData = [
  {
    id: 'gif1',
    images: {
      downsized: {
        url: 'url1',
        title: 'title1',
      },
    },
  },
  {
    id: 'gif2',
    images: {
      downsized: {
        url: 'url2',
        title: 'title2',
      },
    },
  },
];

describe('test hook useInfiniteScroll', () => {
  it('should fetch the first and the second page then return the correct data', async () => {
    let container;

    jest.spyOn(api, 'getGifItems').mockReturnValue({
      data: mockData,
      pagination: { total_count: 5000 },
    });

    await act(async () => {
      container = renderHook((page) => useInfiniteScroll(page), {
        initProp: 1,
      });
    });

    const { isLoading, data, hasMore } = container.result.current;

    expect(data).toEqual(mockData);
    expect(isLoading).toEqual(false);
    expect(hasMore).toEqual(false);

    await act(async () => {
      container.rerender(2);
    });

    const { isLoading: isLoading2, data: data2, hasMore: hasMore2 } = container.result.current;

    expect(data2).toEqual([...mockData, ...mockData]);
    expect(isLoading2).toEqual(false);
    expect(hasMore2).toEqual(true);
  });
});
