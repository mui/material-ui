import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { fireEvent, createRenderer } from '@mui/internal-test-utils';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';

describe('<BreadcrumbCollapsed />', () => {
  const { render } = createRenderer();

  it('should render an icon', () => {
    const { container } = render(<BreadcrumbCollapsed />);

    expect(container.querySelectorAll('svg').length).to.equal(1);
  });

  it('renders a native <button>', () => {
    const { getByRole } = render(<BreadcrumbCollapsed />);

    expect(getByRole('button')).to.have.property('nodeName', 'BUTTON');
  });

  describe('prop: onClick', () => {
    it(`should be called when clicked`, () => {
      const handleClick = spy();
      const { getByRole } = render(<BreadcrumbCollapsed onClick={handleClick} />);
      const expand = getByRole('button');

      fireEvent.click(expand);

      expect(handleClick.callCount).to.equal(1);
    });
  });
});
