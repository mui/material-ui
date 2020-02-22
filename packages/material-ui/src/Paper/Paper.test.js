import * as React from 'react';
import { assert } from 'chai';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import Paper from './Paper';
import { createMuiTheme, ThemeProvider } from '../styles';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('<Paper />', () => {
  let mount;
  let shallow;
  let classes;

  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<Paper />);
  });

  after(() => {
    mount.cleanUp();
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
      const wrapper = mount(<Paper square>Hello World</Paper>);
      assert.strictEqual(wrapper.find(`.${classes.root}`).some(`.${classes.rounded}`), false);
    });

    it('adds a rounded class to the root when omitted', () => {
      const wrapper = mount(<Paper>Hello World</Paper>);
      assert.strictEqual(wrapper.find(`.${classes.root}`).every(`.${classes.rounded}`), true);
    });
  });

  describe('prop: variant', () => {
    it('adds a outlined class', () => {
      const wrapper = mount(<Paper variant="outlined">Hello World</Paper>);
      assert.strictEqual(wrapper.find(`.${classes.root}`).some(`.${classes.outlined}`), true);
    });
  });

  it('should set the elevation elevation class', () => {
    const wrapper = shallow(<Paper elevation={16}>Hello World</Paper>);
    assert.strictEqual(
      wrapper.hasClass(classes.elevation16),
      true,
      'should have the 16 elevation class',
    );
    wrapper.setProps({ elevation: 24 });
    assert.strictEqual(
      wrapper.hasClass(classes.elevation24),
      true,
      'should have the 24 elevation class',
    );
    wrapper.setProps({ elevation: 2 });
    assert.strictEqual(
      wrapper.hasClass(classes.elevation2),
      true,
      'should have the 2 elevation class',
    );
  });

  it('warns if the given `elevation` is not implemented in the theme', () => {
    mount(<Paper elevation={25} />);

    assert.strictEqual(consoleErrorMock.callCount(), 1);
    assert.include(
      consoleErrorMock.args()[0][0],
      'Material-UI: this elevation `25` is not implemented.',
    );
  });

  it('allows custom elevations via theme.shadows', () => {
    const theme = createMuiTheme();
    theme.shadows.push('20px 20px');
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Paper data-testid="paper" classes={{ elevation25: 'custom-elevation' }} elevation={25} />
      </ThemeProvider>,
    );

    assert.strictEqual(wrapper.find('div[data-testid="paper"]').hasClass('custom-elevation'), true);
  });
});
