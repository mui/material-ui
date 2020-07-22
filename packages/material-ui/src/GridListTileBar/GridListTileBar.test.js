import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses, createMount, describeConformance } from 'test/utils';
import GridListTileBar from './GridListTileBar';

describe('<GridListTileBar />', () => {
  let classes;
  const mount = createMount();
  let shallow;

  before(() => {
    classes = getClasses(<GridListTileBar title="classes" />);
    shallow = createShallow({ dive: true });
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

      expect(wrapper.children('div').text()).to.equal(tileData.title);
    });
  });
});
