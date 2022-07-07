import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen } from 'test/utils';
import { ThemeProvider, createTheme } from '@mui/system';
import Grid, { gridClasses as classes } from '@mui/system/Grid';

describe('System <Grid />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    children: <div />,
  };

  describeConformance(<Grid {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    refInstanceof: window.HTMLElement,
    muiName: 'MuiGrid',
    testVariantProps: { container: true, spacing: 5 },
    skip: ['componentsProp', 'classesRoot'],
  }));

  describe('prop: container', () => {
    it('should apply the container class', () => {
      const { container } = render(<Grid container />);
      expect(container.firstChild).to.have.class(classes.container);
    });
  });

  describe('prop: xs', () => {
    it('should apply the flex-grow class', () => {
      const { container } = render(<Grid xs />);
      expect(container.firstChild).to.have.class(classes['grid-xs-true']);
    });

    it('should apply the flex size class', () => {
      const { container } = render(<Grid xs={3} />);
      expect(container.firstChild).to.have.class(classes['grid-xs-3']);
    });

    it('should apply the flex auto class', () => {
      const { container } = render(<Grid xs="auto" />);
      expect(container.firstChild).to.have.class(classes['grid-xs-auto']);
    });

    it('should apply the styles necessary for variable width nested item when set to auto', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // Need full CSS resolution
        this.skip();
      }

      render(
        <Grid container>
          <Grid container xs="auto" data-testid="auto">
            <div style={{ width: '300px' }} />
          </Grid>
          <Grid xs={11} />
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

  describe('prop: spacing', () => {
    it('should have a spacing', () => {
      const { container } = render(<Grid container spacing={1} />);
      expect(container.firstChild).to.have.class(classes['spacing-xs-1']);
    });

    it('should not support undefined values', () => {
      const { container } = render(
        <Grid container>
          <Grid data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).not.to.have.class('MuiGrid-spacing-xs-undefined');
    });

    it('should not support zero values', () => {
      const { container } = render(
        <Grid container spacing={0}>
          <Grid data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).not.to.have.class('MuiGrid-spacing-xs-0');
    });

    it('should support object values', () => {
      const { container } = render(
        <Grid container spacing={{ sm: 1.5, md: 2 }}>
          <Grid data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).to.have.class('MuiGrid-spacing-sm-1.5');
      expect(container.firstChild).to.have.class('MuiGrid-spacing-md-2');
    });

    it('should ignore object values of zero', () => {
      const { container } = render(
        <Grid container spacing={{ sm: 0, md: 2 }}>
          <Grid data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).not.to.have.class('MuiGrid-spacing-sm-0');
      expect(container.firstChild).to.have.class('MuiGrid-spacing-md-2');
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
              <Grid data-testid="first-custom-theme" />
              <Grid />
            </Grid>
          </ThemeProvider>
        </div>,
      );

      expect(screen.getByTestId('grid')).toHaveComputedStyle({
        marginTop: `${-1 * remValue * 0.25}px`, // '-0.25rem'
        marginBottom: `${-1 * remValue * 0.25}px`, // '-0.25rem'
        marginLeft: `${-1 * remValue * 0.25}px`, // '-0.25rem'
        marginRight: `${-1 * remValue * 0.25}px`, // '-0.25rem'
      });

      expect(screen.getByTestId('first-custom-theme')).toHaveComputedStyle({
        paddingTop: `${0.25 * remValue}px`, // 0.25rem
        paddingBottom: `${0.25 * remValue}px`, // 0.25rem
        paddingLeft: `${0.25 * remValue}px`, // 0.25rem
        paddingRight: `${0.25 * remValue}px`, // 0.25rem
      });

      rerender(
        <div style={{ width: parentWidth }}>
          <Grid data-testid="grid" container spacing={2}>
            <Grid data-testid="first-default-theme" />
            <Grid />
          </Grid>
        </div>,
      );

      expect(screen.getByTestId('grid')).toHaveComputedStyle({
        marginTop: '-8px',
        marginBottom: '-8px',
        marginLeft: '-8px',
        marginRight: '-8px',
      });

      expect(screen.getByTestId('first-default-theme')).toHaveComputedStyle({
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
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

  describe('Custom breakpoints', () => {
    it('should apply the custom breakpoint class', () => {
      const { container } = render(
        <ThemeProvider
          theme={createTheme({
            breakpoints: {
              values: {
                mobile: 0,
                tablet: 640,
                laptop: 1024,
              },
            },
          })}
        >
          {/* `lg` is to mimic mistake, it is not a breakpoint anymore */}
          <Grid mobile={2} tablet={3} laptop="auto" lg={5} />
        </ThemeProvider>,
      );

      expect(container.firstChild).to.have.class('MuiGrid-grid-mobile-2');
      expect(container.firstChild).to.have.class('MuiGrid-grid-tablet-3');
      expect(container.firstChild).to.have.class('MuiGrid-grid-laptop-auto');

      // The grid should not have class for `lg` prop
      expect(container.firstChild).not.to.have.class('MuiGrid-grid-lg-5');
      // The `lg` prop is treated as native props that spread to DOM
      expect(container.firstChild).to.have.attribute('lg', '5');
    });

    it('should apply the custom breakpoint spacing class', () => {
      const { container } = render(
        <ThemeProvider
          theme={createTheme({
            breakpoints: {
              values: {
                mobile: 0,
                tablet: 640,
                laptop: 1024,
              },
            },
          })}
        >
          <Grid container spacing={2} />
          <Grid container spacing={{ tablet: 2, laptop: 4 }} />
        </ThemeProvider>,
      );

      expect(container.firstChild).to.have.class('MuiGrid-spacing-mobile-2');

      expect(container.lastChild).to.have.class('MuiGrid-spacing-tablet-2');
      expect(container.lastChild).to.have.class('MuiGrid-spacing-laptop-4');
    });
  });
});
