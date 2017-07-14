// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import TabIndicator, { styleSheet } from './TabIndicator';

describe('<TabIndicator />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<TabIndicator color="accent" style={{}} />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  describe('prop: style', () => {
    it('should be applied on the root element', () => {
      const style = {};
      const wrapper = shallow(<TabIndicator color="accent" style={style} />);
      assert.strictEqual(wrapper.props().style, style, 'should apply directly the property');
    });
  });

  describe('prop: className', () => {
    it('should append the className on the root element', () => {
      const wrapper = shallow(<TabIndicator color="accent" style={{}} className="foo" />);
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the property class');
    });
  });

  describe('prop: color', () => {
    it('should use the style when color is a string', () => {
      const color = 'blue';
      const wrapper = shallow(<TabIndicator color={color} style={{ foo: 'bar' }} />);

      assert.strictEqual(wrapper.props().style.backgroundColor, color);
      assert.strictEqual(wrapper.props().style.foo, 'bar');
    });
  });
});
