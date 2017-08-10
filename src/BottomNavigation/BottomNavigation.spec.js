// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, getClasses } from '../test-utils';
import BottomNavigationButton from './BottomNavigationButton';
import Icon from '../Icon';
import BottomNavigation, { styleSheet } from './BottomNavigation';

describe('<BottomNavigation />', () => {
  let shallow;
  let mount;
  let classes;
  const icon = <Icon>restore</Icon>;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render with the root class', () => {
    const wrapper = shallow(
      <BottomNavigation showLabels>
        <BottomNavigationButton icon={icon} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(
      <BottomNavigation showLabels className="woofBottomNavigation">
        <BottomNavigationButton icon={icon} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.hasClass('woofBottomNavigation'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should pass selected prop to children', () => {
    const wrapper = shallow(
      <BottomNavigation showLabels value={1}>
        <BottomNavigationButton icon={icon} />
        <BottomNavigationButton icon={icon} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.childAt(0).props().selected, false, 'should have selected to false');
    assert.strictEqual(wrapper.childAt(1).props().selected, true, 'should have selected');
  });

  it('should overwrite parent showLabel prop', () => {
    const wrapper = shallow(
      <BottomNavigation showLabels value={1}>
        <BottomNavigationButton icon={icon} />
        <BottomNavigationButton icon={icon} showLabel={false} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.childAt(0).props().showLabel, true, 'should have parent showLabel');
    assert.strictEqual(wrapper.childAt(1).props().showLabel, false, 'should overwrite showLabel');
  });

  it('should pass selected prop to children', () => {
    const handleChange = spy();
    const wrapper = mount(
      <BottomNavigation showLabels value={0} onChange={handleChange}>
        <BottomNavigationButton icon={icon} />
        <BottomNavigationButton icon={icon} />
      </BottomNavigation>,
    );
    wrapper.find(BottomNavigationButton).at(1).simulate('click');
    assert.strictEqual(handleChange.callCount, 1, 'should have been called once');
    assert.strictEqual(handleChange.args[0][1], 1, 'should have been called with value 1');
  });
});
