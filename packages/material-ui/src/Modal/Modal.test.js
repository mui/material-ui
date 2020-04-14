import * as React from 'react';
import { assert, expect } from 'chai';
import { useFakeTimers, spy } from 'sinon';
import PropTypes from 'prop-types';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createClientRender, within } from 'test/utils/createClientRender';
import { createMuiTheme } from '@material-ui/core/styles';
import { createMount, findOutermostIntrinsic } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/styles';
import describeConformance from '../test-utils/describeConformance';
import Fade from '../Fade';
import Backdrop from '../Backdrop';
import Modal from './Modal';

describe('<Modal />', () => {
  let mount;
  const render = createClientRender({ strict: false });
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
      skip: [
        'rootClass',
        'componentProp',
        // https://github.com/facebook/react/issues/11565
        'reactTestRenderer',
      ],
    }),
  );

  describe('props', () => {
    let container;

    before(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    after(() => {
      document.body.removeChild(container);
    });

    it('should consume theme default props', () => {
      const theme = createMuiTheme({ props: { MuiModal: { container } } });
      mount(
        <ThemeProvider theme={theme}>
          <Modal open>
            <p id="content">Hello World</p>
          </Modal>
        </ThemeProvider>,
      );

      assert.strictEqual(container.textContent, 'Hello World');
    });
  });

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
      const backdrop = wrapper.find('[data-mui-test="Backdrop"]');
      backdrop.simulate('click');
      assert.strictEqual(onClose.callCount, 1);
    });

    it('should let the user disable backdrop click triggering onClose', () => {
      const wrapper = mount(modal);
      const onClose = spy();
      wrapper.setProps({ onClose, disableBackdropClick: true });
      const backdrop = wrapper.find('[data-mui-test="Backdrop"]');
      backdrop.simulate('click');
      assert.strictEqual(onClose.callCount, 0);
    });

    it('should call through to the user specified onBackdropClick callback', () => {
      const wrapper = mount(modal);
      const onBackdropClick = spy();
      wrapper.setProps({ onBackdropClick });
      const backdrop = wrapper.find('[data-mui-test="Backdrop"]');
      backdrop.simulate('click');
      assert.strictEqual(onBackdropClick.callCount, 1);
    });

    it('should ignore the backdrop click if the event did not come from the backdrop', () => {
      const wrapper = mount(modal);
      const onBackdropClick = spy();
      wrapper.setProps({
        onBackdropClick,
        BackdropComponent: (props) => (
          <div data-mui-test="Backdrop" {...props}>
            <span />
          </div>
        ),
      });

      const backdropSpan = wrapper.find('div[data-mui-test="Backdrop"] > span');
      backdropSpan.simulate('click');
      assert.strictEqual(onBackdropClick.callCount, 0);
    });

    // Test case for https://github.com/mui-org/material-ui/issues/12831
    it('should unmount the children when starting open and closing immediately', () => {
      function TestCase() {
        const [open, setOpen] = React.useState(true);

        React.useEffect(() => {
          setOpen(false);
        }, []);

        return (
          <Modal open={open}>
            <Fade in={open}>
              <div id="modal-body">hello</div>
            </Fade>
          </Modal>
        );
      }
      render(<TestCase />);
      expect(document.querySelector('#modal-body')).to.equal(null);
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

      assert.strictEqual(container2.getAttribute('role'), null, 'should not add any role');
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
    let onEscapeKeyDownSpy;
    let onCloseSpy;
    let modalWrapper;

    beforeEach(() => {
      onEscapeKeyDownSpy = spy();
      onCloseSpy = spy();
      wrapper = mount(
        <Modal open onEscapeKeyDown={onEscapeKeyDownSpy} onClose={onCloseSpy}>
          <div />
        </Modal>,
      );
      modalWrapper = wrapper.find('[data-mui-test="Modal"]');
    });

    it('when mounted, TopModal and event not esc should not call given functions', () => {
      modalWrapper.simulate('keydown', {
        key: 'j', // Not escape
      });
      assert.strictEqual(onEscapeKeyDownSpy.callCount, 0);
      assert.strictEqual(onCloseSpy.callCount, 0);
    });

    it('should call onEscapeKeyDown and onClose', () => {
      modalWrapper.simulate('keydown', {
        key: 'Escape',
      });
      assert.strictEqual(onEscapeKeyDownSpy.callCount, 1);
      assert.strictEqual(onCloseSpy.callCount, 1);
    });

    it('when disableEscapeKeyDown should call only onClose', () => {
      wrapper.setProps({ disableEscapeKeyDown: true });
      modalWrapper.simulate('keydown', {
        key: 'Escape',
      });
      assert.strictEqual(onEscapeKeyDownSpy.callCount, 1);
      assert.strictEqual(onCloseSpy.callCount, 0);
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
      const wrapper = mount(
        <Modal keepMounted open={false} ref={modalRef}>
          <div>ModalContent</div>
        </Modal>,
      );
      const modalNode = modalRef.current;
      expect(modalNode).toBeAriaHidden();

      wrapper.setProps({ open: true });
      expect(modalNode).not.toBeAriaHidden();
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
      assert.match(consoleErrorMock.messages()[0], /the modal content node does not accept focus/);
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
      const dispatchKey = (properties) => {
        const event = new window.Event('keydown');
        Object.keys(properties).forEach((key) => {
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

    describe('', () => {
      let clock;

      before(() => {
        clock = useFakeTimers();
      });

      after(() => {
        clock.restore();
      });

      it('contains the focus if the active element is removed', () => {
        function WithRemovableElement({ hideButton = false }) {
          return (
            <Modal open>
              <div role="dialog">
                {!hideButton && <button type="button">I am going to disappear</button>}
              </div>
            </Modal>
          );
        }
        WithRemovableElement.propTypes = {
          hideButton: PropTypes.bool,
        };

        wrapper = {
          unmount() {},
        };

        const { getByRole, setProps } = render(<WithRemovableElement />);
        const dialog = getByRole('dialog');
        const toggleButton = getByRole('button');
        expect(dialog).toHaveFocus();

        toggleButton.focus();
        expect(toggleButton).toHaveFocus();

        setProps({ hideButton: true });
        expect(dialog).not.toHaveFocus();
        clock.tick(500); // wait for the interval check to kick in.
        expect(dialog).toHaveFocus();
      });
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
      const TestCase = (props) => (
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

    it('should open and close with Transitions', (done) => {
      const TestCase = (props) => (
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
    it('when true it should close after Transition has finished', (done) => {
      const TestCase = (props) => (
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

    it('when false it should close before Transition has finished', (done) => {
      const TestCase = (props) => (
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

  describe('prop: disablePortal', () => {
    it('should render the content into the parent', () => {
      const { getByTestId } = render(
        <div data-testid="parent">
          <Modal open disablePortal>
            <div data-testid="child" />
          </Modal>
        </div>,
      );
      expect(within(getByTestId('parent')).getByTestId('child')).not.to.equal(null);
    });
  });
});
