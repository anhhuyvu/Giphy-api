import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import FullScreenImage from '../FullScreenImage';
describe('FullScreenImage component', () => {
  it('should render snapshot correctly', () => {
    const tree = renderer.create(<FullScreenImage url={'url'} isOpen={true} toggle={'toggle'} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render overlay image', () => {
    const wrapper = render(<FullScreenImage url={'url'} isOpen={true} toggle={'toggle'} />);

    expect(wrapper.getByRole('img')).toBeDefined();
  });
});
