import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getClasses, act, fireEvent, createClientRender } from 'test/utils';
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

  describe('prop: onClick', () => {
    it(`should be called`, () => {
      const handleClick = spy();
      const { getByRole } = render(<BreadcrumbCollapsed onClick={handleClick} />);
      const expand = getByRole('button');

      act(() => {
        fireEvent.click(expand);
      });

      expect(expand.nodeName).to.equal('BUTTON');
      expect(handleClick.callCount).to.equal(1);
    });
  });
});
