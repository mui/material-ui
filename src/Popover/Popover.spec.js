// @flow

import React from 'react';
import { assert } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import css from 'dom-helpers/style';
import { createShallow, createMount, getClasses } from '../test-utils';
import Popover from './Popover';

describe('<Popover />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(
      <Popover>
        <div />
      </Popover>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  describe('root node', () => {
    it('should render a Modal with an invisible backdrop as the root node', () => {
      const wrapper = shallow(
        <Popover>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.name(), 'withStyles(Modal)');
      assert.strictEqual(wrapper.props().backdropInvisible, true);
    });

    it('should pass onRequestClose prop to Modal', () => {
      const fn = () => {};
      const wrapper = shallow(
        <Popover onRequestClose={fn}>
          <div />
        </Popover>,
      );
      assert.strictEqual(
        wrapper.props().onRequestClose,
        fn,
        'should be the onRequestClose function',
      );
    });

    it('should pass open prop to Modal as `show`', () => {
      const wrapper = shallow(
        <Popover>
          <div />
        </Popover>,
      );
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
        instance = shallow(
          <Popover>
            <div />
          </Popover>,
        ).instance();
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
        instance = shallow(
          <Popover>
            <div />
          </Popover>,
        ).instance();
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
  });

  describe('transition', () => {
    it('should have Transition as the only child of Modal', () => {
      const wrapper = shallow(
        <Popover>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.children().length, 1, 'should have one child');
      assert.strictEqual(
        wrapper.childAt(0).is('withTheme(Grow)'),
        true,
        'should be withTheme(Popover) Transition',
      );
      assert.strictEqual(
        wrapper.childAt(0).prop('transitionAppear'),
        true,
        'should transition on first appearance',
      );
    });

    it('should set the transition in/out based on the open prop', () => {
      const wrapper = shallow(
        <Popover>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.childAt(0).props().in, false, 'should not be in');
      wrapper.setProps({ open: true });
      assert.strictEqual(wrapper.childAt(0).props().in, true, 'should be in');
      wrapper.setProps({ open: false });
      assert.strictEqual(wrapper.childAt(0).props().in, false, 'should not be in');
    });

    it('should fire Popover transition event callbacks', () => {
      const events = ['onEntering', 'onEnter', 'onEntered', 'onExit', 'onExiting', 'onExited'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(
        <Popover {...handlers}>
          <div />
        </Popover>,
      );

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.find('withTheme(Grow)').simulate(event, { style: {} });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('paper', () => {
    it('should have Paper as the only child of Transition', () => {
      const wrapper = shallow(
        <Popover>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.childAt(0).children().length, 1, 'should have one child');
      assert.strictEqual(
        wrapper
          .childAt(0)
          .childAt(0)
          .name(),
        'withStyles(Paper)',
      );
    });

    it('should have the paper class and user classes', () => {
      const wrapper = shallow(
        <Popover className="test-class">
          <div />
        </Popover>,
      );
      const paper = wrapper.childAt(0).childAt(0);
      assert.strictEqual(paper.hasClass('test-class'), true, 'should have the user class');
      assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the popover class');
    });

    it('should have a elevation prop passed down', () => {
      const wrapper = shallow(
        <Popover>
          <div />
        </Popover>,
      );
      assert.strictEqual(
        wrapper
          .childAt(0)
          .childAt(0)
          .prop('elevation'),
        8,
        'should be 8 elevation by default',
      );
      wrapper.setProps({ elevation: 16 });
      assert.strictEqual(
        wrapper
          .childAt(0)
          .childAt(0)
          .prop('elevation'),
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
        wrapper = shallow(
          <Popover onEnter={handleEnter}>
            <div />
          </Popover>,
        );
        wrapper.instance().handleEnter(element);
      });

      it('should set the inline styles for the enter phase', () => {
        assert.strictEqual(
          element.style.top === '16px' && element.style.left === '16px',
          true,
          'should offset the element from the top left of the screen by 16px',
        );
        assert.strictEqual(
          element.style.transformOrigin,
          wrapper.instance().getPositioningStyle(element).transformOrigin,
          'should have a transformOrigin',
        );
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
            >
              <div />
            </Popover>,
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

  describe('on window resize', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should recalculate position if the popover is open', () => {
      const wrapper = shallow(
        <Popover open transitionDuration={0}>
          <div />
        </Popover>,
      );
      const instance = wrapper.instance();

      stub(instance, 'setPositioningStyles');
      wrapper
        .find('EventListener')
        .at(0)
        .simulate('resize');
      clock.tick(166);
      assert.isTrue(instance.setPositioningStyles.called, 'position styles recalculated');
    });

    it('should not recalculate position if the popover is closed', () => {
      const wrapper = mount(
        <Popover transitionDuration={0}>
          <div />
        </Popover>,
      );
      assert.isNotTrue(wrapper.contains('EventListener'), 'no component listening on resize');
    });
  });

  describe('getPositioningStyle(element)', () => {
    let instance;
    let element;
    let anchorOffset;
    let tempAnchorOffset;
    let transformOrigin;
    let positioningStyle;

    let innerHeightContainer;
    let innerWidthContainer;

    before(() => {
      instance = shallow(
        <Popover>
          <div />
        </Popover>,
      ).instance();
      instance.getContentAnchorOffset = spy();

      innerHeightContainer = global.window.innerHeight;
      innerWidthContainer = global.window.innerWidth;

      global.window.innerHeight = instance.marginThreshold * 2;
      global.window.innerWidth = instance.marginThreshold * 2;

      anchorOffset = { top: instance.marginThreshold, left: instance.marginThreshold };
      instance.getAnchorOffset = stub().returns(anchorOffset);

      transformOrigin = { vertical: 0, horizontal: 0 };
      instance.getTransformOrigin = stub().returns(transformOrigin);

      instance.getTransformOriginValue = stub().returns(true);

      element = { clientHeight: 0, clientWidth: 0 };
    });

    after(() => {
      global.window.innerHeight = innerHeightContainer;
      global.window.innerWidth = innerWidthContainer;
    });

    describe('no offsets', () => {
      before(() => {
        positioningStyle = instance.getPositioningStyle(element);
      });

      after(() => {
        instance.getAnchorOffset = stub().returns(anchorOffset);
      });

      it('should set top to marginThreshold', () => {
        assert.strictEqual(positioningStyle.top, `${instance.marginThreshold}px`);
      });

      it('should set left to marginThreshold', () => {
        assert.strictEqual(positioningStyle.left, `${instance.marginThreshold}px`);
      });

      it('should transformOrigin according to marginThreshold', () => {
        assert.strictEqual(positioningStyle.transformOrigin, '0px 0px');
      });
    });

    describe('top < marginThreshold', () => {
      before(() => {
        tempAnchorOffset = { top: instance.marginThreshold - 1, left: instance.marginThreshold };
        instance.getAnchorOffset = stub().returns(tempAnchorOffset);

        positioningStyle = instance.getPositioningStyle(element);
      });

      after(() => {
        instance.getAnchorOffset = stub().returns(anchorOffset);
      });

      it('should set top to marginThreshold', () => {
        assert.strictEqual(positioningStyle.top, `${instance.marginThreshold}px`);
      });

      it('should set left to marginThreshold', () => {
        assert.strictEqual(positioningStyle.left, `${instance.marginThreshold}px`);
      });

      it('should transformOrigin according to marginThreshold', () => {
        assert.strictEqual(positioningStyle.transformOrigin, '0px -1px');
      });
    });

    describe('bottom > heightThreshold', () => {
      before(() => {
        tempAnchorOffset = { top: instance.marginThreshold + 1, left: instance.marginThreshold };
        instance.getAnchorOffset = stub().returns(tempAnchorOffset);

        positioningStyle = instance.getPositioningStyle(element);
      });

      after(() => {
        instance.getAnchorOffset = stub().returns(anchorOffset);
      });

      it('should set top to marginThreshold', () => {
        assert.strictEqual(positioningStyle.top, `${instance.marginThreshold}px`);
      });

      it('should set left to marginThreshold', () => {
        assert.strictEqual(positioningStyle.left, `${instance.marginThreshold}px`);
      });

      it('should transformOrigin according to marginThreshold', () => {
        assert.strictEqual(positioningStyle.transformOrigin, '0px 1px');
      });
    });

    describe('left < marginThreshold', () => {
      before(() => {
        tempAnchorOffset = { top: instance.marginThreshold, left: instance.marginThreshold - 1 };
        instance.getAnchorOffset = stub().returns(tempAnchorOffset);

        positioningStyle = instance.getPositioningStyle(element);
      });

      after(() => {
        instance.getAnchorOffset = stub().returns(anchorOffset);
      });

      it('should set top to marginThreshold', () => {
        assert.strictEqual(positioningStyle.top, `${instance.marginThreshold}px`);
      });

      it('should set left to marginThreshold', () => {
        assert.strictEqual(positioningStyle.left, `${instance.marginThreshold}px`);
      });

      it('should transformOrigin according to marginThreshold', () => {
        assert.strictEqual(positioningStyle.transformOrigin, '-1px 0px');
      });
    });

    describe('right > widthThreshold', () => {
      before(() => {
        tempAnchorOffset = { top: instance.marginThreshold, left: instance.marginThreshold + 1 };
        instance.getAnchorOffset = stub().returns(tempAnchorOffset);

        positioningStyle = instance.getPositioningStyle(element);
      });

      after(() => {
        instance.getAnchorOffset = stub().returns(anchorOffset);
      });

      it('should set top to marginThreshold', () => {
        assert.strictEqual(positioningStyle.top, `${instance.marginThreshold}px`);
      });

      it('should set left to marginThreshold', () => {
        assert.strictEqual(positioningStyle.left, `${instance.marginThreshold}px`);
      });

      it('should transformOrigin according to marginThreshold', () => {
        assert.strictEqual(positioningStyle.transformOrigin, '1px 0px');
      });
    });
  });

  describe('prop: getContentAnchorEl', () => {
    it('should position accordingly', () => {
      const element = {
        scrollTop: 5,
      };
      const child = {
        offsetTop: 40,
        clientHeight: 20,
        parentNode: element,
      };
      const wrapper = shallow(
        <Popover getContentAnchorEl={() => child}>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.instance().getContentAnchorOffset(element), 45);
    });
  });
});
