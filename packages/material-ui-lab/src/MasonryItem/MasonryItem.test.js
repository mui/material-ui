import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import MasonryItem, { masonryItemClasses as classes } from '@material-ui/lab/MasonryItem';
import { expect } from 'chai';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Masonry from '../Masonry/Masonry';

describe('<MasonryItem />', () => {
  const render = createClientRender();

  describeConformanceV5(
    <MasonryItem height={100}>
      <div />
    </MasonryItem>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'div',
      testVariantProps: { variant: 'foo' },
      muiName: 'MuiMasonryItem',
      skip: ['componentsProp'],
    }),
  );

  const children = <div data-testid="test-children" />;
  const testHeight = 100;
  const testSpacing = 1;
  const theme = createTheme({
    spacing: 8,
  });

  it('should render children by default', () => {
    const { getByTestId } = render(<MasonryItem height={testHeight}>{children}</MasonryItem>);
    expect(getByTestId('test-children')).not.to.equal(null);
  });

  describe('style attribute:', () => {
    it('should render with a padding bottom of passed gap - 1px', () => {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <Masonry spacing={testSpacing} data-testid="test-root">
            <MasonryItem height={testHeight} data-testid="test-child">
              {children}
            </MasonryItem>
          </Masonry>
        </ThemeProvider>,
      );
      const childStyle = getComputedStyle(getByTestId('test-child'));
      const gap = Number(theme.spacing(testSpacing).replace('px', '')) - 1;
      expect(childStyle['padding-bottom']).to.equal(`${gap}px`);
    });

    it('should render with a correct value of grid-row-end', () => {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <Masonry spacing={testSpacing} data-testid="test-root">
            <MasonryItem height={testHeight} data-testid="test-child">
              {children}
            </MasonryItem>
          </Masonry>
        </ThemeProvider>,
      );
      const childStyle = getComputedStyle(getByTestId('test-child'));
      const rowSpan = testHeight + Number(theme.spacing(testSpacing).replace('px', ''));
      expect(childStyle['grid-row-end']).to.equal(`span ${rowSpan}`);
    });
  });

  describe('props:', () => {
    describe('prop: component', () => {
      it('should render a div by default', () => {
        const { container } = render(<MasonryItem height={testHeight}>{children}</MasonryItem>);
        expect(container.firstChild).to.have.property('nodeName', 'DIV');
      });

      it('should render a different component', () => {
        const { container } = render(
          <MasonryItem height={testHeight} component="span">
            {children}
          </MasonryItem>,
        );
        expect(container.firstChild).to.have.property('nodeName', 'SPAN');
      });
    });

    describe('prop: className', () => {
      it('should append the className to the root element', () => {
        const { container } = render(
          <MasonryItem height={testHeight} className="foo">
            {children}
          </MasonryItem>,
        );
        expect(container.firstChild).to.have.class(classes.root);
        expect(container.firstChild).to.have.class('foo');
      });
    });
  });
});
