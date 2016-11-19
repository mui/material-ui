// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallowWithContext, createMountWithContext } from 'test/utils';
import BottomNavigation, { styleSheet } from './BottomNavigation';
import BottomNavigationButton from './BottomNavigationButton';

describe('<BottomNavigation />', () => {
  let shallow;
  let mount;
  let classes;
  const icon = <span className="material-icons">restore</span>;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
    mount = createMountWithContext();
  });

  it('should render a div', () => {
    const wrapper = shallow(
      <BottomNavigation showLabel>
        <BottomNavigationButton icon={icon} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.is('div'), true, 'should be a div');
  });

  it('should render with the root class', () => {
    const wrapper = shallow(
      <BottomNavigation showLabel>
        <BottomNavigationButton icon={icon} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(
      <BottomNavigation showLabel className="woof">
        <BottomNavigationButton icon={icon} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should pass selected prop to children', () => {
    const wrapper = shallow(
      <BottomNavigation
        showLabel
        className="woof"
        selectedIndex={1}
      >
        <BottomNavigationButton icon={icon} />
        <BottomNavigationButton icon={icon} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.childAt(0).props().selected, false, 'should have selected to false');
    assert.strictEqual(wrapper.childAt(1).props().selected, true, 'should have selected');
  });

  it('should overwrite parent showLabel prop', () => {
    const wrapper = shallow(
      <BottomNavigation
        showLabel
        className="woof"
        selectedIndex={1}
      >
        <BottomNavigationButton icon={icon} />
        <BottomNavigationButton icon={icon} showLabel={false} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.childAt(0).props().showLabel, true, 'should have parent showLabel');
    assert.strictEqual(wrapper.childAt(1).props().showLabel, false, 'should overwrite showLabel');
  });

  it('should pass selected prop to children', () => {
    const handleChangeIndex = spy();
    const wrapper = mount(
      <BottomNavigation
        showLabel
        className="woof"
        selectedIndex={0}
        onChangeIndex={handleChangeIndex}
      >
        <BottomNavigationButton icon={icon} />
        <BottomNavigationButton icon={icon} />
      </BottomNavigation>,
    );
    wrapper.childAt(1).childAt(0).simulate('click');
    assert.strictEqual(handleChangeIndex.callCount, 1, 'should have been called once');
    assert.strictEqual(handleChangeIndex.args[0][0], 1, 'should have been called with index 1');
  });
});
