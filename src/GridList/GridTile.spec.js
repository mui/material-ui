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

    assert.ok(wrapper.containsMatchingElement(testChildren), 'should contain the children');
  });

  it('renders children and className', () => {
    const wrapper = shallowWithContext(
      <GridTile className="testClassName">{testChildren}</GridTile>
    );

    assert.ok(wrapper.containsMatchingElement(testChildren), 'should contain the children');
    assert.ok(wrapper.is('.testClassName'), 'should contain the className');
  });

  it('renders children and title', () => {
    const wrapper = shallowWithContext(
      <GridTile title={tileData.title}>{testChildren}</GridTile>
    );

    assert.ok(wrapper.containsMatchingElement(testChildren), 'should contain the children');
    assert.equal(wrapper.children('div').text(),
    tileData.title, 'should contain the title');
  });

  it('renders children and overwrite title styles', () => {
    const titleStyle = {
      fontSize: '20px',
    };
    const wrapper = shallowWithContext(
      <GridTile titleStyle={titleStyle}>{testChildren}</GridTile>
    );

    assert.ok(wrapper.containsMatchingElement(testChildren), 'should contain the children');
    assert.equal(wrapper.find('div').node.props.titleStyle.fontSize,
    titleStyle.fontSize, 'should overwrite title fontSize');
  });
});
