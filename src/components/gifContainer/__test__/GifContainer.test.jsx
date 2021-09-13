import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import GifContainer from '../GifContainer';

const props = {
  title: 'title',
  url: 'url',
  onclick: jest.fn(),
};
describe('GifContainer Component', () => {
  it('should render snapshot correctly', () => {
    const tree = renderer.create(<GifContainer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render image correctly', () => {
    const wrapper = render(<GifContainer {...props} />);

    expect(wrapper.getByRole('img')).toBeInTheDocument();
    expect(wrapper.getByTestId('gif-container-id')).toBeInTheDocument();
  });

  it('should call function when click on image', () => {
    render(<GifContainer {...props} />);

    fireEvent.click(screen.getByRole('img'));

    expect(props.onclick).toHaveBeenCalledTimes(1);
  });
});
