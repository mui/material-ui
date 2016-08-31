// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallowWithContext, createMountWithContext } from 'test/utils';
import Tabs, { styleSheet } from './Tabs';
import Tab from './Tab';

describe('<Tabs />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
    mount = createMountWithContext();
  });

  it('should render with the root class', () => {
    const wrapper = shallow(
      <Tabs>
        <Tab />
      </Tabs>,
    );
    const wrapperDiv = wrapper.childAt(0);
    assert.strictEqual(wrapperDiv.is('div'), true, 'should be a div');
    assert.strictEqual(wrapperDiv.hasClass(classes.root), true, 'should have the root class');
  });

  describe('prop: className', () => {
    it('should render with the user and root classes', () => {
      const wrapper = shallow(
        <Tabs className="woof">
          <Tab />
        </Tabs>,
      );
      const wrapperDiv = wrapper.childAt(0);
      assert.strictEqual(wrapperDiv.hasClass('woof'), true, 'should have the "woof" class');
      assert.strictEqual(wrapperDiv.hasClass(classes.root), true, 'should have the root class');
    });
  });

  describe('prop: index', () => {
    it('should pass selected prop to children', () => {
      const wrapper = shallow(
        <Tabs index={1}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const wrapperDiv = wrapper.childAt(0);
      assert.strictEqual(wrapperDiv.childAt(0).props().selected, false, 'should have selected to false');
      assert.strictEqual(wrapperDiv.childAt(1).props().selected, true, 'should have selected');
    });
  });

  describe('prop: onChange', () => {
    it('should pass selected prop to children', () => {
      const handleChange = spy();
      const wrapper = mount(
        <Tabs index={0} onChange={handleChange}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      wrapper.find(Tab).at(1).simulate('click');
      assert.strictEqual(handleChange.callCount, 1, 'should have been called once');
      assert.strictEqual(handleChange.args[0][1], 1, 'should have been called with index 1');
    });
  });
});
