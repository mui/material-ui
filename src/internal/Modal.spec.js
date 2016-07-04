/* eslint-env mocha */
import React from 'react';
import {assert} from 'chai';
import Modal, {styleSheet} from './Modal';
import {
  createShallowWithContext,
  // createMountWithContext
} from 'test/utils';

describe('<Modal>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should not show by default', () => {
    assert.strictEqual(Modal.defaultProps.show, false, 'should be false by default');
  });

  it('should render null by default', () => {
    const wrapper = shallow(
      <Modal><p>Hello World</p></Modal>
    );
    assert.strictEqual(wrapper.node, null, 'should be null');
  });

  describe('show', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Modal show={true} data-my-prop="woof"><p>Hello World</p></Modal>
      );
    });

    it('should render a portal when shown', () => {
      assert.strictEqual(wrapper.is('Portal'), true, 'should be a Portal');
    });

    it('should render the modal div inside the portal', () => {
      const modal = wrapper.childAt(0);
      assert.strictEqual(modal.is('div'), true, 'should be a div');
      assert.strictEqual(modal.hasClass(classes.modal), true, 'should have the modal class');
    });

    it('should render an overlay wrapped in a fade transition', () => {
      const transition = wrapper.childAt(0).childAt(0);
      assert.strictEqual(transition.is('Fade'), true, 'should be the fade transition');
      assert.strictEqual(transition.prop('in'), true, 'should set the transition to in');
      const overlay = transition.childAt(0);
      assert.strictEqual(overlay.is('Overlay'), true, 'should be the overlay component');
    });
  });

  /**
   * @TODO
   */
  // describe('dom mounting', () => {
  //   let mount;

  //   before(() => mount = createMountWithContext());
  // });
});
