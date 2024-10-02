import * as React from 'react';
import { createRenderer, reactMajor } from '@mui/internal-test-utils';
import { expect } from 'chai';
import { createTheme } from '@mui/material/styles';
import defaultTheme from '@mui/material/styles/defaultTheme';
import Masonry, { masonryClasses as classes } from '@mui/lab/Masonry';
import { getStyle, parseToNumber } from './Masonry';
import describeConformance from '../../test/describeConformance';

describe('<Masonry />', () => {
  const { render } = createRenderer();

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
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const width = 400;
      const columns = 4;
      const spacing = 1;
      const { getByTestId } = render(
        <div style={{ width: `${width}px` }}>
          <Masonry data-testid="container">
            <div data-testid="child" />
          </Masonry>
        </div>,
      );
      const containerMargin = `-${parseToNumber(theme.spacing(spacing)) / 2}px`;
      const childMargin = `${parseToNumber(theme.spacing(spacing)) / 2}px`;
      expect(getByTestId('container')).toHaveComputedStyle({
        width: `${width}px`,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        marginTop: containerMargin,
        marginRight: containerMargin,
        marginBottom: containerMargin,
        marginLeft: containerMargin,
      });
      expect(getByTestId('child')).toHaveComputedStyle({
        boxSizing: 'border-box',
        marginTop: childMargin,
        marginRight: childMargin,
        marginBottom: childMargin,
        marginLeft: childMargin,
        width: `${width / columns - parseToNumber(theme.spacing(spacing))}px`,
      });
    });

    it('should re-compute the height of masonry when dimensions of any child change', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // only run on browser
        this.skip();
      }
      const spacingProp = 1;
      const firstChildHeight = 10;
      const secondChildInitialHeight = 20;
      const secondChildNewHeight = 10;

      const { getByTestId } = render(
        <Masonry columns={2} spacing={spacingProp} data-testid="container">
          <div style={{ height: `${firstChildHeight}px` }} />
        </Masonry>,
      );
      const masonry = getByTestId('container');
      const secondItem = document.createElement('div');
      secondItem.style.height = `${secondChildInitialHeight}px`;
      masonry.appendChild(secondItem);

      const topAndBottomMargin = parseToNumber(defaultTheme.spacing(spacingProp)) * 2;
      expect(window.getComputedStyle(masonry).height).to.equal(
        `${firstChildHeight + secondChildInitialHeight + topAndBottomMargin}px`,
      );

      secondItem.style.height = `${secondChildNewHeight}px`;

      expect(window.getComputedStyle(masonry).height).to.equal(
        `${firstChildHeight + secondChildNewHeight + topAndBottomMargin}px`,
      );
    });

    it('should throw console error when children are empty', function test() {
      // React 19 removed prop types support
      if (!/jsdom/.test(window.navigator.userAgent) || reactMajor >= 19) {
        this.skip();
      }
      expect(() => render(<Masonry columns={3} spacing={1} />)).toErrorDev(
        'Warning: Failed prop type: The prop `children` is marked as required in `ForwardRef(Masonry)`, but its value is `undefined`.',
      );
    });

    it('should not throw type error when children are empty', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      // React 19 removed prop types support
      if (reactMajor < 19) {
        expect(() => render(<Masonry columns={3} spacing={1} />)).toErrorDev(
          'Warning: Failed prop type: The prop `children` is marked as required in `ForwardRef(Masonry)`, but its value is `undefined`.',
        );
      }

      expect(() => render(<Masonry columns={3} spacing={1} />)).not.to.throw(new TypeError());
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
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          margin: `calc(${theme.spacing(spacing)} / 2)`,
          width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing)})`,
        },
        margin: `calc(0px - (${theme.spacing(spacing)} / 2))`,
        height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing)})`,
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
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          width: `calc(${(100 / columns).toFixed(2)}% - 0px)`,
        },
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& > *': {
            margin: `calc(${theme.spacing(spacing.xs)} / 2)`,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.xs)})`,
          },
          margin: `calc(0px - (${theme.spacing(spacing.xs)} / 2))`,
          height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing.xs)})`,
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > *': {
            margin: `calc(${theme.spacing(spacing.sm)} / 2)`,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.sm)})`,
          },
          margin: `calc(0px - (${theme.spacing(spacing.sm)} / 2))`,
          height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing.sm)})`,
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > *': {
            margin: `calc(${theme.spacing(spacing.md)} / 2)`,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.md)})`,
          },
          margin: `calc(0px - (${theme.spacing(spacing.md)} / 2))`,
          height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing.md)})`,
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
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          margin: `calc(${theme.spacing(spacing)} / 2)`,
        },
        margin: `calc(0px - (${theme.spacing(spacing)} / 2))`,
        height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing)})`,
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
        alignContent: 'flex-start',
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
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          margin: `calc(${theme.spacing(spacing)} / 2)`,
        },
        margin: `calc(0px - (${theme.spacing(spacing)} / 2))`,
        height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing)})`,
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
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box',
          width: `calc(${(100 / columns).toFixed(2)}% - 0px)`,
        },
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& > *': {
            margin: `calc(${theme.spacing(spacing.xs)} / 2)`,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.xs)})`,
          },
          margin: `calc(0px - (${theme.spacing(spacing.xs)} / 2))`,
          height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing.xs)})`,
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > *': {
            margin: `calc(${theme.spacing(spacing.sm)} / 2)`,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.sm)})`,
          },
          margin: `calc(0px - (${theme.spacing(spacing.sm)} / 2))`,
          height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing.sm)})`,
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > *': {
            margin: `calc(${theme.spacing(spacing.md)} / 2)`,
            width: `calc(${(100 / columns).toFixed(2)}% - ${theme.spacing(spacing.md)})`,
          },
          margin: `calc(0px - (${theme.spacing(spacing.md)} / 2))`,
          height: `calc(${maxColumnHeight}px + ${theme.spacing(spacing.md)})`,
        },
      });
    });
  });

  describe('prop: sequential', () => {
    const pause = (timeout) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, timeout);
      });

    it('should place children in sequential order', async function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // only run on browser
        this.skip();
      }

      const { getByTestId } = render(
        <Masonry columns={2} spacing={1} sequential>
          <div style={{ height: `20px` }} data-testid="child1" />
          <div style={{ height: `10px` }} data-testid="child2" />
          <div style={{ height: `10px` }} data-testid="child3" />
        </Masonry>,
      );
      await pause(400); // Masonry elements aren't ordered immediately, and so we need the pause to wait for them to be ordered
      const child1 = getByTestId('child1');
      const child2 = getByTestId('child2');
      const child3 = getByTestId('child3');
      expect(window.getComputedStyle(child1).order).to.equal(`1`);
      expect(window.getComputedStyle(child2).order).to.equal(`2`);
      expect(window.getComputedStyle(child3).order).to.equal(`1`);
    });
  });
});
