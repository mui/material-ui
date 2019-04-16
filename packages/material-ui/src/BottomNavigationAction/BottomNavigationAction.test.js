import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import BottomNavigationAction from './BottomNavigationAction';

describe('<BottomNavigationAction />', () => {
  let mount;
  let classes;
  const icon = <Icon>restore</Icon>;

  before(() => {
    // StrictModeViolation: uses ButtonBase
    mount = createMount({ strict: false });
    classes = getClasses(<BottomNavigationAction />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<BottomNavigationAction />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));

  it('should render a ButtonBase', () => {
    const wrapper = mount(<BottomNavigationAction icon={icon} />);
    const root = wrapper.find(`.${classes.root}`).first();
    assert.strictEqual(root.exists(), true);
    assert.strictEqual(root.type(), ButtonBase);
  });

  it('should render with the user and root classes', () => {
    const wrapper = mount(
      <BottomNavigationAction className="woofBottomNavigationAction" icon={icon} />,
    );
    const root = wrapper.find(`.${classes.root}.woofBottomNavigationAction`).first();
    assert.strictEqual(root.exists(), true);
    assert.strictEqual(root.hasClass('woofBottomNavigationAction'), true);
  });

  it('should render with the selected and root classes', () => {
    const wrapper = mount(<BottomNavigationAction icon={icon} selected />);
    const root = wrapper.find(`.${classes.root}`).first();
    assert.strictEqual(root.exists(), true);
    assert.strictEqual(root.hasClass(classes.selected), true);
  });

  it('should render with the selectedIconOnly and root classes', () => {
    const wrapper = mount(<BottomNavigationAction icon={icon} showLabel={false} />);
    const root = findOutermostIntrinsic(wrapper);
    assert.strictEqual(root.hasClass(classes.root), true);
    assert.strictEqual(root.hasClass(classes.iconOnly), true);
  });

  it('should render icon', () => {
    const wrapper = mount(<BottomNavigationAction icon={icon} />);
    assert.strictEqual(wrapper.contains(icon), true);
  });

  it('should render label with the selected class', () => {
    const wrapper = mount(<BottomNavigationAction icon={icon} selected />);
    const labelWrapper = wrapper.find(`.${classes.label}`).first();
    assert.strictEqual(labelWrapper.exists(), true);
    assert.strictEqual(labelWrapper.hasClass(classes.selected), true);
  });

  it('should render label with the iconOnly class', () => {
    const wrapper = mount(<BottomNavigationAction icon={icon} showLabel={false} />);
    const labelWrapper = wrapper.find(`.${classes.label}`).first();
    assert.strictEqual(labelWrapper.exists(), true);
    assert.strictEqual(labelWrapper.hasClass(classes.iconOnly), true);
  });

  it('should not render an Icon if icon is not provided', () => {
    const wrapper = mount(<BottomNavigationAction />);
    assert.strictEqual(wrapper.find(Icon).exists(), false);
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const wrapper = mount(
        <BottomNavigationAction icon="book" onClick={handleClick} value="foo" />,
      );
      wrapper.simulate('click', 'bar');
      assert.strictEqual(handleClick.callCount, 1);
    });
  });

  describe('prop: onChange', () => {
    it('should be called when a click is triggered', () => {
      const handleChange = spy();
      const wrapper = mount(
        <BottomNavigationAction icon="book" onChange={handleChange} value="foo" />,
      );
      wrapper.simulate('click', 'bar');
      assert.strictEqual(handleChange.callCount, 1);
    });
  });
});
