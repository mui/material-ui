import React from 'react';
import { assert } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import css from 'dom-helpers/style';
import { createShallow, createMount, getClasses } from '../test-utils';
import Grow from '../transitions/Grow';
import Paper from '../Paper';
import Popover from './Popover';

describe('<Popover />', () => {
  let shallow;
  let mount;
  let classes;
  const defaultProps = {
    open: false,
  };

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(
      <Popover {...defaultProps}>
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
        <Popover {...defaultProps}>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.props().BackdropProps.invisible, true);
    });

    it('should pass onClose prop to Modal', () => {
      const fn = () => {};
      const wrapper = shallow(
        <Popover {...defaultProps} onClose={fn}>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.props().onClose, fn, 'should be the onClose function');
    });

    it('should pass open prop to Modal as `open`', () => {
      const wrapper = shallow(
        <Popover {...defaultProps}>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.props().open, false, 'should not be open');
      wrapper.setProps({ open: true });
      assert.strictEqual(wrapper.props().open, true, 'should be open');
      wrapper.setProps({ open: false });
      assert.strictEqual(wrapper.props().open, false, 'should not be open');
    });

    describe('getOffsetTop', () => {
      let instance;
      let rect;

      before(() => {
        instance = shallow(
          <Popover {...defaultProps}>
            <div />
          </Popover>,
        ).instance();
        rect = { height: 1 };
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
          <Popover {...defaultProps}>
            <div />
          </Popover>,
        ).instance();
        rect = { width: 1 };
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
        <Popover {...defaultProps}>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.children().length, 1, 'should have one child');
      assert.strictEqual(wrapper.childAt(0).type(), Grow);
      assert.strictEqual(
        wrapper.childAt(0).props().appear,
        true,
        'should transition on first appearance',
      );
    });

    it('should set the transition in/out based on the open prop', () => {
      const wrapper = shallow(
        <Popover {...defaultProps}>
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

      const handlers = events.reduce((result, eventHook) => {
        result[eventHook] = spy();
        return result;
      }, {});

      const wrapper = shallow(
        <Popover {...defaultProps} {...handlers}>
          <div />
        </Popover>,
      );

      events.forEach(eventHook => {
        const event = eventHook.charAt(2).toLowerCase() + eventHook.slice(3);
        wrapper.find(Grow).simulate(event, { style: {} });
        assert.strictEqual(
          handlers[eventHook].callCount,
          1,
          `should have called the ${eventHook} handler`,
        );
      });
    });
  });

  describe('paper', () => {
    it('should have Paper as the only child of Transition', () => {
      const wrapper = shallow(
        <Popover {...defaultProps}>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.childAt(0).children().length, 1, 'should have one child');
      assert.strictEqual(
        wrapper
          .childAt(0)
          .childAt(0)
          .type(),
        Paper,
      );
    });

    it('should have the paper class and user classes', () => {
      const wrapper = shallow(
        <Popover {...defaultProps} className="test-class">
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.hasClass('test-class'), true, 'should have the user class');
      const paper = wrapper.childAt(0).childAt(0);
      assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the popover class');
    });

    it('should have a elevation prop passed down', () => {
      const wrapper = shallow(
        <Popover {...defaultProps}>
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
        offsetTop: 'auto',
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
          <Popover {...defaultProps} onEnter={handleEnter}>
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

  describe('prop: anchorEl', () => {
    it('should accept a function', () => {
      const anchorElSpy = spy();
      shallow(
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
      openPopover = (anchorOrigin, renderShallow) => {
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
          wrapper = renderShallow ? shallow(component) : mount(component);
          wrapper.setProps({ open: true });

          if (renderShallow) {
            resolve();
          }
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

    it('should pass through container prop if container and anchorEl props are provided', () => {
      const container = {};
      const shallowWrapper = shallow(<Popover container={container} open />);
      assert.strictEqual(
        shallowWrapper
          .dive()
          .find('Modal')
          .props().container,
        container,
        'should pass through container prop if both container and anchorEl props are provided',
      );
    });

    it("should use anchorEl's parent body as container if container prop not provided", () => {
      return openPopover(undefined, true).then(() => {
        assert.strictEqual(
          wrapper
            .dive()
            .find('Modal')
            .props().container,
          window.document.body,
          "should use anchorEl's parent body as Modal container",
        );
      });
    });

    it('should not pass container to Modal if container or anchorEl props are notprovided', () => {
      const shallowWrapper = shallow(<Popover open />);
      assert.strictEqual(
        shallowWrapper
          .dive()
          .find('Modal')
          .props().container,
        undefined,
        'should not pass a container prop if neither container or anchorEl are provided',
      );
    });
  });

  describe('positioning on a manual position', () => {
    const anchorPosition = { top: 300, left: 500 };

    let wrapper;
    let popoverEl;
    let openPopover;
    let expectPopover;

    before(() => {
      openPopover = anchorOrigin => {
        return new Promise(resolve => {
          wrapper = mount(
            <Popover
              {...defaultProps}
              anchorReference={'anchorPosition'}
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

    it('should be positioned according to the passed coordinates', () => {
      return openPopover().then(() => {
        expectPopover(anchorPosition.top, anchorPosition.left);
      });
    });

    it('should ignore the anchorOrigin prop when being positioned', () => {
      return openPopover({ vertical: 'top', horizontal: 'right' }).then(() => {
        expectPopover(anchorPosition.top, anchorPosition.left);
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
        <Popover {...defaultProps} open transitionDuration={0}>
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
      assert.strictEqual(
        instance.setPositioningStyles.called,
        true,
        'position styles recalculated',
      );
    });

    it('should not recalculate position if the popover is closed', () => {
      const wrapper = mount(
        <Popover {...defaultProps} transitionDuration={0}>
          <div />
        </Popover>,
      );
      assert.strictEqual(
        wrapper.contains('EventListener'),
        false,
        'no component listening on resize',
      );
    });
  });

  [0, 8, 16].forEach(marginThreshold => {
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
          <Popover {...defaultProps} marginThreshold={marginThreshold}>
            <div />
          </Popover>,
        ).instance();
        instance.getContentAnchorOffset = spy();

        innerHeightContainer = global.window.innerHeight;
        innerWidthContainer = global.window.innerWidth;

        global.window.innerHeight = marginThreshold * 2;
        global.window.innerWidth = marginThreshold * 2;

        anchorOffset = { top: marginThreshold, left: marginThreshold };
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
          assert.strictEqual(positioningStyle.top, `${marginThreshold}px`);
        });

        it('should set left to marginThreshold', () => {
          assert.strictEqual(positioningStyle.left, `${marginThreshold}px`);
        });

        it('should transformOrigin according to marginThreshold', () => {
          assert.strictEqual(positioningStyle.transformOrigin, '0px 0px');
        });
      });

      describe('top < marginThreshold', () => {
        before(() => {
          tempAnchorOffset = { top: marginThreshold - 1, left: marginThreshold };
          instance.getAnchorOffset = stub().returns(tempAnchorOffset);

          positioningStyle = instance.getPositioningStyle(element);
        });

        after(() => {
          instance.getAnchorOffset = stub().returns(anchorOffset);
        });

        it('should set top to marginThreshold', () => {
          assert.strictEqual(positioningStyle.top, `${marginThreshold}px`);
        });

        it('should set left to marginThreshold', () => {
          assert.strictEqual(positioningStyle.left, `${marginThreshold}px`);
        });

        it('should transformOrigin according to marginThreshold', () => {
          assert.strictEqual(positioningStyle.transformOrigin, '0px -1px');
        });
      });

      describe('bottom > heightThreshold', () => {
        before(() => {
          tempAnchorOffset = { top: marginThreshold + 1, left: marginThreshold };
          instance.getAnchorOffset = stub().returns(tempAnchorOffset);

          positioningStyle = instance.getPositioningStyle(element);
        });

        after(() => {
          instance.getAnchorOffset = stub().returns(anchorOffset);
        });

        it('should set top to marginThreshold', () => {
          assert.strictEqual(positioningStyle.top, `${marginThreshold}px`);
        });

        it('should set left to marginThreshold', () => {
          assert.strictEqual(positioningStyle.left, `${marginThreshold}px`);
        });

        it('should transformOrigin according to marginThreshold', () => {
          assert.strictEqual(positioningStyle.transformOrigin, '0px 1px');
        });
      });

      describe('left < marginThreshold', () => {
        before(() => {
          tempAnchorOffset = { top: marginThreshold, left: marginThreshold - 1 };
          instance.getAnchorOffset = stub().returns(tempAnchorOffset);

          positioningStyle = instance.getPositioningStyle(element);
        });

        after(() => {
          instance.getAnchorOffset = stub().returns(anchorOffset);
        });

        it('should set top to marginThreshold', () => {
          assert.strictEqual(positioningStyle.top, `${marginThreshold}px`);
        });

        it('should set left to marginThreshold', () => {
          assert.strictEqual(positioningStyle.left, `${marginThreshold}px`);
        });

        it('should transformOrigin according to marginThreshold', () => {
          assert.strictEqual(positioningStyle.transformOrigin, '-1px 0px');
        });
      });

      describe('right > widthThreshold', () => {
        before(() => {
          tempAnchorOffset = { top: marginThreshold, left: marginThreshold + 1 };
          instance.getAnchorOffset = stub().returns(tempAnchorOffset);

          positioningStyle = instance.getPositioningStyle(element);
        });

        after(() => {
          instance.getAnchorOffset = stub().returns(anchorOffset);
        });

        it('should set top to marginThreshold', () => {
          assert.strictEqual(positioningStyle.top, `${marginThreshold}px`);
        });

        it('should set left to marginThreshold', () => {
          assert.strictEqual(positioningStyle.left, `${marginThreshold}px`);
        });

        it('should transformOrigin according to marginThreshold', () => {
          assert.strictEqual(positioningStyle.transformOrigin, '1px 0px');
        });
      });
    });
  });

  describe('prop: getContentAnchorEl', () => {
    it('should position accordingly', () => {
      const element = { scrollTop: 5 };
      const child = { offsetTop: 40, clientHeight: 20, parentNode: element };
      const wrapper = shallow(
        <Popover {...defaultProps} getContentAnchorEl={() => child}>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.instance().getContentAnchorOffset(element), 45);
    });
  });

  describe('prop: action', () => {
    it('should be able to access updatePosition function', () => {
      let popoverActions = {};
      mount(
        <Popover
          {...defaultProps}
          action={actions => {
            popoverActions = actions;
          }}
        >
          <div>content #1</div>
          <div>content #2</div>
          <div>content #3</div>
        </Popover>,
      );

      assert.strictEqual(
        typeof popoverActions.updatePosition === 'function',
        true,
        'Should be a function.',
      );
      popoverActions.updatePosition();
    });
  });
});
