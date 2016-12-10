// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Radio, { styleSheet } from './Radio';

describe('<Radio />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a SwitchBase when label not present', () => {
    const wrapper = shallow(
      <Radio />,
    );
    assert.strictEqual(wrapper.is('SwitchBase'), true, 'should be a SwitchBase');
  });

  it('should render a label', () => {
    const wrapper = shallow(
      <Radio label="Foo" />,
    );
    assert.strictEqual(wrapper.is('SelectionLabel'), true, 'should be a SelectionLabel');
  });

  it('should render with the default and checked classes', () => {
    const wrapper = shallow(<Radio checked className="woof" checkedClassName="meow" />);
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

  it('should spread custom props on the switchBase node', () => {
    const wrapper = shallow(<Radio label="Foo" data-my-prop="woof" />);
    const switchBase = wrapper.find('SwitchBase');
    assert.strictEqual(switchBase.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });

  describe('prop: disabled', () => {
    it('should disable the component', () => {
      const wrapper = shallow(<Radio disabled />);
      assert.strictEqual(wrapper.props().disabled, true, 'should pass the property down the tree');
    });
  });
});
