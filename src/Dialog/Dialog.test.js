// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Paper from '../Paper';
import Fade from '../transitions/Fade';
import Modal from '../Modal';
import Dialog from './Dialog';

describe('<Dialog />', () => {
  let shallow;
  let classes;
  const defaultProps = {
    open: false,
  };

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Dialog {...defaultProps}>foo</Dialog>);
  });

  it('should render a Modal', () => {
    const wrapper = shallow(<Dialog {...defaultProps}>foo</Dialog>);
    assert.strictEqual(wrapper.type(), Modal);
  });

  it('should render a Modal with transition', () => {
    const Transition = props => <div className="cloned-element-class" {...props} />;
    const wrapper = shallow(
      <Dialog {...defaultProps} transition={Transition}>
        foo
      </Dialog>,
    );
    assert.strictEqual(
      wrapper.find(Transition).length,
      1,
      'should include element given in transition',
    );
  });

  it('should put Modal specific props on the root Modal node', () => {
    const onBackdropClick = () => {};
    const onEscapeKeyDown = () => {};
    const onClose = () => {};
    const wrapper = shallow(
      <Dialog
        open
        transitionDuration={100}
        onBackdropClick={onBackdropClick}
        onEscapeKeyDown={onEscapeKeyDown}
        onClose={onClose}
        hideOnBackdropClick={false}
        hideOnEscapeKeyUp={false}
      >
        foo
      </Dialog>,
    );
    assert.strictEqual(wrapper.props().open, true);
    assert.strictEqual(wrapper.props().BackdropProps.transitionDuration, 100);
    assert.strictEqual(wrapper.props().onBackdropClick, onBackdropClick);
    assert.strictEqual(wrapper.props().onEscapeKeyDown, onEscapeKeyDown);
    assert.strictEqual(wrapper.props().onClose, onClose);
    assert.strictEqual(wrapper.props().hideOnBackdropClick, false);
    assert.strictEqual(wrapper.props().hideOnEscapeKeyUp, false);
  });

  it('should spread custom props on the paper (dialog "root") node', () => {
    const wrapper = shallow(
      <Dialog {...defaultProps} data-my-prop="woofDialog">
        foo
      </Dialog>,
    );
    assert.strictEqual(
      wrapper.prop('data-my-prop'),
      'woofDialog',
      'custom prop should be woofDialog',
    );
  });

  it('should render with the user classes on the root node', () => {
    const wrapper = shallow(
      <Dialog {...defaultProps} className="woofDialog">
        foo
      </Dialog>,
    );
    assert.strictEqual(wrapper.hasClass('woofDialog'), true);
  });

  it('should render Fade > Paper > children inside the Modal', () => {
    const children = <p>Hello</p>;
    const wrapper = shallow(<Dialog {...defaultProps}>{children}</Dialog>);

    const fade = wrapper.childAt(0);
    assert.strictEqual(fade.type(), Fade);

    const paper = fade.childAt(0);
    assert.strictEqual(paper.length === 1 && paper.type(), Paper);

    assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the dialog class');
  });

  it('should not be open by default', () => {
    const wrapper = shallow(<Dialog {...defaultProps}>foo</Dialog>);
    assert.strictEqual(wrapper.props().open, false, 'should pass show=false to the Modal');
    assert.strictEqual(wrapper.find(Fade).props().in, false, 'should pass in=false to the Fade');
  });

  it('should be open by default', () => {
    const wrapper = shallow(<Dialog open>foo</Dialog>);
    assert.strictEqual(wrapper.props().open, true, 'should pass show=true to the Modal');
    assert.strictEqual(wrapper.find(Fade).props().in, true, 'should pass in=true to the Fade');
  });

  it('should fade down and make the transition appear on first mount', () => {
    const wrapper = shallow(<Dialog {...defaultProps}>foo</Dialog>);
    assert.strictEqual(
      wrapper.find(Fade).props().appear,
      true,
      'should pass appear=true to the Fade',
    );
  });

  describe('prop: classes', () => {
    it('should add the class on the Paper element', () => {
      const className = 'foo';
      const wrapper = shallow(
        <Dialog {...defaultProps} classes={{ paper: className }}>
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(className), true);
    });
  });

  describe('prop: maxWidth', () => {
    it('should use the right className', () => {
      const wrapper = shallow(
        <Dialog {...defaultProps} maxWidth="xs">
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperWidthXs), true);
    });
  });

  describe('prop: fullWidth', () => {
    it('should set `fullWidth` class if specified', () => {
      const wrapper = shallow(
        <Dialog {...defaultProps} fullWidth>
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullWidth), true);
    });

    it('should not set `fullWidth` class if not specified', () => {
      const wrapper = shallow(<Dialog {...defaultProps}>foo</Dialog>);
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullWidth), false);
    });
  });

  describe('prop: fullScreen', () => {
    it('true should render fullScreen', () => {
      const wrapper = shallow(
        <Dialog {...defaultProps} fullScreen>
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullScreen), true);
    });

    it('false should not render fullScreen', () => {
      const wrapper = shallow(
        <Dialog {...defaultProps} fullScreen={false}>
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullScreen), false);
    });
  });
});
