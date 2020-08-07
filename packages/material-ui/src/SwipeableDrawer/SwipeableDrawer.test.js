import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import PropTypes, { checkPropTypes } from 'prop-types';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import Drawer from '../Drawer';
import SwipeableDrawer, { reset } from './SwipeableDrawer';
import SwipeArea from './SwipeArea';
import useForkRef from '../utils/useForkRef';

function fireMouseEvent(name, element, properties = {}) {
  const event = document.createEvent('MouseEvents');
  event.initEvent(name, true, true);
  Object.keys(properties).forEach((key) => {
    event[key] = properties[key];
  });
  if (element.dispatchEvent) {
    element.dispatchEvent(event);
  } else {
    element.getDOMNode().dispatchEvent(event);
  }
  return event;
}

function fireBodyMouseEvent(name, properties = {}) {
  return fireMouseEvent(name, document.body, properties);
}

function fireSwipeAreaMouseEvent(wrapper, name, properties = {}) {
  const event = document.createEvent('MouseEvents');
  event.initEvent(name, true, true);
  Object.keys(properties).forEach((key) => {
    event[key] = properties[key];
  });
  const swipeArea = wrapper.find(SwipeArea);
  if (swipeArea.length >= 1) {
    // if no SwipeArea is mounted, the body event wouldn't propagate to it anyway
    swipeArea.getDOMNode().dispatchEvent(event);
  }
  return event;
}

const FakePaper = React.forwardRef(function FakeWidthPaper(props, ref) {
  const paperRef = React.useRef(null);
  const handleRef = useForkRef(ref, paperRef);

  React.useEffect(() => {
    // For jsdom
    Object.defineProperty(paperRef.current, 'clientWidth', { value: 250 });
    Object.defineProperty(paperRef.current, 'clientHeight', { value: 250 });
  });

  return (
    <div
      tabIndex={-1}
      ref={handleRef}
      style={{
        width: 250,
        height: 250,
      }}
      {...props}
    />
  );
});

const NullPaper = React.forwardRef(function NullPaper(props, ref) {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    const handleTouchStart = () => {
      setHidden(true);
    };

    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  if (hidden) {
    return null;
  }

  return <div tabIndex={-1} ref={ref} />;
});

