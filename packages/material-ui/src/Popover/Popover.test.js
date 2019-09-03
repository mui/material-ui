import React from 'react';
import { assert, expect } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import PropTypes from 'prop-types';
import { createMount, findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import Grow from '../Grow';
import Modal from '../Modal';
import Paper from '../Paper';
import Popover, { getOffsetLeft, getOffsetTop } from './Popover';
import { useForkRef } from '../utils/reactHelpers';

const mockedAnchorEl = () => {
  const div = document.createElement('div');

  stub(div, 'getBoundingClientRect').callsFake(() => ({
    width: 100,
    height: 58,
    left: 160,
    top: 160,
    bottom: 218,
    right: 260,
  }));
  return div;
};

const FakePaper = React.forwardRef(function FakeWidthPaper(props, ref) {
  const handleMocks = React.useCallback(paperInstance => {
    if (paperInstance) {
      // For jsdom
      Object.defineProperty(paperInstance, 'offsetWidth', { value: 0 });
      Object.defineProperty(paperInstance, 'offsetHeight', { value: 0 });
    }
  }, []);
  const handleRef = useForkRef(ref, handleMocks);

  return (
    <div
      tabIndex={-1}
      ref={handleRef}
      style={{
        width: 0,
        height: 0,
      }}
      {...props}
    />
  );
});

describe('<Popover />', () => {
  let mount;
  let classes;
  const defaultProps = {
    open: false,
    anchorEl: () => document.createElement('svg'),
  };

  before(() => {
    // StrictModeViolation: uses Grow
    mount = createMount({ strict: false });
    classes = getClasses(
      <Popover {...defaultProps}>
        <div />
      </Popover>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Popover {...defaultProps} open />, () => ({
    classes,
    inheritComponent: Modal,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp',
      // react-transition-group issue
      'reactTestRenderer',
    ],
  }));

  describe('root node', () => {
    it('should render a Modal with an invisible backdrop as the root node', () => {
      const wrapper = mount(
        <Popover {...defaultProps} data-root-node>
          <div />
        </Popover>,
      );
      const root = wrapper.find('ForwardRef(Popover) > [data-root-node]').first();
      assert.strictEqual(root.type(), Modal);
      assert.strictEqual(root.props().BackdropProps.invisible, true);
    });

    it('should pass open prop to Modal as `open`', () => {
      const wrapper = mount(
        <Popover {...defaultProps}>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.find(Modal).props().open, false);
      wrapper.setProps({ open: true });
      assert.strictEqual(wrapper.find(Modal).props().open, true);
      wrapper.setProps({ open: false });
      assert.strictEqual(wrapper.find(Modal).props().open, false);
    });

    describe('getOffsetTop', () => {
      let rect;

      before(() => {
        rect = { height: 1 };
      });

      it('should return vertical when vertical is a number', () => {
        const vertical = 1;
        const offsetTop = getOffsetTop('', vertical);
        assert.strictEqual(offsetTop, vertical);
      });

      it("should return half of rect.height if vertical is 'center'", () => {
        const vertical = 'center';
        const offsetTop = getOffsetTop(rect, vertical);
        assert.strictEqual(offsetTop, rect.height / 2);
      });

      it("should return rect.height if vertical is 'bottom'", () => {
        const vertical = 'bottom';
        const offsetTop = getOffsetTop(rect, vertical);
        assert.strictEqual(offsetTop, rect.height);
      });

      it('should return zero if vertical is something else', () => {
        const vertical = undefined;
        const offsetTop = getOffsetTop(rect, vertical);
        assert.strictEqual(offsetTop, 0);
      });
    });

    describe('getOffsetLeft', () => {
      let rect;

      before(() => {
        rect = { width: 1 };
      });

      it('should return horizontal when horizontal is a number', () => {
        const horizontal = 1;
        const offsetLeft = getOffsetLeft('', horizontal);
        assert.strictEqual(offsetLeft, horizontal);
      });

      it("should return half of rect.width if horizontal is 'center'", () => {
        const horizontal = 'center';
        const offsetLeft = getOffsetLeft(rect, horizontal);
        assert.strictEqual(offsetLeft, rect.width / 2);
      });

      it("should return rect.width if horizontal is 'right'", () => {
        const horizontal = 'right';
        const offsetLeft = getOffsetLeft(rect, horizontal);
        assert.strictEqual(offsetLeft, rect.width);
      });

      it('should return zero if horizontal is something else', () => {
        const horizontal = undefined;
        const offsetLeft = getOffsetLeft(rect, horizontal);
        assert.strictEqual(offsetLeft, 0);
      });
    });
  });

  describe('transition', () => {
    let clock;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('uses Grow as the Transition of the modal', () => {
      const wrapper = mount(
        <Popover {...defaultProps} open>
          <div />
        </Popover>,
      );
      const modal = wrapper.find('[data-mui-test="Modal"]');
      const transition = modal.find(Grow);

      assert.strictEqual(transition.exists(), true);
      assert.strictEqual(transition.props().appear, true, 'should transition on first appearance');
    });

    it('should set the transition in/out based on the open prop', () => {
      const wrapper = mount(
        <Popover {...defaultProps} keepMounted>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.find(Grow).props().in, false);
      wrapper.setProps({ open: true });
      assert.strictEqual(wrapper.find(Grow).props().in, true);
      wrapper.setProps({ open: false });
      assert.strictEqual(wrapper.find(Grow).props().in, false);
    });

    it('should fire Popover transition event callbacks', () => {
      const events = ['onEntering', 'onEnter', 'onEntered', 'onExit', 'onExiting', 'onExited'];

      const handlers = events.reduce((result, eventHook) => {
        result[eventHook] = spy();
        return result;
      }, {});

      // transitions towards entered
      const wrapper = mount(
        <Popover {...defaultProps} open transitionDuration={0} {...handlers}>
          <div />
        </Popover>,
      );
      clock.tick(0);
      // transition towards exited
      wrapper.setProps({ open: false });
      clock.tick(0);

      events.forEach(eventHook => {
        assert.strictEqual(
          handlers[eventHook].callCount,
          1,
          `should have called the ${eventHook} handler`,
        );
      });
    });
  });

  describe('paper', () => {
    it('should have Paper as a child of Transition', () => {
      const wrapper = mount(
        <Popover {...defaultProps} open>
          <div />
        </Popover>,
      );

      assert.strictEqual(
        wrapper
          .find(Grow)
          .find(Paper)
          .exists(),
        true,
      );
    });

    it('should have the paper class and user classes', () => {
      const wrapper = mount(
        <Popover {...defaultProps} open className="test-class">
          <div />
        </Popover>,
      );
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass('test-class'), true);
      const paper = wrapper.find(Paper);
      assert.strictEqual(paper.hasClass(classes.paper), true);
    });

    it('should have a elevation prop passed down', () => {
      const wrapper = mount(
        <Popover {...defaultProps} open>
          <div />
        </Popover>,
      );

      assert.strictEqual(
        wrapper.find(Paper).props().elevation,
        8,
        'should be 8 elevation by default',
      );

      wrapper.setProps({ elevation: 16 });
      assert.strictEqual(wrapper.find(Paper).props().elevation, 16, 'should be 16 elevation');
    });
  });

  describe('transition lifecycle', () => {
    describe('handleEntering(element)', () => {
      it('should set the inline styles for the enter phase', () => {
        const handleEntering = spy();
        const wrapper = mount(
          <Popover {...defaultProps} onEntering={handleEntering}>
            <div />
          </Popover>,
        );

        wrapper.setProps({
          open: true,
        });

        const element = handleEntering.args[0][0];

        assert.strictEqual(
          element.style.top === '16px' && element.style.left === '16px',
          true,
          'should offset the element from the top left of the screen by 16px',
        );
        assert.match(
          element.style.transformOrigin,
          /-16px -16px( 0px)?/,
          'should have a transformOrigin',
        );
      });
    });
  });

  describe('prop: anchorEl', () => {
    it('should accept a function', () => {
      const anchorElSpy = spy();
      mount(
        <Popover {...defaultProps} anchorEl={anchorElSpy}>
          <div />
        </Popover>,
      );
      assert.strictEqual(anchorElSpy.callCount, 1);
    });
  });

  describe('positioning on an anchor', () => {
    let anchorEl;
    let wrapper;
    let popoverEl;
    let openPopover;
    let expectPopover;

    before(() => {
      openPopover = anchorOrigin => {
        if (!anchorEl) {
          anchorEl = window.document.createElement('div');
        }

        const css = (element, styles) => {
          Object.keys(styles).forEach(key => {
            element.style[key] = styles[key];
          });
        };

        css(anchorEl, {
          width: '50px',
          height: '50px',
          position: 'absolute',
          top: '100px',
          left: '100px',
        });
        window.document.body.appendChild(anchorEl);

        return new Promise(resolve => {
          const component = (
            <Popover
              {...defaultProps}
              anchorEl={anchorEl}
              anchorOrigin={anchorOrigin}
              transitionDuration={0}
              onEntered={() => {
                popoverEl = window.document.querySelector('[data-mui-test="Popover"]');
                resolve();
              }}
            >
              <div />
            </Popover>
          );
          wrapper = mount(component);
          wrapper.setProps({ open: true });
        });
      };

      expectPopover = (top, left) => {
        assert.strictEqual(
          popoverEl.style.top,
          `${top}px`,
          'should position at the correct top offset',
        );

        assert.strictEqual(
          popoverEl.style.left,
          `${left}px`,
          'should position at the correct left offset',
        );
        wrapper.unmount();
      };
    });

    after(() => {
      if (anchorEl) {
        window.document.body.removeChild(anchorEl);
      }
    });

    it('should be positioned over the top left of the anchor', async () => {
      await openPopover({ vertical: 'top', horizontal: 'left' });
      const anchorRect = anchorEl.getBoundingClientRect();
      const expectedTop = anchorRect.top <= 16 ? 16 : anchorRect.top;
      const expectedLeft = anchorRect.left <= 16 ? 16 : anchorRect.left;
      expectPopover(expectedTop, expectedLeft);
    });

    it('should be positioned over the center left of the anchor', async () => {
      await openPopover({ vertical: 'center', horizontal: 'left' });
      const anchorRect = anchorEl.getBoundingClientRect();
      const anchorTop = anchorRect.top + anchorRect.height / 2;
      const expectedTop = anchorTop <= 16 ? 16 : anchorTop;
      const expectedLeft = anchorRect.left <= 16 ? 16 : anchorRect.left;
      expectPopover(expectedTop, expectedLeft);
    });

    it('should be positioned over the bottom left of the anchor', async () => {
      await openPopover({ vertical: 'bottom', horizontal: 'left' });
      const anchorRect = anchorEl.getBoundingClientRect();
      const expectedTop = anchorRect.bottom <= 16 ? 16 : anchorRect.bottom;
      const expectedLeft = anchorRect.left <= 16 ? 16 : anchorRect.left;
      expectPopover(expectedTop, expectedLeft);
    });

    it('should be positioned over the center center of the anchor', async () => {
      await openPopover({ vertical: 'center', horizontal: 'center' });
      const anchorRect = anchorEl.getBoundingClientRect();
      const anchorTop = anchorRect.top + anchorRect.height / 2;
      const anchorLeft = anchorRect.left + anchorRect.height / 2;
      const expectedTop = anchorTop <= 16 ? 16 : anchorTop;
      const expectedLeft = anchorLeft <= 16 ? 16 : anchorLeft;
      expectPopover(expectedTop, expectedLeft);
    });

    it('should be positioned over the top right of the anchor', async () => {
      await openPopover({ vertical: 'top', horizontal: 'right' });
      const anchorRect = anchorEl.getBoundingClientRect();
      const expectedTop = anchorRect.top <= 16 ? 16 : anchorRect.top;
      const expectedLeft = anchorRect.right <= 16 ? 16 : anchorRect.right;
      expectPopover(expectedTop, expectedLeft);
    });

    it('should be positioned over the bottom right of the anchor', async () => {
      await openPopover({ vertical: 'bottom', horizontal: 'right' });
      const anchorRect = anchorEl.getBoundingClientRect();
      const expectedTop = anchorRect.bottom <= 16 ? 16 : anchorRect.bottom;
      const expectedLeft = anchorRect.right <= 16 ? 16 : anchorRect.right;
      expectPopover(expectedTop, expectedLeft);
    });

    it('should pass through container prop if container and anchorEl props are provided', () => {
      const container = document.createElement('div');
      const wrapper2 = mount(<Popover anchorEl={anchorEl} container={container} open />);

      assert.strictEqual(wrapper2.find(Modal).props().container, container);
    });

    it("should use anchorEl's parent body as container if container not provided", async () => {
      await openPopover(undefined);
      assert.strictEqual(
        wrapper.find(Modal).props().container,
        window.document.body,
        "should use anchorEl's parent body as Modal container",
      );
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
      PropTypes.resetWarningCache();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn if anchorEl is not valid', () => {
      const otherWrapper = mount(<Popover open />);
      assert.strictEqual(otherWrapper.find(Modal).props().container, undefined);
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(consoleErrorMock.args()[0][0], 'It should be an Element instance');
    });

    it('warns if a component for the Paper is used that cant hold a ref', () => {
      mount(<Popover {...defaultProps} PaperProps={{ component: () => <div />, elevation: 4 }} />);
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(
        consoleErrorMock.args()[0][0],
        'Warning: Failed prop type: Invalid prop `PaperProps.component` supplied to `ForwardRef(Popover)`. Expected an element type that can hold a ref.',
      );
    });

    // it('should warn if anchorEl is not visible', () => {
    //   mount(<Popover open anchorEl={document.createElement('div')} />);
    //   assert.strictEqual(consoleErrorMock.callCount(), 1);
    //   assert.include(consoleErrorMock.args()[0][0], 'The node element should be visible');
    // });
  });

  describe('prop anchorReference="anchorPosition"', () => {
    const anchorPosition = { top: 300, left: 500 };

    let wrapper;
    let popoverEl;
    let openPopover;
    let expectPopover;

    before(() => {
      openPopover = anchorOrigin =>
        new Promise(resolve => {
          wrapper = mount(
            <Popover
              {...defaultProps}
              anchorReference="anchorPosition"
              anchorPosition={anchorPosition}
              anchorOrigin={anchorOrigin}
              transitionDuration={0}
              onEntered={() => {
                popoverEl = window.document.querySelector('[data-mui-test="Popover"]');
                resolve();
              }}
            >
              <div />
            </Popover>,
          );
          wrapper.setProps({ open: true });
        });

      expectPopover = (top, left) => {
        assert.strictEqual(
          popoverEl.style.top,
          `${top}px`,
          'should position at the correct top offset',
        );

        assert.strictEqual(
          popoverEl.style.left,
          `${left}px`,
          'should position at the correct left offset',
        );
        wrapper.unmount();
      };
    });

    it('should be positioned according to the passed coordinates', async () => {
      await openPopover();
      expectPopover(anchorPosition.top, anchorPosition.left);
    });

    it('should ignore the anchorOrigin prop when being positioned', async () => {
      await openPopover({ vertical: 'top', horizontal: 'right' });
      expectPopover(anchorPosition.top, anchorPosition.left);
    });
  });

  describe('prop anchorReference="none"', () => {
    let wrapper;
    let popoverEl;
    let openPopover;
    let expectPopover;

    before(() => {
      openPopover = () =>
        new Promise(resolve => {
          wrapper = mount(
            <Popover
              {...defaultProps}
              anchorReference="none"
              transitionDuration={0}
              onEntered={() => {
                popoverEl = window.document.querySelector('[data-mui-test="Popover"]');
                resolve();
              }}
              PaperProps={{
                style: {
                  top: 11,
                  left: 12,
                },
              }}
            >
              <div />
            </Popover>,
          );
          wrapper.setProps({ open: true });
        });

      expectPopover = (top, left) => {
        assert.strictEqual(
          popoverEl.style.top,
          `${top}px`,
          'should position at the correct top offset',
        );

        assert.strictEqual(
          popoverEl.style.left,
          `${left}px`,
          'should position at the correct left offset',
        );
        wrapper.unmount();
      };
    });

    it('should not try to change the position', async () => {
      await openPopover();
      expectPopover(11, 12);
    });
  });

  describe('update position', () => {
    let clock;
    let windowInnerHeight;
    let element;
    let wrapper;

    beforeEach(() => {
      clock = useFakeTimers();

      windowInnerHeight = window.innerHeight;
      const mockedAnchor = document.createElement('div');
      stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
        left: 0,
        top: 9,
      }));
      const handleEntering = spy();
      window.innerHeight = 8;
      wrapper = mount(
        <Popover
          anchorEl={mockedAnchor}
          open
          onEntering={handleEntering}
          transitionDuration={0}
          marginThreshold={8}
        >
          <div />
        </Popover>,
      );
      element = handleEntering.args[0][0];
    });

    afterEach(() => {
      window.innerHeight = windowInnerHeight;

      clock.restore();
    });

    it('should recalculate position if the popover is open', () => {
      const beforeStyle = {
        top: element.style.top,
        left: element.style.left,
        transformOrigin: element.style.transformOrigin,
      };
      window.innerHeight = windowInnerHeight * 2;
      window.dispatchEvent(new window.Event('resize'));
      clock.tick(166);
      const afterStyle = {
        top: element.style.top,
        left: element.style.left,
        transformOrigin: element.style.transformOrigin,
      };
      expect(JSON.stringify(beforeStyle)).to.not.equal(JSON.stringify(afterStyle));
    });

    it('should not recalculate position if the popover is closed', () => {
      const beforeStyle = {
        top: element.style.top,
        left: element.style.left,
        transformOrigin: element.style.transformOrigin,
      };
      window.innerHeight = windowInnerHeight * 2;
      window.dispatchEvent(new window.Event('resize'));
      wrapper.setProps({ open: false });
      clock.tick(166);
      const afterStyle = {
        top: element.style.top,
        left: element.style.left,
        transformOrigin: element.style.transformOrigin,
      };
      expect(JSON.stringify(beforeStyle)).to.equal(JSON.stringify(afterStyle));
    });

    it('should be able to manually recalculate position', () => {
      let popoverActions;
      wrapper.setProps({
        open: false,
        action: actions => {
          popoverActions = actions;
        },
      });
      wrapper.setProps({
        open: true,
      });
      const beforeStyle = {
        top: element.style.top,
        left: element.style.left,
        transformOrigin: element.style.transformOrigin,
      };
      window.innerHeight = windowInnerHeight * 2;
      assert.strictEqual(
        typeof popoverActions.updatePosition === 'function',
        true,
        'Should be a function.',
      );
      popoverActions.updatePosition();
      clock.tick(166);
      const afterStyle = {
        top: element.style.top,
        left: element.style.left,
        transformOrigin: element.style.transformOrigin,
      };
      expect(JSON.stringify(beforeStyle)).to.not.equal(JSON.stringify(afterStyle));
    });
  });

  [0, 18, 16].forEach(marginThreshold => {
    describe(`positioning when \`marginThreshold=${marginThreshold}\``, () => {
      function generateElementStyle(anchorEl = document.createElement('svg')) {
        const handleEntering = spy();
        mount(
          <Popover
            anchorEl={anchorEl}
            open
            onEntering={handleEntering}
            marginThreshold={marginThreshold}
            PaperProps={{ component: FakePaper }}
          >
            <div />
          </Popover>,
        );
        return handleEntering.args[0][0].style;
      }

      describe('when no movement is needed', () => {
        let positioningStyle;
        const negative = marginThreshold === 0 ? '' : '-';
        const expectedTransformOrigin = new RegExp(
          `${negative}${marginThreshold}px ${negative}${marginThreshold}px( 0px)?`,
        );

        before(() => {
          positioningStyle = generateElementStyle();
        });

        it('should set top to marginThreshold', () => {
          assert.strictEqual(positioningStyle.top, `${marginThreshold}px`);
        });

        it('should set left to marginThreshold', () => {
          assert.strictEqual(positioningStyle.left, `${marginThreshold}px`);
        });

        it('should transformOrigin according to marginThreshold', () => {
          assert.match(positioningStyle.transformOrigin, expectedTransformOrigin);
        });
      });

      describe('top < marginThreshold', () => {
        let positioningStyle;

        before(() => {
          const mockedAnchor = document.createElement('div');
          stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
            left: marginThreshold,
            top: marginThreshold - 1,
          }));

          positioningStyle = generateElementStyle(mockedAnchor);
        });

        it('should set top to marginThreshold', () => {
          assert.strictEqual(positioningStyle.top, `${marginThreshold}px`);
        });

        it('should set left to marginThreshold', () => {
          assert.strictEqual(positioningStyle.left, `${marginThreshold}px`);
        });

        it('should transformOrigin according to marginThreshold', () => {
          assert.match(positioningStyle.transformOrigin, /0px -1px( 0ms)?/);
        });
      });

      describe('bottom > heightThreshold', () => {
        let positioningStyle;
        let windowInnerHeight;

        before(() => {
          windowInnerHeight = window.innerHeight;
          window.innerHeight = marginThreshold * 2;
          const mockedAnchor = document.createElement('div');
          stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
            left: marginThreshold,
            top: marginThreshold + 1,
          }));

          positioningStyle = generateElementStyle(mockedAnchor);
        });

        after(() => {
          window.innerHeight = windowInnerHeight;
        });

        it('should set top to marginThreshold', () => {
          assert.strictEqual(positioningStyle.top, `${marginThreshold}px`);
        });

        it('should set left to marginThreshold', () => {
          assert.strictEqual(positioningStyle.left, `${marginThreshold}px`);
        });

        it('should transformOrigin according to marginThreshold', () => {
          assert.match(positioningStyle.transformOrigin, /0px 1px( 0px)?/);
        });
      });

      describe('left < marginThreshold', () => {
        let positioningStyle;

        before(() => {
          const mockedAnchor = document.createElement('div');
          stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
            left: marginThreshold - 1,
            top: marginThreshold,
          }));

          positioningStyle = generateElementStyle(mockedAnchor);
        });

        it('should set top to marginThreshold', () => {
          assert.strictEqual(positioningStyle.top, `${marginThreshold}px`);
        });

        it('should set left to marginThreshold', () => {
          assert.strictEqual(positioningStyle.left, `${marginThreshold}px`);
        });

        it('should transformOrigin according to marginThreshold', () => {
          assert.match(positioningStyle.transformOrigin, /-1px 0px( 0px)?/);
        });
      });

      describe('right > widthThreshold', () => {
        let positioningStyle;
        let innerWidthContainer;

        before(() => {
          innerWidthContainer = window.innerWidth;
          window.innerWidth = marginThreshold * 2;
          const mockedAnchor = document.createElement('div');
          stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
            left: marginThreshold + 1,
            top: marginThreshold,
          }));

          positioningStyle = generateElementStyle(mockedAnchor);
        });

        after(() => {
          window.innerWidth = innerWidthContainer;
        });

        it('should set top to marginThreshold', () => {
          assert.strictEqual(positioningStyle.top, `${marginThreshold}px`);
        });

        it('should set left to marginThreshold', () => {
          assert.strictEqual(positioningStyle.left, `${marginThreshold}px`);
        });

        it('should transformOrigin according to marginThreshold', () => {
          assert.match(positioningStyle.transformOrigin, /1px 0px( 0px)?/);
        });
      });
    });
  });

  describe('prop: getContentAnchorEl', () => {
    it('should position accordingly', () => {
      const handleEntering = spy();
      const divRef = React.createRef();
      const getContentAnchorEl = () => {
        Object.defineProperties(divRef.current, {
          offsetTop: { get: () => 8 },
          clientHeight: { get: () => 48 },
          clientWidth: { get: () => 116 },
        });
        return divRef.current;
      };

      mount(
        <Popover
          anchorEl={mockedAnchorEl}
          onEntering={handleEntering}
          getContentAnchorEl={getContentAnchorEl}
          open
        >
          <div ref={divRef} />
        </Popover>,
      );

      const elementStyle = handleEntering.args[0][0].style;
      assert.match(elementStyle.transformOrigin, /0px 32px( 0px)?/);
      assert.strictEqual(elementStyle.top, '157px');
      assert.strictEqual(elementStyle.left, '160px');
    });
  });

  describe('prop: transitionDuration', () => {
    it('should apply the auto prop if supported', () => {
      const wrapper = mount(
        <Popover {...defaultProps} open>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.find(Grow).props().timeout, 'auto');
    });

    it('should not apply the auto prop if not supported', () => {
      const TransitionComponent = React.forwardRef((_, ref) => <div ref={ref} tabIndex="-1" />);
      const wrapper = mount(
        <Popover {...defaultProps} open TransitionComponent={TransitionComponent}>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.find(TransitionComponent).props().timeout, undefined);
    });
  });

  describe('prop: TransitionProp', () => {
    it('chains onEntering with the apparent onEntering prop', () => {
      const apparentHandler = spy();
      const transitionHandler = spy();

      mount(
        <Popover
          {...defaultProps}
          open
          TransitionProps={{ onEntering: transitionHandler }}
          onEntering={apparentHandler}
        >
          <div />
        </Popover>,
      );

      assert.strictEqual(apparentHandler.callCount, 1);
      assert.strictEqual(transitionHandler.callCount, 1);
    });

    it('does not chain other transition callbacks with the apparent ones', () => {
      const apparentHandler = spy();
      const transitionHandler = spy();
      const wrapper = mount(
        <Popover
          {...defaultProps}
          open
          TransitionProps={{ onExiting: transitionHandler }}
          onExiting={apparentHandler}
        >
          <div />
        </Popover>,
      );

      wrapper.setProps({ open: false });

      assert.strictEqual(apparentHandler.callCount, 0);
      assert.strictEqual(transitionHandler.callCount, 1);
    });
  });
});
