import * as React from 'react';
import { createClientRender, describeConformanceV5, act } from 'test/utils';
import MasonryItem, { masonryItemClasses as classes } from '@material-ui/lab/MasonryItem';
import { expect } from 'chai';
import { createTheme } from '@material-ui/core/styles';
import defaultTheme from '@material-ui/core/styles/defaultTheme';
import { style } from './MasonryItem';

describe('<MasonryItem />', () => {
  const render = createClientRender();

  describeConformanceV5(
    <MasonryItem>
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
  const theme = createTheme({
    spacing: 8,
  });

  it('should render children by default', () => {
    let item = null;
    act(() => {
      const { getByTestId } = render(<MasonryItem data-testid="test-root">{children}</MasonryItem>);
      item = getByTestId('test-children');
    });
    expect(item).not.to.equal(null);
  });

  describe('style attribute:', () => {
    it('should render with padding bottom and grid-row-end responsive to breakpoints', () => {
      expect(
        style({
          styleProps: {
            contentHeight: 100,
            columnSpan: 1,
            spacing: { xs: 1, sm: 2, md: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          gridRowEnd: `span ${Math.ceil(100 + Number(theme.spacing(1).replace('px', '')))}`,
          paddingBottom: Number(theme.spacing(1).replace('px', '')) - 1,
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          gridRowEnd: `span ${Math.ceil(100 + Number(theme.spacing(2).replace('px', '')))}`,
          paddingBottom: Number(theme.spacing(2).replace('px', '')) - 1,
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: {
          gridRowEnd: `span ${Math.ceil(100 + Number(theme.spacing(3).replace('px', '')))}`,
          paddingBottom: Number(theme.spacing(3).replace('px', '')) - 1,
        },
        width: '100%',
        [`& > *`]: {
          width: '100%',
        },
        visibility: 'visible',
        gridColumnEnd: 'span 1',
      });
    });

    it('should render with given column span', () => {
      expect(
        style({
          styleProps: {
            contentHeight: 100,
            columnSpan: 2,
            spacing: 1,
          },
          theme,
        }),
      ).to.deep.equal({
        gridRowEnd: `span ${Math.ceil(100 + Number(theme.spacing(1).replace('px', '')))}`,
        paddingBottom: Number(theme.spacing(1).replace('px', '')) - 1,
        width: '100%',
        [`& > *`]: {
          width: '100%',
        },
        visibility: 'visible',
        gridColumnEnd: 'span 2',
      });
    });
  });

  describe('props:', () => {
    describe('prop: component', () => {
      it('should render a div by default', () => {
        let item = null;
        act(() => {
          const { container } = render(<MasonryItem>{children}</MasonryItem>);
          item = container;
        });
        expect(item.firstChild).to.have.property('nodeName', 'DIV');
      });

      it('should render a different component', () => {
        let item = null;
        act(() => {
          const { container } = render(<MasonryItem component="span">{children}</MasonryItem>);
          item = container;
        });
        expect(item.firstChild).to.have.property('nodeName', 'SPAN');
      });
    });

    describe('prop: className', () => {
      it('should append the className to the root element', () => {
        let item = null;
        act(() => {
          const { container } = render(<MasonryItem className="foo">{children}</MasonryItem>);
          item = container;
        });
        expect(item.firstChild).to.have.class(classes.root);
        expect(item.firstChild).to.have.class('foo');
      });
    });
  });
});
