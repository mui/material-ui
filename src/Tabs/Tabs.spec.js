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
      assert.strictEqual(wrapper.find('Tab').at(0).prop('selected'), true);
      assert.strictEqual(wrapper.find('Tab').at(1).prop('selected'), false);
      assert.strictEqual(wrapper.find('InkBar').prop('left'), '0%');
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
      assert.strictEqual(wrapper.find('Tab').at(0).prop('selected'), false);
      assert.strictEqual(wrapper.find('Tab').at(1).prop('selected'), true);
      assert.strictEqual(wrapper.find('InkBar').prop('left'), '50%');
    });

    it('should still use the value prop even after another tab is selected if value stays the same', () => {
      const wrapper = shallowWithContext(
        <Tabs value="2">
          <Tab value="1" />
          <Tab value="2" />
        </Tabs>
      );

      wrapper.setState({selectedIndex: 0});

      assert.strictEqual(wrapper.state().selectedIndex, 0);
      assert.strictEqual(wrapper.find('Tab').at(0).prop('selected'), false);
      assert.strictEqual(wrapper.find('Tab').at(1).prop('selected'), true);
      assert.strictEqual(wrapper.find('InkBar').prop('left'), '50%');
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
      assert.strictEqual(wrapper.find('Tab').at(0).prop('selected'), true);
      assert.strictEqual(wrapper.find('Tab').at(1).prop('selected'), false);
      assert.strictEqual(wrapper.find('InkBar').prop('left'), '0%');
    });
  });
});
