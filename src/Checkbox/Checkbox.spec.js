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

  it('should render a SwitchBase when label not present', () => {
    const wrapper = shallow(
      <Checkbox />,
    );
    assert.strictEqual(wrapper.is('SwitchBase'), true, 'should be a SwitchBase');
  });

  it('should render a label', () => {
    const wrapper = shallow(
      <Checkbox label="Foo" />,
    );
    assert.strictEqual(wrapper.is('SelectionLabel'), true, 'should be a SelectionLabel');
  });

  it('should render with the default and checked classes', () => {
    const wrapper = shallow(
      <Checkbox
        checked
        label="Foo"
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
    const wrapper = shallow(<Checkbox label="Foo" data-my-prop="woof" />);
    const switchBase = wrapper.childAt(0);
    assert.strictEqual(switchBase.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });
});
