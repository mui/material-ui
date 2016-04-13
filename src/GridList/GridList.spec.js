/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import GridList from './GridList';
import getMuiTheme from '../styles/getMuiTheme';

describe('<GridList />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  const tilesData = [
    {
      img: 'images/grid-list/00-52-29-429_640.jpg',
      title: 'Breakfast',
      author: 'jill111',
    },
    {
      img: 'images/grid-list/burger-827309_640.jpg',
      title: 'Tasty burger',
      author: 'pashminu',
    },
  ];

  it('renders children and change cellHeight', () => {
    const cellHeight = 250;
    const wrapper = shallowWithContext(
      <GridList cellHeight={cellHeight}>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
          >
            <img src={tile.img} />
          </span>
        ))}
      </GridList>
    );

    assert.equal(wrapper.find('.grid-tile').length, 2, 'should contain the children');
    assert.equal(wrapper.children().at(0).prop('style').height, cellHeight + 4, 'should have height to 254');
  });

  it('renders children by default', () => {
    const wrapper = shallowWithContext(
      <GridList>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
          >
            <img src={tile.img} />
          </span>
        ))}
      </GridList>
    );

    assert.equal(wrapper.find('.grid-tile').length, 2, 'should contain the children');
  });

  it('renders children and change cols', () => {
    const wrapper = shallowWithContext(
      <GridList cols={4}>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
          >
            <img src={tile.img} />
          </span>
        ))}
      </GridList>
    );

    assert.equal(wrapper.find('.grid-tile').length, 2, 'should contain the children');
    assert.equal(wrapper.children().at(0).prop('style').width, '25%', 'should have 25% of width');
  });

  it('renders children and change padding', () => {
    const padding = 10;
    const wrapper = shallowWithContext(
      <GridList padding={padding}>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
          >
            <img src={tile.img} />
          </span>
        ))}
      </GridList>
    );

    assert.equal(wrapper.find('.grid-tile').length, 2, 'should contain the children');
    assert.equal(wrapper.children().at(0).prop('style').padding, padding / 2, 'should have 5 of padding');
  });

  it('renders children and overwrite style', () => {
    const style = {
      backgroundColor: 'red',
    };
    const wrapper = shallowWithContext(
      <GridList style={style}>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
          >
            <img src={tile.img} />
          </span>
        ))}
      </GridList>
    );

    assert.equal(wrapper.find('.grid-tile').length, 2, 'should contain the children');
    assert.equal(wrapper.prop('style').backgroundColor, style.backgroundColor, 'should have a red backgroundColor');
  });
});
