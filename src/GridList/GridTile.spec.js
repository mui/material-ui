/* eslint-env mocha */

import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import GridTile from './GridTile';
import getMuiTheme from '../styles/getMuiTheme';

describe('<GridTile />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const tileData = {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  };

  describe('prop: children', () => {
    it('should renders children by default', () => {
      const testChildren = <img src={tileData.img} />;
      const wrapper = shallowWithContext(
        <GridTile>{testChildren}</GridTile>
      );

      assert.strictEqual(wrapper.containsMatchingElement(testChildren), true,
        'should contain the children');
    });
  });

  describe('prop: className', () => {
    it('should renders className', () => {
      const wrapper = shallowWithContext(
        <GridTile className="foo" />
      );

      assert.strictEqual(wrapper.hasClass('foo'), true,
        'should contain the className');
    });
  });

  describe('prop: title', () => {
    it('should renders title', () => {
      const wrapper = shallowWithContext(
        <GridTile title={tileData.title} />
      );

      assert.strictEqual(wrapper.children('div').text(), tileData.title,
        'should contain the title');
    });
  });

  describe('prop: titleStyle', () => {
    it('should overwrite styles', () => {
      const titleStyle = {
        fontSize: 20,
      };
      const wrapper = shallowWithContext(
        <GridTile title="foo" titleStyle={titleStyle} />
      );

      assert.strictEqual(wrapper.find('div > div > div > div').props().style.fontSize,
        titleStyle.fontSize, 'should overwrite title fontSize');
    });
  });
});
