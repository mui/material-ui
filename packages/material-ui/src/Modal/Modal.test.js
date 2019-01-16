import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import PropTypes from 'prop-types';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createShallow, createMount, getClasses, unwrap } from '@material-ui/core/test-utils';
import Fade from '../Fade';
import Portal from '../Portal';
import Backdrop from '../Backdrop';
import Modal from './Modal';

describe('<Modal />', () => {
  let shallow;
  let mount;
  let classes;
  let savedBodyStyle;
  const ModalNaked = unwrap(Modal);

  before(() => {
    shallow = createShallow({ dive: true, disableLifecycleMethods: true });
    classes = getClasses(<Modal open={false} />);
    mount = createMount();
    savedBodyStyle = document.body.style;
  });

  beforeEach(() => {
    document.body.setAttribute('style', savedBodyStyle);
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
      assert.strictEqual(wrapper.childAt(0).name(), 'Portal');
      const modal = wrapper
        .childAt(0)
        .childAt(0)
        .childAt(0);
      assert.strictEqual(modal.type(), 'div');
      assert.strictEqual(modal.hasClass(classes.root), true);
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
      assert.strictEqual(backdrop.props().onClick, handler);

      handler({});
      assert.strictEqual(onClose.callCount, 1);
    });

    it('should let the user disable backdrop click triggering onClose', () => {
      const onClose = spy();
      wrapper.setProps({ onClose, disableBackdropClick: true });

      const handler = wrapper.instance().handleBackdropClick;

      handler({});
      assert.strictEqual(onClose.callCount, 0);
    });

    it('should call through to the user specified onBackdropClick callback', () => {
      const onBackdropClick = spy();
      wrapper.setProps({ onBackdropClick });

      const handler = wrapper.instance().handleBackdropClick;

      handler({});
      assert.strictEqual(onBackdropClick.callCount, 1);
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
      assert.strictEqual(onBackdropClick.callCount, 0);
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
        .find(Portal)
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
      assert.strictEqual(heading.tagName.toLowerCase(), 'h1');
      assert.strictEqual(portalLayer.contains(container), true);
      assert.strictEqual(portalLayer.contains(heading), true);

      const container2 = document.getElementById('container');

      if (!container2) {
        throw new Error('missing container');
      }

      assert.strictEqual(
        container2.getAttribute('role'),
        'document',
        'should add the document role',
      );
      assert.strictEqual(container2.getAttribute('tabindex'), '-1');
    });
  });

  describe('backdrop 2', () => {
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

      assert.strictEqual(modal.children.length, 2);
      assert.strictEqual(modal.children[0] != null, true);
      assert.strictEqual(modal.children[1], container);
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

      assert.strictEqual(modal.children.length, 1);
      assert.strictEqual(modal.children[0], container);
    });
  });

  describe('handleKeyDown()', () => {
    let wrapper;
    let instance;
    let onEscapeKeyDownSpy;
    let onCloseSpy;
    let topModalStub;
    let event;

    beforeEach(() => {
      onEscapeKeyDownSpy = spy();
      onCloseSpy = spy();
      topModalStub = stub();
      wrapper = shallow(
        <Modal open={false} onEscapeKeyDown={onEscapeKeyDownSpy} onClose={onCloseSpy} />,
      );
      instance = wrapper.instance();
    });

    it('should have handleKeyDown', () => {
      assert.notStrictEqual(instance.handleKeyDown, undefined);
      assert.strictEqual(typeof instance.handleKeyDown, 'function');
    });

    it('when not mounted should not call onEscapeKeyDown and onClose', () => {
      instance.handleKeyDown({});
      assert.strictEqual(onEscapeKeyDownSpy.callCount, 0);
      assert.strictEqual(onCloseSpy.callCount, 0);
    });

    it('when mounted and not TopModal should not call onEscapeKeyDown and onClose', () => {
      topModalStub.returns(false);
      wrapper.setProps({ manager: { isTopModal: topModalStub } });

      instance.handleKeyDown({
        key: 'Escape',
      });
      assert.strictEqual(topModalStub.callCount, 1);
      assert.strictEqual(onEscapeKeyDownSpy.callCount, 0);
      assert.strictEqual(onCloseSpy.callCount, 0);
    });

    it('when mounted, TopModal and event not esc should not call given functions', () => {
      topModalStub.returns(true);
      wrapper.setProps({ manager: { isTopModal: topModalStub } });
      event = { key: 'j' }; // Not 'esc'

      instance.handleKeyDown(event);
      assert.strictEqual(topModalStub.callCount, 0);
      assert.strictEqual(onEscapeKeyDownSpy.callCount, 0);
      assert.strictEqual(onCloseSpy.callCount, 0);
    });

    it('should call onEscapeKeyDown and onClose', () => {
      topModalStub.returns(true);
      wrapper.setProps({ manager: { isTopModal: topModalStub } });
      event = { key: 'Escape', stopPropagation: () => {} };

      instance.handleKeyDown(event);
      assert.strictEqual(topModalStub.callCount, 1);
      assert.strictEqual(onEscapeKeyDownSpy.callCount, 1);
      assert.strictEqual(onEscapeKeyDownSpy.calledWith(event), true);
      assert.strictEqual(onCloseSpy.callCount, 1);
      assert.strictEqual(onCloseSpy.calledWith(event), true);
    });

    it('when disableEscapeKeyDown should call only onClose', () => {
      topModalStub.returns(true);
      wrapper.setProps({ disableEscapeKeyDown: true, manager: { isTopModal: topModalStub } });
      event = { key: 'Escape', stopPropagation: () => {} };

      instance.handleKeyDown(event);
      assert.strictEqual(topModalStub.callCount, 1);
      assert.strictEqual(onEscapeKeyDownSpy.callCount, 1);
      assert.strictEqual(onEscapeKeyDownSpy.calledWith(event), true);
      assert.strictEqual(onCloseSpy.callCount, 0);
    });

    it('should not be call when defaultPrevented', () => {
      topModalStub.returns(true);
      wrapper.setProps({ disableEscapeKeyDown: true, manager: { isTopModal: topModalStub } });
      event = { key: 'Escape', defaultPrevented: true };

      instance.handleKeyDown(event);
      assert.strictEqual(topModalStub.callCount, 1);
      assert.strictEqual(onEscapeKeyDownSpy.callCount, 0);
      assert.strictEqual(onCloseSpy.callCount, 0);
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

    it('should mount', () => {
      mount(
        <Modal keepMounted open={false}>
          <div />
        </Modal>,
      );
      const modalNode = document.querySelector('[data-mui-test="Modal"]');
      assert.strictEqual(modalNode.getAttribute('aria-hidden'), 'true');
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
      wrapper.setProps({
        open: false,
      });
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
      assert.strictEqual(consoleErrorMock.callCount(), 1);
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

  describe('two modal at the same time', () => {
    it('should open and close', () => {
      const TestCase = props => (
        <React.Fragment>
          <Modal open={props.open}>
            <div>Hello</div>
          </Modal>
          <Modal open={props.open}>
            <div>World</div>
          </Modal>
        </React.Fragment>
      );

      TestCase.propTypes = {
        open: PropTypes.bool,
      };

      const wrapper = mount(<TestCase open={false} />);
      assert.strictEqual(document.body.style.overflow, '');
      wrapper.setProps({ open: true });
      assert.strictEqual(document.body.style.overflow, 'hidden');
      wrapper.setProps({ open: false });
      assert.strictEqual(document.body.style.overflow, '');
    });

    it('should open and close with Transitions', () => {
      const TestCase = props => (
        <React.Fragment>
          <Modal open={props.open}>
            <Fade onEntered={props.onEntered} onExited={props.onExited}>
              <div>Hello</div>
            </Fade>
          </Modal>
          <Modal open={props.open}>
            <div>World</div>
          </Modal>
        </React.Fragment>
      );

      TestCase.propTypes = {
        onEntered: PropTypes.func,
        onExited: PropTypes.func,
        open: PropTypes.bool,
      };

      let wrapper;
      const onEntered = () => {
        assert.strictEqual(document.body.style.overflow, 'hidden');
        wrapper.setProps({ open: false });
      };

      const onExited = () => {
        assert.strictEqual(document.body.style.overflow, '');
      };

      wrapper = mount(<TestCase onEntered={onEntered} onExited={onExited} open={false} />);
      assert.strictEqual(document.body.style.overflow, '');
      wrapper.setProps({ open: true });
    });
  });

  it('should support open abort', () => {
    class TestCase extends React.Component {
      state = {
        open: true,
      };

      componentDidMount() {
        this.setState({
          open: false,
        });
      }

      render() {
        return (
          <Modal open={this.state.open}>
            <div>Hello</div>
          </Modal>
        );
      }
    }
    mount(<TestCase />);
  });
});
