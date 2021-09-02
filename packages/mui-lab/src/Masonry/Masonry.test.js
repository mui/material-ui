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
  const maxNumOfRows = 5;
  const parseToNumber = (val) => {
    return Number(val.replace('px', ''));
  };
  describe('style attribute:', () => {
    it('should render with correct default styles', () => {
      expect(
        style({
          ownerState: {
            columns: 4,
            spacing: 1,
            maxColumnHeight,
            maxNumOfRows,
          },
          theme,
        }),
      ).to.deep.equal({
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'space-between',
        boxSizing: 'border-box',
        '& *': {
          boxSizing: 'border-box',
          margin: parseToNumber(theme.spacing(1)) / 2,
          width: `${(100 / 4).toFixed(2)}%`,
        },
        margin: -(parseToNumber(theme.spacing(1)) / 2),
        height: maxColumnHeight + parseToNumber(theme.spacing(1)) * maxNumOfRows,
      });
    });

    it('should render with margin responsive to breakpoints', () => {
      expect(
        style({
          ownerState: {
            columns: 4,
            spacing: { xs: 1, sm: 2, md: 3 },
            maxColumnHeight,
            maxNumOfRows,
          },
          theme,
        }),
      ).to.deep.equal({
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'space-between',
        boxSizing: 'border-box',
        '& *': {
          boxSizing: 'border-box',
          width: `${(100 / 4).toFixed(2)}%`,
        },
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& *': {
            margin: parseToNumber(theme.spacing(1)) / 2,
          },
          margin: -(parseToNumber(theme.spacing(1)) / 2),
          height: maxColumnHeight + parseToNumber(theme.spacing(1)) * maxNumOfRows,
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& *': {
            margin: parseToNumber(theme.spacing(2)) / 2,
          },
          margin: -(parseToNumber(theme.spacing(2)) / 2),
          height: maxColumnHeight + parseToNumber(theme.spacing(2)) * maxNumOfRows,
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& *': {
            margin: parseToNumber(theme.spacing(3)) / 2,
          },
          margin: -(parseToNumber(theme.spacing(3)) / 2),
          height: maxColumnHeight + parseToNumber(theme.spacing(3)) * maxNumOfRows,
        },
      });
    });

    it('should render with columns responsive to breakpoints', () => {
      expect(
        style({
          ownerState: {
            columns: { xs: 3, sm: 5, md: 7 },
            spacing: 1,
            maxColumnHeight,
            maxNumOfRows,
          },
          theme,
        }),
      ).to.deep.equal({
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'space-between',
        boxSizing: 'border-box',
        '& *': {
          boxSizing: 'border-box',
          margin: parseToNumber(theme.spacing(1)) / 2,
        },
        margin: -(parseToNumber(theme.spacing(1)) / 2),
        height: maxColumnHeight + parseToNumber(theme.spacing(1)) * maxNumOfRows,
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& *': {
            width: `${(100 / 3).toFixed(2)}%`,
          },
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& *': {
            width: `${(100 / 5).toFixed(2)}%`,
          },
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& *': {
            width: `${(100 / 7).toFixed(2)}%`,
          },
        },
      });
    });
  });
});
