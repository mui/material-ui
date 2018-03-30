import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import TabIndicator from './TabIndicator';

describe('<TabIndicator />', () => {
  let shallow;
  let classes;
  const style = { left: 1, width: 2 };

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TabIndicator color="secondary" style={style} />);
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<TabIndicator color="secondary" style={style} />);
    assert.strictEqual(wrapper.name(), 'span');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  describe('prop: style', () => {
    it('should be applied on the root element', () => {
      const wrapper = shallow(<TabIndicator color="secondary" style={style} />);
      assert.strictEqual(wrapper.props().style, style, 'should apply directly the property');
    });
  });

  describe('prop: className', () => {
    it('should append the className on the root element', () => {
      const wrapper = shallow(<TabIndicator color="secondary" style={style} className="foo" />);
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the property class');
    });
  });

  describe('prop: color', () => {
    it('should use the style when color is a string', () => {
      const color = 'blue';
      const wrapper = shallow(<TabIndicator color={color} style={style} />);

      assert.strictEqual(wrapper.props().style.backgroundColor, color);
      assert.strictEqual(wrapper.props().style.left, 1);
      assert.strictEqual(wrapper.props().style.width, 2);
    });
  });
});
