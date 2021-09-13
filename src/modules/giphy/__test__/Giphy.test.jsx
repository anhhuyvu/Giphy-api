import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import Giphy from '../Giphy';

import * as useInfiniteScroll from '../../../hook/useInfiniteScroll';

jest.mock('../../../components/gifContainer/GifContainer', () => 'GifContainer');

const mockData = [
  {
    id: 'gif1',
    user: {
      display_name: 'name1',
      avatar_url: 'avatar1',
    },
    images: {
      downsized: {
        url: 'url1',
        title: 'title1',
      },
    },
  },
  {
    id: 'gif2',
    user: {
      display_name: 'name2',
      avatar_url: 'avatar2',
    },
    images: {
      downsized: {
        url: 'url2',
        title: 'title2',
      },
    },
  },
  {
    id: 'gif3',
    user: {
      display_name: 'name3',
      avatar_url: 'avatar3',
    },
    images: {
      downsized: {
        url: 'url3',
        title: 'title3',
      },
    },
  },
];

describe('test snapshot', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    window.IntersectionObserver = class {
      observe() {}
      disconnect() {}
    };
  });

  it('render loading state', () => {
    jest.spyOn(useInfiniteScroll, 'default').mockReturnValue({
      data: [],
      isLoading: true,
      lastPage: false,
      error: false,
    });

    const tree = renderer.create(<Giphy />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render cards', () => {
    jest.spyOn(useInfiniteScroll, 'default').mockReturnValue({
      data: mockData,
      isLoading: false,
      lastPage: false,
      error: false,
    });

    const tree = renderer.create(<Giphy />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('test react render', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    window.IntersectionObserver = class {
      observe() {}
      disconnect() {}
    };
  });

  it('test loading state', () => {
    jest.spyOn(useInfiniteScroll, 'default').mockReturnValue({
      data: mockData,
      isLoading: true,
      lastPage: false,
      error: false,
    });

    const wrapper = render(<Giphy />);
    expect(wrapper.container.querySelector('.spinner-container')).not.toBeNull();
  });

  it('test normal render', () => {
    jest.spyOn(useInfiniteScroll, 'default').mockReturnValue({
      data: mockData,
      isLoading: false,
      lastPage: false,
      error: false,
    });

    const wrapper = render(<Giphy />);
    expect(wrapper.container.querySelector('.spinner-container')).toBeNull();
  });

  it('test render when error occurred', () => {
    jest.spyOn(useInfiniteScroll, 'default').mockReturnValue({
      data: mockData,
      isLoading: false,
      lastPage: false,
      error: true,
    });

    const wrapper = render(<Giphy />);
    expect(wrapper.container.querySelector('.loading')).toBeNull();
  });
});
