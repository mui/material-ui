// @flow

import * as React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import GridList from './GridList';

const tilesData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'director90',
  },
];

describe('<GridList />', () => {
  let shallow;

  before(() => {
    shallow = createShallow({
      dive: true,
    });
  });

  it('should render a ul', () => {
    const wrapper = shallow(
      <GridList>
        <br />
      </GridList>,
    );
    assert.strictEqual(wrapper.name(), 'ul');
  });

  it('should render a ul', () => {
    const wrapper = shallow(
      <GridList component="ul">
        <br />
      </GridList>,
    );
    assert.strictEqual(wrapper.name(), 'ul');
  });

  it('should render children and change cellHeight', () => {
    const cellHeight = 250;
    const wrapper = shallow(
      <GridList cellHeight={cellHeight}>
        {tilesData.map(tile =>
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={
              <span>
                by: {tile.author}
              </span>
            }
          >
            <img src={tile.img} alt="foo" />
          </span>,
        )}
      </GridList>,
    );

    assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');
    assert.strictEqual(
      wrapper.children().at(0).prop('style').height,
      cellHeight + 4,
      'should have height to 254',
    );
  });

  it('renders children by default', () => {
    const wrapper = shallow(
      <GridList>
        {tilesData.map(tile =>
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={
              <span>
                by: {tile.author}
              </span>
            }
          >
            <img src={tile.img} alt="foo" />
          </span>,
        )}
      </GridList>,
    );

    assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');
  });

  it('renders children and change cols', () => {
    const wrapper = shallow(
      <GridList cols={4}>
        {tilesData.map(tile =>
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={
              <span>
                by: {tile.author}
              </span>
            }
          >
            <img src={tile.img} alt="foo" />
          </span>,
        )}
      </GridList>,
    );

    assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');
    assert.strictEqual(
      wrapper.children().at(0).prop('style').width,
      '25%',
      'should have 25% of width',
    );
  });

  it('renders children and change spacing', () => {
    const spacing = 10;
    const wrapper = shallow(
      <GridList spacing={spacing}>
        {tilesData.map(tile =>
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={
              <span>
                by: {tile.author}
              </span>
            }
          >
            <img src={tile.img} alt="foo" />
          </span>,
        )}
      </GridList>,
    );

    assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');
    assert.strictEqual(
      wrapper.children().at(0).prop('style').padding,
      spacing / 2,
      'should have 5 of padding',
    );
  });

  it('should render children and overwrite style', () => {
    const style = {
      backgroundColor: 'red',
    };
    const wrapper = shallow(
      <GridList style={style}>
        {tilesData.map(tile =>
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={
              <span>
                by: {tile.author}
              </span>
            }
          >
            <img src={tile.img} alt="foo" />
          </span>,
        )}
      </GridList>,
    );

    assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');
    assert.strictEqual(
      wrapper.prop('style').backgroundColor,
      style.backgroundColor,
      'should have a red backgroundColor',
    );
  });

  describe('prop: cellHeight', () => {
    it('should accept auto as a property', () => {
      const wrapper = shallow(
        <GridList cellHeight="auto">
          <br />
        </GridList>,
      );

      assert.strictEqual(wrapper.children().at(0).props().style.height, 'auto');
    });
  });
});
