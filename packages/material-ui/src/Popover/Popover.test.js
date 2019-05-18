import React from 'react';
import { assert } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import PropTypes from 'prop-types';
import {
  createShallow,
  createMount,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import Grow from '../Grow';
import Modal from '../Modal';
import Paper from '../Paper';
import Popover from './Popover';

describe('<Popover />', () => {
  let shallow;
  let mount;
  let classes;
  const defaultProps = {
    open: false,
    anchorEl: () => document.createElement('svg'),
  };

  before(() => {
    shallow = createShallow({ dive: true });
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
    skip: ['componentProp'],
  }));

  describe('root node', () => {
    it('should render a Modal with an invisible backdrop as the root node', () => {
      const wrapper = mount(
        <Popover {...defaultProps} data-root-node>
          <div />
        </Popover>,
      );
      const root = wrapper.find('Popover > [data-root-node]').first();
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
      let instance;
      let rect;

      before(() => {
        instance = mount(
          <Popover {...defaultProps}>
            <div />
          </Popover>,
        )
          .find('Popover')
          .instance();
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
        instance = mount(
          <Popover {...defaultProps}>
            <div />
          </Popover>,
        )
          .find('Popover')
          .instance();
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

    describe('handleEntering(element)', () => {
      it('should set the inline styles for the enter phase', () => {
        const handleEntering = spy();
        const wrapper = mount(
          <Popover {...defaultProps} onEntering={handleEntering}>
            <div />
          </Popover>,
        );
        const instance = wrapper.find('Popover').instance();
        instance.handleEntering(element);

        assert.strictEqual(
          element.style.top === '16px' && element.style.left === '16px',
          true,
          'should offset the element from the top left of the screen by 16px',
        );
        assert.strictEqual(
          element.style.transformOrigin,
          instance.getPositioningStyle(element).transformOrigin,
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
      const container = {};
      const shallowWrapper = shallow(<Popover anchorEl={anchorEl} container={container} open />);

      assert.strictEqual(
        shallowWrapper
          .dive()
          .find(Modal)
          .props().container,
        container,
      );
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
        'Warning: Failed prop type: Invalid prop `PaperProps.component` supplied to `Popover`. Expected an element type that can hold a ref.',
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

  describe('on window resize', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should recalculate position if the popover is open', () => {
      const wrapper = mount(
        <Popover {...defaultProps} open transitionDuration={0}>
          <div />
        </Popover>,
      );
      const instance = wrapper.find('Popover').instance();

      stub(instance, 'setPositioningStyles');
      window.dispatchEvent(new window.Event('resize'));
      clock.tick(166);
      assert.strictEqual(instance.setPositioningStyles.called, true);
    });

    it('should not recalculate position if the popover is closed', () => {
      const wrapper = mount(
        <Popover {...defaultProps} open transitionDuration={0}>
          <div />
        </Popover>,
      );

      const setPositioningStyles = stub(wrapper.find('Popover').instance(), 'setPositioningStyles');

      window.dispatchEvent(new window.Event('resize'));
      wrapper.setProps({ open: false });
      clock.tick(166);

      assert.strictEqual(setPositioningStyles.called, false);
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
        instance = mount(
          <Popover {...defaultProps} marginThreshold={marginThreshold}>
            <div />
          </Popover>,
        )
          .find('Popover')
          .instance();
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

        element = { offsetHeight: 0, offsetWidth: 0 };
      });

      after(() => {
        global.window.innerHeight = innerHeightContainer;
        global.window.innerWidth = innerWidthContainer;
      });

      describe('no offsets', () => {
        before(() => {
          positioningStyle = instance.getPositioningStyle(element);
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
      const element = { scrollTop: 5, contains: () => true };
      const getContentAnchorEl = stub().returns({
        offsetTop: 40,
        clientHeight: 20,
        parentNode: element,
      });
      const wrapper = mount(
        <Popover {...defaultProps} getContentAnchorEl={getContentAnchorEl}>
          <div />
        </Popover>,
      );

      const instance = wrapper.find('Popover').instance();
      assert.strictEqual(instance.getContentAnchorOffset(element), 45);
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

  describe('prop: transitionDuration', () => {
    it('should apply the auto property if supported', () => {
      const wrapper = mount(
        <Popover {...defaultProps} open>
          <div />
        </Popover>,
      );
      assert.strictEqual(wrapper.find(Grow).props().timeout, 'auto');
    });

    it('should not apply the auto property if not supported', () => {
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
