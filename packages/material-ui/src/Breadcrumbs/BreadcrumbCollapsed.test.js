import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getClasses, fireEvent, createClientRender } from 'test/utils';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';

describe('<BreadcrumbCollapsed />', () => {
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<BreadcrumbCollapsed />);
  });

  it('should render an icon', () => {
    const { container, getByRole } = render(<BreadcrumbCollapsed />);

    expect(container.querySelectorAll('svg').length).to.equal(1);
    expect(getByRole('button')).to.have.class(classes.button);
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
