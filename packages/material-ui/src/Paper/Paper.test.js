import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, getClasses, createMount, describeConformance } from 'test/utils';
import * as PropTypes from 'prop-types';
import Paper from './Paper';
import { createMuiTheme, ThemeProvider } from '../styles';

describe('<Paper />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

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
      const node = container.querySelector(`.${classes.rounded}`);

      expect(node).to.equal(null);
    });

    it('adds a rounded class to the root when omitted', () => {
      const { container } = render(<Paper>Hello World</Paper>);
      const node = container.querySelector(`.${classes.rounded}`);

      expect(node).to.not.equal(null);
    });
  });

  describe('prop: variant', () => {
    it('adds a outlined class', () => {
      const { container } = render(<Paper variant="outlined">Hello World</Paper>);
      const node = container.querySelector(`.${classes.outlined}`);

      expect(node).to.not.equal(null);
    });
  });

  it('should set the elevation elevation class', () => {
    const { container, setProps } = render(<Paper elevation={16}>Hello World</Paper>);

    let node = container.querySelector(`.${classes.elevation16}`);
    expect(node).to.not.equal(null);

    setProps({ elevation: 24 });
    node = container.querySelector(`.${classes.elevation24}`);
    expect(node).to.not.equal(null);

    setProps({ elevation: 2 });
    node = container.querySelector(`.${classes.elevation2}`);
    expect(node).to.not.equal(null);
  });

  it('allows custom elevations via theme.shadows', () => {
    const theme = createMuiTheme();
    theme.shadows.push('20px 20px');
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Paper classes={{ elevation25: 'custom-elevation' }} elevation={25} />
      </ThemeProvider>,
    );

    const node = container.querySelector('.custom-elevation');

    expect(node).to.not.equal(null);
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
