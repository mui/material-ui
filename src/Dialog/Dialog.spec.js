// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Dialog, { styleSheet } from './Dialog';

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

  it('should put Modal specific props on the root Modal node', () => {
    const onBackdropClick = () => {};
    const onEscapeKeyUp = () => {};
    const onRequestClose = () => {};
    const wrapper = shallow(
      <Dialog
        open
        transitionDuration={100}
        onBackdropClick={onBackdropClick}
        onEscapeKeyUp={onEscapeKeyUp}
        onRequestClose={onRequestClose}
        hideOnBackdropClick={false}
        hideOnEscapeKeyUp={false}
      />
    );
    assert.strictEqual(wrapper.prop('show'), true);
    assert.strictEqual(wrapper.prop('backdropTransitionDuration'), 100);
    assert.strictEqual(wrapper.prop('onBackdropClick'), onBackdropClick);
    assert.strictEqual(wrapper.prop('onEscapeKeyUp'), onEscapeKeyUp);
    assert.strictEqual(wrapper.prop('onRequestClose'), onRequestClose);
    assert.strictEqual(wrapper.prop('hideOnBackdropClick'), false);
    assert.strictEqual(wrapper.prop('hideOnEscapeKeyUp'), false);
  });

  it('should spread custom props on the paper (dialog "root") node', () => {
    const wrapper = shallow(<Dialog data-my-prop="woof" />);
    assert.strictEqual(wrapper.find('Paper').prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });

  it('should render with the user classes on the paper (dialog "root") node', () => {
    const wrapper = shallow(<Dialog className="woof" />);
    assert.strictEqual(wrapper.find('Paper').hasClass('woof'), true, 'should have the "woof" class');
  });

  it('should render Slide > Paper > children inside the Modal', () => {
    const children = <p>Hello</p>;
    const wrapper = shallow(<Dialog>{children}</Dialog>);

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
      'slide child should be Paper'
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
