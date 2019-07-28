import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import TabIndicator from './TabIndicator';

describe('<TabIndicator />', () => {
  let shallow;
  let classes;
  const defaultProps = {
    direction: 'left',
    orientation: 'horizontal',
    color: 'secondary',
  };
  const style = { left: 1, width: 2 };

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TabIndicator {...defaultProps} />);
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<TabIndicator {...defaultProps} />);
    assert.strictEqual(wrapper.name(), 'span');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  describe('prop: style', () => {
    it('should be applied on the root element', () => {
      const wrapper = shallow(<TabIndicator {...defaultProps} style={style} />);
      assert.strictEqual(wrapper.props().style, style, 'should apply directly the property');
    });
  });

  describe('prop: className', () => {
    it('should append the className on the root element', () => {
      const wrapper = shallow(<TabIndicator {...defaultProps} className="foo" />);
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(wrapper.hasClass('foo'), true);
    });
  });
});
