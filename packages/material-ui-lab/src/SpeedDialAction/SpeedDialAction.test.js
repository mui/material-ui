import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import SpeedDialAction from './SpeedDialAction';
import describeConformance from '@material-ui/core/test-utils/describeConformance';

describe('<SpeedDialAction />', () => {
  // StrictModeViolation: uses Tooltip
  const mount = createMount({ strict: false });
  let classes;
  const icon = <Icon>add</Icon>;
  const defaultProps = {
    icon,
    tooltipTitle: 'placeholder',
  };

  before(() => {
    classes = getClasses(<SpeedDialAction {...defaultProps} />);
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
    expect(wrapper.find(Tooltip).props().classes.tooltip).to.include('bar');
  });

  it('should render a Fab', () => {
    const wrapper = mount(<SpeedDialAction {...defaultProps} />);
    expect(wrapper.find(Fab).exists()).to.equal(true);
  });

  it('should render the button with the fab class', () => {
    const wrapper = mount(<SpeedDialAction {...defaultProps} open />);
    const buttonWrapper = wrapper.find('button');
    expect(buttonWrapper.hasClass(classes.fab)).to.equal(true);
  });

  it('should render the button with the fab and fabClosed classes', () => {
    const wrapper = mount(<SpeedDialAction {...defaultProps} />);
    const buttonWrapper = wrapper.find('button');
    expect(buttonWrapper.hasClass(classes.fab)).to.equal(true);
    expect(buttonWrapper.hasClass(classes.fabClosed)).to.equal(true);
  });
});
