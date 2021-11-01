import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import Masonry, { masonryClasses as classes } from '@mui/lab/Masonry';
import { expect } from 'chai';
import { createTheme } from '@mui/material/styles';
import { getStyle, parseToNumber } from './Masonry';

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
  const maxColumnHeight = 100;

  describe('render', () => {
    it('should render with correct default styles', function test() {
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const columns = 4;
      const spacing = 1;
      const { getByTestId } = render(
        <Masonry data-testid="container">
          <div data-testid="child" />
        </Masonry>,
      );
      expect(getByTestId('container')).toHaveComputedStyle({
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'space-between',
        boxSizing: 'border-box',
        margin: `${-(parseToNumber(theme.spacing(spacing)) / 2)}px`,
      });
      expect(getByTestId('child')).toHaveComputedStyle({
        boxSizing: 'border-box',
        margin: `${parseToNumber(theme.spacing(spacing)) / 2}px`,
        width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing)})`,
      });
    });
  });

  describe('style attribute:', () => {
    it('should apply correct default styles', () => {
      const columns = 4;
      const spacing = 1;
      expect(
        getStyle({
          ownerState: {
            columns,
            spacing,
            maxColumnHeight,
          },
          theme,
        }),
      ).to.deep.equal({
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'space-between',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          margin: parseToNumber(theme.spacing(spacing)) / 2,
          width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing)})`,
        },
        margin: -(parseToNumber(theme.spacing(spacing)) / 2),
        height: maxColumnHeight + parseToNumber(theme.spacing(spacing)),
      });
    });

    it('should apply responsive margin', () => {
      const columns = 4;
      const spacing = { xs: 1, sm: 2, md: 3 };
      expect(
        getStyle({
          ownerState: {
            columns,
            spacing,
            maxColumnHeight,
          },
          theme,
        }),
      ).to.deep.equal({
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'space-between',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          width: `calc(${(100 / columns).toFixed(2)}% - 0px)`,
        },
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& > *': {
            margin: parseToNumber(theme.spacing(spacing.xs)) / 2,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.xs)})`,
          },
          margin: -(parseToNumber(theme.spacing(spacing.xs)) / 2),
          height: maxColumnHeight + parseToNumber(theme.spacing(spacing.xs)),
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > *': {
            margin: parseToNumber(theme.spacing(spacing.sm)) / 2,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.sm)})`,
          },
          margin: -(parseToNumber(theme.spacing(spacing.sm)) / 2),
          height: maxColumnHeight + parseToNumber(theme.spacing(spacing.sm)),
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > *': {
            margin: parseToNumber(theme.spacing(spacing.md)) / 2,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.md)})`,
          },
          margin: -(parseToNumber(theme.spacing(spacing.md)) / 2),
          height: maxColumnHeight + parseToNumber(theme.spacing(spacing.md)),
        },
      });
    });

    it('should apply responsive columns', () => {
      const columns = { xs: 3, sm: 5, md: 7 };
      const spacing = 1;
      expect(
        getStyle({
          ownerState: {
            columns,
            spacing,
            maxColumnHeight,
          },
          theme,
        }),
      ).to.deep.equal({
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'space-between',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          margin: parseToNumber(theme.spacing(spacing)) / 2,
        },
        margin: -(parseToNumber(theme.spacing(spacing)) / 2),
        height: maxColumnHeight + parseToNumber(theme.spacing(spacing)),
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& > *': {
            width: `calc(${(100 / columns.xs).toFixed(2)}% - ${theme.spacing(spacing)})`,
          },
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > *': {
            width: `calc(${(100 / columns.sm).toFixed(2)}% - ${theme.spacing(spacing)})`,
          },
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > *': {
            width: `calc(${(100 / columns.md).toFixed(2)}% - ${theme.spacing(spacing)})`,
          },
        },
      });
    });
  });

  describe('server-side rendering', () => {
    it('should support server-side rendering', () => {
      const defaultHeight = 700;
      const defaultColumns = 4;
      const defaultSpacing = 1;
      expect(
        getStyle({
          ownerState: {
            defaultColumns,
            defaultSpacing,
            defaultHeight,
            isSSR: true,
          },
          theme,
        }),
      ).to.deep.equal({
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'space-between',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          margin: parseToNumber(theme.spacing(defaultSpacing)) / 2,
          width: `calc(${(100 / defaultColumns).toFixed(2)}% - ${theme.spacing(defaultSpacing)})`,
          '&:nth-of-type(4n+1)': { order: 1 },
          '&:nth-of-type(4n+2)': { order: 2 },
          '&:nth-of-type(4n+3)': { order: 3 },
          '&:nth-of-type(4n+0)': { order: 4 },
        },
        margin: -(parseToNumber(theme.spacing(defaultSpacing)) / 2),
        height: defaultHeight,
      });
    });
  });

  describe('prop: columns', () => {
    it('should generate correct responsive styles regardless of breakpoints order', () => {
      const columns = { sm: 5, md: 7, xs: 3 };
      const spacing = 1;
      expect(
        getStyle({
          ownerState: {
            columns,
            spacing,
            maxColumnHeight,
          },
          theme,
        }),
      ).to.deep.equal({
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'space-between',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          margin: parseToNumber(theme.spacing(spacing)) / 2,
        },
        margin: -(parseToNumber(theme.spacing(spacing)) / 2),
        height: maxColumnHeight + parseToNumber(theme.spacing(spacing)),
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& > *': {
            width: `calc(${(100 / columns.xs).toFixed(2)}% - ${theme.spacing(spacing)})`,
          },
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > *': {
            width: `calc(${(100 / columns.sm).toFixed(2)}% - ${theme.spacing(spacing)})`,
          },
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > *': {
            width: `calc(${(100 / columns.md).toFixed(2)}% - ${theme.spacing(spacing)})`,
          },
        },
      });
    });
  });

  describe('prop: spacing', () => {
    it('should generate correct responsive styles regardless of breakpoints order', () => {
      const columns = 4;
      const spacing = { sm: 2, md: 3, xs: 1 };
      expect(
        getStyle({
          ownerState: {
            columns,
            spacing,
            maxColumnHeight,
          },
          theme,
        }),
      ).to.deep.equal({
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'space-between',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          width: `calc(${(100 / columns).toFixed(2)}% - 0px)`,
        },
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& > *': {
            margin: parseToNumber(theme.spacing(spacing.xs)) / 2,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.xs)})`,
          },
          margin: -(parseToNumber(theme.spacing(spacing.xs)) / 2),
          height: maxColumnHeight + parseToNumber(theme.spacing(spacing.xs)),
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > *': {
            margin: parseToNumber(theme.spacing(spacing.sm)) / 2,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.sm)})`,
          },
          margin: -(parseToNumber(theme.spacing(spacing.sm)) / 2),
          height: maxColumnHeight + parseToNumber(theme.spacing(spacing.sm)),
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > *': {
            margin: parseToNumber(theme.spacing(spacing.md)) / 2,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.md)})`,
          },
          margin: -(parseToNumber(theme.spacing(spacing.md)) / 2),
          height: maxColumnHeight + parseToNumber(theme.spacing(spacing.md)),
        },
      });
    });
  });
});
