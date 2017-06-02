/* eslint-env mocha */
import React from 'react';
import PropTypes from 'prop-types';
import {mount, shallow} from 'enzyme';
import {assert} from 'chai';
import IconButton from './IconButton';
import FontIcon from '../FontIcon';
import getMuiTheme from '../styles/getMuiTheme';
import TouchRipple from '../internal/TouchRipple';

const dummy = <div />;

describe('<IconButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const mountWithContext = (node) => mount(node, {
    context: {muiTheme},
    childContextTypes: {muiTheme: PropTypes.object},
  });

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

  it('should render children with custom color', () => {
    const wrapper = shallowWithContext(
      <IconButton>
        <FontIcon className="material-icons" color="red">home</FontIcon>
      </IconButton>
    );

    assert.strictEqual(wrapper.find(FontIcon).length, 1, 'should contain the FontIcon child');
    assert.strictEqual(wrapper.find(FontIcon).props().color, 'red', 'FontIcon should have color set to red');
    assert.strictEqual(
      wrapper.find(FontIcon).props().style.color,
      undefined,
      'FontIcon style object has no color property'
    );
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

    it('should override the style prop', () => {
      const buttonStyle = {
        backgroundColor: 'blue',
      };
      const hoveredStyle = {
        backgroundColor: 'green',
      };
      const wrapper = shallowWithContext(
        <IconButton style={buttonStyle} hoveredStyle={hoveredStyle} />
      );

      wrapper.simulate('mouseEnter');

      assert.include(wrapper.props().style, hoveredStyle);
    });
  });
  describe('prop: disabled', () => {
    it('should disable the ripple effect', () => {
      const wrapper = mountWithContext(
        <IconButton disabled={true} />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 0, 'should not contain a TouchRipple descendent');
    });
    it('should not disable the ripple effect if false', () => {
      const wrapper = mountWithContext(
        <IconButton disabled={false} />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 1, 'should contain a TouchRipple descendent');
    });
  });
});
