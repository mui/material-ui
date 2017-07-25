// @flow

import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import keycode from 'keycode';
import contains from 'dom-helpers/query/contains';
import { createShallow, createMount, getClasses } from '../test-utils';
import consoleErrorMock from '../../test/utils/consoleErrorMock';
import Fade from '../transitions/Fade';
import Backdrop from './Backdrop';
import Modal, { styleSheet } from './Modal';

describe('<Modal />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render null by default', () => {
    const wrapper = shallow(
      <Modal>
        <p>Hello World</p>
      </Modal>,
    );
    assert.strictEqual(wrapper.node, null, 'should be null');
  });

  describe('show', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Modal show data-my-prop="woof">
          <p>Hello World</p>
        </Modal>,
      );
    });

    it('should render the modal div inside the portal', () => {
      assert.strictEqual(wrapper.name(), 'Portal', 'should render a portal when shown');
      const modal = wrapper.childAt(0);
      assert.strictEqual(modal.is('div'), true, 'should be a div');
      assert.strictEqual(modal.hasClass(classes.root), true, 'should have the root class');
    });

    describe('handlers', () => {
      let instance;

      before(() => {
        instance = wrapper.instance();
      });

      describe('focus', () => {
        before(() => {
          instance.modal = spy();
          instance.modal.lastChild = spy();
          instance.modal.lastChild.setAttribute = spy();
          instance.modal.lastChild.focus = spy();
        });

        describe('modalContent has tabIndex attribute', () => {
          before(() => {
            instance.modal.lastChild.hasAttribute = stub().returns(true);
            consoleErrorMock.spy();
            instance.focus();
          });

          after(() => {
            instance.modal.lastChild.hasAttribute.reset();
            instance.modal.lastChild.focus.reset();
            consoleErrorMock.reset();
          });

          it('should call hasAttribute with tabIndex', () => {
            assert.strictEqual(instance.modal.lastChild.hasAttribute.callCount, 1);
            assert.strictEqual(instance.modal.lastChild.hasAttribute.calledWith('tabIndex'), true);
            assert.strictEqual(
              instance.modal.lastChild.setAttribute.callCount,
              0,
              'should not call setAttribute',
            );
            assert.strictEqual(consoleErrorMock.callCount(), 0, 'should not call console.error');
            assert.strictEqual(instance.modal.lastChild.focus.callCount, 1, 'should call focus');
          });
        });

        describe('modalContent does not have tabIndex attribute', () => {
          before(() => {
            instance.modal.lastChild.hasAttribute = stub().returns(false);
            consoleErrorMock.spy();
            instance.focus();
          });

          after(() => {
            instance.modal.lastChild.hasAttribute.reset();
            consoleErrorMock.reset();
          });

          it('should call hasAttribute with tabIndex', () => {
            assert.strictEqual(instance.modal.lastChild.hasAttribute.callCount, 1);
            assert.strictEqual(instance.modal.lastChild.hasAttribute.calledWith('tabIndex'), true);
          });

          it('should call setAttribute', () => {
            assert.strictEqual(instance.modal.lastChild.setAttribute.callCount, 1);
            assert.strictEqual(
              instance.modal.lastChild.setAttribute.calledWith('tabIndex', -1),
              true,
            );
            assert.strictEqual(consoleErrorMock.callCount(), 1, 'should call console.error');
            assert.strictEqual(instance.modal.lastChild.focus.callCount, 1, 'should call focus');
          });
        });
      });
    });
  });

  describe('backdrop', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Modal show id="modal">
          <div id="container">
            <h1 id="heading">Hello</h1>
          </div>
        </Modal>,
      );
    });

    it('should render a backdrop wrapped in a fade transition', () => {
      const transition = wrapper.childAt(0).childAt(0);
      assert.strictEqual(transition.name(), 'withTheme(Fade)');
      assert.strictEqual(transition.props().in, true, 'should set the transition to in');
      const backdrop = transition.childAt(0);
      assert.strictEqual(backdrop.is(Backdrop), true, 'should be the backdrop component');
    });

    it('should pass a transitionDuration prop to the transition component', () => {
      wrapper.setProps({ backdropTransitionDuration: 200 });
      const transition = wrapper.childAt(0).childAt(0);
      assert.strictEqual(transition.props().enterTransitionDuration, 200);
      assert.strictEqual(transition.props().leaveTransitionDuration, 200);
    });

    it('should attach a handler to the backdrop that fires onRequestClose', () => {
      const onRequestClose = spy();
      wrapper.setProps({ onRequestClose });

      const handler = wrapper.instance().handleBackdropClick;
      const backdrop = wrapper.find(Backdrop);
      assert.strictEqual(
        backdrop.prop('onClick'),
        handler,
        'should attach the handleBackdropClick handler',
      );

      handler({});
      assert.strictEqual(onRequestClose.callCount, 1, 'should fire the onRequestClose callback');
    });

    it('should let the user disable backdrop click triggering onRequestClose', () => {
      const onRequestClose = spy();
      wrapper.setProps({ onRequestClose, ignoreBackdropClick: true });

      const handler = wrapper.instance().handleBackdropClick;

      handler({});
      assert.strictEqual(
        onRequestClose.callCount,
        0,
        'should not fire the onRequestClose callback',
      );
    });
  });

  describe('mounted', () => {
    describe('show', () => {
      let wrapper;

      before(() => {
        wrapper = mount(
          <Modal id="modal">
            <div id="container">
              <h1 id="heading">Hello</h1>
            </div>
          </Modal>,
        );
      });

      after(() => {
        wrapper.unmount();
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
        wrapper.setProps({ show: true });
        const portalLayer = wrapper.find('Portal').node.layer;
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
        assert.strictEqual(
          heading.tagName.toLowerCase(),
          'h1',
          'should have the element in the DOM',
        );
        assert.strictEqual(contains(portalLayer, container), true, 'should be in the portal');
        assert.strictEqual(contains(portalLayer, heading), true, 'should be in the portal');
      });

      it('should automatically add a role and tabIndex if not provided', () => {
        const container = document.getElementById('container');

        if (!container) {
          throw new Error('missing container');
        }

        assert.strictEqual(
          container.getAttribute('role'),
          'document',
          'should add the document role',
        );
        assert.strictEqual(container.getAttribute('tabindex'), '-1', 'should add a -1 tab-index');
      });
    });

    describe('backdrop', () => {
      let wrapper;

      before(() => {
        wrapper = mount(
          <Modal show id="modal">
            <div id="container">
              <h1 id="heading">Hello</h1>
            </div>
          </Modal>,
        );
      });

      after(() => {
        wrapper.unmount();
      });

      it('should render a backdrop component into the portal before the modal content', () => {
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

    describe('disabled backdrop', () => {
      let wrapper;

      before(() => {
        wrapper = mount(
          <Modal show disableBackdrop id="modal">
            <div id="container">
              <h1 id="heading">Hello</h1>
            </div>
          </Modal>,
        );
      });

      after(() => {
        wrapper.unmount();
      });

      it('should not render a backdrop component into the portal before the modal content', () => {
        const modal = document.getElementById('modal');
        const container = document.getElementById('container');

        if (!modal) {
          throw new Error('missing modal');
        }

        assert.strictEqual(modal.children.length, 1, 'should have 1 child, the test container');
        assert.strictEqual(modal.children[0], container, 'should be the container');
      });
    });
  });

  describe('handleDocumentKeyUp()', () => {
    let wrapper;
    let instance;

    before(() => {
      wrapper = shallow(<Modal />);
      instance = wrapper.instance();
    });

    it('should have handleDocumentKeyUp', () => {
      assert.notStrictEqual(instance.handleDocumentKeyUp, undefined);
    });

    it('handleDocumentKeyUp should be a function', () => {
      assert.strictEqual(typeof instance.handleDocumentKeyUp, 'function');
    });

    describe('called', () => {
      let onEscapeKeyUpStub;
      let onRequestCloseStub;
      let topModalStub;
      let event;

      before(() => {
        onEscapeKeyUpStub = stub().returns(true);
        onRequestCloseStub = stub().returns(true);
        topModalStub = stub();
        wrapper.setProps({
          onEscapeKeyUp: onEscapeKeyUpStub,
          onRequestClose: onRequestCloseStub,
        });
      });

      afterEach(() => {
        onEscapeKeyUpStub.reset();
        onRequestCloseStub.reset();
        topModalStub.reset();
      });

      it('when not mounted should not call onEscaeKeyUp and onRequestClose', () => {
        instance = wrapper.instance();
        instance.mounted = false;
        instance.handleDocumentKeyUp(undefined);
        assert.strictEqual(onEscapeKeyUpStub.callCount, 0);
        assert.strictEqual(onRequestCloseStub.callCount, 0);
      });

      it('when mounted and not TopModal should not call onEscaeKeyUp and onRequestClose', () => {
        topModalStub.returns('false');
        wrapper.setProps({ modalManager: { isTopModal: topModalStub } });
        instance = wrapper.instance();
        instance.mounted = true;

        instance.handleDocumentKeyUp(undefined);
        assert.strictEqual(topModalStub.callCount, 1);
        assert.strictEqual(onEscapeKeyUpStub.callCount, 0);
        assert.strictEqual(onRequestCloseStub.callCount, 0);
      });

      it('when mounted, TopModal and event not esc should not call given funcs', () => {
        topModalStub.returns(true);
        wrapper.setProps({ modalManager: { isTopModal: topModalStub } });
        instance = wrapper.instance();
        instance.mounted = true;
        event = { keyCode: keycode('j') }; // Not 'esc'

        instance.handleDocumentKeyUp(event);
        assert.strictEqual(topModalStub.callCount, 1);
        assert.strictEqual(onEscapeKeyUpStub.callCount, 0);
        assert.strictEqual(onRequestCloseStub.callCount, 0);
      });

      it('should call onEscaeKeyUp and onRequestClose', () => {
        topModalStub.returns(true);
        wrapper.setProps({ modalManager: { isTopModal: topModalStub } });
        event = { keyCode: keycode('esc') };
        instance = wrapper.instance();
        instance.mounted = true;

        instance.handleDocumentKeyUp(event);
        assert.strictEqual(topModalStub.callCount, 1);
        assert.strictEqual(onEscapeKeyUpStub.callCount, 1);
        assert.strictEqual(onEscapeKeyUpStub.calledWith(event), true);
        assert.strictEqual(onRequestCloseStub.callCount, 1);
        assert.strictEqual(onRequestCloseStub.calledWith(event), true);
      });

      it('when ignoreEscapeKeyUp should call only onRequestClose', () => {
        topModalStub.returns(true);
        wrapper.setProps({ modalManager: { isTopModal: topModalStub } });
        wrapper.setProps({ ignoreEscapeKeyUp: true });
        event = { keyCode: keycode('esc') };
        instance = wrapper.instance();
        instance.mounted = true;

        instance.handleDocumentKeyUp(event);
        assert.strictEqual(topModalStub.callCount, 1);
        assert.strictEqual(onEscapeKeyUpStub.callCount, 1);
        assert.strictEqual(onEscapeKeyUpStub.calledWith(event), true);
        assert.strictEqual(onRequestCloseStub.callCount, 0);
      });
    });
  });

  describe('prop: keepMounted', () => {
    it('should keep the children in the DOM', () => {
      const children = <p>Hello World</p>;
      const wrapper = shallow(
        <Modal keepMounted show={false}>
          <div>
            {children}
          </div>
        </Modal>,
      );
      assert.strictEqual(wrapper.contains(children), true);
    });

    it('should not keep the children in the DOM', () => {
      const children = <p>Hello World</p>;
      const wrapper = shallow(
        <Modal show={false}>
          <div>
            {children}
          </div>
        </Modal>,
      );
      assert.strictEqual(wrapper.contains(children), false);
    });
  });

  describe('prop: onExited', () => {
    it('should avoid concurrency issue by chaining internal with the public API', () => {
      const handleExited = spy();
      const wrapper = shallow(
        <Modal onExited={handleExited} show>
          <Fade in />
        </Modal>,
      );
      wrapper.find(Fade).at(1).simulate('exited');
      assert.strictEqual(handleExited.callCount, 1);
      assert.strictEqual(wrapper.state().exited, true);
    });

    it('should rely on the internal backdrop events', () => {
      const handleExited = spy();
      const wrapper = shallow(
        <Modal onExited={handleExited} show>
          <div />
        </Modal>,
      );
      wrapper.find(Fade).at(0).simulate('exited');
      assert.strictEqual(handleExited.callCount, 1);
      assert.strictEqual(wrapper.state().exited, true);
    });
  });
});
