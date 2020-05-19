import * as React from 'react';
import { expect } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import { findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import * as PropTypes from 'prop-types';
import describeConformance from '../test-utils/describeConformance';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import Grow from '../Grow';
import Modal from '../Modal';
import Paper from '../Paper';
import Popover, { getOffsetLeft, getOffsetTop } from './Popover';
import useForkRef from '../utils/useForkRef';

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
  const handleMocks = React.useCallback((paperInstance) => {
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
  // StrictModeViolation: uses Grow
  const mount = createMount({ strict: false });
  let classes;
  const defaultProps = {
    open: false,
    anchorEl: () => document.createElement('svg'),
  };

  before(() => {
    classes = getClasses(
      <Popover {...defaultProps}>
        <div />
      </Popover>,
    );
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
      expect(root.type()).to.equal(Modal);
      expect(root.props().BackdropProps.invisible).to.equal(true);
    });

    it('should pass open prop to Modal as `open`', () => {
      const wrapper = mount(
        <Popover {...defaultProps}>
          <div />
        </Popover>,
      );
      expect(wrapper.find(Modal).props().open).to.equal(false);
      wrapper.setProps({ open: true });
      expect(wrapper.find(Modal).props().open).to.equal(true);
      wrapper.setProps({ open: false });
      expect(wrapper.find(Modal).props().open).to.equal(false);
    });

    describe('getOffsetTop', () => {
      let rect;

      before(() => {
        rect = { height: 1 };
      });

      it('should return vertical when vertical is a number', () => {
        const vertical = 1;
        const offsetTop = getOffsetTop('', vertical);
        expect(offsetTop).to.equal(vertical);
      });

      it("should return half of rect.height if vertical is 'center'", () => {
        const vertical = 'center';
        const offsetTop = getOffsetTop(rect, vertical);
        expect(offsetTop).to.equal(rect.height / 2);
      });

      it("should return rect.height if vertical is 'bottom'", () => {
        const vertical = 'bottom';
        const offsetTop = getOffsetTop(rect, vertical);
        expect(offsetTop).to.equal(rect.height);
      });

      it('should return zero if vertical is something else', () => {
        const vertical = undefined;
        const offsetTop = getOffsetTop(rect, vertical);
        expect(offsetTop).to.equal(0);
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
        expect(offsetLeft).to.equal(horizontal);
      });

      it("should return half of rect.width if horizontal is 'center'", () => {
        const horizontal = 'center';
        const offsetLeft = getOffsetLeft(rect, horizontal);
        expect(offsetLeft).to.equal(rect.width / 2);
      });

      it("should return rect.width if horizontal is 'right'", () => {
        const horizontal = 'right';
        const offsetLeft = getOffsetLeft(rect, horizontal);
        expect(offsetLeft).to.equal(rect.width);
      });

      it('should return zero if horizontal is something else', () => {
        const horizontal = undefined;
        const offsetLeft = getOffsetLeft(rect, horizontal);
        expect(offsetLeft).to.equal(0);
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

      expect(transition.exists()).to.equal(true);
      expect(transition.props().appear).to.equal(true);
    });

    it('should set the transition in/out based on the open prop', () => {
      const wrapper = mount(
        <Popover {...defaultProps} keepMounted>
          <div />
        </Popover>,
      );
      expect(wrapper.find(Grow).props().in).to.equal(false);
      wrapper.setProps({ open: true });
      expect(wrapper.find(Grow).props().in).to.equal(true);
      wrapper.setProps({ open: false });
      expect(wrapper.find(Grow).props().in).to.equal(false);
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

      events.forEach((eventHook) => {
        expect(handlers[eventHook].callCount).to.equal(1);
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

      expect(wrapper.find(Grow).find(Paper).exists()).to.equal(true);
    });

    it('should have the paper class and user classes', () => {
      const wrapper = mount(
        <Popover {...defaultProps} open className="test-class">
          <div />
        </Popover>,
      );
      expect(findOutermostIntrinsic(wrapper).hasClass('test-class')).to.equal(true);
      const paper = wrapper.find(Paper);
      expect(paper.hasClass(classes.paper)).to.equal(true);
    });

    it('should have a elevation prop passed down', () => {
      const wrapper = mount(
        <Popover {...defaultProps} open>
          <div />
        </Popover>,
      );

      expect(wrapper.find(Paper).props().elevation).to.equal(8);

      wrapper.setProps({ elevation: 16 });
      expect(wrapper.find(Paper).props().elevation).to.equal(16);
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

        expect(element.style.top === '16px' && element.style.left === '16px').to.equal(true);
        expect(element.style.transformOrigin).to.match(/-16px -16px( 0px)?/);
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
      expect(anchorElSpy.callCount).to.equal(1);
    });
  });

  describe('positioning on an anchor', () => {
    let anchorEl;
    let wrapper;
    let popoverEl;
    let openPopover;
    let expectPopover;

    before(() => {
      openPopover = (anchorOrigin) => {
        if (!anchorEl) {
          anchorEl = document.createElement('div');
        }

        const css = (element, styles) => {
          Object.keys(styles).forEach((key) => {
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
        document.body.appendChild(anchorEl);

        return new Promise((resolve) => {
          const component = (
            <Popover
              {...defaultProps}
              anchorEl={anchorEl}
              anchorOrigin={anchorOrigin}
              transitionDuration={0}
              onEntered={() => {
                popoverEl = document.querySelector('[data-mui-test="Popover"]');
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
        expect(popoverEl.style.top).to.equal(`${top}px`);

        expect(popoverEl.style.left).to.equal(`${left}px`);
        wrapper.unmount();
      };
    });

    after(() => {
      if (anchorEl) {
        document.body.removeChild(anchorEl);
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
      const wrapper2 = mount(<Popover anchorEl={anchorEl} container={container} open={false} />);

      expect(wrapper2.find(Modal).props().container).to.equal(container);
    });

    it("should use anchorEl's parent body as container if container not provided", async () => {
      await openPopover(undefined);
      expect(wrapper.find(Modal).props().container).to.equal(document.body);
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
      PropTypes.checkPropTypes(
        Popover.Naked.propTypes,
        { classes: {}, open: true },
        'prop',
        'MockedPopover',
      );

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include('It should be an Element instance');
    });

    it('warns if a component for the Paper is used that cant hold a ref', () => {
      PropTypes.checkPropTypes(
        Popover.Naked.propTypes,
        { ...defaultProps, classes: {}, PaperProps: { component: () => <div />, elevation: 4 } },
        'prop',
        'MockedPopover',
      );

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include(
        'Warning: Failed prop type: Invalid prop `PaperProps.component` supplied to `MockedPopover`. Expected an element type that can hold a ref.',
      );
    });
  });

  describe('prop anchorReference="anchorPosition"', () => {
    const anchorPosition = { top: 300, left: 500 };

    let wrapper;
    let popoverEl;
    let openPopover;
    let expectPopover;

    before(() => {
      openPopover = (anchorOrigin) =>
        new Promise((resolve) => {
          wrapper = mount(
            <Popover
              {...defaultProps}
              anchorReference="anchorPosition"
              anchorPosition={anchorPosition}
              anchorOrigin={anchorOrigin}
              transitionDuration={0}
              onEntered={() => {
                popoverEl = document.querySelector('[data-mui-test="Popover"]');
                resolve();
              }}
            >
              <div />
            </Popover>,
          );
          wrapper.setProps({ open: true });
        });

      expectPopover = (top, left) => {
        expect(popoverEl.style.top).to.equal(`${top}px`);

        expect(popoverEl.style.left).to.equal(`${left}px`);
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
        new Promise((resolve) => {
          wrapper = mount(
            <Popover
              {...defaultProps}
              anchorReference="none"
              transitionDuration={0}
              onEntered={() => {
                popoverEl = document.querySelector('[data-mui-test="Popover"]');
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
        expect(popoverEl.style.top).to.equal(`${top}px`);

        expect(popoverEl.style.left).to.equal(`${left}px`);
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
      window.innerHeight = 8;

      const mockedAnchor = document.createElement('div');
      stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
        left: 0,
        top: 9,
      }));
      const handleEntering = spy();
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
        open: true,
        action: (actions) => {
          popoverActions = actions;
        },
      });
      const beforeStyle = {
        top: element.style.top,
        left: element.style.left,
        transformOrigin: element.style.transformOrigin,
      };
      window.innerHeight = windowInnerHeight * 2;
      expect(typeof popoverActions.updatePosition === 'function').to.equal(true);
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

  [0, 18, 16].forEach((marginThreshold) => {
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

      specify('when no movement is needed', () => {
        const negative = marginThreshold === 0 ? '' : '-';
        const positioningStyle = generateElementStyle();

        expect(positioningStyle.top).to.equal(`${marginThreshold}px`);
        expect(positioningStyle.left).to.equal(`${marginThreshold}px`);
        expect(positioningStyle.transformOrigin).to.match(
          new RegExp(`${negative}${marginThreshold}px ${negative}${marginThreshold}px( 0px)?`),
        );
      });

      specify('top < marginThreshold', () => {
        const mockedAnchor = document.createElement('div');
        stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
          left: marginThreshold,
          top: marginThreshold - 1,
        }));
        const positioningStyle = generateElementStyle(mockedAnchor);

        expect(positioningStyle.top).to.equal(`${marginThreshold}px`);
        expect(positioningStyle.left).to.equal(`${marginThreshold}px`);
        expect(positioningStyle.transformOrigin).to.match(/0px -1px( 0ms)?/);
      });

      describe('bottom > heightThreshold', () => {
        let windowInnerHeight;

        before(() => {
          windowInnerHeight = window.innerHeight;
          window.innerHeight = marginThreshold * 2;
        });

        after(() => {
          window.innerHeight = windowInnerHeight;
        });

        specify('test', () => {
          const mockedAnchor = document.createElement('div');
          stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
            left: marginThreshold,
            top: marginThreshold + 1,
          }));

          const positioningStyle = generateElementStyle(mockedAnchor);

          expect(positioningStyle.top).to.equal(`${marginThreshold}px`);
          expect(positioningStyle.left).to.equal(`${marginThreshold}px`);
          expect(positioningStyle.transformOrigin).to.match(/0px 1px( 0px)?/);
        });
      });

      specify('left < marginThreshold', () => {
        const mockedAnchor = document.createElement('div');
        stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
          left: marginThreshold - 1,
          top: marginThreshold,
        }));

        const positioningStyle = generateElementStyle(mockedAnchor);

        expect(positioningStyle.top).to.equal(`${marginThreshold}px`);

        expect(positioningStyle.left).to.equal(`${marginThreshold}px`);

        expect(positioningStyle.transformOrigin).to.match(/-1px 0px( 0px)?/);
      });

      describe('right > widthThreshold', () => {
        let innerWidthContainer;

        before(() => {
          innerWidthContainer = window.innerWidth;
          window.innerWidth = marginThreshold * 2;
        });

        after(() => {
          window.innerWidth = innerWidthContainer;
        });

        specify('test', () => {
          const mockedAnchor = document.createElement('div');
          stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
            left: marginThreshold + 1,
            top: marginThreshold,
          }));

          const positioningStyle = generateElementStyle(mockedAnchor);

          expect(positioningStyle.top).to.equal(`${marginThreshold}px`);
          expect(positioningStyle.left).to.equal(`${marginThreshold}px`);
          expect(positioningStyle.transformOrigin).to.match(/1px 0px( 0px)?/);
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
      expect(elementStyle.transformOrigin).to.match(/0px 32px( 0px)?/);
      expect(elementStyle.top).to.equal('157px');
      expect(elementStyle.left).to.equal('160px');
    });
  });

  describe('prop: transitionDuration', () => {
    it('should apply the auto prop if supported', () => {
      const wrapper = mount(
        <Popover {...defaultProps} open>
          <div />
        </Popover>,
      );
      expect(wrapper.find(Grow).props().timeout).to.equal('auto');
    });

    it('should not apply the auto prop if not supported', () => {
      const TransitionComponent = React.forwardRef((_, ref) => <div ref={ref} tabIndex="-1" />);
      const wrapper = mount(
        <Popover {...defaultProps} open TransitionComponent={TransitionComponent}>
          <div />
        </Popover>,
      );
      expect(wrapper.find(TransitionComponent).props().timeout).to.equal(undefined);
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

      expect(apparentHandler.callCount).to.equal(1);
      expect(transitionHandler.callCount).to.equal(1);
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

      expect(apparentHandler.callCount).to.equal(0);
      expect(transitionHandler.callCount).to.equal(1);
    });
  });
});
