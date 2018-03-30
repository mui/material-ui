/* eslint-disable jsx-a11y/no-autofocus */

import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import keycode from 'keycode';
import contains from 'dom-helpers/query/contains';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import consoleErrorMock from '../../test/utils/consoleErrorMock';
import Fade from '../transitions/Fade';
import Backdrop from './Backdrop';
import Modal from './Modal';

describe('<Modal />', () => {
  let shallow;
  let mount;
  let classes;
  const ModalNaked = unwrap(Modal);

  before(() => {
    shallow = createShallow({ dive: true, disableLifecycleMethods: true });
    classes = getClasses(<Modal open={false} />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render null by default', () => {
    const wrapper = shallow(
      <Modal open={false}>
        <p>Hello World</p>
      </Modal>,
    );
    assert.strictEqual(wrapper.type(), null, 'should be null');
  });

  describe('prop: open', () => {
    it('should render the modal div inside the portal', () => {
      const wrapper = mount(
        <ModalNaked classes={classes} open data-my-prop="woofModal">
          <p>Hello World</p>
        </ModalNaked>,
      );
      assert.strictEqual(wrapper.childAt(0).name(), 'Portal', 'should render a portal when openn');
      const modal = wrapper.childAt(0).childAt(0);
      assert.strictEqual(modal.type(), 'div');
      assert.strictEqual(modal.hasClass(classes.root), true, 'should have the root class');
    });
  });

  describe('backdrop', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Modal open id="modal">
          <div id="container">
            <h1 id="heading">Hello</h1>
          </div>
        </Modal>,
      );
    });

    it('should render a backdrop wrapped in a fade transition', () => {
      const transition = wrapper.childAt(0).childAt(0);
      assert.strictEqual(transition.type(), Backdrop);
      assert.strictEqual(transition.props().open, true);
    });

    it('should pass a transitionDuration prop to the transition component', () => {
      wrapper.setProps({ BackdropProps: { transitionDuration: 200 } });
      const transition = wrapper.childAt(0).childAt(0);
      assert.strictEqual(transition.props().transitionDuration, 200);
    });

    it('should attach a handler to the backdrop that fires onClose', () => {
      const onClose = spy();
      wrapper.setProps({ onClose });

      const handler = wrapper.instance().handleBackdropClick;
      const backdrop = wrapper.find(Backdrop);
      assert.strictEqual(
        backdrop.prop('onClick'),
        handler,
        'should attach the handleBackdropClick handler',
      );

      handler({});
      assert.strictEqual(onClose.callCount, 1, 'should fire the onClose callback');
    });

    it('should let the user disable backdrop click triggering onClose', () => {
      const onClose = spy();
      wrapper.setProps({ onClose, disableBackdropClick: true });

      const handler = wrapper.instance().handleBackdropClick;

      handler({});
      assert.strictEqual(onClose.callCount, 0, 'should not fire the onClose callback');
    });

    it('should call through to the user specified onBackdropClick callback', () => {
      const onBackdropClick = spy();
      wrapper.setProps({ onBackdropClick });

      const handler = wrapper.instance().handleBackdropClick;

      handler({});
      assert.strictEqual(onBackdropClick.callCount, 1, 'should fire the onBackdropClick callback');
    });

    it('should ignore the backdrop click if the event did not come from the backdrop', () => {
      const onBackdropClick = spy();
      wrapper.setProps({ onBackdropClick });

      const handler = wrapper.instance().handleBackdropClick;

      handler({
        target: {
          /* a dom node */
        },
        currentTarget: {
          /* another dom node */
        },
      });
      assert.strictEqual(
        onBackdropClick.callCount,
        0,
        'should not fire the onBackdropClick callback',
      );
    });
  });

  describe('render', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Modal open={false} id="modal">
          <div id="container">
            <h1 id="heading">Hello</h1>
          </div>
        </Modal>,
      );
    });

    it('should not render the content', () => {
      assert.strictEqual(
        document.getElementById('container'),
        null,
        'should not have the element in the DOM',
      );
      assert.strictEqual(
        document.getElementById('heading'),
        null,
        'should not have the element in the DOM',
      );
    });

    it('should render the content into the portal', () => {
      wrapper.setProps({ open: true });
      const portalLayer = wrapper
        .find('Portal')
        .instance()
        .getMountNode();
      const container = document.getElementById('container');
      const heading = document.getElementById('heading');

      if (!container || !heading) {
        throw new Error('missing element');
      }

      assert.strictEqual(
        container.tagName.toLowerCase(),
        'div',
        'should have the element in the DOM',
      );
      assert.strictEqual(heading.tagName.toLowerCase(), 'h1', 'should have the element in the DOM');
      assert.strictEqual(contains(portalLayer, container), true, 'should be in the portal');
      assert.strictEqual(contains(portalLayer, heading), true, 'should be in the portal');

      const container2 = document.getElementById('container');

      if (!container2) {
        throw new Error('missing container');
      }

      assert.strictEqual(
        container2.getAttribute('role'),
        'document',
        'should add the document role',
      );
      assert.strictEqual(container2.getAttribute('tabindex'), '-1', 'should add a -1 tab-index');
    });
  });

  describe('backdrop', () => {
    it('should render a backdrop component into the portal before the modal content', () => {
      mount(
        <Modal open id="modal">
          <div id="container">
            <h1 id="heading">Hello</h1>
          </div>
        </Modal>,
      );

      const modal = document.getElementById('modal');
      const container = document.getElementById('container');

      if (!modal) {
        throw new Error('missing modal');
      }

      assert.strictEqual(
        modal.children.length,
        2,
        'should have 2 children, the backdrop and the test container',
      );
      assert.ok(
        modal.children[0],
        'this is the backdrop, so no assertions about implementation details',
      );
      assert.strictEqual(modal.children[1], container, 'should be the container');
    });
  });

  describe('hide backdrop', () => {
    it('should not render a backdrop component into the portal before the modal content', () => {
      mount(
        <Modal open hideBackdrop id="modal">
          <div id="container">
            <h1 id="heading">Hello</h1>
          </div>
        </Modal>,
      );
      const modal = document.getElementById('modal');
      const container = document.getElementById('container');

      if (!modal) {
        throw new Error('missing modal');
      }

      assert.strictEqual(modal.children.length, 1, 'should have 1 child, the test container');
      assert.strictEqual(modal.children[0], container, 'should be the container');
    });
  });

  describe('handleDocumentKeyDown()', () => {
    let wrapper;
    let instance;
    let onEscapeKeyDownStub;
    let onCloseStub;
    let topModalStub;
    let event;

    beforeEach(() => {
      wrapper = shallow(<Modal open={false} />);
      instance = wrapper.instance();
      onEscapeKeyDownStub = stub().returns(true);
      onCloseStub = stub().returns(true);
      topModalStub = stub();
      wrapper.setProps({ onEscapeKeyDown: onEscapeKeyDownStub, onClose: onCloseStub });
    });

    afterEach(() => {
      onEscapeKeyDownStub.reset();
      onCloseStub.reset();
      topModalStub.reset();
    });

    it('should have handleDocumentKeyDown', () => {
      assert.notStrictEqual(instance.handleDocumentKeyDown, undefined);
      assert.strictEqual(typeof instance.handleDocumentKeyDown, 'function');
    });

    it('when not mounted should not call onEscapeKeyDown and onClose', () => {
      instance = wrapper.instance();
      instance.mounted = false;
      instance.handleDocumentKeyDown(undefined);
      assert.strictEqual(onEscapeKeyDownStub.callCount, 0);
      assert.strictEqual(onCloseStub.callCount, 0);
    });

    it('when mounted and not TopModal should not call onEscapeKeyDown and onClose', () => {
      topModalStub.returns('false');
      wrapper.setProps({ manager: { isTopModal: topModalStub } });
      instance = wrapper.instance();
      instance.mounted = true;

      instance.handleDocumentKeyDown(undefined);
      assert.strictEqual(topModalStub.callCount, 1);
      assert.strictEqual(onEscapeKeyDownStub.callCount, 0);
      assert.strictEqual(onCloseStub.callCount, 0);
    });

    it('when mounted, TopModal and event not esc should not call given funcs', () => {
      topModalStub.returns(true);
      wrapper.setProps({ manager: { isTopModal: topModalStub } });
      instance = wrapper.instance();
      instance.mounted = true;
      event = { keyCode: keycode('j') }; // Not 'esc'

      instance.handleDocumentKeyDown(event);
      assert.strictEqual(topModalStub.callCount, 1);
      assert.strictEqual(onEscapeKeyDownStub.callCount, 0);
      assert.strictEqual(onCloseStub.callCount, 0);
    });

    it('should call onEscapeKeyDown and onClose', () => {
      topModalStub.returns(true);
      wrapper.setProps({ manager: { isTopModal: topModalStub } });
      event = { keyCode: keycode('esc') };
      instance = wrapper.instance();
      instance.mounted = true;

      instance.handleDocumentKeyDown(event);
      assert.strictEqual(topModalStub.callCount, 1);
      assert.strictEqual(onEscapeKeyDownStub.callCount, 1);
      assert.strictEqual(onEscapeKeyDownStub.calledWith(event), true);
      assert.strictEqual(onCloseStub.callCount, 1);
      assert.strictEqual(onCloseStub.calledWith(event), true);
    });

    it('when disableEscapeKeyDown should call only onClose', () => {
      topModalStub.returns(true);
      wrapper.setProps({ manager: { isTopModal: topModalStub } });
      wrapper.setProps({ disableEscapeKeyDown: true });
      event = { keyCode: keycode('esc') };
      instance = wrapper.instance();
      instance.mounted = true;

      instance.handleDocumentKeyDown(event);
      assert.strictEqual(topModalStub.callCount, 1);
      assert.strictEqual(onEscapeKeyDownStub.callCount, 1);
      assert.strictEqual(onEscapeKeyDownStub.calledWith(event), true);
      assert.strictEqual(onCloseStub.callCount, 0);
    });
  });

  describe('prop: keepMounted', () => {
    it('should keep the children in the DOM', () => {
      const children = <p>Hello World</p>;
      const wrapper = shallow(
        <Modal keepMounted open={false}>
          <div>{children}</div>
        </Modal>,
      );
      assert.strictEqual(wrapper.contains(children), true);
    });

    it('should not keep the children in the DOM', () => {
      const children = <p>Hello World</p>;
      const wrapper = shallow(
        <Modal open={false}>
          <div>{children}</div>
        </Modal>,
      );
      assert.strictEqual(wrapper.contains(children), false);
    });
  });

  describe('prop: onExited', () => {
    it('should avoid concurrency issue by chaining internal with the public API', () => {
      const handleExited = spy();
      const wrapper = mount(
        <ModalNaked classes={{}} open>
          <Fade in onExited={handleExited}>
            <div />
          </Fade>
        </ModalNaked>,
      );
      wrapper
        .find('Transition')
        .at(1)
        .props()
        .onExited();
      assert.strictEqual(handleExited.callCount, 1);
      assert.strictEqual(wrapper.state().exited, true);
    });

    it('should not rely on the internal backdrop events', () => {
      const wrapper = shallow(
        <Modal open>
          <div />
        </Modal>,
      );
      assert.strictEqual(wrapper.state().exited, false);
      wrapper.setProps({
        open: false,
      });
      assert.strictEqual(wrapper.state().exited, true);
    });
  });

  describe('focus', () => {
    let focusContainer = null;
    let wrapper;

    beforeEach(() => {
      focusContainer = document.createElement('div');
      focusContainer.tabIndex = 0;
      focusContainer.className = 'focus-container';
      document.body.appendChild(focusContainer);
      focusContainer.focus();
      assert.strictEqual(document.activeElement, focusContainer);
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
      wrapper.unmount();
      document.body.removeChild(focusContainer);
    });

    it('should focus on the modal when it is opened', () => {
      wrapper = mount(
        <Modal open>
          <div className="modal">Foo</div>
        </Modal>,
      );
      assert.strictEqual(document.activeElement.className, 'modal');
      wrapper.setProps({ open: false });
      assert.strictEqual(document.activeElement, focusContainer);
    });

    it('should keep focus on the modal when it is closed', () => {
      wrapper = mount(
        <Modal open disableRestoreFocus>
          <div className="modal">Foo</div>
        </Modal>,
      );
      assert.strictEqual(document.activeElement.className, 'modal');
      wrapper.setProps({ open: false });
      assert.strictEqual(document.activeElement.tagName, 'BODY');
    });

    it('should not focus on the modal when disableAutoFocus is true', () => {
      wrapper = mount(
        <Modal open disableAutoFocus>
          <div>Foo</div>
        </Modal>,
      );
      assert.strictEqual(document.activeElement, focusContainer);
    });

    it('should not focus modal when child has focus', () => {
      wrapper = mount(
        <Modal open>
          <div>
            <input autoFocus />
          </div>
        </Modal>,
      );
      assert.strictEqual(document.activeElement, document.querySelector('input'));
    });

    it('should return focus to the modal', () => {
      wrapper = mount(
        <Modal open>
          <div className="modal">
            <input autoFocus />
          </div>
        </Modal>,
      );

      assert.strictEqual(document.activeElement, document.querySelector('input'));
      focusContainer.focus();
      assert.strictEqual(document.activeElement.className, 'modal');
    });

    it('should not return focus to the modal when disableEnforceFocus is true', () => {
      wrapper = mount(
        <Modal open disableEnforceFocus>
          <div className="modal">
            <input autoFocus />
          </div>
        </Modal>,
      );

      assert.strictEqual(document.activeElement, document.querySelector('input'));
      focusContainer.focus();
      assert.strictEqual(document.activeElement.className, 'focus-container');
    });

    it('should warn if the modal content is not focusable', () => {
      const Dialog = () => <div />;

      wrapper = mount(
        <Modal open>
          <Dialog />
        </Modal>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 1, 'should call console.error');
      assert.match(consoleErrorMock.args()[0][0], /the modal content node does not accept focus/);
    });

    it('should not attempt to focus nonexistent children', () => {
      const Dialog = () => null;

      wrapper = mount(
        <Modal open>
          <Dialog />
        </Modal>,
      );
    });
  });

  describe('prop: onRendered', () => {
    it('should fire', () => {
      const handleRendered = spy();
      mount(
        <Modal open onRendered={handleRendered}>
          <div />
        </Modal>,
      );
      assert.strictEqual(handleRendered.callCount, 1);
    });
  });
});
