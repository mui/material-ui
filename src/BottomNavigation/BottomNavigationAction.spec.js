import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, getClasses } from '../test-utils';
import Icon from '../Icon';
import BottomNavigationAction from './BottomNavigationAction';

describe('<BottomNavigationAction />', () => {
  let shallow;
  let classes;
  const icon = <Icon>restore</Icon>;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<BottomNavigationAction />);
  });

  it('should render a ButtonBase', () => {
    shallow(<BottomNavigationAction icon={icon} />);
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(
      <BottomNavigationAction className="woofBottomNavigationAction" icon={icon} />,
    );
    assert.strictEqual(wrapper.hasClass('woofBottomNavigationAction'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the selected and root classes', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} selected />);
    assert.strictEqual(wrapper.hasClass(classes.selected), true, 'should have the selected class');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the selectedIconOnly and root classes', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} showLabel={false} />);
    assert.strictEqual(
      wrapper.hasClass(classes.selectedIconOnly),
      true,
      'should have the selectedIconOnly class',
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render icon', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} />);
    assert.strictEqual(wrapper.contains(icon), true, 'should have the icon');
  });

  it('should render label with the labelSelected class', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} selected />);
    const labelWrapper = wrapper.childAt(0).childAt(1);
    assert.strictEqual(labelWrapper.hasClass(classes.labelSelected), true);
    assert.strictEqual(labelWrapper.hasClass(classes.label), true);
  });

  it('should render label with the labelHidden class', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} showLabel={false} />);
    const labelWrapper = wrapper.childAt(0).childAt(1);
    assert.strictEqual(
      labelWrapper.hasClass(classes.labelHidden),
      true,
      'should have the labelHidden class',
    );
    assert.strictEqual(labelWrapper.hasClass(classes.label), true, 'should have the label class');
  });

  it('should not render an Icon if icon is not provided', () => {
    const wrapper = shallow(<BottomNavigationAction />);
    assert.strictEqual(wrapper.find(Icon).exists(), false);
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const wrapper = shallow(
        <BottomNavigationAction icon="book" onClick={handleClick} value="foo" />,
      );
      wrapper.simulate('click', 'bar');
      assert.strictEqual(handleClick.callCount, 1, 'it should forward the onClick');
    });
  });

  describe('prop: onChange', () => {
    it('should be called when a click is triggered', () => {
      const handleChange = spy();
      const wrapper = shallow(
        <BottomNavigationAction icon="book" onChange={handleChange} value="foo" />,
      );
      wrapper.simulate('click', 'bar');
      assert.strictEqual(handleChange.callCount, 1, 'it should forward the onChange');
    });
  });
});
