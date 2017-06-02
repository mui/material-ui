/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Tabs from './Tabs';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Tabs />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const Tab = () => <div />;
  Tab.muiName = 'Tab';

  describe('uncontrolled', () => {
    it('should set the right tab active', () => {
      const wrapper = shallowWithContext(
        <Tabs>
          <Tab />
          <Tab />
        </Tabs>
      );

      assert.strictEqual(wrapper.state().selectedIndex, 0);
    });
  });

  describe('prop: value', () => {
    it('should set the right tab active', () => {
      const wrapper = shallowWithContext(
        <Tabs value="2">
          <Tab value="1" />
          <Tab value="2" />
        </Tabs>
      );

      assert.strictEqual(wrapper.state().selectedIndex, 1);
    });

    it('should set the right tab active when the children change', () => {
      const wrapper = shallowWithContext(
        <Tabs value="2">
          <Tab value="1" />
          <Tab value="2" />
        </Tabs>
      );

      wrapper.setProps({
        children: [
          <Tab value="2" />,
          <Tab value="3" />,
        ],
      });

      assert.strictEqual(wrapper.state().selectedIndex, 0);
    });
  });
});
