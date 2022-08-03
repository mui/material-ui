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
      const { container: firstContainer } = render(<Container {...defaultProps} />);
      expect(firstContainer.firstChild).to.have.class(classes.maxWidthLg);
      const { container: secondContainer } = render(
        <Container {...defaultProps} maxWidth={false} />,
      );
      expect(secondContainer.firstChild).not.to.have.class(classes.maxWidthLg);
    });
    it('should respect sx maxWidth', () => {
      const { container: firstContainer } = render(<Container {...defaultProps} />);
      expect(firstContainer.firstChild).to.have.class(classes.maxWidthLg);
      const { container: secondContainer } = render(
        <Container {...defaultProps} sx={{ maxWidth: 'sm' }} />,
      );
      expect(secondContainer.firstChild).not.to.have.class(classes.maxWidthLg);
      expect(secondContainer.firstChild).to.have.class(classes.maxWidthSm);
    });
  });
});
