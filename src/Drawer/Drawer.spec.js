/* eslint-env mocha */
import React from 'react';
import {assert} from 'chai';
import Drawer, {styleSheet} from './Drawer';
import {createShallowWithContext} from 'test/utils';

/**
 * An item that goes in lists.
 */
describe('<Drawer>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, {group: 'mui'});
  });

  it('should render a Modal', () => {
    const wrapper = shallow(
      <Drawer />
    );
    assert.strictEqual(wrapper.is('Modal'), true, 'should be a Modal');
  });

  it('should render Slide > Paper inside the Modal', () => {
    const wrapper = shallow(
      <Drawer />
    );
    const slide = wrapper.childAt(0);
    assert.strictEqual(
      slide.length === 1 && slide.is('Slide'),
      true,
      'immediate wrapper child should be Slide'
    );
    const paper = slide.childAt(0);
    assert.strictEqual(
      paper.length === 1 && paper.is('Paper'),
      true,
      'Slide child should be Paper'
    );
  });
});
