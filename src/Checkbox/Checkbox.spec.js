// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Checkbox, { styleSheet } from './Checkbox';

describe('<Checkbox />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a SwitchBase', () => {
    const wrapper = shallow(
      <Checkbox />,
    );
    const switchBase = wrapper.childAt(0);
    assert.strictEqual(wrapper.is('label'), true, 'should be a label');
    assert.strictEqual(switchBase.is('SwitchBase'), true, 'should be a SwitchBase');
  });

  it('should render with the default and checked classes', () => {
    const wrapper = shallow(
      <Checkbox
        checked
        labelClassName="foo"
        className="woof"
        checkedClassName="meow"
      />,
    );
    const switchBase = wrapper.childAt(0);
    assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the "foo" class');
    assert.strictEqual(switchBase.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(switchBase.hasClass(classes.default), true, 'should have the default class');
    assert.strictEqual(
      switchBase.prop('checkedClassName').indexOf('meow') !== -1,
      true,
      'should have the "meow" class',
    );
    assert.strictEqual(
      switchBase.prop('checkedClassName').indexOf(classes.checked) !== -1,
      true,
      'should have the checked class',
    );
  });

  it('should spread custom props on the switchBase node', () => {
    const wrapper = shallow(<Checkbox data-my-prop="woof" />);
    const switchBase = wrapper.childAt(0);
    assert.strictEqual(switchBase.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });
});
