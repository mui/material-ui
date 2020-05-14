import * as React from 'react';
import { expect } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import { createClientRender } from 'test/utils/createClientRender';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import Collapse from './Collapse';
import {
  ThemeProvider,
  createMuiTheme,
  unstable_createMuiStrictModeTheme as createMuiStrictModeTheme,
} from '@material-ui/core/styles';
import { Transition } from 'react-transition-group';

describe('<Collapse />', () => {
  // StrictModeViolation: uses react-transition-group
  const mount = createMount({ strict: false });
  let classes;
  const defaultProps = {
    in: true,
    children: <div />,
  };
  const render = createClientRender({ strict: false });

  before(() => {
    classes = getClasses(<Collapse {...defaultProps} />);
  });

  describeConformance(<Collapse {...defaultProps} />, () => ({
    classes,
    inheritComponent: Transition,
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));

  it('should render a container around the wrapper', () => {
    const { container } = render(
      <Collapse {...defaultProps} classes={{ container: 'woofCollapse1' }} />,
    );
    const collapse = container.firstChild;
    expect(collapse.tagName).to.equal('DIV');
    expect(collapse).to.have.class(classes.container);
    expect(collapse).to.have.class('woofCollapse1');
  });

  it('should render a wrapper around the children', () => {
    const children = <h1>Hello</h1>;
    const { container } = render(<Collapse {...defaultProps}>{children}</Collapse>);
    const collapse = container.firstChild;
    const wrapper = collapse.firstChild;
    const innerWrapper = wrapper.firstChild;
    expect(wrapper.tagName).to.equal('DIV');
    expect(innerWrapper.firstChild.tagName).to.equal('H1');
  });

  describe('transition lifecycle', () => {
    let setProps;
    let collapse;
    let container;
    let clock;
    let nodeEnterHeightStyle;
    let nodeEnteringHeightStyle;
    let nodeExitHeightStyle;

    /* We needs to create wrappers here because the node is passed by reference
       and it's style is overwritten by the later stages */
    const handleEnter = spy();
    const handleEnterWrapper = (...args) => {
      handleEnter(...args);
      nodeEnterHeightStyle = args[0].style.height;
    };
    const handleEntering = spy();
    const handleEnteringWrapper = (...args) => {
      handleEntering(...args);
      nodeEnteringHeightStyle = args[0].style.height;
    };
    const handleEntered = spy();
    const handleExit = spy();
    const handleExitWrapper = (...args) => {
      handleExit(...args);
      nodeExitHeightStyle = args[0].style.height;
    };
    const handleExiting = spy();
    const handleExited = spy();

    beforeEach(() => {
      clock = useFakeTimers();
      const renderProps = render(
        <Collapse
          onEnter={handleEnterWrapper}
          onEntering={handleEnteringWrapper}
          onEntered={handleEntered}
          onExit={handleExitWrapper}
          onExiting={handleExiting}
          onExited={handleExited}
          timeout={300}
        >
          <div />
        </Collapse>,
      );
      container = renderProps.container;
      setProps = renderProps.setProps;
      collapse = container.firstChild;
      stub(collapse.firstChild, 'clientHeight').get(() => 666);
    });

    afterEach(() => {
      clock.restore();
    });

    it('should run in', () => {
      setProps({ in: true });
      expect(nodeEnterHeightStyle).to.equal('0px');
      expect(handleEnter.args[0][0]).to.equal(collapse);
      expect(handleEnter.args[0][1]).to.equal(false);
      expect(nodeEnteringHeightStyle).to.equal('666px');
      expect(handleEntering.callCount).to.equal(1);
      expect(handleEntering.args[0][0]).to.equal(collapse);
      expect(handleEntering.args[0][1]).to.equal(false);
      clock.tick(300);
      expect(handleEntered.args[0][0].style.height).to.equal('auto');
      expect(handleEntered.args[0][1]).to.equal(false);
      expect(handleEntered.callCount).to.equal(1);
    });

    it('should run out', () => {
      setProps({ in: true });
      setProps({ in: false });
      expect(nodeExitHeightStyle).to.equal('666px');
      expect(handleExiting.args[0][0].style.height).to.equal('0px');
      expect(handleExiting.callCount).to.equal(1);
      expect(handleExiting.args[0][0]).to.equal(collapse);
      clock.tick(300);
      expect(handleExited.args[0][0].style.height).to.equal('0px');
      clock.tick(300);
      expect(handleExited.callCount).to.equal(1);
      expect(handleExited.args[0][0]).to.equal(collapse);
    });
  });

  describe('prop: timeout', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should delay based on height when timeout is auto', () => {
      const theme = createMuiTheme({
        transitions: {
          getAutoHeightDuration: (n) => n,
        },
      });

      const next1 = spy();
      const Test = (props) => (
        <ThemeProvider theme={theme}>
          <Collapse timeout="auto" onEntered={next1} {...props}>
            <div />
          </Collapse>
        </ThemeProvider>
      );
      const renderProps1 = render(<Test />);
      const collapse = renderProps1.container.firstChild;
      // Gets wrapper
      stub(collapse.firstChild, 'clientHeight').get(() => 10);

      renderProps1.setProps({
        in: true,
      });

      const autoTransitionDuration = 10;
      expect(next1.callCount).to.equal(0);
      clock.tick(0);
      expect(next1.callCount).to.equal(0);
      clock.tick(autoTransitionDuration);
      expect(next1.callCount).to.equal(1);

      const next2 = spy();
      const renderProps2 = render(
        <Collapse timeout="auto" onEntered={next2}>
          <div />
        </Collapse>,
      );
      renderProps2.setProps({ in: true });

      expect(next2.callCount).to.equal(0);
      clock.tick(0);
      expect(next2.callCount).to.equal(1);
    });

    it('should use timeout as delay when timeout is number', () => {
      const timeout = 10;
      const next = spy();
      const { setProps } = render(
        <Collapse timeout={timeout} onEntered={next}>
          <div />
        </Collapse>,
      );

      setProps({ in: true });

      expect(next.callCount).to.equal(0);
      clock.tick(0);
      expect(next.callCount).to.equal(0);
      clock.tick(timeout);
      expect(next.callCount).to.equal(1);
    });

    it('should create proper easeOut animation onEntering', () => {
      const handleEntering = spy();

      const { setProps } = render(
        <Collapse
          onEntering={handleEntering}
          timeout={{
            enter: 556,
          }}
        >
          <div />
        </Collapse>,
      );

      setProps({ in: true });
      expect(handleEntering.args[0][0].style.transitionDuration).to.equal('556ms');
    });

    it('should create proper sharp animation onExiting', () => {
      const handleExiting = spy();

      const { setProps } = render(
        <Collapse
          {...defaultProps}
          onExiting={handleExiting}
          timeout={{
            exit: 446,
          }}
        />,
      );

      setProps({
        in: false,
      });
      expect(handleExiting.args[0][0].style.transitionDuration).to.equal('446ms');
    });
  });

  describe('prop: collapsedHeight', () => {
    const collapsedHeight = '10px';

    it('should work when closed', () => {
      const { container } = render(
        <Collapse {...defaultProps} collapsedHeight={collapsedHeight} />,
      );
      const collapse = container.firstChild;
      expect(collapse.style.minHeight).to.equal(collapsedHeight);
    });

    it('should be taken into account in handleExiting', () => {
      const handleExiting = spy();
      const { setProps } = render(
        <Collapse {...defaultProps} collapsedHeight={collapsedHeight} onExiting={handleExiting} />,
      );
      setProps({ in: false });

      expect(handleExiting.args[0][0].style.height).to.equal(collapsedHeight);
    });
  });

  it('has no StrictMode warnings in a StrictMode theme', () => {
    mount(
      <React.StrictMode>
        <ThemeProvider theme={createMuiStrictModeTheme()}>
          <Collapse appear in>
            Hello, Dave!
          </Collapse>
        </ThemeProvider>
      </React.StrictMode>,
    );
  });

  it('can fallback to findDOMNode in a StrictMode theme', () => {
    const Div = () => <div />;
    mount(
      <ThemeProvider theme={createMuiStrictModeTheme()}>
        <Collapse appear component={Div} in disableStrictModeCompat>
          Hello, Dave!
        </Collapse>
      </ThemeProvider>,
    );
  });
});
