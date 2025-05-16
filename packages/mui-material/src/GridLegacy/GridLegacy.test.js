import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen, reactMajor } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import defaultTheme from '@mui/material/styles/defaultTheme';
import GridLegacy, { gridLegacyClasses as classes } from '@mui/material/GridLegacy';
import {
  generateGridLegacy,
  generateRowGap,
  generateColumnGap,
  generateDirection,
} from './GridLegacy';
import describeConformance from '../../test/describeConformance';

describe('Material UI <GridLegacy />', () => {
  const { render } = createRenderer();

  describeConformance(<GridLegacy />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiGridLegacy',
    testVariantProps: { container: true, spacing: 5 },
    testStateOverrides: { prop: 'container', value: true, styleKey: 'container' },
    skip: ['componentsProp'],
  }));

  describe('prop: container', () => {
    it('should apply the container class', () => {
      const { container } = render(<GridLegacy container />);
      expect(container.firstChild).to.have.class(classes.container);
    });

    it('should apply the correct number of columns for nested containers', () => {
      const { getByTestId } = render(
        <GridLegacy container columns={16}>
          <GridLegacy item xs={8}>
            <GridLegacy container columns={8} data-testid="nested-container-in-item">
              <GridLegacy item xs={8} />
            </GridLegacy>
          </GridLegacy>
        </GridLegacy>,
      );
      const container = getByTestId('nested-container-in-item');

      // test whether the class of the child of the container is correct or not
      expect(container.firstChild).to.have.class(classes.item);

      // `columns` of nested container should have a higher priority than that of root container
      // otherwise, max-width would be 50% in this test
      expect(container.firstChild).toHaveComputedStyle({ maxWidth: '100%' });
    });

    it('should apply the correct number of columns for nested containers with undefined prop columns', () => {
      const { getByTestId } = render(
        <GridLegacy container columns={16}>
          <GridLegacy item xs={8}>
            <GridLegacy container data-testid="nested-container-in-item">
              <GridLegacy item xs={12} />
            </GridLegacy>
          </GridLegacy>
        </GridLegacy>,
      );

      const container = getByTestId('nested-container-in-item');
      expect(container.firstChild).toHaveComputedStyle({ maxWidth: '100%' });
    });

    it('should apply the correct number of columns for nested containers with columns=12 (default)', () => {
      const { getByTestId } = render(
        <GridLegacy container columns={16}>
          <GridLegacy item xs={8}>
            <GridLegacy container columns={12} data-testid="nested-container-in-item">
              <GridLegacy item xs={12} />
            </GridLegacy>
          </GridLegacy>
        </GridLegacy>,
      );

      const container = getByTestId('nested-container-in-item');
      expect(container.firstChild).toHaveComputedStyle({ maxWidth: '100%' });
    });
  });

  describe('prop: item', () => {
    it('should apply the item class', () => {
      const { container } = render(<GridLegacy item />);
      expect(container.firstChild).to.have.class(classes.item);
    });
  });

  describe('prop: xs', () => {
    it('should apply the flex-grow class', () => {
      const { container } = render(<GridLegacy item xs />);
      expect(container.firstChild).to.have.class(classes['grid-xs-true']);
    });

    it('should apply the flex size class', () => {
      const { container } = render(<GridLegacy item xs={3} />);
      expect(container.firstChild).to.have.class(classes['grid-xs-3']);
    });

    it('should apply the flex auto class', () => {
      const { container } = render(<GridLegacy item xs="auto" />);
      expect(container.firstChild).to.have.class(classes['grid-xs-auto']);
    });

    it('should apply the styles necessary for variable width nested item when set to auto', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // Need full CSS resolution
        this.skip();
      }

      render(
        <GridLegacy container>
          <GridLegacy container item xs="auto" data-testid="auto">
            <div style={{ width: '300px' }} />
          </GridLegacy>
          <GridLegacy item xs={11} />
        </GridLegacy>,
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
      const { container } = render(<GridLegacy container direction="column" />);
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
          '& > .MuiGridLegacy-item': {
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
          '& > .MuiGridLegacy-item': {
            maxWidth: 'none',
          },
        },
      });
    });

    it('should support custom breakpoints', () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
      });
      expect(
        generateDirection({
          ownerState: {
            container: true,
            direction: { mobile: 'row', desktop: 'column' },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          flexDirection: 'row',
        },
        '@media (min-width:1200px)': {
          flexDirection: 'column',
          '& > .MuiGridLegacy-item': {
            maxWidth: 'none',
          },
        },
      });
    });

    it('should generate correct responsive styles regardless of custom breakpoints order', () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
      });
      expect(
        generateDirection({
          ownerState: {
            container: true,
            direction: { desktop: 'column', mobile: 'row' },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          flexDirection: 'row',
        },
        '@media (min-width:1200px)': {
          flexDirection: 'column',
          '& > .MuiGridLegacy-item': {
            maxWidth: 'none',
          },
        },
      });
    });
  });

  describe('prop: spacing', () => {
    it('should have a spacing', () => {
      const theme = createTheme({
        components: {
          MuiGridLegacy: {
            styleOverrides: {
              'spacing-xs-1': {
                position: 'absolute',
                top: '10px',
                left: '20px',
              },
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <GridLegacy container spacing={1} />
        </ThemeProvider>,
      );
      expect(container.firstChild).to.have.class(classes['spacing-xs-1']);
      expect(container.firstChild).toHaveComputedStyle({
        position: 'absolute',
        top: '10px',
        left: '20px',
      });
    });

    it('should support decimal values', () => {
      const theme = createTheme({
        components: {
          MuiGridLegacy: {
            styleOverrides: {
              'spacing-xs-1.5': {
                position: 'absolute',
                top: '10px',
                left: '20px',
              },
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <GridLegacy container spacing={1.5}>
            <GridLegacy item data-testid="child" />
          </GridLegacy>
        </ThemeProvider>,
      );
      expect(container.firstChild).to.have.class('MuiGridLegacy-spacing-xs-1.5');
      expect(container.firstChild).toHaveComputedStyle({
        position: 'absolute',
        top: '10px',
        left: '20px',
      });
    });

    it('should not support undefined values', () => {
      const theme = createTheme({
        components: {
          MuiGridLegacy: {
            styleOverrides: {
              'spacing-xs-undefined': {
                position: 'absolute',
                top: '10px',
                left: '20px',
              },
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <GridLegacy container>
            <GridLegacy item />
          </GridLegacy>
        </ThemeProvider>,
      );
      expect(container.firstChild).not.to.have.class('MuiGridLegacy-spacing-xs-undefined');
      expect(container.firstChild).not.to.toHaveComputedStyle({
        position: 'absolute',
        top: '10px',
        left: '20px',
      });
    });

    it('should not support zero values', () => {
      const theme = createTheme({
        components: {
          MuiGridLegacy: {
            styleOverrides: {
              'spacing-xs-0': {
                position: 'absolute',
                top: '10px',
                left: '20px',
              },
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <GridLegacy container spacing={0}>
            <GridLegacy item />
          </GridLegacy>
        </ThemeProvider>,
      );
      expect(container.firstChild).not.to.have.class('MuiGridLegacy-spacing-xs-0');
      expect(container.firstChild).not.to.toHaveComputedStyle({
        position: 'absolute',
        top: '10px',
        left: '20px',
      });
    });

    it('should support object values', () => {
      const theme = createTheme({
        components: {
          MuiGridLegacy: {
            styleOverrides: {
              'spacing-sm-1.5': {
                position: 'absolute',
                top: '10px',
                left: '20px',
              },
              'spacing-md-2': {
                position: 'relative',
                top: '30px',
                left: '50px',
              },
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <GridLegacy container spacing={{ sm: 1.5, md: 2 }}>
            <GridLegacy item />
          </GridLegacy>
        </ThemeProvider>,
      );
      expect(container.firstChild).to.have.class('MuiGridLegacy-spacing-sm-1.5');
      expect(container.firstChild).to.have.class('MuiGridLegacy-spacing-md-2');
      expect(container.firstChild).to.toHaveComputedStyle({
        position: 'relative',
        top: '30px',
        left: '50px',
      });
    });

    it('should ignore object values of zero', () => {
      const theme = createTheme({
        components: {
          MuiGridLegacy: {
            styleOverrides: {
              'spacing-sm-0': {
                position: 'absolute',
                top: '10px',
                left: '20px',
              },
              'spacing-md-2': {
                position: 'relative',
                top: '30px',
                left: '50px',
              },
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <GridLegacy container spacing={{ sm: 0, md: 2 }}>
            <GridLegacy item />
          </GridLegacy>
        </ThemeProvider>,
      );
      expect(container.firstChild).not.to.have.class('MuiGridLegacy-spacing-sm-0');
      expect(container.firstChild).to.have.class('MuiGridLegacy-spacing-md-2');
      expect(container.firstChild).to.toHaveComputedStyle({
        position: 'relative',
        top: '30px',
        left: '50px',
      });
    });

    it('should support custom breakpoints', () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
        components: {
          MuiGridLegacy: {
            styleOverrides: {
              'spacing-mobile-1.5': {
                position: 'absolute',
                top: '10px',
                left: '20px',
              },
              'spacing-desktop-3': {
                position: 'relative',
                top: '30px',
                left: '50px',
              },
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <GridLegacy container spacing={{ mobile: 1.5, desktop: 3 }}>
            <GridLegacy item />
          </GridLegacy>
        </ThemeProvider>,
      );
      expect(container.firstChild).to.have.class('MuiGridLegacy-spacing-mobile-1.5');
      expect(container.firstChild).to.have.class('MuiGridLegacy-spacing-desktop-3');
      expect(container.firstChild).to.toHaveComputedStyle({
        position: 'relative',
        top: '30px',
        left: '50px',
      });
    });

    it('should ignore custom breakpoints with values of zero', () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
        components: {
          MuiGridLegacy: {
            styleOverrides: {
              'spacing-mobile-0': {
                position: 'absolute',
                top: '10px',
                left: '20px',
              },
              'spacing-desktop-3': {
                position: 'relative',
                top: '30px',
                left: '50px',
              },
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <GridLegacy container spacing={{ mobile: 0, desktop: 3 }}>
            <GridLegacy item />
          </GridLegacy>
        </ThemeProvider>,
      );
      expect(container.firstChild).to.not.have.class('MuiGridLegacy-spacing-mobile-0');
      expect(container.firstChild).to.have.class('MuiGridLegacy-spacing-desktop-3');
      expect(container.firstChild).to.toHaveComputedStyle({
        position: 'relative',
        top: '30px',
        left: '50px',
      });
    });

    it("shouldn't support custom breakpoints without its spacing values", () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
        components: {
          MuiGridLegacy: {
            styleOverrides: {
              'spacing-mobile-undefined': {
                position: 'absolute',
                top: '10px',
                left: '20px',
              },
              'spacing-desktop-3': {
                position: 'relative',
                top: '30px',
                left: '50px',
              },
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <GridLegacy container spacing={{ desktop: 3 }}>
            <GridLegacy item />
          </GridLegacy>
        </ThemeProvider>,
      );
      expect(container.firstChild).to.not.have.class('sMuiGridLegacy-spacing-mobile-undefined');
      expect(container.firstChild).to.have.class('MuiGridLegacy-spacing-desktop-3');
      expect(container.firstChild).to.toHaveComputedStyle({
        position: 'relative',
        top: '30px',
        left: '50px',
      });
    });

    it("should ignore custom breakpoints that doesn't exist in the theme", () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
        components: {
          MuiGridLegacy: {
            styleOverrides: {
              'spacing-md-1.5': {
                position: 'absolute',
                top: '10px',
                left: '20px',
              },
              'spacing-desktop-3': {
                position: 'relative',
                top: '30px',
                left: '50px',
              },
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <GridLegacy container spacing={{ md: 1.5, desktop: 3 }}>
            <GridLegacy item />
          </GridLegacy>
        </ThemeProvider>,
      );

      expect(container.firstChild).to.not.have.class('MuiGridLegacy-spacing-md-1.5');
      expect(container.firstChild).to.have.class('MuiGridLegacy-spacing-desktop-3');
      expect(container.firstChild).to.toHaveComputedStyle({
        position: 'relative',
        top: '30px',
        left: '50px',
      });
    });

    it('should ignore custom breakpoints with negative values', () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
        components: {
          MuiGridLegacy: {
            styleOverrides: {
              'spacing-mobile--1.5': {
                position: 'absolute',
                top: '10px',
                left: '20px',
              },
              'spacing-desktop--3': {
                position: 'relative',
                top: '30px',
                left: '50px',
              },
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <GridLegacy container spacing={{ mobile: -1.5, desktop: -3 }}>
            <GridLegacy item />
          </GridLegacy>
        </ThemeProvider>,
      );
      expect(container.firstChild).to.not.have.class('MuiGridLegacy-spacing-md--1.5');
      expect(container.firstChild).to.not.have.class('MuiGridLegacy-spacing-desktop--3');
      expect(container.firstChild).to.not.toHaveComputedStyle({
        position: 'relative',
        top: '30px',
        left: '50px',
      });
    });

    it('should ignore grid item with spacing object', function test() {
      if (reactMajor < 19) {
        // React 19 removed prop types support
        this.skip();
      }

      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
        components: {
          MuiGridLegacy: {
            styleOverrides: {
              'spacing-mobile--1.5': {
                position: 'absolute',
                top: '10px',
                left: '20px',
              },
              'spacing-desktop--3': {
                position: 'relative',
                top: '30px',
                left: '50px',
              },
            },
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={theme}>
          <GridLegacy item spacing={{ mobile: 1.5, desktop: 3 }} />
        </ThemeProvider>,
      );
      expect(container.firstChild).to.not.have.class('MuiGridLegacy-spacing-mobile-1.5');
      expect(container.firstChild).to.not.have.class('MuiGridLegacy-spacing-desktop-3');
      expect(container.firstChild).to.not.toHaveComputedStyle({
        position: 'relative',
        top: '30px',
        left: '50px',
      });
    });

    it('should warn of failed prop types when providing spacing object without the `container` prop', function test() {
      if (reactMajor >= 19) {
        // React 19 removed prop types support
        this.skip();
      }

      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
      });

      expect(() => {
        render(
          <ThemeProvider theme={theme}>
            <GridLegacy item spacing={{ mobile: 1, desktop: 3 }} />
          </ThemeProvider>,
        );
      }).toErrorDev(
        'Warning: Failed prop type: The prop `spacing` of `GridLegacy` can only be used together with the `container` prop.',
      );
    });

    it('should not throw error for setting zero spacing in theme', () => {
      const theme = createTheme({ spacing: 0 });

      function App() {
        return (
          <ThemeProvider theme={theme}>
            <GridLegacy container spacing={4}>
              <GridLegacy item>test</GridLegacy>
              <GridLegacy item>test</GridLegacy>
            </GridLegacy>
          </ThemeProvider>
        );
      }

      expect(() => {
        render(<App />);
      }).not.to.throw();
    });
  });

  describe('prop: rowSpacing, columnSpacing', () => {
    it('should generate correct responsive styles', () => {
      const theme = createTheme();
      expect(
        generateRowGap({
          ownerState: {
            container: true,
            rowSpacing: { xs: 1, sm: 2, md: '16px' },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: '8px',
          },
          marginTop: 'calc(-1 * 8px)',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          '& > .MuiGridLegacy-item': {
            paddingTop: '16px',
          },
          marginTop: 'calc(-1 * 16px)',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: {
          '& > .MuiGridLegacy-item': {
            paddingTop: '16px',
          },
          marginTop: 'calc(-1 * 16px)',
        },
      });

      expect(
        generateColumnGap({
          ownerState: {
            container: true,
            columnSpacing: { xs: 1, sm: 2, md: '16px' },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '8px',
          },
          marginLeft: 'calc(-1 * 8px)',
          width: 'calc(100% + 8px)',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '16px',
          },
          marginLeft: 'calc(-1 * 16px)',
          width: 'calc(100% + 16px)',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '16px',
          },
          marginLeft: 'calc(-1 * 16px)',
          width: 'calc(100% + 16px)',
        },
      });
    });

    it('should support custom breakpoints and generate correct responsive styles', () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
      });
      expect(
        generateRowGap({
          ownerState: {
            container: true,
            rowSpacing: { mobile: 1.5, desktop: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: '12px',
          },
          marginTop: 'calc(-1 * 12px)',
        },
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: '24px',
          },
          marginTop: 'calc(-1 * 24px)',
        },
      });

      expect(
        generateColumnGap({
          ownerState: {
            container: true,
            columnSpacing: { mobile: 1.5, desktop: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '12px',
          },
          marginLeft: 'calc(-1 * 12px)',
          width: 'calc(100% + 12px)',
        },
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '24px',
          },
          marginLeft: 'calc(-1 * 24px)',
          width: 'calc(100% + 24px)',
        },
      });
    });

    it("shouldn't support custom breakpoints with values of zeros and shouldn't generate responsive styles", () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
      });
      expect(
        generateRowGap({
          ownerState: {
            container: true,
            rowSpacing: { mobile: 0, desktop: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {},
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: '24px',
          },
          marginTop: 'calc(-1 * 24px)',
        },
      });

      expect(
        generateColumnGap({
          ownerState: {
            container: true,
            columnSpacing: { mobile: 0, desktop: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {},
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '24px',
          },
          marginLeft: 'calc(-1 * 24px)',
          width: 'calc(100% + 24px)',
        },
      });
    });

    it("shouldn't support custom breakpoints without its spacing values and shouldn't generate responsive styles", () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
      });
      expect(
        generateRowGap({
          ownerState: {
            container: true,
            rowSpacing: { desktop: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: '24px',
          },
          marginTop: 'calc(-1 * 24px)',
        },
      });

      expect(
        generateColumnGap({
          ownerState: {
            container: true,
            columnSpacing: { desktop: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '24px',
          },
          marginLeft: 'calc(-1 * 24px)',
          width: 'calc(100% + 24px)',
        },
      });
    });

    it("should ignore custom breakpoints that doesn't exist in the theme and shouldn't generate responsive styles", () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
      });
      expect(
        generateRowGap({
          ownerState: {
            container: true,
            rowSpacing: { md: 1.5, desktop: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: '24px',
          },
          marginTop: 'calc(-1 * 24px)',
        },
      });

      expect(
        generateColumnGap({
          ownerState: {
            container: true,
            columnSpacing: { md: 1.5, desktop: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '24px',
          },
          marginLeft: 'calc(-1 * 24px)',
          width: 'calc(100% + 24px)',
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
          '& > .MuiGridLegacy-item': {
            paddingTop: '8px',
          },
          marginTop: 'calc(-1 * 8px)',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          '& > .MuiGridLegacy-item': {
            paddingTop: '16px',
          },
          marginTop: 'calc(-1 * 16px)',
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
          '& > .MuiGridLegacy-item': {
            paddingLeft: '8px',
          },
          marginLeft: 'calc(-1 * 8px)',
          width: 'calc(100% + 8px)',
        },
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '16px',
          },
          marginLeft: 'calc(-1 * 16px)',
          width: 'calc(100% + 16px)',
        },
      });
    });

    it('should generate correct responsive styles regardless of custom breakpoints order ', () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'desktop'],
          values: {
            mobile: 0,
            desktop: 1200,
          },
        },
      });
      expect(
        generateRowGap({
          ownerState: {
            container: true,
            rowSpacing: { mobile: 1.5, desktop: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: '12px',
          },
          marginTop: 'calc(-1 * 12px)',
        },
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: '24px',
          },
          marginTop: 'calc(-1 * 24px)',
        },
      });

      expect(
        generateColumnGap({
          ownerState: {
            container: true,
            columnSpacing: { mobile: 1.5, desktop: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '12px',
          },
          marginLeft: 'calc(-1 * 12px)',
          width: 'calc(100% + 12px)',
        },
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '24px',
          },
          marginLeft: 'calc(-1 * 24px)',
          width: 'calc(100% + 24px)',
        },
      });
    });

    it('should generate correct responsive styles for overriding with zero value styles for higher breakpoints', () => {
      const theme = createTheme({
        breakpoints: {
          values: {
            mobile: 0,
            desktop: 1200,
            tablet: 640,
          },
        },
      });
      expect(
        generateRowGap({
          ownerState: {
            container: true,
            rowSpacing: { mobile: 1.5, desktop: 0, tablet: 0 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: '12px',
          },
          marginTop: 'calc(-1 * 12px)',
        },
        '@media (min-width:640px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: 0,
          },
          marginTop: 0,
        },
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: 0,
          },
          marginTop: 0,
        },
      });

      expect(
        generateColumnGap({
          ownerState: {
            container: true,
            columnSpacing: { mobile: 1.5, desktop: 0, tablet: 0 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '12px',
          },
          marginLeft: 'calc(-1 * 12px)',
          width: 'calc(100% + 12px)',
        },
        '@media (min-width:640px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: 0,
          },
          marginLeft: 0,
          width: '100%',
        },
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: 0,
          },
          marginLeft: 0,
          width: '100%',
        },
      });

      // Array input
      expect(
        generateRowGap({
          ownerState: {
            container: true,
            rowSpacing: [1.5, 0, 0],
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: '12px',
          },
          marginTop: 'calc(-1 * 12px)',
        },
        '@media (min-width:640px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: 0,
          },
          marginTop: 0,
        },
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: 0,
          },
          marginTop: 0,
        },
      });

      expect(
        generateColumnGap({
          ownerState: {
            container: true,
            columnSpacing: [1.5, 0, 0],
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '12px',
          },
          marginLeft: 'calc(-1 * 12px)',
          width: 'calc(100% + 12px)',
        },
        '@media (min-width:640px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: 0,
          },
          marginLeft: 0,
          width: '100%',
        },
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: 0,
          },
          marginLeft: 0,
          width: '100%',
        },
      });
    });

    it('should not generate responsive styles for lower breakpoints below a given non-zero breakpoint', () => {
      const theme = createTheme({
        breakpoints: {
          values: {
            mobile: 0,
            desktop: 1200,
            tablet: 640,
          },
        },
      });
      expect(
        generateRowGap({
          ownerState: {
            container: true,
            rowSpacing: { mobile: 0, desktop: 0, tablet: 1.5 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {},
        '@media (min-width:640px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: '12px',
          },
          marginTop: 'calc(-1 * 12px)',
        },
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: 0,
          },
          marginTop: 0,
        },
      });

      expect(
        generateColumnGap({
          ownerState: {
            container: true,
            columnSpacing: { mobile: 0, desktop: 0, tablet: 1.5 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {},
        '@media (min-width:640px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '12px',
          },
          marginLeft: 'calc(-1 * 12px)',
          width: 'calc(100% + 12px)',
        },
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: 0,
          },
          marginLeft: 0,
          width: '100%',
        },
      });

      // Array input
      expect(
        generateRowGap({
          ownerState: {
            container: true,
            rowSpacing: [0, 1.5, 0],
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {},
        '@media (min-width:640px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: '12px',
          },
          marginTop: 'calc(-1 * 12px)',
        },
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingTop: 0,
          },
          marginTop: 0,
        },
      });

      expect(
        generateColumnGap({
          ownerState: {
            container: true,
            columnSpacing: [0, 1.5, 0],
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {},
        '@media (min-width:640px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: '12px',
          },
          marginLeft: 'calc(-1 * 12px)',
          width: 'calc(100% + 12px)',
        },
        '@media (min-width:1200px)': {
          '& > .MuiGridLegacy-item': {
            paddingLeft: 0,
          },
          marginLeft: 0,
          width: '100%',
        },
      });
    });

    it('should support css variables mode', () => {
      const theme = createTheme({
        cssVariables: true,
      });
      expect(
        generateRowGap({
          ownerState: {
            container: true,
            rowSpacing: 2,
          },
          theme,
        }),
      ).to.deep.equal({
        '& > .MuiGridLegacy-item': {
          paddingTop: 'calc(2 * var(--mui-spacing, 8px))',
        },
        marginTop: 'calc(-1 * calc(2 * var(--mui-spacing, 8px)))',
      });
      expect(
        generateColumnGap({
          ownerState: {
            container: true,
            columnSpacing: 2,
          },
          theme,
        }),
      ).to.deep.equal({
        '& > .MuiGridLegacy-item': {
          paddingLeft: 'calc(2 * var(--mui-spacing, 8px))',
        },
        marginLeft: 'calc(-1 * calc(2 * var(--mui-spacing, 8px)))',
        width: 'calc(100% + calc(2 * var(--mui-spacing, 8px)))',
      });
    });
  });

  describe('prop: columns', () => {
    it('should generate responsive grid when grid item misses breakpoints of its container', () => {
      const theme = createTheme();
      expect(
        generateGridLegacy({
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
        generateGridLegacy({
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

    it('should generate responsive grid when grid item has a custom breakpoints', () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'tablet', 'desktop'],
          values: {
            mobile: 0,
            tablet: 640,
            desktop: 1200,
          },
        },
      });
      expect(
        generateGridLegacy({
          ownerState: {
            columns: 12,
            mobile: 12,
            tablet: 6,
            desktop: 6,
            item: true,
          },
          theme,
        }),
      ).to.deep.equal({
        flexBasis: '100%',
        flexGrow: 0,
        maxWidth: '100%',
        '@media (min-width:640px)': {
          flexBasis: '50%',
          flexGrow: 0,
          maxWidth: '50%',
        },
        '@media (min-width:1200px)': {
          flexBasis: '50%',
          flexGrow: 0,
          maxWidth: '50%',
        },
      });
    });

    it('should generate responsive grid when grid item has a custom breakpoints with values of auto', () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'tablet', 'desktop'],
          values: {
            mobile: 0,
            tablet: 640,
            desktop: 1200,
          },
        },
      });
      expect(
        generateGridLegacy({
          ownerState: {
            columns: 12,
            mobile: 'auto',
            tablet: 6,
            desktop: 6,
            item: true,
          },
          theme,
        }),
      ).to.deep.equal({
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        maxWidth: 'none',
        width: 'auto',
        '@media (min-width:640px)': {
          flexBasis: '50%',
          flexGrow: 0,
          maxWidth: '50%',
        },
        '@media (min-width:1200px)': {
          flexBasis: '50%',
          flexGrow: 0,
          maxWidth: '50%',
        },
      });
    });

    it('should generate responsive grid when grid item has a custom breakpoints with values of true', () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'tablet', 'desktop'],
          values: {
            mobile: 0,
            tablet: 640,
            desktop: 1200,
          },
        },
      });
      expect(
        generateGridLegacy({
          ownerState: {
            columns: 12,
            mobile: true,
            tablet: 6,
            desktop: 6,
            item: true,
          },
          theme,
        }),
      ).to.deep.equal({
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: '100%',
        '@media (min-width:640px)': {
          flexBasis: '50%',
          flexGrow: 0,
          maxWidth: '50%',
        },
        '@media (min-width:1200px)': {
          flexBasis: '50%',
          flexGrow: 0,
          maxWidth: '50%',
        },
      });
    });

    it("shouldn't generate responsive grid when grid item has a custom breakpoints with values of false", () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'tablet', 'desktop'],
          values: {
            mobile: 0,
            tablet: 640,
            desktop: 1200,
          },
        },
      });
      expect(
        generateGridLegacy({
          ownerState: {
            columns: 12,
            mobile: false,
            tablet: 6,
            desktop: 6,
            item: true,
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:640px)': {
          flexBasis: '50%',
          flexGrow: 0,
          maxWidth: '50%',
        },
        '@media (min-width:1200px)': {
          flexBasis: '50%',
          flexGrow: 0,
          maxWidth: '50%',
        },
      });
    });

    it("shouldn't generate responsive grid when grid item has a breakpoints don't exist in the theme", () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'tablet', 'desktop'],
          values: {
            mobile: 0,
            tablet: 640,
            desktop: 1200,
          },
        },
      });
      expect(
        generateGridLegacy({
          ownerState: {
            columns: 12,
            small: 2,
            tablet: 6,
            desktop: 6,
            item: true,
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:640px)': {
          flexBasis: '50%',
          flexGrow: 0,
          maxWidth: '50%',
        },
        '@media (min-width:1200px)': {
          flexBasis: '50%',
          flexGrow: 0,
          maxWidth: '50%',
        },
      });
    });

    it('should generate responsive grid when grid item has a custom breakpoints and grid container columns are responsive ', () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'tablet', 'desktop'],
          values: {
            mobile: 0,
            tablet: 640,
            desktop: 1200,
          },
        },
      });
      expect(
        generateGridLegacy({
          ownerState: {
            columns: { mobile: 4, tablet: 8, desktop: 12 },
            mobile: 2,
            tablet: 2,
            desktop: 6,
            item: true,
          },
          theme,
        }),
      ).to.deep.equal({
        flexBasis: '50%',
        flexGrow: 0,
        maxWidth: '50%',
        '@media (min-width:640px)': {
          flexBasis: '25%',
          flexGrow: 0,
          maxWidth: '25%',
        },
        '@media (min-width:1200px)': {
          flexBasis: '50%',
          flexGrow: 0,
          maxWidth: '50%',
        },
      });
    });

    it('should generate responsive grid when grid item misses custom breakpoints of its container', () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'tablet', 'desktop'],
          values: {
            mobile: 0,
            tablet: 640,
            desktop: 1200,
          },
        },
      });
      expect(
        generateGridLegacy({
          ownerState: {
            columns: { mobile: 4, tablet: 8, desktop: 12 },
            mobile: 2,
            item: true,
          },
          theme,
        }),
      ).to.deep.equal({
        flexBasis: '50%',
        flexGrow: 0,
        maxWidth: '50%',
        '@media (min-width:640px)': {
          flexBasis: '25%',
          flexGrow: 0,
          maxWidth: '25%',
        },
        '@media (min-width:1200px)': {
          flexBasis: '16.666667%',
          flexGrow: 0,
          maxWidth: '16.666667%',
        },
      });
    });

    it('should generate responsive grid when grid item misses custom breakpoints of its container and custom breakpoint starts from the middle', () => {
      const theme = createTheme({
        breakpoints: {
          keys: ['mobile', 'tablet', 'desktop'],
          values: {
            mobile: 0,
            tablet: 640,
            desktop: 1200,
          },
        },
      });
      expect(
        generateGridLegacy({
          ownerState: {
            columns: { tablet: 8, desktop: 12 },
            tablet: 2,
            item: true,
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:640px)': {
          flexBasis: '25%',
          flexGrow: 0,
          maxWidth: '25%',
        },
        '@media (min-width:1200px)': {
          flexBasis: '16.666667%',
          flexGrow: 0,
          maxWidth: '16.666667%',
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
            <GridLegacy data-testid="grid" container spacing={2}>
              <GridLegacy item data-testid="first-custom-theme" />
              <GridLegacy item />
            </GridLegacy>
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
          <GridLegacy data-testid="grid" container spacing={2}>
            <GridLegacy item data-testid="first-default-theme" />
            <GridLegacy item />
          </GridLegacy>
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
    const { container } = render(<GridLegacy mt={2} mr={1} sx={{ marginRight: 5, mb: 2 }} />);

    expect(container.firstChild).toHaveComputedStyle({
      marginTop: '16px',
      marginRight: '40px',
      marginBottom: '16px',
    });
  });

  describe('prop: wrap', () => {
    it('should wrap by default', () => {
      render(<GridLegacy container data-testid="wrap" />);
      expect(screen.getByTestId('wrap')).toHaveComputedStyle({
        flexWrap: 'wrap',
      });
    });

    it('should apply nowrap class and style', () => {
      const { container } = render(<GridLegacy container wrap="nowrap" data-testid="wrap" />);
      expect(container.firstChild).to.have.class('MuiGridLegacy-wrap-xs-nowrap');
      expect(screen.getByTestId('wrap')).toHaveComputedStyle({
        flexWrap: 'nowrap',
      });
    });

    it('should apply wrap-reverse class and style', () => {
      const { container } = render(<GridLegacy container wrap="wrap-reverse" data-testid="wrap" />);
      expect(container.firstChild).to.have.class('MuiGridLegacy-wrap-xs-wrap-reverse');
      expect(screen.getByTestId('wrap')).toHaveComputedStyle({
        flexWrap: 'wrap-reverse',
      });
    });
  });
});
