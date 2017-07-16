// @flow weak

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import GridTileTitlebar from './GridTileTitlebar';

describe('<GridTileTitlebar />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  const tileData = {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  };

  describe('prop: title', () => {
    it('should renders title', () => {
      const wrapper = shallow(<GridTileTitlebar title={tileData.title} />);

      assert.strictEqual(
        wrapper.children('div').text(),
        tileData.title,
        'should contain the title',
      );
    });
  });
});
