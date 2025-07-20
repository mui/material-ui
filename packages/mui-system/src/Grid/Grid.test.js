import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/system';
import createTheme from '@mui/system/createTheme';
import Grid, { gridClasses as classes } from '@mui/system/Grid';
import describeConformance from '../../test/describeConformance';

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
      const { container } = render(<Grid size="grow" />);
      expect(container.firstChild).to.have.class(classes['grid-xs-grow']);
    });

    it('should apply the flex size class', () => {
      const { container } = render(<Grid size={3} />);
      expect(container.firstChild).to.have.class(classes['grid-xs-3']);
    });

    it('should apply the flex auto class', () => {
      const { container } = render(<Grid size="auto" />);
      expect(container.firstChild).to.have.class(classes['grid-xs-auto']);
    });

    it('should apply the styles necessary for variable width nested item when set to auto', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // Need full CSS resolution
        this.skip();
      }

      render(
        <Grid container>
          <Grid container data-testid="auto" size="auto">
            <div style={{ width: '300px' }} />
          </Grid>
          <Grid size={11} />
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
        rowGap: `${0.5 * remValue}px`, // 0.5rem
        columnGap: `${0.5 * remValue}px`, // 0.5rem
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
        rowGap: '16px',
        columnGap: '16px',
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
          <Grid
            size={{
              mobile: 2,
              tablet: 3,
              laptop: 'auto',
            }}
          />
        </ThemeProvider>,
      );

      expect(container.firstChild).to.have.class('MuiGrid-grid-mobile-2');
      expect(container.firstChild).to.have.class('MuiGrid-grid-tablet-3');
      expect(container.firstChild).to.have.class('MuiGrid-grid-laptop-auto');

      // The grid should not have class for `lg` prop
      expect(container.firstChild).not.to.have.class('MuiGrid-grid-lg-5');
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

  describe('legacy Grid component warnings', () => {
    it('should warn once if the `item` prop is used', () => {
      expect(() => {
        render(<Grid item />);
      }).toWarnDev(
        'MUI Grid: The `item` prop has been removed and is no longer necessary. You can safely remove it.',
      );

      // Should not warn again
      expect(() => {
        render(<Grid item />);
      }).not.toWarnDev();
    });

    it('should warn if the `zeroMinWidth` prop is used', () => {
      expect(() => {
        render(<Grid zeroMinWidth />);
      }).toWarnDev(
        'MUI Grid: The `zeroMinWidth` prop has been removed and is no longer necessary. You can safely remove it.',
      );
    });

    createTheme({}).breakpoints.keys.forEach((breakpoint) => {
      it(`should warn if the \`${breakpoint}\` prop is used`, () => {
        expect(() => {
          render(<Grid {...{ [breakpoint]: 8 }} />);
        }).toWarnDev(
          // #host-reference
          `MUI Grid: The \`${breakpoint}\` prop has been removed. See https://mui.com/material-ui/migration/upgrade-to-grid-v2/ for migration instructions.`,
        );
      });
    });
  });
});
