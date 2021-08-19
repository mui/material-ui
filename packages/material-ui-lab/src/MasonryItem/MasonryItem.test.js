import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
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
      testComponentPropWith: 'span',
      muiName: 'MuiMasonryItem',
      skip: [
        'componentsProp',
        'themeVariants',
        // reactTestRenderer fails due to this error: `TypeError: parameter 1 is not of type "Element"`
        'reactTestRenderer',
      ],
    }),
  );

  const children = <div data-testid="test-children" />;
  const theme = createTheme({
    spacing: 8,
  });

  it('should render children by default', () => {
    const { getByTestId } = render(<MasonryItem data-testid="test-root">{children}</MasonryItem>);
    expect(getByTestId('test-children')).not.to.equal(null);
  });

  describe('style attribute:', () => {
    it('should render with padding bottom and grid-row-end responsive to breakpoints', () => {
      expect(
        style({
          styleProps: {
            height: 100,
            columnSpan: 1,
            spacing: { xs: 1, sm: 2, md: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          gridRowEnd: `span ${Math.ceil((100 + Number(theme.spacing(1).replace('px', ''))) / 2)}`,
          paddingBottom: Number(theme.spacing(1).replace('px', '')) - 2,
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          gridRowEnd: `span ${Math.ceil((100 + Number(theme.spacing(2).replace('px', ''))) / 2)}`,
          paddingBottom: Number(theme.spacing(2).replace('px', '')) - 2,
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: {
          gridRowEnd: `span ${Math.ceil((100 + Number(theme.spacing(3).replace('px', ''))) / 2)}`,
          paddingBottom: Number(theme.spacing(3).replace('px', '')) - 2,
        },
        width: '100%',
        [`& > *`]: {
          width: '100%',
          boxSizing: 'inherit',
        },
        visibility: 'visible',
        gridColumnEnd: 'span 1',
        boxSizing: 'inherit',
      });
    });

    it('should render with given column span', () => {
      expect(
        style({
          styleProps: {
            height: 100,
            columnSpan: 2,
            spacing: 1,
          },
          theme,
        }),
      ).to.deep.equal({
        gridRowEnd: `span ${Math.ceil((100 + Number(theme.spacing(1).replace('px', ''))) / 2)}`,
        paddingBottom: Number(theme.spacing(1).replace('px', '')) - 2,
        width: '100%',
        [`& > *`]: {
          width: '100%',
          boxSizing: 'inherit',
        },
        visibility: 'visible',
        gridColumnEnd: 'span 2',
        boxSizing: 'inherit',
      });
    });

    it('should compute grid-row-end based on given height', () => {
      const { getByTestId } = render(
        <MasonryItem defaultHeight={150} data-testid="test-root">
          {children}
        </MasonryItem>,
      );
      const computedStyle = getComputedStyle(getByTestId('test-root'));
      expect(computedStyle['grid-row-end']).to.equal(
        `span ${Math.ceil((150 + Number(theme.spacing(1).replace('px', ''))) / 2)}`,
      );
    });
  });
});
