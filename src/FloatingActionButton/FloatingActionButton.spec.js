/* eslint-env mocha */
import React from 'react';
import {mount, shallow} from 'enzyme';
import {assert} from 'chai';

import FloatingActionButton from './FloatingActionButton';
import FontIcon from '../FontIcon/FontIcon';
import getMuiTheme from '../styles/getMuiTheme';
import ContentAdd from '../svg-icons/content/add';

describe('<FloatingActionButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const mountWithContext = (node) => mount(node, {context: {muiTheme}});

  describe('hover state', () => {
    it('should reset the hover state when disabled', () => {
      const wrapper = shallowWithContext(
        <FloatingActionButton>
          <ContentAdd />
        </FloatingActionButton>
      );
      wrapper.setState({
        hovered: true,
      });
      wrapper.setProps({
        disabled: true,
      });
      assert.strictEqual(wrapper.state().hovered, false, 'should reset the state');
    });
  });

  describe('style', () => {
    it('should apply children style', () => {
      const wrapper = mountWithContext(
        <FloatingActionButton>
          <FontIcon
            className="material-icons"
            style={{
              transform: 'scale(1.5)',
            }}
          >
            add
          </FontIcon>
        </FloatingActionButton>
      );
      assert.strictEqual(
        wrapper.find(FontIcon).props().style.transform,
        'scale(1.5)',
        'should apply inline style'
      );
    });
  });
});
