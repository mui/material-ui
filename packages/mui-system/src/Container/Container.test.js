import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { Container, containerClasses as classes } from '@mui/system';

describe('<Container />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    children: <div />,
  };

  describeConformance(<Container {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLElement,
    muiName: 'MuiContainer',
    skip: ['componentsProp'],
    testVariantProps: { fixed: true },
  }));

  describe('prop: maxWidth', () => {
    it('should support different maxWidth values', () => {
      const { container, setProps } = render(<Container {...defaultProps} />);
      expect(container.firstChild).to.have.class(classes.maxWidthLg);
      setProps({ maxWidth: false });
      expect(container.firstChild).not.to.have.class(classes.maxWidthLg);
    });

    it('should respect sx maxWidth', () => {
      const { container, setProps } = render(<Container {...defaultProps} />);
      expect(container.firstChild).to.have.class(classes.maxWidthLg);
      setProps({ sx: { maxWidth: 'sm' } });
      expect(container.firstChild).not.to.have.class(classes.maxWidthLg);
      expect(container.firstChild).to.have.class(classes.maxWidthSm);
    });
  });
});
