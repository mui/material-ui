import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import PropTypes from 'prop-types';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import {
  createMount,
  findOutermostIntrinsic,
  describeConformance,
} from '@material-ui/core/test-utils';
import Fade from '../Fade';
import Backdrop from '../Backdrop';
import Modal from './Modal';

describe('<Modal />', () => {
  let mount;
  let savedBodyStyle;

  before(() => {
    // StrictModeViolation: uses Backdrop
    mount = createMount({ strict: false });
    savedBodyStyle = document.body.style;
  });

  beforeEach(() => {
    document.body.setAttribute('style', savedBodyStyle);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(
    <Modal open>
      <div />
    </Modal>,
    () => ({
      inheritComponent: 'div',
      mount,
      refInstanceof: window.HTMLDivElement,
      skip: ['rootClass', 'componentProp'],
    }),
  );

  describe('prop: open', () => {
    it('should not render the children by default', () => {
      const wrapper = mount(
        <Modal open={false}>
          <p id="content">Hello World</p>
        </Modal>,
      );
      assert.strictEqual(wrapper.find('#content').exists(), false);
    });

    it('renders the children inside a div through a portal when open', () => {
      const wrapper = mount(
        <Modal open>
          <p>Hello World</p>
        </Modal>,
      );

      const portal = wrapper.find('Portal');
      const modal = findOutermostIntrinsic(portal);

      assert.strictEqual(modal.type(), 'div');
    });
  });

  describe('backdrop', () => {
    const modal = (
      <Modal open id="modal" BackdropComponent={Backdrop}>
        <div id="container">
          <h1 id="heading">Hello</h1>
        </div>
      </Modal>
    );

    it('should render a backdrop with a fade transition', () => {
      const wrapper = mount(modal);

      const backdrop = wrapper.find(Backdrop);
      assert.strictEqual(backdrop.exists(), true);

      const transition = backdrop.find(Fade);
      assert.strictEqual(transition.props().in, true);
    });

    it('should pass prop to the transition component', () => {
      const wrapper = mount(modal);
      wrapper.setProps({ BackdropProps: { transitionDuration: 200 } });

      const transition = wrapper.find(Fade);
      assert.strictEqual(transition.props().timeout, 200);
    });

    it('should attach a handler to the backdrop that fires onClose', () => {
      const wrapper = mount(modal);
      const onClose = spy();
      wrapper.setProps({ onClose });

      const handler = wrapper.find('Modal').instance().handleBackdropClick;
      const backdrop = wrapper.find(Backdrop);
      assert.strictEqual(backdrop.props().onClick, handler);

      handler({});
      assert.strictEqual(onClose.callCount, 1);
    });

    it('should let the user disable backdrop click triggering onClose', () => {
      const wrapper = mount(modal);
      const onClose = spy();
      wrapper.setProps({ onClose, disableBackdropClick: true });

      const handler = wrapper.find('Modal').instance().handleBackdropClick;

      handler({});
      assert.strictEqual(onClose.callCount, 0);
    });

    it('should call through to the user specified onBackdropClick callback', () => {
      const wrapper = mount(modal);
      const onBackdropClick = spy();
      wrapper.setProps({ onBackdropClick });

      const handler = wrapper.find('Modal').instance().handleBackdropClick;

      handler({});
      assert.strictEqual(onBackdropClick.callCount, 1);
    });

    it('should ignore the backdrop click if the event did not come from the backdrop', () => {
      const wrapper = mount(modal);
      const onBackdropClick = spy();
      wrapper.setProps({ onBackdropClick });

      const handler = wrapper.find('Modal').instance().handleBackdropClick;

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
      const portalLayer = document.querySelector('[data-mui-test="Modal"]');
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

      assert.strictEqual(modal.children.length, 4);
      assert.strictEqual(modal.children[0] != null, true);
      assert.strictEqual(modal.children[2], container);
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

      assert.strictEqual(modal.children.length, 3);
      assert.strictEqual(modal.children[1], container);
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
      wrapper = mount(
        <Modal open={false} onEscapeKeyDown={onEscapeKeyDownSpy} onClose={onCloseSpy}>
          <div />
        </Modal>,
      );
      instance = wrapper.find('Modal').instance();
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
      assert.strictEqual(onCloseSpy.calledWith(event, 'escapeKeyDown'), true);
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

    it('should be call when defaultPrevented', () => {
      topModalStub.returns(true);
      wrapper.setProps({ manager: { isTopModal: topModalStub } });
      event = { key: 'Escape', defaultPrevented: true, stopPropagation: () => {} };

      instance.handleKeyDown(event);
      assert.strictEqual(topModalStub.callCount, 1);
      assert.strictEqual(onEscapeKeyDownSpy.callCount, 1);
      assert.strictEqual(onCloseSpy.callCount, 1);
    });
  });

  describe('prop: keepMounted', () => {
    it('should keep the children in the DOM', () => {
      const children = <p>Hello World</p>;
      const wrapper = mount(
        <Modal keepMounted open={false}>
          <div>{children}</div>
        </Modal>,
      );
      assert.strictEqual(wrapper.contains(children), true);
    });

    it('does not include the children in the a11y tree', () => {
      const modalRef = React.createRef();
      mount(
        <Modal keepMounted open={false} ref={modalRef}>
          <div />
        </Modal>,
      );
      const modalNode = modalRef.current;
      assert.strictEqual(modalNode.getAttribute('aria-hidden'), 'true');
    });

    // Test case for https://github.com/mui-org/material-ui/issues/15180
    it('should remove the transition children in the DOM when closed whilst transition status is entering', () => {
      const children = <p>Hello World</p>;

      class OpenClose extends React.Component {
        state = {
          open: false,
        };

        handleClick = () => {
          this.setState({ open: true }, () => {
            this.setState({ open: false });
          });
        };

        render() {
          return (
            <div>
              <button type="button" onClick={this.handleClick}>
                Toggle Tooltip
              </button>
              <Modal open={this.state.open}>
                <Fade in={this.state.open}>
                  <span>{children}</span>
                </Fade>
              </Modal>
            </div>
          );
        }
      }

      const wrapper = mount(<OpenClose />);
      assert.strictEqual(wrapper.contains(children), false);
      wrapper.find('button').simulate('click');
      assert.strictEqual(wrapper.contains(children), false);
    });
  });

  describe('focus', () => {
    let initialFocus = null;
    let wrapper;

    beforeEach(() => {
      initialFocus = document.createElement('div');
      initialFocus.tabIndex = 0;
      initialFocus.className = 'initial-focus';
      document.body.appendChild(initialFocus);
      initialFocus.focus();
      assert.strictEqual(document.activeElement, initialFocus);
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
      wrapper.unmount();
      document.body.removeChild(initialFocus);
    });

    it('should focus on the modal when it is opened', () => {
      wrapper = mount(
        <Modal open>
          <div className="modal">Foo</div>
        </Modal>,
      );
      assert.strictEqual(document.activeElement.className, 'modal');
      wrapper.setProps({ open: false });
      assert.strictEqual(document.activeElement, initialFocus);
    });

    it('should support autoFocus', () => {
      wrapper = mount(
        <Modal open>
          <div className="modal">
            <input type="text" autoFocus className />
          </div>
        </Modal>,
      );
      assert.strictEqual(document.activeElement.tagName, 'INPUT');
      wrapper.setProps({ open: false });
      assert.strictEqual(document.activeElement, initialFocus);
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
      assert.strictEqual(document.activeElement, initialFocus);
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
      initialFocus.focus();
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
      initialFocus.focus();
      assert.strictEqual(document.activeElement, initialFocus);
    });

    it('should warn if the modal content is not focusable', () => {
      const Dialog = React.forwardRef((_, ref) => <div ref={ref} />);

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

    it('should loop the tab key', () => {
      const dispatchKey = properties => {
        const event = new window.Event('keydown');
        Object.keys(properties).forEach(key => {
          event[key] = properties[key];
        });
        document.dispatchEvent(event);
      };

      wrapper = mount(
        <Modal open>
          <div className="modal">
            <div>Title</div>
            <button type="button">x</button>
            <button type="button">cancel</button>
            <button type="button">ok</button>
          </div>
        </Modal>,
      );
      assert.strictEqual(document.activeElement.className, 'modal');
      dispatchKey({
        keyCode: 13, // Enter
      });
      dispatchKey({
        keyCode: 9, // Tab
      });
      assert.strictEqual(document.activeElement.getAttribute('data-test'), 'sentinelStart');
      initialFocus.focus();
      dispatchKey({
        keyCode: 9, // Tab
        shiftKey: true,
      });
      assert.strictEqual(document.activeElement.getAttribute('data-test'), 'sentinelEnd');
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

    it('should open and close with Transitions', done => {
      const TestCase = props => (
        <React.Fragment>
          <Modal open={props.open}>
            <Fade onEntered={props.onEntered} onExited={props.onExited} in={props.open}>
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
        done();
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

  describe('prop: closeAfterTransition', () => {
    it('when true it should close after Transition has finished', done => {
      const TestCase = props => (
        <Modal open={props.open} closeAfterTransition>
          <Fade
            onEntered={props.onEntered}
            onExiting={props.onExiting}
            onExited={props.onExited}
            in={props.open}
          >
            <div>Hello</div>
          </Fade>
        </Modal>
      );

      TestCase.propTypes = {
        onEntered: PropTypes.func,
        onExited: PropTypes.func,
        onExiting: PropTypes.func,
        open: PropTypes.bool,
      };

      let wrapper;
      const onEntered = () => {
        assert.strictEqual(document.body.style.overflow, 'hidden');
        wrapper.setProps({ open: false });
      };

      const onExited = () => {
        assert.strictEqual(document.body.style.overflow, '');
        done();
      };

      const onExiting = () => {
        assert.strictEqual(document.body.style.overflow, 'hidden');
      };

      wrapper = mount(
        <TestCase onEntered={onEntered} onExiting={onExiting} onExited={onExited} open={false} />,
      );
      assert.strictEqual(document.body.style.overflow, '');
      wrapper.setProps({ open: true });
    });

    it('when false it should close before Transition has finished', done => {
      const TestCase = props => (
        <Modal open={props.open} closeAfterTransition={false}>
          <Fade
            onEntered={props.onEntered}
            onExiting={props.onExiting}
            onExited={props.onExited}
            in={props.open}
          >
            <div>Hello</div>
          </Fade>
        </Modal>
      );

      TestCase.propTypes = {
        onEntered: PropTypes.func,
        onExited: PropTypes.func,
        onExiting: PropTypes.func,
        open: PropTypes.bool,
      };

      let wrapper;
      const onEntered = () => {
        assert.strictEqual(document.body.style.overflow, 'hidden');
        wrapper.setProps({ open: false });
      };

      const onExited = () => {
        assert.strictEqual(document.body.style.overflow, '');
        done();
      };

      const onExiting = () => {
        assert.strictEqual(document.body.style.overflow, '');
      };

      wrapper = mount(
        <TestCase onEntered={onEntered} onExiting={onExiting} onExited={onExited} open={false} />,
      );
      assert.strictEqual(document.body.style.overflow, '');
      wrapper.setProps({ open: true });
    });
  });

  describe('prop: container', () => {
    it('should be able to change the container', () => {
      class TestCase extends React.Component {
        state = {
          anchorEl: null,
        };

        componentDidMount() {
          this.setState(
            () => ({
              anchorEl: document.body,
            }),
            () => {
              this.setState(
                {
                  anchorEl: null,
                },
                () => {
                  this.setState({
                    anchorEl: document.body,
                  });
                },
              );
            },
          );
        }

        render() {
          const { anchorEl } = this.state;
          return (
            <Modal open={Boolean(anchorEl)} container={anchorEl} {...this.props}>
              <Fade in={Boolean(anchorEl)}>
                <div>Hello</div>
              </Fade>
            </Modal>
          );
        }
      }
      mount(<TestCase />);
    });
  });
});
