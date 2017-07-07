// @flow

import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import css from 'dom-helpers/style';
import { createShallow, createMount } from '../test-utils';
import Popover, { styleSheet } from './Popover';

describe('<Popover />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('root node', () => {
    it('should render a Modal with an invisible backdrop as the root node', () => {
      const wrapper = shallow(<Popover />);
      assert.strictEqual(wrapper.name(), 'withStyles(Modal)');
      assert.strictEqual(
        wrapper.props().backdropInvisible,
        true,
        'should have an invisible backdrop',
      );
    });

    it('should pass onRequestClose prop to Modal', () => {
      const fn = () => {};
      const wrapper = shallow(<Popover onRequestClose={fn} />);
      assert.strictEqual(
        wrapper.props().onRequestClose,
        fn,
        'should be the onRequestClose function',
      );
    });

    it('should pass open prop to Modal as `show`', () => {
      const wrapper = shallow(<Popover />);
      assert.strictEqual(wrapper.props().show, false, 'should not be open');
      wrapper.setProps({ open: true });
      assert.strictEqual(wrapper.props().show, true, 'should be open');
      wrapper.setProps({ open: false });
      assert.strictEqual(wrapper.props().show, false, 'should not be open');
    });

    describe('getOffsetTop', () => {
      let instance;
      let rect;

      before(() => {
        instance = shallow(<Popover />).instance();
        rect = {
          height: 1,
        };
      });

      it('should return vertical when vertical is a number', () => {
        const vertical = 1;
        const offsetTop = instance.handleGetOffsetTop('', vertical);
        assert.strictEqual(offsetTop, vertical);
      });

      it("should return half of rect.height if vertical is 'center'", () => {
        const vertical = 'center';
        const offsetTop = instance.handleGetOffsetTop(rect, vertical);
        assert.strictEqual(offsetTop, rect.height / 2);
      });

      it("should return rect.height if vertical is 'bottom'", () => {
        const vertical = 'bottom';
        const offsetTop = instance.handleGetOffsetTop(rect, vertical);
        assert.strictEqual(offsetTop, rect.height);
      });

      it('should return zero if vertical is something else', () => {
        const vertical = undefined;
        const offsetTop = instance.handleGetOffsetTop(rect, vertical);
        assert.strictEqual(offsetTop, 0);
      });
    });

    describe('getOffsetLeft', () => {
      let instance;
      let rect;

      before(() => {
        instance = shallow(<Popover />).instance();
        rect = {
          width: 1,
        };
      });

      it('should return horizontal when horizontal is a number', () => {
        const horizontal = 1;
        const offsetLeft = instance.handleGetOffsetLeft('', horizontal);
        assert.strictEqual(offsetLeft, horizontal);
      });

      it("should return half of rect.width if horizontal is 'center'", () => {
        const horizontal = 'center';
        const offsetLeft = instance.handleGetOffsetLeft(rect, horizontal);
        assert.strictEqual(offsetLeft, rect.width / 2);
      });

      it("should return rect.width if horizontal is 'right'", () => {
        const horizontal = 'right';
        const offsetLeft = instance.handleGetOffsetLeft(rect, horizontal);
        assert.strictEqual(offsetLeft, rect.width);
      });

      it('should return zero if horizontal is something else', () => {
        const horizontal = undefined;
        const offsetLeft = instance.handleGetOffsetLeft(rect, horizontal);
        assert.strictEqual(offsetLeft, 0);
      });
    });

    describe('getVerticalShift', () => {
      let instance;
      let windowInnerHeight;

      before(() => {
        instance = shallow(<Popover />).instance();
        windowInnerHeight = global.window.innerHeight;
        global.window.innerHeight = instance.marginThreshold * 2;
      });

      after(() => {
        global.window.innerHeight = windowInnerHeight;
      });

      it('should return a shift value when top < margin threshold', () => {
        const top = 0;
        const bottom = instance.marginThreshold;
        const shift = instance.getVerticalShift(top, bottom);
        assert.strictEqual(shift, -instance.marginThreshold);
      });

      it('should return a shift value when bottom > height threshold', () => {
        const top = instance.marginThreshold;
        const bottom = instance.marginThreshold * 2;
        const shift = instance.getVerticalShift(top, bottom);
        assert.strictEqual(shift, instance.marginThreshold);
      });

      it('should return 0 when top and bottom are within thresholds', () => {
        const top = instance.marginThreshold;
        const bottom = instance.marginThreshold;
        const shift = instance.getVerticalShift(top, bottom);
        assert.strictEqual(shift, 0);
      });
    });

    describe('getHorizontalShift', () => {
      let instance;
      let windowInnerWidth;

      before(() => {
        instance = shallow(<Popover />).instance();
        windowInnerWidth = global.window.innerWidth;
        global.window.innerWidth = instance.marginThreshold * 2;
      });

      after(() => {
        global.window.innerWidth = windowInnerWidth;
      });

      it('should return a shift value when left < margin threshold', () => {
        const left = 0;
        const right = instance.marginThreshold;
        const shift = instance.getHorizontalShift(left, right);
        assert.strictEqual(shift, -instance.marginThreshold);
      });

      it('should return a shift value when right > width threshold', () => {
        const left = instance.marginThreshold;
        const right = instance.marginThreshold * 2;
        const shift = instance.getHorizontalShift(left, right);
        assert.strictEqual(shift, instance.marginThreshold);
      });

      it('should return 0 when left and right are within thresholds', () => {
        const left = instance.marginThreshold;
        const right = instance.marginThreshold;
        const shift = instance.getHorizontalShift(left, right);
        assert.strictEqual(shift, 0);
      });
    });

    describe('getAnchorPoint', () => {
      let instance;

      before(() => {
        const element = {
          getBoundingClientRect() {
            return { top: 10, height: 40, left: 20 };
          },
        };
        instance = shallow(<Popover anchorEl={element} />).instance();
      });

      it('should return the center/left point for an element on screen', () => {
        const point = instance.getAnchorPoint();
        assert.deepEqual(point, { x: 20, y: 30 });
      });
    });
  });

  describe('transition', () => {
    it('should have Transition as the only child of Modal', () => {
      const wrapper = shallow(<Popover />);
      assert.strictEqual(wrapper.children().length, 1, 'should have one child');
      assert.strictEqual(wrapper.childAt(0).is('Transition'), true, 'should be Transition');
      assert.strictEqual(
        wrapper.childAt(0).prop('transitionAppear'),
        true,
        'should transition on first appearance',
      );
    });

    it('should set the transition in/out based on the open prop', () => {
      const wrapper = shallow(<Popover />);
      assert.strictEqual(wrapper.childAt(0).prop('in'), false, 'should not be in');
      wrapper.setProps({ open: true });
      assert.strictEqual(wrapper.childAt(0).prop('in'), true, 'should be in');
      wrapper.setProps({ open: false });
      assert.strictEqual(wrapper.childAt(0).prop('in'), false, 'should not be in');
    });

    it('should fire transition event callbacks', () => {
      const events = [
        // 'onEnter', this is currently async in Popover, test separately
        'onEntering',
        'onEntered',
        'onExit',
        'onExiting',
        'onExited',
      ];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<Popover {...handlers} />);

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.childAt(0).simulate(event, { style: {} });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('paper', () => {
    it('should have Paper as the only child of Transition', () => {
      const wrapper = shallow(<Popover />);
      assert.strictEqual(wrapper.childAt(0).children().length, 1, 'should have one child');
      assert.strictEqual(wrapper.childAt(0).childAt(0).name(), 'withStyles(Paper)');
    });

    it('should have the paper class and user classes', () => {
      const wrapper = shallow(<Popover className="test-class" />);
      const paper = wrapper.childAt(0).childAt(0);
      assert.strictEqual(paper.hasClass('test-class'), true, 'should have the user class');
      assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the popover class');
    });

    it('should have a elevation prop passed down', () => {
      const wrapper = shallow(<Popover />);
      assert.strictEqual(
        wrapper.childAt(0).childAt(0).prop('elevation'),
        8,
        'should be 8 elevation by default',
      );
      wrapper.setProps({ elevation: 16 });
      assert.strictEqual(
        wrapper.childAt(0).childAt(0).prop('elevation'),
        16,
        'should be 16 elevation',
      );
    });
  });

  describe('transition lifecycle', () => {
    const element = {
      style: {
        top: 'auto',
        left: 'auto',
        opacity: 1,
        transform: undefined,
        transformOrigin: undefined,
        transition: undefined,
      },
    };

    describe('handleEnter(element)', () => {
      let wrapper;
      let handleEnter;

      before(() => {
        handleEnter = spy();
        wrapper = shallow(<Popover onEnter={handleEnter} />);
        wrapper.instance().handleEnter(element);
      });

      it('should set the inline styles for the enter phase', () => {
        assert.strictEqual(element.style.opacity, 0, 'should be transparent');
        assert.strictEqual(
          element.style.transform,
          Popover.getScale(0.75),
          'should have the starting scale',
        );
        assert.strictEqual(
          element.style.top === '16px' && element.style.left === '16px',
          true,
          'should offset the element from the top left of the screen by 16px',
        );
        assert.strictEqual(
          element.style.transition,
          'opacity 0ms cubic-bezier(0.4, 0.0, 0.2, 1) 0ms,transform 0ms cubic-bezier(0.4, 0.0, 0.2, 1) 0ms', // eslint-disable-line max-len
          'should apply a transition for transform and opacity',
        );
        assert.strictEqual(
          element.style.transformOrigin,
          wrapper.instance().getPositioningStyle(element).transformOrigin,
          'should have a transformOrigin',
        );
      });

      it('should invoke the callback', () => {
        assert.strictEqual(handleEnter.callCount, 1, 'should have been called once');
      });
    });

    describe('handleEntering(element)', () => {
      let wrapper;
      let handleEntering;

      before(() => {
        handleEntering = spy();
        wrapper = shallow(<Popover onEntering={handleEntering} />);
        wrapper.instance().handleEntering(element);
      });

      it('should set the inline styles for the entering phase', () => {
        assert.strictEqual(element.style.opacity, 1, 'should be visible');
        assert.strictEqual(
          element.style.transform,
          Popover.getScale(1),
          'should have the full scale',
        );
      });

      it('should invoke the callback', () => {
        assert.strictEqual(handleEntering.callCount, 1, 'should have been called once');
      });
    });

    describe('handleExit(element)', () => {
      let wrapper;
      let handleExit;

      before(() => {
        handleExit = spy();
        wrapper = shallow(<Popover onExit={handleExit} />);
        wrapper.instance().handleExit(element);
      });

      it('should set the inline styles for the exit phase', () => {
        assert.strictEqual(element.style.opacity, 0, 'should be transparent');
        assert.strictEqual(
          element.style.transform,
          Popover.getScale(0.75),
          'should have the exit scale',
        );
      });

      it('should invoke the callback', () => {
        assert.strictEqual(handleExit.callCount, 1, 'should have been called once');
      });
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
        return new Promise(resolve => {
          if (!anchorEl) {
            anchorEl = window.document.createElement('div');
          }

          css(anchorEl, {
            width: '50px',
            height: '50px',
            position: 'absolute',
            top: '100px',
            left: '100px',
          });
          window.document.body.appendChild(anchorEl);
          wrapper = mount(
            <Popover
              anchorEl={anchorEl}
              anchorOrigin={anchorOrigin}
              transitionDuration={0}
              onEntered={() => {
                popoverEl = window.document.querySelector('[data-mui-test="Popover"]');
                resolve();
              }}
            />,
          );
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
      window.document.body.removeChild(anchorEl);
    });

    it('should be positioned over the top left of the anchor', () => {
      return openPopover({ vertical: 'top', horizontal: 'left' }).then(() => {
        const anchorRect = anchorEl.getBoundingClientRect();
        const expectedTop = anchorRect.top <= 16 ? 16 : anchorRect.top;
        const expectedLeft = anchorRect.left <= 16 ? 16 : anchorRect.left;
        expectPopover(expectedTop, expectedLeft);
      });
    });

    it('should be positioned over the center left of the anchor', () => {
      return openPopover({ vertical: 'center', horizontal: 'left' }).then(() => {
        const anchorRect = anchorEl.getBoundingClientRect();
        const anchorTop = anchorRect.top + anchorRect.height / 2;
        const expectedTop = anchorTop <= 16 ? 16 : anchorTop;
        const expectedLeft = anchorRect.left <= 16 ? 16 : anchorRect.left;
        expectPopover(expectedTop, expectedLeft);
      });
    });

    it('should be positioned over the bottom left of the anchor', () => {
      return openPopover({ vertical: 'bottom', horizontal: 'left' }).then(() => {
        const anchorRect = anchorEl.getBoundingClientRect();
        const expectedTop = anchorRect.bottom <= 16 ? 16 : anchorRect.bottom;
        const expectedLeft = anchorRect.left <= 16 ? 16 : anchorRect.left;
        expectPopover(expectedTop, expectedLeft);
      });
    });

    it('should be positioned over the center center of the anchor', () => {
      return openPopover({ vertical: 'center', horizontal: 'center' }).then(() => {
        const anchorRect = anchorEl.getBoundingClientRect();
        const anchorTop = anchorRect.top + anchorRect.height / 2;
        const anchorLeft = anchorRect.left + anchorRect.height / 2;
        const expectedTop = anchorTop <= 16 ? 16 : anchorTop;
        const expectedLeft = anchorLeft <= 16 ? 16 : anchorLeft;
        expectPopover(expectedTop, expectedLeft);
      });
    });

    it('should be positioned over the top right of the anchor', () => {
      return openPopover({ vertical: 'top', horizontal: 'right' }).then(() => {
        const anchorRect = anchorEl.getBoundingClientRect();
        const expectedTop = anchorRect.top <= 16 ? 16 : anchorRect.top;
        const expectedLeft = anchorRect.right <= 16 ? 16 : anchorRect.right;
        expectPopover(expectedTop, expectedLeft);
      });
    });

    it('should be positioned over the bottom right of the anchor', () => {
      return openPopover({ vertical: 'bottom', horizontal: 'right' }).then(() => {
        const anchorRect = anchorEl.getBoundingClientRect();
        const expectedTop = anchorRect.bottom <= 16 ? 16 : anchorRect.bottom;
        const expectedLeft = anchorRect.right <= 16 ? 16 : anchorRect.right;
        expectPopover(expectedTop, expectedLeft);
      });
    });
  });

  describe('positioning styles', () => {
    let element;
    let getVerticalShiftStub;
    let getHorizontalShiftStub;

    before(() => {
      element = {
        clientHeight: 20,
        clientWidth: 20,
        getBoundingClientRect() {
          return { top: 20, height: 60, left: 20 };
        },
      };
      getVerticalShiftStub = stub().returns(5);
      getHorizontalShiftStub = stub().returns(5);
    });

    it('should be computed for an element', () => {
      const anchorOrigin = { vertical: 'top', horizontal: 'left' };
      const transformOrigin = { vertical: 'top', horizontal: 'left' };
      const instance = shallow(
        <Popover
          anchorEl={element}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
        />,
      ).instance();
      instance.getVerticalShift = getVerticalShiftStub;
      instance.getHorizontalShift = getHorizontalShiftStub;
      const styles = instance.getPositioningStyle(element);
      assert.deepEqual(styles, {
        top: '15px',
        left: '15px',
        transformOrigin: '5px 5px',
      });
    });

    it('should be computed for an element with a menu list', () => {
      const getContentAnchorOffsetStub = stub().returns(20);
      const instance = shallow(
        <Popover anchorEl={element} getContentAnchorOffset={getContentAnchorOffsetStub} />,
      ).instance();
      instance.getVerticalShift = getVerticalShiftStub;
      instance.getHorizontalShift = getHorizontalShiftStub;
      const styles = instance.getPositioningStyle(element);
      assert.deepEqual(styles, {
        top: '15px',
        left: '15px',
        transformOrigin: '5px 35px',
      });
    });
  });

  describe('handleRequestTimeout()', () => {
    let wrapper;
    let instance;

    before(() => {
      wrapper = shallow(<Popover />);
    });

    describe('transitionDuration is auto', () => {
      before(() => {
        wrapper.setProps({ transitionDuration: 'auto' });
        instance = wrapper.instance();
      });

      it('should return autoTransitionDuration + 20', () => {
        const autoTransitionDuration = 10;
        instance.autoTransitionDuration = autoTransitionDuration;
        assert.strictEqual(instance.handleRequestTimeout(), autoTransitionDuration + 20);
      });

      it('should return 20', () => {
        instance.autoTransitionDuration = undefined;
        assert.strictEqual(instance.handleRequestTimeout(), 20);
      });
    });

    describe('transitionDuration is number', () => {
      let transitionDuration;

      before(() => {
        transitionDuration = 10;
        wrapper.setProps({ transitionDuration });
        instance = wrapper.instance();
      });

      it('should return props.transitionDuration + 20', () => {
        assert.strictEqual(instance.handleRequestTimeout(), transitionDuration + 20);
      });
    });
  });
});
