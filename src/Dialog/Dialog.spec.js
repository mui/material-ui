// @flow

import * as React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Paper from '../Paper';
import Fade from '../transitions/Fade';
import Dialog from './Dialog';

describe('<Dialog />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Dialog />);
  });

  it('should render a Modal', () => {
    const wrapper = shallow(<Dialog />);
    assert.strictEqual(wrapper.name(), 'withStyles(Modal)');
  });

  it('should render a Modal with transition', () => {
    const wrapper = shallow(<Dialog transition={<div className="cloned-element-class" />} />);
    assert.strictEqual(
      wrapper.find('.cloned-element-class').length,
      1,
      'should include element given in transition',
    );
  });

  it('should put Modal specific props on the root Modal node', () => {
    const onBackdropClick = () => {};
    const onEscapeKeyUp = () => {};
    const onRequestClose = () => {};
    const wrapper = shallow(
      <Dialog
        open
        enterTransitionDuration={100}
        leaveTransitionDuration={100}
        onBackdropClick={onBackdropClick}
        onEscapeKeyUp={onEscapeKeyUp}
        onRequestClose={onRequestClose}
        hideOnBackdropClick={false}
        hideOnEscapeKeyUp={false}
      />,
    );
    assert.strictEqual(wrapper.props().show, true);
    assert.strictEqual(wrapper.props().backdropTransitionDuration, 100);
    assert.strictEqual(wrapper.props().onBackdropClick, onBackdropClick);
    assert.strictEqual(wrapper.props().onEscapeKeyUp, onEscapeKeyUp);
    assert.strictEqual(wrapper.props().onRequestClose, onRequestClose);
    assert.strictEqual(wrapper.props().hideOnBackdropClick, false);
    assert.strictEqual(wrapper.props().hideOnEscapeKeyUp, false);
  });

  it('should spread custom props on the paper (dialog "root") node', () => {
    const wrapper = shallow(<Dialog data-my-prop="woofDialog" />);
    assert.strictEqual(
      wrapper.prop('data-my-prop'),
      'woofDialog',
      'custom prop should be woofDialog',
    );
  });

  it('should render with the user classes on the root node', () => {
    const wrapper = shallow(<Dialog className="woofDialog" />);
    assert.strictEqual(wrapper.hasClass('woofDialog'), true);
  });

  it('should render Fade > Paper > children inside the Modal', () => {
    const children = <p>Hello</p>;
    const wrapper = shallow(
      <Dialog>
        {children}
      </Dialog>,
    );

    const fade = wrapper.childAt(0);
    assert.strictEqual(fade.name(), 'withTheme(Fade)', 'immediate wrapper child should be Fade');

    const paper = fade.childAt(0);
    assert.strictEqual(paper.length === 1 && paper.name(), 'withStyles(Paper)');

    assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the dialog class');
  });

  it('should not be open by default', () => {
    const wrapper = shallow(<Dialog />);
    assert.strictEqual(wrapper.props().show, false, 'should pass show=false to the Modal');
    assert.strictEqual(wrapper.find(Fade).props().in, false, 'should pass in=false to the Fade');
  });

  it('should be open by default', () => {
    const wrapper = shallow(<Dialog open />);
    assert.strictEqual(wrapper.props().show, true, 'should pass show=true to the Modal');
    assert.strictEqual(wrapper.find(Fade).props().in, true, 'should pass in=true to the Fade');
  });

  it('should fade down and make the transition appear on first mount', () => {
    const wrapper = shallow(<Dialog />);
    assert.strictEqual(
      wrapper.find(Fade).prop('transitionAppear'),
      true,
      'should pass transitionAppear=true to the Fade',
    );
  });

  describe('prop: classes', () => {
    it('should add the class on the Paper element', () => {
      const className = 'foo';
      const wrapper = shallow(<Dialog classes={{ paper: className }} />);
      assert.strictEqual(wrapper.find(Paper).hasClass(className), true);
    });
  });

  describe('prop: maxWidth', () => {
    it('should use the right className', () => {
      const wrapper = shallow(<Dialog maxWidth="xs" />);
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperWidthXs), true);
    });
  });

  describe('prop: fullScreen', () => {
    it('true should render fullScreen', () => {
      const wrapper = shallow(<Dialog fullScreen />);
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.fullScreen), true);
    });

    it('false should not render fullScreen', () => {
      const wrapper = shallow(<Dialog fullScreen={false} />);
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.fullScreen), false);
    });
  });
});
