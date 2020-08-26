import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses, createMount, describeConformance } from 'test/utils';
import ImageListTileBar from './ImageListTileBar';

describe('<ImageListTileBar />', () => {
  let classes;
  const mount = createMount();
  let shallow;

  before(() => {
    classes = getClasses(<ImageListTileBar title="classes" />);
    shallow = createShallow({ dive: true });
  });

  describeConformance(<ImageListTileBar title="conform?" />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  const tileData = {
    img: 'images/image-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  };

  describe('prop: title', () => {
    it('should renders title', () => {
      const wrapper = shallow(<ImageListTileBar title={tileData.title} />);

      expect(wrapper.children('div').text()).to.equal(tileData.title);
    });
  });
});
