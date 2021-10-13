import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import Masonry, { masonryClasses as classes } from '@mui/lab/Masonry';
import { expect } from 'chai';
import { createTheme } from '@mui/material/styles';
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
  const maxColumnHeight = 100;
  const maxNumberOfRows = 5;
  const parseToNumber = (val) => {
    return Number(val.replace('px', ''));
  };
  describe('style attribute:', () => {
    it('should render with correct default styles', () => {
      const columns = 4;
      const spacing = 1;
      expect(
        style({
          ownerState: {
            columns,
            spacing,
            maxColumnHeight,
            maxNumberOfRows,
          },
          theme,
        }),
      ).to.deep.equal({
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
        height: maxColumnHeight + parseToNumber(theme.spacing(spacing)) * maxNumberOfRows,
      });
    });

    it('should render with margin responsive to breakpoints', () => {
      const columns = 4;
      const spacing = { xs: 1, sm: 2, md: 3 };
      expect(
        style({
          ownerState: {
            columns,
            spacing,
            maxColumnHeight,
            maxNumberOfRows,
          },
          theme,
        }),
      ).to.deep.equal({
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
          height: maxColumnHeight + parseToNumber(theme.spacing(spacing.xs)) * maxNumberOfRows,
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > *': {
            margin: parseToNumber(theme.spacing(spacing.sm)) / 2,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.sm)})`,
          },
          margin: -(parseToNumber(theme.spacing(spacing.sm)) / 2),
          height: maxColumnHeight + parseToNumber(theme.spacing(spacing.sm)) * maxNumberOfRows,
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > *': {
            margin: parseToNumber(theme.spacing(spacing.md)) / 2,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.md)})`,
          },
          margin: -(parseToNumber(theme.spacing(spacing.md)) / 2),
          height: maxColumnHeight + parseToNumber(theme.spacing(spacing.md)) * maxNumberOfRows,
        },
      });
    });

    it('should render with columns responsive to breakpoints', () => {
      const columns = { xs: 3, sm: 5, md: 7 };
      const spacing = 1;
      expect(
        style({
          ownerState: {
            columns,
            spacing,
            maxColumnHeight,
            maxNumberOfRows,
          },
          theme,
        }),
      ).to.deep.equal({
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'space-between',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          margin: parseToNumber(theme.spacing(spacing)) / 2,
        },
        margin: -(parseToNumber(theme.spacing(spacing)) / 2),
        height: maxColumnHeight + parseToNumber(theme.spacing(spacing)) * maxNumberOfRows,
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
});
