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
  const testChildren = <img src={tileData.img} />;

  it('renders children by default', () => {
    const wrapper = shallowWithContext(
      <GridTile>{testChildren}</GridTile>
    );

    assert.strictEqual(wrapper.containsMatchingElement(testChildren), true, 'should contain the children');
  });

  it('renders children and className', () => {
    const wrapper = shallowWithContext(
      <GridTile className="testClassName">{testChildren}</GridTile>
    );

    assert.strictEqual(wrapper.containsMatchingElement(testChildren), true, 'should contain the children');
    assert.strictEqual(wrapper.hasClass('testClassName'), true, 'should contain the className');
  });

  it('renders children and title', () => {
    const wrapper = shallowWithContext(
      <GridTile title={tileData.title}>{testChildren}</GridTile>
    );

    assert.strictEqual(wrapper.containsMatchingElement(testChildren), true, 'should contain the children');
    assert.strictEqual(wrapper.children('div').text(),
    tileData.title, 'should contain the title');
  });

  it('renders children and overwrite styles', () => {
    const titleStyle = {
      fontSize: '20px',
    };
    const titleBackground = '#000';
    const wrapper = shallowWithContext(
      <GridTile
        title={tileData.title}
        titleStyle={titleStyle}
        titleBackground={titleBackground}
      >
        {testChildren}
      </GridTile>
    );

    assert.strictEqual(wrapper.containsMatchingElement(testChildren), true, 'should contain the children');
    assert.strictEqual(
      wrapper.find('div').get(0).props.children[1].props.children[0].props.children[0].props.style.fontSize,
      titleStyle.fontSize, 'should overwrite title fontSize');
    assert.strictEqual(
      wrapper.find('div').get(0).props.children[1].props.style.background,
      titleBackground, 'should overwrite titleBar background');
  });
});
