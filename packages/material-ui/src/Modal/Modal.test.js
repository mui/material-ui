import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { expect } from 'chai';
import { useFakeTimers, spy } from 'sinon';
import PropTypes from 'prop-types';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createClientRender, fireEvent, within } from 'test/utils/createClientRender';
import { createMuiTheme } from '@material-ui/core/styles';
import createMount from 'test/utils/createMount';
import { ThemeProvider } from '@material-ui/styles';
import describeConformance from '../test-utils/describeConformance';
import Fade from '../Fade';
import Backdrop from '../Backdrop';
import Modal from './Modal';

describe('<Modal />', () => {
  // StrictModeViolation: uses Backdrop
  const mount = createMount({ strict: false });
  const render = createClientRender({ strict: false });
  let savedBodyStyle;

  before(() => {
    savedBodyStyle = document.body.style;
  });

  beforeEach(() => {
    document.body.setAttribute('style', savedBodyStyle);
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
      render(
        <ThemeProvider theme={theme}>
          <Modal open>
            <p id="content">Hello World</p>
          </Modal>
        </ThemeProvider>,
      );

      expect(container).to.have.text('Hello World');
    });
  });

  describe('prop: open', () => {
    it('should not render the children by default', () => {
      const { queryByTestId } = render(
        <Modal open={false}>
          <p data-testid="content">Hello World</p>
        </Modal>,
      );

      expect(queryByTestId('content')).to.equal(null);
    });

    it('renders the children inside a div through a portal when open', () => {
      const { getByTestId } = render(
        <Modal data-testid="Portal" open>
          <p>Hello World</p>
        </Modal>,
      );

      expect(getByTestId('Portal')).to.have.property('tagName', 'DIV');
    });

    it('makes the child focusable without adding a role', () => {
      const { getByTestId } = render(
        <Modal open>
          <div data-testid="child">Hello World</div>
        </Modal>,
      );

      expect(getByTestId('child')).not.to.have.attribute('role');
      expect(getByTestId('child')).to.have.property('tabIndex', -1);
    });
  });

  describe('backdrop', () => {
    it('should render a backdrop with a fade transition', () => {
      const wrapper = mount(
        <Modal open BackdropComponent={Backdrop}>
          <div />
        </Modal>,
      );

      const backdrop = wrapper.find(Backdrop);
      expect(backdrop.exists()).to.equal(true);

      const transition = backdrop.find(Fade);
      expect(transition.props()).to.have.property('in', true);
    });

    it('should render a backdrop component into the portal before the modal content', () => {
      const { getByTestId } = render(
        <Modal open data-testid="modal">
          <div data-testid="container" />
        </Modal>,
      );

      const modal = getByTestId('modal');
      const container = getByTestId('container');
      expect(modal.children).to.have.length(4);
      expect(modal.children[0]).not.to.equal(undefined);
      expect(modal.children[0]).not.to.equal(null);
      expect(modal.children[2]).to.equal(container);
    });

    it('should pass prop to the transition component', () => {
      const wrapper = mount(
        <Modal open BackdropComponent={Backdrop} BackdropProps={{ transitionDuration: 200 }}>
          <div />
        </Modal>,
      );

      const transition = wrapper.find(Fade);
      expect(transition.props()).to.have.property('timeout', 200);
    });

    it('should attach a handler to the backdrop that fires onClose', () => {
      const onClose = spy();
      const { getByTestId } = render(
        <Modal onClose={onClose} open BackdropProps={{ 'data-testid': 'backdrop' }}>
          <div />
        </Modal>,
      );

      getByTestId('backdrop').click();

      expect(onClose).to.have.property('callCount', 1);
    });

    it('should let the user disable backdrop click triggering onClose', () => {
      const onClose = spy();
      const { getByTestId } = render(
        <Modal
          onClose={onClose}
          open
          disableBackdropClick
          BackdropProps={{ 'data-testid': 'backdrop' }}
        >
          <div />
        </Modal>,
      );

      getByTestId('backdrop').click();

      expect(onClose).to.have.property('callCount', 0);
    });

    it('should call through to the user specified onBackdropClick callback', () => {
      const onBackdropClick = spy();
      const { getByTestId } = render(
        <Modal onBackdropClick={onBackdropClick} open BackdropProps={{ 'data-testid': 'backdrop' }}>
          <div />
        </Modal>,
      );

      getByTestId('backdrop').click();

      expect(onBackdropClick).to.have.property('callCount', 1);
    });

    it('should ignore the backdrop click if the event did not come from the backdrop', () => {
      function CustomBackdrop(props) {
        return (
          <div {...props}>
            <span data-testid="inner" />
          </div>
        );
      }
      const onBackdropClick = spy();
      const { getByTestId } = render(
        <Modal onBackdropClick={onBackdropClick} open BackdropComponent={CustomBackdrop}>
          <div />
        </Modal>,
      );

      getByTestId('inner').click();

      expect(onBackdropClick).to.have.property('callCount', 0);
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

  describe('hide backdrop', () => {
    it('should not render a backdrop component into the portal before the modal content', () => {
      const { getByTestId } = render(
        <Modal open hideBackdrop data-testid="modal">
          <div data-testid="container" />
        </Modal>,
      );

      const modal = getByTestId('modal');
      const container = getByTestId('container');
      expect(modal.children).to.have.length(3);
      expect(modal.children[1]).to.equal(container);
    });
  });

  describe('handleKeyDown()', () => {
    it('when mounted, TopModal and event not esc should not call given functions', () => {
      const onEscapeKeyDownSpy = spy();
      const onCloseSpy = spy();
      const { getByTestId } = render(
        <Modal open onEscapeKeyDown={onEscapeKeyDownSpy} onClose={onCloseSpy}>
          <div data-testid="modal" tabIndex={-1} />
        </Modal>,
      );
      getByTestId('modal').focus();

      fireEvent.keyDown(getByTestId('modal'), {
        key: 'j', // Not escape
      });

      expect(onEscapeKeyDownSpy).to.have.property('callCount', 0);
      expect(onCloseSpy).to.have.property('callCount', 0);
    });

    it('should call onEscapeKeyDown and onClose', () => {
      const handleKeyDown = spy();
      const onEscapeKeyDownSpy = spy();
      const onCloseSpy = spy();
      const { getByTestId } = render(
        <div onKeyDown={handleKeyDown}>
          <Modal open onEscapeKeyDown={onEscapeKeyDownSpy} onClose={onCloseSpy}>
            <div data-testid="modal" tabIndex={-1} />
          </Modal>
        </div>,
      );
      getByTestId('modal').focus();

      fireEvent.keyDown(getByTestId('modal'), {
        key: 'Escape',
      });

      expect(onEscapeKeyDownSpy).to.have.property('callCount', 1);
      expect(onCloseSpy).to.have.property('callCount', 1);
      expect(handleKeyDown).to.have.property('callCount', 0);
    });

    it('should not call onChange when `disableEscapeKeyDown=true`', () => {
      const handleKeyDown = spy();
      const onEscapeKeyDownSpy = spy();
      const onCloseSpy = spy();
      const { getByTestId } = render(
        <div onKeyDown={handleKeyDown}>
          <Modal
            open
            disableEscapeKeyDown
            onEscapeKeyDown={onEscapeKeyDownSpy}
            onClose={onCloseSpy}
          >
            <div data-testid="modal" tabIndex={-1} />
          </Modal>
        </div>,
      );
      getByTestId('modal').focus();

      fireEvent.keyDown(getByTestId('modal'), {
        key: 'Escape',
      });

      expect(onEscapeKeyDownSpy).to.have.property('callCount', 1);
      expect(onCloseSpy).to.have.property('callCount', 0);
      expect(handleKeyDown).to.have.property('callCount', 1);
    });
  });

  describe('prop: keepMounted', () => {
    it('should keep the children in the DOM', () => {
      const { getByTestId } = render(
        <Modal keepMounted open={false}>
          <div>
            <p data-testid="children">Hello World</p>
          </div>
        </Modal>,
      );

      expect(getByTestId('children')).not.to.equal(null);
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
    // TODO: how does this relate to `keepMounted`
    // TODO: never finishes
    it('should remove the transition children in the DOM when closed whilst transition status is entering', () => {
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
                  <span>
                    <p data-testid="children">Hello World</p>
                  </span>
                </Fade>
              </Modal>
            </div>
          );
        }
      }
      const { queryByTestId, getByRole } = render(<OpenClose />);
      expect(queryByTestId('children')).to.equal(null);

      getByRole('button').click();

      expect(queryByTestId('children')).to.equal(null);
    });
  });

  describe('focus', () => {
    let initialFocus = null;

    beforeEach(() => {
      initialFocus = document.createElement('button');
      initialFocus.tabIndex = 0;
      document.body.appendChild(initialFocus);
      initialFocus.focus();

      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
      document.body.removeChild(initialFocus);
    });

    it('should focus on the modal when it is opened', () => {
      const { getByTestId, setProps } = render(
        <Modal open>
          <div data-testid="modal">Foo</div>
        </Modal>,
      );

      expect(getByTestId('modal')).toHaveFocus();

      setProps({ open: false });

      expect(initialFocus).toHaveFocus();
    });

    it('should support autoFocus', () => {
      const { getByTestId, setProps } = render(
        <Modal open>
          <div>
            <input data-testid="auto-focus" type="text" autoFocus className />
          </div>
        </Modal>,
      );

      expect(getByTestId('auto-focus')).toHaveFocus();

      setProps({ open: false });

      expect(initialFocus).toHaveFocus();
    });

    it('should keep focus on the modal when it is closed', () => {
      const { getByTestId, setProps } = render(
        <Modal open disableRestoreFocus>
          <div data-testid="modal">Foo</div>
        </Modal>,
      );

      expect(getByTestId('modal')).toHaveFocus();

      setProps({ open: false });

      expect(document.body).toHaveFocus();
    });

    it('should not focus on the modal when disableAutoFocus is true', () => {
      render(
        <Modal open disableAutoFocus>
          <div>Foo</div>
        </Modal>,
      );

      expect(initialFocus).toHaveFocus();
    });

    describe('', () => {
      let clock;

      beforeEach(() => {
        clock = useFakeTimers();
      });

      afterEach(() => {
        clock.restore();
      });

      it('does not steal focus from other frames', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // TODO: Unclear why this fails. Not important
          // since a browser test gives us more confidence anyway
          this.skip();
        }

        const FrameContext = React.createContext(document);
        // by default Modal will use the document where the module! was initialized
        // which is usually the top document
        function FramedModal(props) {
          const document = React.useContext(FrameContext);

          return <Modal container={document.body} {...props} />;
        }
        // react requires some more work to get <iframe>{children}</iframe> working
        // see "DemoFrame" in our docs for a documented implementation
        function IFrame(props) {
          const { children } = props;
          const frameRef = React.useRef(null);
          const [iframeLoaded, onLoad] = React.useReducer(() => true, false);

          React.useEffect(() => {
            const document = frameRef.current.contentDocument;

            if (document != null && document.readyState === 'complete' && !iframeLoaded) {
              onLoad();
            }
          }, [iframeLoaded]);

          const document = frameRef.current?.contentDocument;
          return (
            <React.Fragment>
              <iframe onLoad={onLoad} ref={frameRef} />
              {iframeLoaded !== false
                ? ReactDOM.createPortal(
                    <FrameContext.Provider value={document}>{children}</FrameContext.Provider>,
                    document.body,
                  )
                : null}
            </React.Fragment>
          );
        }
        const { getByTestId } = render(
          <React.Fragment>
            <input data-testid="foreign-input" type="text" />
            <IFrame>
              <FramedModal open>
                <div data-testid="modal" />
              </FramedModal>
            </IFrame>
          </React.Fragment>,
        );

        getByTestId('foreign-input').focus();
        // wait for the `contain` interval check to kick in.
        clock.tick(500);

        expect(getByTestId('foreign-input')).toHaveFocus();
      });
    });
  });

  describe('prop: onRendered', () => {
    it('should fire', () => {
      const handleRendered = spy();

      render(
        <Modal open onRendered={handleRendered}>
          <div />
        </Modal>,
      );

      expect(handleRendered).to.have.property('callCount', 1);
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

      const { setProps } = render(<TestCase open={false} />);

      expect(document.body.style).to.have.property('overflow', '');

      setProps({ open: true });

      expect(document.body.style).to.have.property('overflow', 'hidden');

      setProps({ open: false });

      expect(document.body.style).to.have.property('overflow', '');
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
        expect(document.body.style).to.have.property('overflow', 'hidden');
        wrapper.setProps({ open: false });
      };

      const onExited = () => {
        expect(document.body.style).to.have.property('overflow', '');
        done();
      };

      wrapper = mount(<TestCase onEntered={onEntered} onExited={onExited} open={false} />);

      expect(document.body.style).to.have.property('overflow', '');

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

      let setProps;
      const onEntered = () => {
        expect(document.body.style).to.have.property('overflow', 'hidden');
        setProps({ open: false });
      };

      const onExited = () => {
        expect(document.body.style).to.have.property('overflow', '');
        done();
      };

      const onExiting = () => {
        expect(document.body.style).to.have.property('overflow', 'hidden');
      };

      ({ setProps } = render(
        <TestCase onEntered={onEntered} onExiting={onExiting} onExited={onExited} open={false} />,
      ));

      expect(document.body.style).to.have.property('overflow', '');

      setProps({ open: true });
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

      let setProps;
      const onEntered = () => {
        expect(document.body.style).to.have.property('overflow', 'hidden');
        setProps({ open: false });
      };

      const onExited = () => {
        expect(document.body.style).to.have.property('overflow', '');
        done();
      };

      const onExiting = () => {
        expect(document.body.style).to.have.property('overflow', '');
      };

      ({ setProps } = render(
        <TestCase onEntered={onEntered} onExiting={onExiting} onExited={onExited} open={false} />,
      ));

      expect(document.body.style).to.have.property('overflow', '');

      setProps({ open: true });
    });
  });

  describe('prop: container', () => {
    it('should be able to change the container', () => {
      function TestCase(props) {
        const { anchorEl } = props;
        return (
          <Modal open={Boolean(anchorEl)} container={anchorEl}>
            <Fade in={Boolean(anchorEl)}>
              <div>Hello</div>
            </Fade>
          </Modal>
        );
      }

      const { setProps } = render(<TestCase anchorEl={null} />);
      setProps({ anchorEl: document.body });
      setProps({ anchorEl: null });
      setProps({ anchorEl: document.body });
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
