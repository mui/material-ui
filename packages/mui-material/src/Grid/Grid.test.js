import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen } from 'test/utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import defaultTheme from '@mui/material/styles/defaultTheme';
import Grid, { gridClasses as classes } from '@mui/material/Grid';
import { generateGrid, generateRowGap, generateColumnGap, generateDirection } from './Grid';

describe('<Grid />', () => {
  const { render } = createRenderer();

  describeConformance(<Grid />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiGrid',
    testVariantProps: { container: true, spacing: 5 },
    testStateOverrides: { prop: 'container', value: true, styleKey: 'container' },
    skip: ['componentsProp'],
  }));

  describe('prop: container', () => {
    it('should apply the container class', () => {
      const { container } = render(<Grid container />);
      expect(container.firstChild).to.have.class(classes.container);
    });

    it('should apply the correct number of columns for nested containers', () => {
      const { getByTestId } = render(
        <Grid container columns={16}>
          <Grid item xs={8}>
            <Grid container columns={8} data-testid="nested-container-in-item">
              <Grid item xs={8} />
            </Grid>
          </Grid>
        </Grid>,
      );
      const container = getByTestId('nested-container-in-item');

      // test whether the class of the child of the container is correct or not
      expect(container.firstChild).to.have.class(classes.item);

      // `columns` of nested container should have a higher priority than that of root container
      // otherwise, max-width would be 50% in this test
      expect(container.firstChild).toHaveComputedStyle({ maxWidth: '100%' });
    });
  });

  describe('prop: item', () => {
    it('should apply the item class', () => {
      const { container } = render(<Grid item />);
      expect(container.firstChild).to.have.class(classes.item);
    });
  });

  describe('prop: xs', () => {
    it('should apply the flex-grow class', () => {
      const { container } = render(<Grid item xs />);
      expect(container.firstChild).to.have.class(classes['grid-xs-true']);
    });

    it('should apply the flex size class', () => {
      const { container } = render(<Grid item xs={3} />);
      expect(container.firstChild).to.have.class(classes['grid-xs-3']);
    });

    it('should apply the flex auto class', () => {
      const { container } = render(<Grid item xs="auto" />);
      expect(container.firstChild).to.have.class(classes['grid-xs-auto']);
    });

    it('should apply the styles necessary for variable width nested item when set to auto', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // Need full CSS resolution
        this.skip();
      }

      render(
        <Grid container>
          <Grid container item xs="auto" data-testid="auto">
            <div style={{ width: '300px' }} />
          </Grid>
          <Grid item xs={11} />
        </Grid>,
      );
      expect(screen.getByTestId('auto')).toHaveComputedStyle({
        flexBasis: 'auto',
        flexGrow: '0',
        flexShrink: '0',
        maxWidth: 'none',
        width: '300px',
      });
    });
  });

  describe('prop: direction', () => {
    it('should have a direction', () => {
      const { container } = render(<Grid container direction="column" />);
      expect(container.firstChild).toHaveComputedStyle({ flexDirection: 'column' });
    });

    it('should support responsive values', () => {
      const theme = createTheme();
      expect(
        generateDirection({
          ownerState: {
            container: true,
            direction: { xs: 'row', sm: 'column' },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          flexDirection: 'row',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          flexDirection: 'column',
          '& > .MuiGrid-item': {
            maxWidth: 'none',
          },
        },
      });
    });

    it('should generate correct responsive styles regardless of breakpoints order', () => {
      const theme = createTheme();
      expect(
        generateDirection({
          ownerState: {
            container: true,
            direction: { sm: 'column', xs: 'row' },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          flexDirection: 'row',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          flexDirection: 'column',
          '& > .MuiGrid-item': {
            maxWidth: 'none',
          },
        },
      });
    });
  });

  describe('prop: spacing', () => {
    it('should have a spacing', () => {
      const { container } = render(<Grid container spacing={1} />);
      expect(container.firstChild).to.have.class(classes['spacing-xs-1']);
    });

    it('should support decimal values', () => {
      const { container } = render(
        <Grid container spacing={1.5}>
          <Grid item data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).to.have.class('MuiGrid-spacing-xs-1.5');
      expect(screen.getByTestId('child')).toHaveComputedStyle({
        paddingTop: '12px',
        paddingLeft: '12px',
      });
    });

    it('should not support undefined values', () => {
      const { container } = render(
        <Grid container>
          <Grid item data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).not.to.have.class('MuiGrid-spacing-xs-undefined');
    });

    it('should not support zero values', () => {
      const { container } = render(
        <Grid container spacing={0}>
          <Grid item data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).not.to.have.class('MuiGrid-spacing-xs-0');
    });

    it('should support object values', () => {
      const { container } = render(
        <Grid container spacing={{ sm: 1.5, md: 2 }}>
          <Grid item data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).to.have.class('MuiGrid-spacing-sm-1.5');
      expect(container.firstChild).to.have.class('MuiGrid-spacing-md-2');
    });

    it('should ignore object values of zero', () => {
      const { container } = render(
        <Grid container spacing={{ sm: 0, md: 2 }}>
          <Grid item data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).not.to.have.class('MuiGrid-spacing-sm-0');
      expect(container.firstChild).to.have.class('MuiGrid-spacing-md-2');
    });

    it('should generate correct responsive styles', () => {
      const theme = createTheme();
      expect(
        generateRowGap({
          ownerState: {
            container: true,
            rowSpacing: { xs: 1, sm: 2 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGrid-item': {
            paddingTop: '8px',
          },
          marginTop: '-8px',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          '& > .MuiGrid-item': {
            paddingTop: '16px',
          },
          marginTop: '-16px',
        },
      });

      expect(
        generateColumnGap({
          ownerState: {
            container: true,
            columnSpacing: { xs: 1, sm: 2 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGrid-item': {
            paddingLeft: '8px',
          },
          marginLeft: '-8px',
          width: 'calc(100% + 8px)',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          '& > .MuiGrid-item': {
            paddingLeft: '16px',
          },
          marginLeft: '-16px',
          width: 'calc(100% + 16px)',
        },
      });
    });

    it('should generate correct responsive styles regardless of breakpoints order ', () => {
      const theme = createTheme();
      expect(
        generateRowGap({
          ownerState: {
            container: true,
            rowSpacing: { sm: 2, xs: 1 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGrid-item': {
            paddingTop: '8px',
          },
          marginTop: '-8px',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          '& > .MuiGrid-item': {
            paddingTop: '16px',
          },
          marginTop: '-16px',
        },
      });

      expect(
        generateColumnGap({
          ownerState: {
            container: true,
            columnSpacing: { sm: 2, xs: 1 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGrid-item': {
            paddingLeft: '8px',
          },
          marginLeft: '-8px',
          width: 'calc(100% + 8px)',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          '& > .MuiGrid-item': {
            paddingLeft: '16px',
          },
          marginLeft: '-16px',
          width: 'calc(100% + 16px)',
        },
      });
    });
  });

  describe('prop: columns', () => {
    it('should generate responsive grid when grid item misses breakpoints of its container', () => {
      const theme = createTheme();
      expect(
        generateGrid({
          ownerState: {
            columns: { xs: 4, sm: 8, md: 12 },
            xs: 2,
            item: true,
          },
          theme,
        }),
      ).to.deep.equal({
        flexBasis: '50%',
        flexGrow: 0,
        maxWidth: '50%',
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          flexBasis: '25%',
          flexGrow: 0,
          maxWidth: '25%',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: {
          flexBasis: '16.666667%',
          flexGrow: 0,
          maxWidth: '16.666667%',
        },
      });
    });

    it('should generate responsive grid when grid item misses breakpoints of its container and breakpoint starts from the middle', () => {
      const theme = createTheme();
      expect(
        generateGrid({
          ownerState: {
            columns: { sm: 8, md: 12 },
            sm: 4,
            item: true,
          },
          theme,
        }),
      ).to.deep.equal({
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          flexBasis: '50%',
          flexGrow: 0,
          maxWidth: '50%',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: {
          flexBasis: '33.333333%',
          flexGrow: 0,
          maxWidth: '33.333333%',
        },
      });
    });
  });

  describe('spacing', () => {
    it('should generate the right values', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const parentWidth = 500;
      const remValue = 16;
      const remTheme = createTheme({
        spacing: (factor) => `${0.25 * factor}rem`,
      });

      const { rerender } = render(
        <div style={{ width: parentWidth }}>
          <ThemeProvider theme={remTheme}>
            <Grid data-testid="grid" container spacing={2}>
              <Grid item data-testid="first-custom-theme" />
              <Grid item />
            </Grid>
          </ThemeProvider>
        </div>,
      );

      expect(screen.getByTestId('grid')).toHaveComputedStyle({
        marginTop: `${-1 * remValue * 0.5}px`, // '-0.5rem'
        marginLeft: `${-1 * remValue * 0.5}px`, // '-0.5rem'
        width: `${parentWidth + remValue * 0.5}px`, // 'calc(100% + 0.5rem)'
      });

      expect(screen.getByTestId('first-custom-theme')).toHaveComputedStyle({
        paddingTop: `${0.5 * remValue}px`, // 0.5rem
        paddingLeft: `${0.5 * remValue}px`, // 0.5rem
      });

      rerender(
        <div style={{ width: parentWidth }}>
          <Grid data-testid="grid" container spacing={2}>
            <Grid item data-testid="first-default-theme" />
            <Grid item />
          </Grid>
        </div>,
      );

      expect(screen.getByTestId('grid')).toHaveComputedStyle({
        marginTop: '-16px',
        marginLeft: '-16px',
        width: `${parentWidth + 16}px`, // 'calc(100% + 16px)'
      });

      expect(screen.getByTestId('first-default-theme')).toHaveComputedStyle({
        paddingTop: '16px',
        paddingLeft: '16px',
      });
    });
  });

  it('combines system properties with the sx prop', () => {
    const { container } = render(<Grid mt={2} mr={1} sx={{ marginRight: 5, mb: 2 }} />);

    expect(container.firstChild).toHaveComputedStyle({
      marginTop: '16px',
      marginRight: '40px',
      marginBottom: '16px',
    });
  });

  describe('prop: wrap', () => {
    it('should wrap by default', () => {
      render(<Grid container data-testid="wrap" />);
      expect(screen.getByTestId('wrap')).toHaveComputedStyle({
        flexWrap: 'wrap',
      });
    });

    it('should apply nowrap class and style', () => {
      const { container } = render(<Grid container wrap="nowrap" data-testid="wrap" />);
      expect(container.firstChild).to.have.class('MuiGrid-wrap-xs-nowrap');
      expect(screen.getByTestId('wrap')).toHaveComputedStyle({
        flexWrap: 'nowrap',
      });
    });

    it('should apply wrap-reverse class and style', () => {
      const { container } = render(<Grid container wrap="wrap-reverse" data-testid="wrap" />);
      expect(container.firstChild).to.have.class('MuiGrid-wrap-xs-wrap-reverse');
      expect(screen.getByTestId('wrap')).toHaveComputedStyle({
        flexWrap: 'wrap-reverse',
      });
    });
  });
});
