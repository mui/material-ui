// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import InputAction from './InputAction';

describe('<InputAction />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: InputAction });
    classes = getClasses(<InputAction />);
  });

  it('should render a div', () => {
    const wrapper = shallow(<InputAction />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<InputAction className="woofInputAction" />);
    assert.strictEqual(wrapper.hasClass('woofInputAction'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<InputAction other="woofInputAction" />);
    assert.strictEqual(wrapper.prop('other'), 'woofInputAction');
  });

  it('should render Chidren', () => {
    const wrapper = shallow(<InputAction>Foo</InputAction>);
    assert.strictEqual(wrapper.childAt(0).node, 'Foo');
  });
});
