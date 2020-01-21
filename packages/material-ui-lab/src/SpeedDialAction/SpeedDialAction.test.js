import React from 'react';
import { assert } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import SpeedDialAction from './SpeedDialAction';
import describeConformance from '@material-ui/core/test-utils/describeConformance';

describe('<SpeedDialAction />', () => {
  let mount;
  let classes;
  const icon = <Icon>add</Icon>;
  const defaultProps = {
    icon,
    tooltipTitle: 'placeholder',
  };

  before(() => {
    // StrictModeViolation: uses Tooltip
    mount = createMount({ strict: false });
    classes = getClasses(<SpeedDialAction {...defaultProps} />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<SpeedDialAction {...defaultProps} />, () => ({
    classes,
    inheritComponent: Tooltip,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));

  it('should be able to change the Tooltip classes', () => {
    const wrapper = mount(
      <SpeedDialAction {...defaultProps} TooltipClasses={{ tooltip: 'bar' }} />,
    );
    assert.include(wrapper.find(Tooltip).props().classes.tooltip, 'bar');
  });

  it('should render a Fab', () => {
    const wrapper = mount(<SpeedDialAction {...defaultProps} />);
    assert.strictEqual(wrapper.find(Fab).exists(), true);
  });

  it('should render the button with the fab class', () => {
    const wrapper = mount(<SpeedDialAction {...defaultProps} open />);
    const buttonWrapper = wrapper.find('button');
    assert.strictEqual(buttonWrapper.hasClass(classes.fab), true);
  });

  it('should render the button with the fab and fabClosed classes', () => {
    const wrapper = mount(<SpeedDialAction {...defaultProps} />);
    const buttonWrapper = wrapper.find('button');
    assert.strictEqual(buttonWrapper.hasClass(classes.fab), true);
    assert.strictEqual(buttonWrapper.hasClass(classes.fabClosed), true);
  });
});
