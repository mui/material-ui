// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Drawer, { styleSheet } from './Drawer';

/**
 * An item that goes in lists.
 */
describe('<Drawer>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
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

    assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the paper class');
  });

  it('should set the Paper className', () => {
    const wrapper = shallow(<Drawer paperClassName="woof"><h1>Hello</h1></Drawer>);
    const paper = wrapper.find('Paper');
    assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the paper class');
    assert.strictEqual(paper.hasClass('woof'), true, 'should have the woof class');
  });

  it('should be closed by default', () => {
    const wrapper = shallow(<Drawer><h1>Hello</h1></Drawer>);

    const modal = wrapper;
    const slide = modal.find('Slide');

    assert.strictEqual(modal.prop('show'), false, 'should not show the modal');
    assert.strictEqual(slide.prop('in'), false, 'should not transition in');
  });

  describe('opening and closing', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<Drawer><h1>Hello</h1></Drawer>);
    });

    it('should start closed', () => {
      assert.strictEqual(wrapper.prop('show'), false, 'should not show the modal');
      assert.strictEqual(wrapper.find('Slide').prop('in'), false, 'should not transition in');
    });

    it('should open', () => {
      wrapper.setProps({ open: true });
      assert.strictEqual(wrapper.prop('show'), true, 'should show the modal');
      assert.strictEqual(wrapper.find('Slide').prop('in'), true, 'should transition in');
    });

    it('should close', () => {
      wrapper.setProps({ open: false });
      assert.strictEqual(wrapper.prop('show'), false, 'should not show the modal');
      assert.strictEqual(wrapper.find('Slide').prop('in'), false, 'should not transition in');
    });
  });

  describe('docked', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<Drawer docked><h1>Hello</h1></Drawer>);
    });

    it('should render a div instead of a Modal when docked', () => {
      assert.strictEqual(wrapper.is('div'), true, 'should be a div element');
      assert.strictEqual(wrapper.hasClass(classes.docked), true, 'should have the docked class');
    });

    it('should render Slide > Paper inside the div', () => {
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

  describe('getSlideDirection', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<Drawer><h1>Hello</h1></Drawer>);
    });

    it('should return the opposing slide direction', () => {
      assert.strictEqual(wrapper.instance().getSlideDirection('left'), 'right');
      assert.strictEqual(wrapper.instance().getSlideDirection('right'), 'left');
      assert.strictEqual(wrapper.instance().getSlideDirection('top'), 'down');
      assert.strictEqual(wrapper.instance().getSlideDirection('bottom'), 'up');
    });
  });
});
