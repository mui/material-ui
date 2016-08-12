/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';

import FloatingActionButton from './FloatingActionButton';
import getMuiTheme from '../styles/getMuiTheme';
import ContentAdd from '../svg-icons/content/add';

describe('<FloatingActionButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

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
});
