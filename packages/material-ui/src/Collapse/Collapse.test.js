import React from 'react';
import { assert } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import Collapse from './Collapse';
import { createMuiTheme } from '@material-ui/core/styles';
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
    assert.strictEqual(child.name(), 'div');
    assert.strictEqual(child.hasClass(classes.container), true);
    assert.strictEqual(child.hasClass('woofCollapse1'), true);
  });

  it('should render a wrapper around the children', () => {
    const children = <h1>Hello</h1>;
    const wrapper = mount(<Collapse {...defaultProps}>{children}</Collapse>);
    const child = wrapper.find('Transition').childAt(0);
    assert.strictEqual(child.childAt(0).name(), 'div');
    assert.strictEqual(
      child
        .childAt(0)
        .childAt(0)
        .children()
        .type(),
      'h1',
    );
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
          assert.strictEqual(nodeEnterHeightStyle, '0px');
        });
      });

      describe('handleEntering()', () => {
        it('should set height to the wrapper height', () => {
          assert.strictEqual(nodeEnteringHeightStyle, '666px');
        });

        it('should call handleEntering', () => {
          assert.strictEqual(handleEntering.callCount, 1);
          assert.strictEqual(handleEntering.args[0][0], container.instance());
        });
      });

      describe('handleEntered()', () => {
        it('should set height to auto', () => {
          clock.tick(1000);
          assert.strictEqual(handleEntered.args[0][0].style.height, 'auto');
        });

        it('should have called onEntered', () => {
          assert.strictEqual(handleEntered.callCount, 1);
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
          assert.strictEqual(nodeExitHeightStyle, '666px');
        });
      });

      describe('handleExiting()', () => {
        it('should set height to the 0', () => {
          assert.strictEqual(handleExiting.args[0][0].style.height, '0px');
        });

        it('should call onExiting', () => {
          assert.strictEqual(handleExiting.callCount, 1);
          assert.strictEqual(handleExiting.args[0][0], container.instance());
        });
      });

      describe('handleExited()', () => {
        it('should set height to the 0', () => {
          clock.tick(1000);
          assert.strictEqual(handleExited.args[0][0].style.height, '0px');
        });

        it('should call onExited', () => {
          clock.tick(1000);
          assert.strictEqual(handleExited.callCount, 1);
          assert.strictEqual(handleExited.args[0][0], container.instance());
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
      const next = spy();

      const theme = createMuiTheme({
        transitions: {
          getAutoHeightDuration: n => n,
        },
      });

      const wrapper = mount(
        <Collapse timeout="auto" onEntered={next} theme={theme}>
          <div />
        </Collapse>,
      );

      // Gets wrapper
      stub(
        wrapper
          .find('Transition')
          .childAt(0)
          .childAt(0)
          .instance(),
        'clientHeight',
      ).get(() => 10);

      wrapper.setProps({
        in: true,
      });

      const autoTransitionDuration = 10;
      assert.strictEqual(next.callCount, 0);
      clock.tick(0);
      assert.strictEqual(next.callCount, 0);
      clock.tick(autoTransitionDuration);
      assert.strictEqual(next.callCount, 1);

      const next2 = spy();
      const wrapper2 = mount(
        <Collapse timeout="auto" onEntered={next2}>
          <div />
        </Collapse>,
      );

      wrapper2.setProps({ in: true });

      assert.strictEqual(next2.callCount, 0);
      clock.tick(0);
      assert.strictEqual(next2.callCount, 1);
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

      assert.strictEqual(next.callCount, 0);
      clock.tick(0);
      assert.strictEqual(next.callCount, 0);
      clock.tick(timeout);
      assert.strictEqual(next.callCount, 1);
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
      assert.strictEqual(handleEntering.args[0][0].style.transitionDuration, '556ms');
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
      assert.strictEqual(handleExiting.args[0][0].style.transitionDuration, '446ms');
    });
  });

  describe('prop: collapsedHeight', () => {
    const collapsedHeight = '10px';

    it('should work when closed', () => {
      const wrapper = mount(<Collapse {...defaultProps} collapsedHeight={collapsedHeight} />);
      const child = wrapper.find('Transition').childAt(0);
      assert.strictEqual(child.props().style.minHeight, collapsedHeight);
    });

    it('should be taken into account in handleExiting', () => {
      const handleExiting = spy();
      const wrapper = mount(
        <Collapse {...defaultProps} collapsedHeight={collapsedHeight} onExiting={handleExiting} />,
      );
      wrapper.setProps({ in: false });

      assert.strictEqual(handleExiting.args[0][0].style.height, collapsedHeight);
    });
  });
});
