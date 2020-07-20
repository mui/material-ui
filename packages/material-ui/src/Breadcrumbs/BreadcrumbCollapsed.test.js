import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getClasses } from 'test/utils';
import { act, fireEvent, createClientRender } from 'test/utils/createClientRender';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';

describe('<BreadcrumbCollapsed />', () => {
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<BreadcrumbCollapsed />);
  });

  it('should render an icon', () => {
    const { container } = render(<BreadcrumbCollapsed />);

    expect(container.querySelectorAll('svg').length).to.equal(1);
    expect(container.firstChild).to.have.class(classes.root);
  });

  describe('prop: onKeyDown', () => {
    it(`should be called on key down - Enter`, () => {
      const handleClick = spy();
      const { container } = render(<BreadcrumbCollapsed onClick={handleClick} />);
      const expand = container.firstChild;

      act(() => {
        expand.focus();
        fireEvent.keyDown(expand, { key: 'Enter' });
      });

      expect(handleClick.callCount).to.equal(1);
    });

    it(`should be called on key up - Space`, () => {
      const handleClick = spy();
      const { container } = render(<BreadcrumbCollapsed onClick={handleClick} />);
      const expand = container.firstChild;

      act(() => {
        expand.focus();
        fireEvent.keyUp(expand, { key: ' ' });
      });

      expect(handleClick.callCount).to.equal(1);
    });
  });
});
