import { expect } from 'chai';
import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import Masonry, { masonryClasses as classes } from '@material-ui/lab/Masonry';
import { createTheme } from '@material-ui/core/styles';
import defaultTheme from '@material-ui/core/styles/defaultTheme';
import { style } from './Masonry';

describe('<Masonry />', () => {
  const render = createClientRender();

  describeConformance(
    <Masonry>
      <div />
    </Masonry>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'span',
      muiName: 'MuiMasonry',
      skip: ['componentsProp', 'themeVariants'],
    }),
  );

  const theme = createTheme({ spacing: 8 });

  describe('style attribute:', () => {
    it('should render with correct default styles', () => {
      expect(
        style({
          styleProps: {
            columns: 4,
            spacing: 1,
          },
          theme,
        }),
      ).to.deep.equal({
        display: 'grid',
        gridAutoRows: 0,
        padding: 0,
        overflow: 'auto',
        width: '100%',
        rowGap: 2,
        columnGap: theme.spacing(1),
        gridTemplateColumns: 'repeat(4, 1fr)',
        boxSizing: 'border-box',
      });
    });

    it('should render with column gap responsive to breakpoints', () => {
      expect(
        style({
          styleProps: {
            columns: 4,
            spacing: { xs: 1, sm: 2, md: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          columnGap: theme.spacing(1),
          gridTemplateColumns: 'repeat(4, 1fr)',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          columnGap: theme.spacing(2),
          gridTemplateColumns: 'repeat(4, 1fr)',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: {
          columnGap: theme.spacing(3),
          gridTemplateColumns: 'repeat(4, 1fr)',
        },
        display: 'grid',
        gridAutoRows: 0,
        padding: 0,
        overflow: 'auto',
        width: '100%',
        rowGap: 2,
        boxSizing: 'border-box',
      });
    });

    it('should render with grid-template-columns responsive to breakpoints', () => {
      expect(
        style({
          styleProps: {
            columns: { xs: 3, sm: 5, md: 7 },
            spacing: 1,
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          gridTemplateColumns: 'repeat(5, 1fr)',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: {
          gridTemplateColumns: 'repeat(7, 1fr)',
        },
        display: 'grid',
        gridAutoRows: 0,
        padding: 0,
        overflow: 'auto',
        width: '100%',
        columnGap: theme.spacing(1),
        rowGap: 2,
        boxSizing: 'border-box',
      });
    });
  });
});
