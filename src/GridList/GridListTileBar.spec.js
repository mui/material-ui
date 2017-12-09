import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import GridListTileBar from './GridListTileBar';

describe('<GridListTileBar />', () => {
  let shallow;

  before(() => {
    shallow = createShallow({ dive: true });
  });

  const tileData = {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  };

  describe('prop: title', () => {
    it('should renders title', () => {
      const wrapper = shallow(<GridListTileBar title={tileData.title} />);

      assert.strictEqual(
        wrapper.children('div').text(),
        tileData.title,
        'should contain the title',
      );
    });
  });
});