describe('<SwipeableDrawer />', () => {
  // test are mostly asserting on implementation details
  const mount = createMount({ strict: null });

  describeConformance(<SwipeableDrawer onOpen={() => {}} onClose={() => {}} open />, () => ({
    classes: {},
    inheritComponent: Drawer,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp',
      // https://github.com/facebook/react/issues/11565
      'reactTestRenderer',
    ],
  }));

  it('should render a Drawer and a SwipeArea', () => {
    const wrapper = mount(<SwipeableDrawer onOpen={() => {}} onClose={() => {}} open={false} />);
    expect(wrapper.find(Drawer).exists()).to.equal(true);
    expect(wrapper.find(SwipeArea).exists()).to.equal(true);
  });

  it('should hide the SwipeArea if swipe to open is disabled', () => {
    const wrapper = mount(
      <SwipeableDrawer onOpen={() => {}} onClose={() => {}} open={false} disableSwipeToOpen />,
    );
    expect(wrapper.find(SwipeArea).exists()).to.equal(false);
  });

  it('should accept user custom style', () => {
    const customStyle = { style: { backgroundColor: 'hotpink' } };
    const wrapper = mount(
      <SwipeableDrawer
        onOpen={() => {}}
        onClose={() => {}}
        open={false}
        PaperProps={customStyle}
      />,
    );

    expect(wrapper.props().PaperProps).to.equal(customStyle);
  });

  describe('swipe to open', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <SwipeableDrawer
          onOpen={() => {}}
          onClose={() => {}}
          open={false}
          PaperProps={{ component: FakePaper }}
        >
          <h1>SwipeableDrawer</h1>
        </SwipeableDrawer>,
      );
    });

    afterEach(() => {
      reset();
      if (wrapper.length > 0) {
        wrapper.unmount();
      }
    });

    const bodyWidth = document.body.offsetWidth;
    const windowHeight = window.innerHeight;
    const tests = [
      {
        anchor: 'left',
        openTouches: [
          { pageX: 0, clientY: 0 },
          { pageX: 20, clientY: 0 },
          { pageX: 180, clientY: 0 },
        ],
        closeTouches: [
          { pageX: 200, clientY: 0 },
          { pageX: 180, clientY: 0 },
          { pageX: 10, clientY: 0 },
        ],
        edgeTouch: { pageX: 10, clientY: 50 },
        ignoreTouch: { pageX: 100, clientY: 0 },
      },
      {
        anchor: 'right',
        openTouches: [
          { pageX: bodyWidth, clientY: 0 },
          { pageX: bodyWidth - 20, clientY: 0 },
          { pageX: bodyWidth - 180, clientY: 0 },
        ],
        closeTouches: [
          { pageX: bodyWidth - 200, clientY: 0 },
          { pageX: bodyWidth - 180, clientY: 0 },
          { pageX: bodyWidth - 10, clientY: 0 },
        ],
        edgeTouch: { pageX: bodyWidth - 10, clientY: 50 },
        ignoreTouch: { pageX: bodyWidth - 100, clientY: 0 },
      },
      {
        anchor: 'top',
        openTouches: [
          { pageX: 0, clientY: 0 },
          { pageX: 0, clientY: 20 },
          { pageX: 0, clientY: 180 },
        ],
        closeTouches: [
          { pageX: 0, clientY: 200 },
          { pageX: 0, clientY: 180 },
          { pageX: 0, clientY: 10 },
        ],
        edgeTouch: { pageX: 50, clientY: 10 },
        ignoreTouch: { pageX: 0, clientY: 100 },
      },
      {
        anchor: 'bottom',
        openTouches: [
          { pageX: 0, clientY: windowHeight },
          { pageX: 0, clientY: windowHeight - 20 },
          { pageX: 0, clientY: windowHeight - 180 },
        ],
        closeTouches: [
          { pageX: 0, clientY: windowHeight - 200 },
          { pageX: 0, clientY: windowHeight - 180 },
          { pageX: 0, clientY: windowHeight - 10 },
        ],
        edgeTouch: { pageX: 50, clientY: windowHeight - 10 },
        ignoreTouch: { pageX: 0, clientY: windowHeight - 100 },
      },
    ];

    tests.forEach((params) => {
      describe(`anchor=${params.anchor}`, () => {
        beforeEach(() => {
          wrapper.setProps({ anchor: params.anchor });
        });

        it('should open and close when swiping', () => {
          // mock the internal setPosition function that moves the drawer while swiping
          // simulate open swipe
          const handleOpen = spy();
          wrapper.setProps({ onOpen: handleOpen });
          fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [params.openTouches[0]] });
          fireBodyMouseEvent('touchmove', { touches: [params.openTouches[1]] });
          fireBodyMouseEvent('touchmove', { touches: [params.openTouches[2]] });
          fireBodyMouseEvent('touchend', { changedTouches: [params.openTouches[2]] });
          expect(handleOpen.callCount).to.equal(1);

          const handleClose = spy();
          wrapper.setProps({ open: true, onClose: handleClose });
          fireMouseEvent('touchstart', wrapper.find(FakePaper), {
            touches: [params.closeTouches[0]],
          });
          fireBodyMouseEvent('touchmove', { touches: [params.closeTouches[1]] });
          fireBodyMouseEvent('touchmove', { touches: [params.closeTouches[2]] });
          fireBodyMouseEvent('touchend', { changedTouches: [params.closeTouches[2]] });
          expect(handleClose.callCount).to.equal(1);
        });

        it('should stay closed when not swiping far enough', () => {
          // simulate open swipe that doesn't swipe far enough
          const handleOpen = spy();
          wrapper.setProps({ onOpen: handleOpen });
          fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [params.openTouches[0]] });
          fireBodyMouseEvent('touchmove', { touches: [params.openTouches[1]] });
          fireBodyMouseEvent('touchend', { changedTouches: [params.openTouches[1]] });
          expect(handleOpen.callCount).to.equal(0);
        });

        it('should stay opened when not swiping far enough', () => {
          // simulate close swipe that doesn't swipe far enough
          const handleClose = spy();
          wrapper.setProps({ open: true, onClose: handleClose });
          wrapper.update();
          fireMouseEvent('touchstart', wrapper.find(FakePaper), {
            touches: [params.closeTouches[0]],
          });
          fireBodyMouseEvent('touchmove', { touches: [params.closeTouches[1]] });
          fireBodyMouseEvent('touchend', { changedTouches: [params.closeTouches[1]] });
          expect(handleClose.callCount).to.equal(0);
        });

        it('should ignore swiping in the wrong direction if discovery is disabled', () => {
          wrapper.setProps({ disableDiscovery: true });

          fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [params.openTouches[0]] });
          if (['left', 'right'].indexOf(params.anchor) !== -1) {
            fireBodyMouseEvent('touchmove', {
              touches: [
                {
                  pageX: params.openTouches[0].pageX,
                  clientY: params.openTouches[0].clientY + 50,
                },
              ],
            });
          } else {
            fireBodyMouseEvent('touchmove', {
              touches: [
                {
                  pageX: params.openTouches[0].pageX + 50,
                  clientY: params.openTouches[0].clientY,
                },
              ],
            });
          }
          expect(wrapper.find('[role="presentation"]').exists()).to.equal(false);
        });

        it('should slide in a bit when touching near the edge', () => {
          const handleOpen = spy();
          const handleClose = spy();
          wrapper.setProps({ onOpen: handleOpen, onClose: handleClose });
          fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [params.edgeTouch] });
          wrapper.update();
          expect(wrapper.find('[role="presentation"]').exists()).to.equal(true);
          fireBodyMouseEvent('touchend', { changedTouches: [params.edgeTouch] });
          expect(handleOpen.callCount).to.equal(0);
          expect(handleClose.callCount).to.equal(0);
        });

        it('should makes the drawer stay hidden', () => {
          const handleOpen = spy();
          const handleClose = spy();
          wrapper.setProps({
            disableDiscovery: true,
            onOpen: handleOpen,
            onClose: handleClose,
          });
          fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [params.edgeTouch] });
          fireBodyMouseEvent('touchend', { changedTouches: [params.edgeTouch] });
          expect(handleOpen.callCount).to.equal(0);
          expect(handleClose.callCount).to.equal(0);
        });

        it('should let user scroll the page', () => {
          const handleOpen = spy();
          const handleClose = spy();
          wrapper.setProps({
            open: false,
            disableDiscovery: true,
            onOpen: handleOpen,
            onClose: handleClose,
          });
          fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [params.ignoreTouch] });
          fireBodyMouseEvent('touchend', { changedTouches: [params.ignoreTouch] });
          expect(handleOpen.callCount).to.equal(0);
          expect(handleClose.callCount).to.equal(0);
        });
      });
    });

    it('should abort when the SwipeableDrawer is closed', () => {
      const handleClose = spy();
      wrapper.setProps({
        open: true,
        onClose: handleClose,
      });
      wrapper.update();
      fireMouseEvent('touchstart', wrapper.find(FakePaper), {
        touches: [{ pageX: 250, clientY: 0 }],
      });
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 180, clientY: 0 }] });
      wrapper.setProps({
        open: false,
      });
      wrapper.update();
      fireBodyMouseEvent('touchend', { changedTouches: [{ pageX: 10, clientY: 0 }] });
      expect(handleClose.callCount).to.equal(0);
    });

    it('removes event listeners on unmount', () => {
      fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
      wrapper.unmount();
      //  trigger setState warning if listeners aren't cleaned.
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 180, clientY: 0 }] });
      //  trigger setState warning if swipe handling is not cleaned, too
      fireBodyMouseEvent('touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
    });

    it('toggles swipe handling when the variant is changed', () => {
      // variant is 'temporary' by default
      expect(wrapper.find(SwipeArea).exists()).to.equal(true);
      wrapper.setProps({ variant: 'persistent' });
      expect(wrapper.find(SwipeArea).exists()).to.equal(false);

      wrapper.setProps({ variant: 'temporary' });
      wrapper.update();
      expect(wrapper.find(SwipeArea).exists()).to.equal(true);
    });
  });

  describe('disableSwipeToOpen', () => {
    it('should not support swipe to open if disableSwipeToOpen is set', () => {
      const handleOpen = spy();
      const wrapper = mount(
        <SwipeableDrawer
          onOpen={handleOpen}
          onClose={() => {}}
          open={false}
          PaperProps={{ component: FakePaper }}
        >
          <h1>SwipeableDrawer</h1>
        </SwipeableDrawer>,
      );

      // simulate open swipe
      wrapper.setProps({ disableSwipeToOpen: true });
      expect(wrapper.find('[role="presentation"]').exists()).to.equal(false);
      fireBodyMouseEvent('touchstart', { touches: [{ pageX: 10, clientY: 0 }] });
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 150, clientY: 0 }] });
      fireBodyMouseEvent('touchend', { changedTouches: [{ pageX: 250, clientY: 0 }] });
      expect(handleOpen.callCount).to.equal(0);
      expect(wrapper.find('[role="presentation"]').exists()).to.equal(false);
      wrapper.unmount();
    });

    it('should support swipe to close if disableSwipeToOpen is set', () => {
      const handleClose = spy();
      const wrapper = mount(
        <SwipeableDrawer
          onOpen={() => {}}
          onClose={handleClose}
          open
          PaperProps={{ component: FakePaper }}
        >
          <h1>SwipeableDrawer</h1>
        </SwipeableDrawer>,
      );

      // simulate close swipe
      wrapper.setProps({ disableSwipeToOpen: true });
      expect(wrapper.find('[role="presentation"]').exists()).to.equal(true);
      fireMouseEvent('touchstart', wrapper.find(FakePaper), {
        touches: [{ pageX: 250, clientY: 0 }],
      });
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 150, clientY: 0 }] });
      fireBodyMouseEvent('touchend', { changedTouches: [{ pageX: 10, clientY: 0 }] });
      expect(handleClose.callCount).to.equal(1);
      wrapper.unmount();
    });
  });

  describe('lock', () => {
    it('should handle a single swipe at the time', () => {
      const handleOpen = spy();
      const wrapper = mount(
        <div>
          <SwipeableDrawer
            onOpen={handleOpen}
            onClose={() => {}}
            open={false}
            PaperProps={{ component: FakePaper }}
          >
            <h1>Drawer1</h1>
          </SwipeableDrawer>
          <SwipeableDrawer
            onOpen={handleOpen}
            onClose={() => {}}
            open={false}
            PaperProps={{ component: FakePaper }}
          >
            <h1>Drawer2</h1>
          </SwipeableDrawer>
        </div>,
      );

      // use the same event object for both touch start events, one would propagate to the other swipe area in the browser
      const touchStartEvent = fireSwipeAreaMouseEvent(
        wrapper.find(SwipeableDrawer).at(0),
        'touchstart',
        {
          touches: [{ pageX: 0, clientY: 0 }],
        },
      );
      wrapper
        .find(SwipeableDrawer)
        .at(1)
        .find(SwipeArea)
        .getDOMNode()
        .dispatchEvent(touchStartEvent);
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 20, clientY: 0 }] });
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 180, clientY: 0 }] });
      fireBodyMouseEvent('touchend', { changedTouches: [{ pageX: 180, clientY: 0 }] });
      expect(handleOpen.callCount).to.equal(1);
    });
  });

  it('does not crash when updating the parent component while swiping', () => {
    const wrapper = mount(
      <SwipeableDrawer
        onOpen={() => {}}
        onClose={() => {}}
        open={false}
        PaperProps={{ component: NullPaper }}
      >
        <h1>SwipeableDrawer</h1>
      </SwipeableDrawer>,
    );
    fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
    // simulate paper ref being null because of the drawer being updated
    fireBodyMouseEvent('touchmove', { touches: [{ pageX: 20, clientY: 0 }] });
  });

  describe('no backdrop', () => {
    it('does not crash when backdrop is hidden while swiping', () => {
      const wrapper = mount(
        <SwipeableDrawer onClose={() => {}} onOpen={() => {}} open={false} hideBackdrop />,
      );
      fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
    });

    it('does not crash when backdrop props are empty while swiping', () => {
      const wrapper = mount(
        <SwipeableDrawer onClose={() => {}} onOpen={() => {}} open={false} BackdropProps={{}} />,
      );
      fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
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

    it('warns if a component for the Paper is used that cant hold a ref', () => {
      checkPropTypes(
        SwipeableDrawer.propTypes,
        {
          onOpen: () => {},
          onClose: () => {},
          open: false,
          PaperProps: { component: () => <div />, elevation: 4 },
        },
        'prop',
        'MockedSwipeableDrawer',
      );

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include(
        'Warning: Failed prop type: Invalid prop `PaperProps.component` supplied to `MockedSwipeableDrawer`. Expected an element type that can hold a ref.',
      );
    });

    it('warns if a component for the Backdrop is used that cant hold a ref', () => {
      checkPropTypes(
        SwipeableDrawer.propTypes,
        {
          onOpen: () => {},
          onClose: () => {},
          open: false,
          ModalProps: { BackdropProps: { component: () => <div />, 'data-backdrop': true } },
        },
        'prop',
        'MockedSwipeableDrawer',
      );

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include(
        'Warning: Failed prop type: Invalid prop `ModalProps.BackdropProps.component` supplied to `MockedSwipeableDrawer`. Expected an element type that can hold a ref.',
      );
    });
  });
});
