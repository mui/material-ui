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
    assert.strictEqual(wrapper.is('SwitchBase'), true, 'should be a SwitchBase');
  });

  it('should render with the default and checked classes', () => {
    const wrapper = shallow(<Checkbox checked className="woof" checkedClassName="meow" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.default), true, 'should have the default class');
    assert.strictEqual(
      wrapper.prop('checkedClassName').indexOf('meow') !== -1,
      true,
      'should have the "meow" class',
    );
    assert.strictEqual(
      wrapper.prop('checkedClassName').indexOf(classes.checked) !== -1,
      true,
      'should have the checked class',
    );
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<Checkbox data-my-prop="woof" />);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });
});
