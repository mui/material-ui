/* eslint-env mocha */
import React from 'react';
import { assert } from 'chai';
import Dialog, { styleSheet } from './Dialog';
import { createShallowWithContext } from 'test/utils';

describe('<Dialog>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, { group: 'mui' });
  });

  it('should render a Modal', () => {
    const wrapper = shallow(<Dialog />);
    assert.strictEqual(wrapper.is('Modal'), true, 'should be a Modal');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<Dialog data-my-prop="woof" />);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });

  it('should render with the user classes', () => {
    const wrapper = shallow(<Dialog className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
  });

  it('should render Slide > div > Paper > children inside the Modal', () => {
    const children = <p>Hello</p>;
    const wrapper = shallow(<Dialog>{children}</Dialog>);

    const slide = wrapper.childAt(0);
    assert.strictEqual(
      slide.length === 1 && slide.is('Slide'),
      true,
      'immediate wrapper child should be Slide'
    );

    const container = slide.childAt(0);
    assert.strictEqual(
      container.length === 1 && container.is('div'),
      true,
      'Slide child should be div'
    );

    assert.strictEqual(container.hasClass(classes.container), true, 'should have the container class');

    const paper = container.childAt(0);
    assert.strictEqual(
      paper.length === 1 && paper.is('Paper'),
      true,
      'container child should be Paper'
    );

    assert.strictEqual(paper.hasClass(classes.dialog), true, 'should have the dialog class');
  });

  it('should not be open by default', () => {
    const wrapper = shallow(<Dialog />);
    assert.strictEqual(wrapper.prop('show'), false, 'should pass show=false to the Modal');
    assert.strictEqual(wrapper.find('Slide').prop('in'), false, 'should pass in=false to the Slide');
  });

  it('should be open by default', () => {
    const wrapper = shallow(<Dialog open />);
    assert.strictEqual(wrapper.prop('show'), true, 'should pass show=true to the Modal');
    assert.strictEqual(wrapper.find('Slide').prop('in'), true, 'should pass in=true to the Slide');
  });

  it('should slide down and make the transition appear on first mount', () => {
    const wrapper = shallow(<Dialog />);
    assert.strictEqual(
      wrapper.find('Slide').prop('transitionAppear'),
      true,
      'should pass transitionAppear=true to the Slide'
    );
    assert.strictEqual(
      wrapper.find('Slide').prop('direction'),
      'down',
      'should pass direction=down to the Slide'
    );
  });
});
