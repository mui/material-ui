// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import GridListTile from './GridListTile';

describe('<GridListTile />', () => {
  let shallow;

  before(() => {
    shallow = createShallow({
      dive: true,
    });
  });

  const tileData = {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  };

  it('should render a li', () => {
    const testChildren = <img src={tileData.img} alt="foo" />;
    const wrapper = shallow(
      <GridListTile>
        {testChildren}
      </GridListTile>,
    );
    assert.strictEqual(wrapper.name(), 'li');
  });

  it('should render a ul', () => {
    const testChildren = <img src={tileData.img} alt="foo" />;
    const wrapper = shallow(
      <GridListTile component="li">
        {testChildren}
      </GridListTile>,
    );
    assert.strictEqual(wrapper.name(), 'li');
  });

  describe('prop: children', () => {
    it('should render children by default', () => {
      const testChildren = <img src={tileData.img} alt="foo" />;
      const wrapper = shallow(
        <GridListTile>
          {testChildren}
        </GridListTile>,
      );

      assert.strictEqual(
        wrapper.containsMatchingElement(testChildren),
        true,
        'should contain the children',
      );
    });
  });

  describe('prop: className', () => {
    it('should renders className', () => {
      const testChildren = <img src={tileData.img} alt="foo" />;
      const wrapper = shallow(
        <GridListTile className="foo">
          {testChildren}
        </GridListTile>,
      );

      assert.strictEqual(wrapper.hasClass('foo'), true, 'should contain the className');
    });
  });
});
