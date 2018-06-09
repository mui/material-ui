import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import SpeedDial from './SpeedDial';
import SpeedDialAction from '../SpeedDialAction';

describe('<SpeedDial />', () => {
  let shallow;
  let mount;
  let classes;
  const icon = <Icon>font_icon</Icon>;
  const defaultProps = {
    open: true,
    ariaLabel: 'mySpeedDial',
  };

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(
      <SpeedDial {...defaultProps} icon={icon}>
        <div />
      </SpeedDial>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a Fade transition', () => {
    const wrapper = shallow(
      <SpeedDial {...defaultProps} icon={icon}>
        <div />
      </SpeedDial>,
    );
    assert.strictEqual(wrapper.type(), 'div');
  });

  it('should render a Button', () => {
    const wrapper = shallow(
      <SpeedDial {...defaultProps} icon={icon}>
        <div />
      </SpeedDial>,
    );
    const buttonWrapper = wrapper.childAt(0).childAt(0);
    assert.strictEqual(buttonWrapper.type(), Button);
  });

  it('should render with a null child', () => {
    const wrapper = shallow(
      <SpeedDial {...defaultProps} icon={icon}>
        <SpeedDialAction tooltipTitle="One" />
        {null}
        <SpeedDialAction tooltipTitle="Three" />
      </SpeedDial>,
    );
    assert.strictEqual(wrapper.find(SpeedDialAction).length, 2);
  });

  it('should render with the root class', () => {
    const wrapper = shallow(
      <SpeedDial {...defaultProps} icon={icon}>
        <div />
      </SpeedDial>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(
      <SpeedDial {...defaultProps} className="mySpeedDialClass" icon={icon}>
        <div />
      </SpeedDial>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('mySpeedDialClass'), true);
  });

  it('should render the actions with the actions class', () => {
    const wrapper = shallow(
      <SpeedDial {...defaultProps} className="mySpeedDial" icon={icon}>
        <SpeedDialAction icon={icon} tooltipTitle="SpeedDialAction" />
      </SpeedDial>,
    );
    const actionsWrapper = wrapper.childAt(1);
    assert.strictEqual(actionsWrapper.hasClass(classes.actions), true);
    assert.strictEqual(actionsWrapper.hasClass(classes.actionsClosed), false);
  });

  it('should render the actions with the actions and actionsClosed classes', () => {
    const wrapper = shallow(
      <SpeedDial {...defaultProps} open={false} className="mySpeedDial" icon={icon}>
        <SpeedDialAction icon={icon} tooltipTitle="SpeedDialAction" />
      </SpeedDial>,
    );
    const actionsWrapper = wrapper.childAt(1);
    assert.strictEqual(actionsWrapper.hasClass(classes.actions), true);
    assert.strictEqual(actionsWrapper.hasClass(classes.actionsClosed), true);
  });

  it('should pass the open prop to its children', () => {
    const wrapper = shallow(
      <SpeedDial {...defaultProps} icon={icon}>
        <SpeedDialAction icon={icon} tooltipTitle="SpeedDialAction1" />
        <SpeedDialAction icon={icon} tooltipTitle="SpeedDialAction2" />
      </SpeedDial>,
    );
    const actionsWrapper = wrapper.childAt(1);
    assert.strictEqual(actionsWrapper.childAt(0).props().open, true, 'open should be true');
    assert.strictEqual(actionsWrapper.childAt(1).props().open, true, 'open should be true');
  });

  describe('prop: onKeyDown', () => {
    it('should be called when a key is pressed', () => {
      const handleKeyDown = spy();
      const wrapper = shallow(
        <SpeedDial {...defaultProps} icon={icon} onKeyDown={handleKeyDown}>
          <div />
        </SpeedDial>,
      );
      const buttonWrapper = wrapper.childAt(0).childAt(0);
      const event = {};
      buttonWrapper.simulate('keyDown', event);
      assert.strictEqual(handleKeyDown.callCount, 1);
      assert.strictEqual(handleKeyDown.args[0][0], event);
    });
  });
});
