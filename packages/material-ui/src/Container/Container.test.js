import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, describeConformance, createClientRender } from 'test/utils';
import Container from './Container';

describe('<Container />', () => {
  const render = createClientRender();
  const mount = createMount();
  let classes;
  const defaultProps = {
    children: <div />,
  };

  before(() => {
    classes = getClasses(<Container {...defaultProps} />);
  });

  describeConformance(<Container {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLElement,
  }));

  describe('prop: maxWidth', () => {
    it('should support different maxWidth values', () => {
      const { container: firstContainer } = render(<Container {...defaultProps} />);
      expect(firstContainer.firstChild).to.have.class(classes.maxWidthLg);
      const { container: secondsContainre } = render(
        <Container {...defaultProps} maxWidth={false} />,
      );
      expect(secondsContainre.firstChild).not.to.have.class(classes.maxWidthLg);
    });
  });
});
