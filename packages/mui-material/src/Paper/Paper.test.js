import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import {
  createRenderer,
  strictModeDoubleLoggingSuppressed,
  screen,
} from '@mui/internal-test-utils';
import Paper, { paperClasses as classes } from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<Paper />', () => {
  const { render } = createRenderer();

  describeConformance(<Paper />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiPaper',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'header',
    testVariantProps: { variant: 'rounded' },
    testStateOverrides: { prop: 'elevation', value: 10, styleKey: 'elevation10' },
    skip: ['componentsProp'],
  }));

  describe('prop: square', () => {
    it('can disable the rounded class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" square>
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).not.to.have.class(classes.rounded);
    });

    it('adds a rounded class to the root when omitted', () => {
      const { getByTestId } = render(<Paper data-testid="root">Hello World</Paper>);

      expect(getByTestId('root')).to.have.class(classes.rounded);
    });
  });

  describe('prop: variant', () => {
    it('adds a outlined class', () => {
      const { getByTestId } = render(
        <Paper data-testid="root" variant="outlined">
          Hello World
        </Paper>,
      );

      expect(getByTestId('root')).to.have.class(classes.outlined);
    });
  });

  it('should set the elevation elevation class', () => {
    const { getByTestId, setProps } = render(
      <Paper data-testid="root" elevation={16}>
        Hello World
      </Paper>,
    );
    const root = getByTestId('root');

    expect(root).to.have.class(classes.elevation16);

    setProps({ elevation: 24 });

    expect(root).to.have.class(classes.elevation24);

    setProps({ elevation: 2 });

    expect(root).to.have.class(classes.elevation2);
  });

  it('allows custom elevations via theme.shadows', () => {
    const theme = createTheme();
    theme.shadows.push('20px 20px');
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Paper data-testid="root" classes={{ elevation25: 'custom-elevation' }} elevation={25} />
      </ThemeProvider>,
    );

    expect(getByTestId('root')).to.have.class('custom-elevation');
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('warns if the given `elevation` is not implemented in the theme', () => {
      expect(() => {
        render(<Paper elevation={25} />);
      }).toErrorDev([
        'MUI: The elevation provided <Paper elevation={25}> is not available in the theme.',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: The elevation provided <Paper elevation={25}> is not available in the theme.',
      ]);
    });

    it('warns if `elevation={numberGreaterThanZero}` is used with `variant="outlined"`', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          Paper.propTypes,
          { elevation: 5, variant: 'outlined' },
          'prop',
          'MockedName',
        );
      }).toErrorDev([
        'MUI: Combining `elevation={5}` with `variant="outlined"` has no effect. Either use `elevation={0}` or use a different `variant`.',
      ]);
    });
  });

  it('should have no boxShadow or background-image on Paper with elevation 0 in dark mode using CSS variables', function test() {
    if (window.navigator.userAgent.includes('jsdom')) {
      this.skip();
    }

    const theme = createTheme({
      cssVariables: true,
      colorSchemes: {
        dark: true,
      },
      defaultColorScheme: 'dark',
    });

    render(
      <ThemeProvider theme={theme}>
        <Paper data-testid="parent" elevation={23}>
          elevation=23
          <Paper data-testid="child" elevation={0} />
        </Paper>
      </ThemeProvider>,
    );

    const childPaper = screen.getByTestId('child');
    expect(childPaper).toHaveComputedStyle({
      boxShadow: 'none',
      backgroundImage: 'none',
    });
  });
});
