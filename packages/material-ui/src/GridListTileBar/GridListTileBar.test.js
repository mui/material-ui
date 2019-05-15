import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import GridListTileBar from './GridListTileBar';

describe('<GridListTileBar />', () => {
  let classes;
  let mount;
  let shallow;

  before(() => {
    classes = getClasses(<GridListTileBar title="classes" />);
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<GridListTileBar title="conform?" />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

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
