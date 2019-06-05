import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import SpeedDialAction from './SpeedDialAction';

describe('<SpeedDialAction />', () => {
  let mount;
  let classes;
  const icon = <Icon>add</Icon>;
  const defaultProps = {
    icon,
    tooltipTitle: 'placeholder',
  };

  before(() => {
    // StrictModeViolation: uses ButtonBase
    mount = createMount({ strict: false });
    classes = getClasses(<SpeedDialAction {...defaultProps} />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render its component tree without warnings', () => {
    mount(<SpeedDialAction {...defaultProps} />);
  });

  it('should render a Tooltip', () => {
    const wrapper = mount(
      <SpeedDialAction {...defaultProps} open tooltipOpen tooltipTitle="An Action" />,
    );

    assert.strictEqual(
      wrapper
        .find('[role="tooltip"]')
        .first()
        .text(),
      'An Action',
    );
  });

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

  it('should render the Button with the button class', () => {
    const wrapper = mount(<SpeedDialAction {...defaultProps} open />);
    const buttonWrapper = wrapper.find('button');
    assert.strictEqual(buttonWrapper.hasClass(classes.button), true);
  });

  it('should render the Button with the button and buttonClosed classes', () => {
    const wrapper = mount(<SpeedDialAction {...defaultProps} />);
    const buttonWrapper = wrapper.find('button');
    assert.strictEqual(buttonWrapper.hasClass(classes.button), true);
    assert.strictEqual(buttonWrapper.hasClass(classes.buttonClosed), true);
  });

  it('passes the className to the Button', () => {
    const className = 'my-speeddialaction';
    const wrapper = mount(<SpeedDialAction {...defaultProps} className={className} />);
    const buttonWrapper = wrapper.find('button');
    assert.strictEqual(buttonWrapper.hasClass(className), true);
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const wrapper = mount(<SpeedDialAction {...defaultProps} open onClick={handleClick} />);
      const buttonWrapper = wrapper.childAt(0);
      buttonWrapper.simulate('click');
      assert.strictEqual(handleClick.callCount, 1);
    });
  });
});
