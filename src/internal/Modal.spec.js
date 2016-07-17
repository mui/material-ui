/* eslint-env mocha */
import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import contains from 'dom-helpers/query/contains';
import Modal, { styleSheet } from './Modal';
import {
  createShallowWithContext,
  createMountWithContext,
} from 'test/utils';

describe('<Modal>', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, { group: 'mui' });
    mount = createMountWithContext();
  });
  after(() => mount.cleanUp());

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
        <Modal show data-my-prop="woof"><p>Hello World</p></Modal>
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
  });

  describe('backdrop', () => {
    let wrapper;

    before(() => wrapper = shallow(
      <Modal show id="modal">
        <div id="container">
          <h1 id="heading">Hello</h1>
        </div>
      </Modal>
    ));

    it('should render a backdrop wrapped in a fade transition', () => {
      const transition = wrapper.childAt(0).childAt(0);
      assert.strictEqual(transition.is('Fade'), true, 'should be the fade transition');
      assert.strictEqual(transition.prop('in'), true, 'should set the transition to in');
      const backdrop = transition.childAt(0);
      assert.strictEqual(backdrop.is('Backdrop'), true, 'should be the backdrop component');
    });

    it('should attach a handler to the backdrop that fires onRequestClose', () => {
      const onRequestClose = spy();
      wrapper.setProps({ onRequestClose });

      const handler = wrapper.instance().handleBackdropClick;
      const backdrop = wrapper.find('Backdrop');
      assert.strictEqual(backdrop.prop('onClick'), handler, 'should attach the handleBackdropClick handler');

      handler({ isPropagationStopped: () => false });
      assert.strictEqual(onRequestClose.callCount, 1, 'should fire the onRequestClose callback');

      handler({ isPropagationStopped: () => true });
      assert.strictEqual(
        onRequestClose.callCount,
        1,
        'should not fire the onRequestClose callback if the event stops propagation'
      );
    });

    it('should let the user block event propagation to the click handler', () => {
      const onRequestClose = spy();
      const onBackdropClick = (event) => event.stopPropagation();
      wrapper.setProps({ onBackdropClick, onRequestClose });

      const handler = wrapper.instance().handleBackdropClick;

      handler({
        propagationStopped: false,
        stopPropagation() {
          this.propagationStopped = true;
        },
        isPropagationStopped() {
          return this.propagationStopped;
        },
      });
      assert.strictEqual(onRequestClose.callCount, 0, 'should not fire the onRequestClose callback');
    });
  });

  describe('mounted', () => {
    describe('show', () => {
      let wrapper;

      before(() => wrapper = mount(
        <Modal id="modal">
          <div id="container">
            <h1 id="heading">Hello</h1>
          </div>
        </Modal>
      ));
      after(() => wrapper.setProps({ open: false }));

      it('should not render the content', () => {
        assert.strictEqual(document.getElementById('container'), null, 'should not have the element in the DOM');
        assert.strictEqual(document.getElementById('heading'), null, 'should not have the element in the DOM');
      });

      it('should render the content into the portal', () => {
        wrapper.setProps({ show: true });
        const portalLayer = wrapper.find('Portal').node.layer;
        const container = document.getElementById('container');
        const heading = document.getElementById('heading');
        assert.strictEqual(container.tagName.toLowerCase(), 'div', 'should have the element in the DOM');
        assert.strictEqual(heading.tagName.toLowerCase(), 'h1', 'should have the element in the DOM');
        assert.strictEqual(contains(portalLayer, container), true, 'should be in the portal');
        assert.strictEqual(contains(portalLayer, heading), true, 'should be in the portal');
      });

      it('should automatically add a role and tabIndex to the content root node if not provided', () => {
        const container = document.getElementById('container');
        assert.strictEqual(container.getAttribute('role'), 'document', 'should add the document role');
        assert.strictEqual(container.getAttribute('tabindex'), '-1', 'should add a -1 tab-index');
      });
    });

    describe('backdrop', () => {
      let wrapper;

      before(() => wrapper = mount(
        <Modal show id="modal">
          <div id="container">
            <h1 id="heading">Hello</h1>
          </div>
        </Modal>
      ));
      after(() => wrapper.setProps({ open: false }));

      it('should render a backdrop component into the portal before the modal content', () => {
        const modal = document.getElementById('modal');
        const container = document.getElementById('container');
        assert.strictEqual(modal.children.length, 2, 'should have 2 children, the backdrop and the test container');
        assert.ok(modal.children[0], 'this is the backdrop, so no assertions about implementation details');
        assert.strictEqual(modal.children[1], container, 'should be the container');
      });
    });

    describe('disabled backdrop', () => {
      let wrapper;

      before(() => wrapper = mount(
        <Modal show backdrop={false} id="modal">
          <div id="container">
            <h1 id="heading">Hello</h1>
          </div>
        </Modal>
      ));
      after(() => wrapper.setProps({ open: false }));

      it('should not render a backdrop component into the portal before the modal content', () => {
        const modal = document.getElementById('modal');
        const container = document.getElementById('container');
        assert.strictEqual(modal.children.length, 1, 'should have 1 child, the test container');
        assert.strictEqual(modal.children[0], container, 'should be the container');
      });
    });
  });
});
