import * as React from 'react';
import { expect } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import Collapse from './Collapse';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Transition } from 'react-transition-group';

describe('<Collapse />', () => {
  let mount;
  let classes;
  const defaultProps = {
    in: true,
    children: <div />,
  };

  before(() => {
    // StrictModeViolation: uses react-transition-group
    mount = createMount({ strict: false });
    classes = getClasses(<Collapse {...defaultProps} />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Collapse {...defaultProps} />, () => ({
    classes,
    inheritComponent: Transition,
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));

  it('should render a container around the wrapper', () => {
    const wrapper = mount(<Collapse {...defaultProps} classes={{ container: 'woofCollapse1' }} />);
    const child = wrapper.find('Transition').childAt(0);
    expect(child.name()).to.equal('div');
    expect(child.hasClass(classes.container)).to.equal(true);
    expect(child.hasClass('woofCollapse1')).to.equal(true);
  });

  it('should render a wrapper around the children', () => {
    const children = <h1>Hello</h1>;
    const wrapper = mount(<Collapse {...defaultProps}>{children}</Collapse>);
    const child = wrapper.find('Transition').childAt(0);
    expect(child.childAt(0).name()).to.equal('div');
    expect(child.childAt(0).childAt(0).children().type()).to.equal('h1');
  });

  describe('transition lifecycle', () => {
    let wrapper;
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

    before(() => {
      wrapper = mount(
        <Collapse
          onEnter={handleEnterWrapper}
          onEntering={handleEnteringWrapper}
          onEntered={handleEntered}
          onExit={handleExitWrapper}
          onExiting={handleExiting}
          onExited={handleExited}
        >
          <div />
        </Collapse>,
      );
      container = wrapper.find('Transition').childAt(0);
      stub(container.childAt(0).instance(), 'clientHeight').get(() => 666);
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    describe('in', () => {
      before(() => {
        wrapper.setProps({ in: true });
      });

      describe('handleEnter()', () => {
        it('should set element height to 0 initially', () => {
          expect(nodeEnterHeightStyle).to.equal('0px');
        });

        it('should call handleEnter', () => {
          expect(handleEnter.args[0][0]).to.equal(container.instance());
          expect(handleEnter.args[0][1]).to.equal(false);
        });
      });

      describe('handleEntering()', () => {
        it('should set height to the wrapper height', () => {
          expect(nodeEnteringHeightStyle).to.equal('666px');
        });

        it('should call handleEntering', () => {
          expect(handleEntering.callCount).to.equal(1);
          expect(handleEntering.args[0][0]).to.equal(container.instance());
          expect(handleEntering.args[0][1]).to.equal(false);
        });
      });

      describe('handleEntered()', () => {
        it('should set height to auto', () => {
          clock.tick(1000);
          expect(handleEntered.args[0][0].style.height).to.equal('auto');
          expect(handleEntered.args[0][1]).to.equal(false);
        });

        it('should have called onEntered', () => {
          expect(handleEntered.callCount).to.equal(1);
        });
      });
    });

    describe('out', () => {
      before(() => {
        wrapper.setProps({ in: true });
        wrapper.setProps({ in: false });
      });

      describe('handleExit()', () => {
        it('should set height to the wrapper height', () => {
          expect(nodeExitHeightStyle).to.equal('666px');
        });
      });

      describe('handleExiting()', () => {
        it('should set height to the 0', () => {
          expect(handleExiting.args[0][0].style.height).to.equal('0px');
        });

        it('should call onExiting', () => {
          expect(handleExiting.callCount).to.equal(1);
          expect(handleExiting.args[0][0]).to.equal(container.instance());
        });
      });

      describe('handleExited()', () => {
        it('should set height to the 0', () => {
          clock.tick(1000);
          expect(handleExited.args[0][0].style.height).to.equal('0px');
        });

        it('should call onExited', () => {
          clock.tick(1000);
          expect(handleExited.callCount).to.equal(1);
          expect(handleExited.args[0][0]).to.equal(container.instance());
        });
      });
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
      const wrapper = mount(<Test />);

      // Gets wrapper
      stub(wrapper.find('Transition').childAt(0).childAt(0).instance(), 'clientHeight').get(
        () => 10,
      );

      wrapper.setProps({
        in: true,
      });

      const autoTransitionDuration = 10;
      expect(next1.callCount).to.equal(0);
      clock.tick(0);
      expect(next1.callCount).to.equal(0);
      clock.tick(autoTransitionDuration);
      expect(next1.callCount).to.equal(1);

      const next2 = spy();
      const wrapper2 = mount(
        <Collapse timeout="auto" onEntered={next2}>
          <div />
        </Collapse>,
      );
      wrapper2.setProps({ in: true });

      expect(next2.callCount).to.equal(0);
      clock.tick(0);
      expect(next2.callCount).to.equal(1);
    });

    it('should use timeout as delay when timeout is number', () => {
      const timeout = 10;
      const next = spy();
      const wrapper = mount(
        <Collapse timeout={timeout} onEntered={next}>
          <div />
        </Collapse>,
      );

      wrapper.setProps({ in: true });

      expect(next.callCount).to.equal(0);
      clock.tick(0);
      expect(next.callCount).to.equal(0);
      clock.tick(timeout);
      expect(next.callCount).to.equal(1);
    });

    it('should create proper easeOut animation onEntering', () => {
      const handleEntering = spy();

      const wrapper = mount(
        <Collapse
          onEntering={handleEntering}
          timeout={{
            enter: 556,
          }}
        >
          <div />
        </Collapse>,
      );

      wrapper.setProps({ in: true });
      expect(handleEntering.args[0][0].style.transitionDuration).to.equal('556ms');
    });

    it('should create proper sharp animation onExiting', () => {
      const handleExiting = spy();

      const wrapper = mount(
        <Collapse
          {...defaultProps}
          onExiting={handleExiting}
          timeout={{
            exit: 446,
          }}
        />,
      );

      wrapper.setProps({
        in: false,
      });
      expect(handleExiting.args[0][0].style.transitionDuration).to.equal('446ms');
    });
  });

  describe('prop: collapsedHeight', () => {
    const collapsedHeight = '10px';

    it('should work when closed', () => {
      const wrapper = mount(<Collapse {...defaultProps} collapsedHeight={collapsedHeight} />);
      const child = wrapper.find('Transition').childAt(0);
      expect(child.props().style.minHeight).to.equal(collapsedHeight);
    });

    it('should be taken into account in handleExiting', () => {
      const handleExiting = spy();
      const wrapper = mount(
        <Collapse {...defaultProps} collapsedHeight={collapsedHeight} onExiting={handleExiting} />,
      );
      wrapper.setProps({ in: false });

      expect(handleExiting.args[0][0].style.height).to.equal(collapsedHeight);
    });
  });
});
