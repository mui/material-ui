import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import MasonryItem, { masonryItemClasses as classes } from '@material-ui/lab/MasonryItem';
import { expect } from 'chai';
import { createTheme } from '@material-ui/core/styles';
import defaultTheme from '@material-ui/core/styles/defaultTheme';
import { style } from './MasonryItem';

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
  const theme = createTheme({
    spacing: 8,
  });

  it('should render children by default', () => {
    const { getByTestId } = render(<MasonryItem height={testHeight}>{children}</MasonryItem>);
    expect(getByTestId('test-children')).not.to.equal(null);
  });

  describe('style attribute:', () => {
    it('should render with padding bottom and grid-row-end responsive to breakpoints', () => {
      expect(
        style({
          styleProps: {
            height: testHeight,
            spacing: { xs: 1, sm: 2, md: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          gridRowEnd: `span ${Math.ceil(testHeight + Number(theme.spacing(1).replace('px', '')))}`,
          paddingBottom: Number(theme.spacing(1).replace('px', '')) - 1,
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          gridRowEnd: `span ${Math.ceil(testHeight + Number(theme.spacing(2).replace('px', '')))}`,
          paddingBottom: Number(theme.spacing(2).replace('px', '')) - 1,
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: {
          gridRowEnd: `span ${Math.ceil(testHeight + Number(theme.spacing(3).replace('px', '')))}`,
          paddingBottom: Number(theme.spacing(3).replace('px', '')) - 1,
        },
        width: '100%',
        [`& > *`]: {
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        },
      });
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
