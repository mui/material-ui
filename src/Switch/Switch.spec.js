// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Switch, { styleSheet } from './Switch';

describe('<Switch>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, { group: 'mui' });
  });

  it('should render a SwitchBase inside a div', () => {
    const wrapper = shallow(
      <Switch />
    );
    assert.strictEqual(wrapper.is('div'), true, 'should be a div');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.childAt(0).is('SwitchBase'), true, 'should be a SwitchBase');
  });

  it('should render with the default and checked classes', () => {
    const wrapper = shallow(<Switch checked className="woof" checkedClassName="meow" />);
    assert.strictEqual(wrapper.childAt(0).hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.default), true, 'should have the default class');
    assert.strictEqual(
      wrapper.childAt(0).prop('checkedClassName').indexOf('meow') !== -1,
      true,
      'should have the "meow" class'
    );
    assert.strictEqual(
      wrapper.childAt(0).prop('checkedClassName').indexOf(classes.checked) !== -1,
      true,
      'should have the checked class'
    );
  });

  it('should spread custom props on the SwitchBase node', () => {
    const wrapper = shallow(<Switch data-my-prop="woof" />);
    assert.strictEqual(wrapper.childAt(0).prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });
});
