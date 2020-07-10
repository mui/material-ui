import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, getClasses, createMount, describeConformance } from 'test/utils';
import * as PropTypes from 'prop-types';
import Paper from './Paper';
import { createMuiTheme, ThemeProvider } from '../styles';

describe('<Paper />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<Paper />);
  });

  describeConformance(<Paper />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'header',
  }));

  describe('prop: square', () => {
    it('can disable the rounded class', () => {
      const { container } = render(<Paper square>Hello World</Paper>);
      expect(container.firstChild).not.to.have.class(classes.rounded);
    });

    it('adds a rounded class to the root when omitted', () => {
      const { container } = render(<Paper>Hello World</Paper>);
      expect(container.firstChild).to.have.class(classes.rounded);
    });
  });

  describe('prop: variant', () => {
    it('adds a outlined class', () => {
      const { container } = render(<Paper variant="outlined">Hello World</Paper>);
      expect(container.firstChild).to.have.class(classes.outlined);
    });
  });

  it('should set the overlay class based on the elevation prop in dark theme', () => {
    const darkTheme = createMuiTheme({ palette: { type: 'dark' } });
    const { container, rerender } = render(
      <ThemeProvider theme={darkTheme}>
        <Paper elevation={16}>Hello World</Paper>
      </ThemeProvider>,
    );
    expect(container.firstChild).to.have.class(classes.overlay16);
    rerender(
      <ThemeProvider theme={darkTheme}>
        <Paper elevation={24}>Hello World</Paper>
      </ThemeProvider>,
    );
    expect(container.firstChild).to.have.class(classes.overlay24);
    rerender(
      <ThemeProvider theme={darkTheme}>
        <Paper elevation={2}>Hello World</Paper>
      </ThemeProvider>,
    );
    expect(container.firstChild).to.have.class(classes.overlay2);
  });

  it('should set the elevation class based on the elevation prop', () => {
    const { container, setProps } = render(<Paper elevation={16}>Hello World</Paper>);
    expect(container.firstChild).to.have.class(classes.elevation16);
    setProps({ elevation: 24 });
    expect(container.firstChild).to.have.class(classes.elevation24);
    setProps({ elevation: 2 });
    expect(container.firstChild).to.have.class(classes.elevation2);
  });

  it('allows custom elevations via theme.shadows', () => {
    const theme = createMuiTheme();
    theme.shadows.push('20px 20px');
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Paper classes={{ elevation25: 'custom-elevation' }} elevation={25} />
      </ThemeProvider>,
    );

    expect(container.firstChild).to.have.class('custom-elevation');
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('warns if the given `elevation` is not implemented in the theme', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          Paper.Naked.propTypes,
          { classes: { elevation24: 'elevation-24', elevation26: 'elevation-26' }, elevation: 25 },
          'prop',
          'MockedPaper',
        );
      }).toErrorDev('Material-UI: This elevation `25` is not implemented.');
    });
  });
});
