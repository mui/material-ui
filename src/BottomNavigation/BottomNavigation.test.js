import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, getClasses } from '../test-utils';
import BottomNavigationAction from './BottomNavigationAction';
import Icon from '../Icon';
import BottomNavigation from './BottomNavigation';

describe('<BottomNavigation />', () => {
  let shallow;
  let mount;
  let classes;
  const icon = <Icon>restore</Icon>;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(
      <BottomNavigation showLabels value={0}>
        <BottomNavigationAction icon={icon} />
      </BottomNavigation>,
    );
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('renders with a null child', () => {
    const wrapper = shallow(
      <BottomNavigation showLabels value={0}>
        <BottomNavigationAction label="One" />
        {null}
        <BottomNavigationAction label="Three" />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.find(BottomNavigationAction).length, 2);
  });

  it('should render with the root class', () => {
    const wrapper = shallow(
      <BottomNavigation showLabels value={0}>
        <BottomNavigationAction icon={icon} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(
      <BottomNavigation showLabels value={0} className="woofBottomNavigation">
        <BottomNavigationAction icon={icon} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.hasClass('woofBottomNavigation'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should pass selected prop to children', () => {
    const wrapper = shallow(
      <BottomNavigation showLabels value={1}>
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction icon={icon} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.childAt(0).props().selected, false, 'should have selected to false');
    assert.strictEqual(wrapper.childAt(1).props().selected, true, 'should have selected');
  });

  it('should overwrite parent showLabel prop', () => {
    const wrapper = shallow(
      <BottomNavigation showLabels value={1}>
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction icon={icon} showLabel={false} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.childAt(0).props().showLabel, true, 'should have parent showLabel');
    assert.strictEqual(wrapper.childAt(1).props().showLabel, false, 'should overwrite showLabel');
  });

  it('should pass selected prop to children', () => {
    const handleChange = spy();
    const wrapper = mount(
      <BottomNavigation showLabels value={0} onChange={handleChange}>
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction icon={icon} />
      </BottomNavigation>,
    );
    wrapper
      .find(BottomNavigationAction)
      .at(1)
      .simulate('click');
    assert.strictEqual(handleChange.callCount, 1, 'should have been called once');
    assert.strictEqual(handleChange.args[0][1], 1, 'should have been called with value 1');
  });

  it('should use custom action values', () => {
    const handleChange = spy();
    const wrapper = mount(
      <BottomNavigation showLabels value={'first'} onChange={handleChange}>
        <BottomNavigationAction value="first" icon={icon} />
        <BottomNavigationAction value="second" icon={icon} />
      </BottomNavigation>,
    );
    wrapper
      .find(BottomNavigationAction)
      .at(1)
      .simulate('click');
    assert.strictEqual(
      handleChange.args[0][1],
      'second',
      'should have been called with value second',
    );
  });

  it('should handle also empty action value', () => {
    const handleChange = spy();
    const wrapper = mount(
      <BottomNavigation showLabels value="val" onChange={handleChange}>
        <BottomNavigationAction value="" icon={icon} />
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction value={null} icon={icon} />
      </BottomNavigation>,
    );
    wrapper
      .find(BottomNavigationAction)
      .at(0)
      .simulate('click');
    assert.strictEqual(handleChange.args[0][1], '');
    wrapper
      .find(BottomNavigationAction)
      .at(1)
      .simulate('click');
    assert.strictEqual(handleChange.args[1][1], 1);
    wrapper
      .find(BottomNavigationAction)
      .at(2)
      .simulate('click');
    assert.strictEqual(handleChange.args[2][1], null);
  });
});
