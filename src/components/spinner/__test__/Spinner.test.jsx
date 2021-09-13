import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import Spinner from '../Spinner';

describe('Spinner Component', () => {
  it('should render snapshot correctly', () => {
    const tree = renderer.create(<Spinner />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should exist spinner', () => {
    const { container } = render(<Spinner />);

    expect(container.getElementsByClassName('lds-roller')).toBeDefined();
  });
});
