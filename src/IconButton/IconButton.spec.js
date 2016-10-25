/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import IconButton from './IconButton';
import getMuiTheme from '../styles/getMuiTheme';

const dummy = <div />;

describe('<IconButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('renders an enhanced button', () => {
    const wrapper = shallowWithContext(
      <IconButton>Button</IconButton>
    );
    assert.strictEqual(wrapper.is('EnhancedButton'), true);
  });

  it('renders children', () => {
    const wrapper = shallowWithContext(
      <IconButton>{dummy}</IconButton>
    );
    assert.strictEqual(wrapper.containsMatchingElement(dummy), true, 'should contain the children');
  });

  describe('prop: hoveredStyle', () => {
    it('should apply the style when hovered', () => {
      const hoveredStyle = {
        backgroundColor: 'blue',
      };
      const wrapper = shallowWithContext(
        <IconButton hoveredStyle={hoveredStyle} />
      );

      wrapper.simulate('mouseEnter');

      assert.include(wrapper.props().style, hoveredStyle);
    });
  });
});
