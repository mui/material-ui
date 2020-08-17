import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createMount, fireEvent, createClientRender, describeConformance } from 'test/utils';
import PropTypes, { checkPropTypes } from 'prop-types';
import Drawer from '../Drawer';
import SwipeableDrawer, { reset } from './SwipeableDrawer';
import SwipeArea from './SwipeArea';
import useForkRef from '../utils/useForkRef';

function fireMouseEvent(name, element, properties = {}) {
  act(() => {
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
  });
}

function fireBodyMouseEvent(name, properties = {}) {
  fireMouseEvent(name, document.body, properties);
}

function fireSwipeAreaMouseEvent(wrapper, name, properties = {}) {
  let event;
  act(() => {
    event = document.createEvent('MouseEvents');
    event.initEvent(name, true, true);
    Object.keys(properties).forEach((key) => {
      event[key] = properties[key];
    });
    const swipeArea = wrapper.find(SwipeArea);
    if (swipeArea.length >= 1) {
      // if no SwipeArea is mounted, the body event wouldn't propagate to it anyway
      swipeArea.getDOMNode().dispatchEvent(event);
    }
  });
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
  const render = createClientRender({ strict: false });

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
    render(<SwipeableDrawer open onOpen={() => {}} onClose={() => {}} />);
    expect(document.querySelector('.MuiDrawer-root')).not.to.equal(null);
    expect(document.querySelector('[class*=PrivateSwipeArea-root]')).not.to.equal(null);
  });

  it('should hide the SwipeArea if swipe to open is disabled', () => {
    render(<SwipeableDrawer open onOpen={() => {}} onClose={() => {}} disableSwipeToOpen />);
    expect(document.querySelector('[class*=PrivateSwipeArea-root]')).to.equal(null);
  });

  it('should accept user custom style', () => {
    render(
      <SwipeableDrawer
        onOpen={() => {}}
        onClose={() => {}}
        open
        PaperProps={{ 'data-test': 'foo' }}
      />,
    );

    expect(document.querySelector('.MuiPaper-root')).to.have.attribute('data-test', 'foo');
  });

  // only run in supported browsers
  if (typeof Touch === 'undefined') {
    return;
  }

  describe('swipe to open', () => {
    let container;

    beforeEach(() => {
      container = render(
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
        it('should open and close when swiping', () => {
          // mock the internal setPosition function that moves the drawer while swiping
          // simulate open swipe
          const handleOpen = spy();
          container.setProps({ onOpen: handleOpen, anchor: params.anchor });

          const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');

          fireEvent.touchStart(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[0] })],
          });
          fireEvent.touchMove(document, {
            touches: [new Touch({ identifier: 0, target: document, ...params.openTouches[1] })],
          });
          fireEvent.touchMove(document, {
            touches: [new Touch({ identifier: 0, target: document, ...params.openTouches[2] })],
          });
          fireEvent.touchEnd(document, {
            changedTouches: [
              new Touch({ identifier: 0, target: document, ...params.openTouches[2] }),
            ],
          });
          expect(handleOpen.callCount).to.equal(1);

          const handleClose = spy();
          container.setProps({ open: true, onClose: handleClose, anchor: params.anchor });

          const h1 = document.querySelector('h1');

          fireEvent.touchStart(h1, {
            touches: [new Touch({ identifier: 0, target: h1, ...params.closeTouches[0] })],
          });
          fireEvent.touchMove(document, {
            touches: [new Touch({ identifier: 0, target: document, ...params.closeTouches[1] })],
          });
          fireEvent.touchMove(document, {
            touches: [new Touch({ identifier: 0, target: document, ...params.closeTouches[2] })],
          });
          fireEvent.touchEnd(document, {
            changedTouches: [
              new Touch({ identifier: 0, target: document, ...params.closeTouches[2] }),
            ],
          });
          expect(handleClose.callCount).to.equal(1);
        });

        it('should stay closed when not swiping far enough', () => {
          // simulate open swipe that doesn't swipe far enough
          const handleOpen = spy();
          container.setProps({ onOpen: handleOpen, anchor: params.anchor });

          const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');

          fireEvent.touchStart(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[0] })],
          });
          fireEvent.touchMove(document, {
            touches: [new Touch({ identifier: 0, target: document, ...params.openTouches[1] })],
          });
          fireEvent.touchEnd(document, {
            changedTouches: [
              new Touch({ identifier: 0, target: document, ...params.openTouches[1] }),
            ],
          });
          expect(handleOpen.callCount).to.equal(0);
        });

        it('should stay opened when not swiping far enough', () => {
          // simulate close swipe that doesn't swipe far enough
          const handleClose = spy();
          container.setProps({ open: true, onClose: handleClose, anchor: params.anchor });

          const h1 = document.querySelector('h1');

          fireEvent.touchStart(h1, {
            touches: [new Touch({ identifier: 0, target: h1, ...params.closeTouches[0] })],
          });
          fireEvent.touchMove(document, {
            touches: [new Touch({ identifier: 0, target: document, ...params.closeTouches[1] })],
          });
          fireEvent.touchEnd(document, {
            changedTouches: [
              new Touch({ identifier: 0, target: document, ...params.closeTouches[1] }),
            ],
          });
          expect(handleClose.callCount).to.equal(0);
        });

        it('should slide in a bit when touching near the edge', () => {
          const handleOpen = spy();
          const handleClose = spy();
          container.setProps({ onOpen: handleOpen, onClose: handleClose, anchor: params.anchor });

          const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');

          fireEvent.touchStart(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.edgeTouch })],
          });
          const h1 = document.querySelector('h1');
          expect(h1).to.not.equal(null);

          fireEvent.touchEnd(document, {
            changedTouches: [new Touch({ identifier: 0, target: document, ...params.edgeTouch })],
          });

          expect(handleOpen.callCount).to.equal(0);
          expect(handleClose.callCount).to.equal(0);
        });

        it('should let user scroll the page', () => {
          const handleOpen = spy();
          const handleClose = spy();
          container.setProps({
            disableDiscovery: true,
            onOpen: handleOpen,
            onClose: handleClose,
            anchor: params.anchor,
          });

          const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');

          fireEvent.touchStart(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.ignoreTouch })],
          });
          fireEvent.touchEnd(document, {
            changedTouches: [new Touch({ identifier: 0, target: document, ...params.ignoreTouch })],
          });
          expect(handleOpen.callCount).to.equal(0);
          expect(handleClose.callCount).to.equal(0);
        });
      });
    });

    it('should abort when the SwipeableDrawer is closed', () => {
      const handleClose = spy();
      container.setProps({
        open: true,
        onClose: handleClose,
      });
      const h1 = document.querySelector('h1');

      fireEvent.touchStart(h1, {
        touches: [new Touch({ identifier: 0, target: h1, pageX: 250, clientY: 0 })],
      });
      fireEvent.touchMove(document, {
        touches: [new Touch({ identifier: 0, target: document, pageX: 180, clientY: 0 })],
      });
      container.setProps({
        open: false,
        onClose: handleClose,
      });
      fireEvent.touchEnd(document, {
        changedTouches: [new Touch({ identifier: 0, target: document, pageX: 10, clientY: 0 })],
      });
      expect(handleClose.callCount).to.equal(0);
    });

    it('removes event listeners on unmount', () => {
      const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');
      fireEvent.touchStart(swipeArea, {
        touches: [new Touch({ identifier: 0, target: swipeArea, pageX: 250, clientY: 0 })],
      });
      container.unmount();
      //  trigger setState warning if listeners aren't cleaned.
      fireEvent.touchMove(document, {
        touches: [new Touch({ identifier: 0, target: document, pageX: 180, clientY: 0 })],
      });
      //  trigger setState warning if swipe handling is not cleaned, too
      fireEvent.touchStart(swipeArea, {
        touches: [new Touch({ identifier: 0, target: swipeArea, pageX: 250, clientY: 0 })],
      });
    });

    it('toggles swipe handling when the variant is changed', () => {
      // variant is 'temporary' by default
      expect(document.querySelector('[class*=PrivateSwipeArea-root]')).to.not.equal(null);
      container.setProps({ variant: 'persistent' });
      expect(document.querySelector('[class*=PrivateSwipeArea-root]')).to.equal(null);
      container.setProps({ variant: 'temporary' });
      expect(document.querySelector('[class*=PrivateSwipeArea-root]')).to.not.equal(null);
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
      PropTypes.resetWarningCache();
    });

    it('warns if a component for the Paper is used that cant hold a ref', () => {
      expect(() => {
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
      }).toErrorDev(
        'Warning: Failed prop type: Invalid prop `PaperProps.component` supplied to `MockedSwipeableDrawer`. Expected an element type that can hold a ref.',
      );
    });

    it('warns if a component for the Backdrop is used that cant hold a ref', () => {
      expect(() => {
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
      }).toErrorDev(
        'Warning: Failed prop type: Invalid prop `ModalProps.BackdropProps.component` supplied to `MockedSwipeableDrawer`. Expected an element type that can hold a ref.',
      );
    });
  });

  describe('native scroll', () => {
    it('should not drag is native scroll is available', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // Need layout
        this.skip();
      }

      const handleClose = spy();
      render(
        <SwipeableDrawer onOpen={() => {}} onClose={handleClose} anchor="bottom" open>
          <div style={{ height: 10000, flexShrink: 0 }}>
            <h1>SwipeableDrawer</h1>
          </div>
        </SwipeableDrawer>,
      );

      const windowHeight = window.innerHeight;
      const h1 = document.querySelector('h1');

      const Paper = document.querySelector('.MuiPaper-root');
      Paper.scrollTop = 10;

      // Perform a full swipe down to close sequence
      fireEvent.touchStart(h1, {
        touches: [new Touch({ identifier: 0, target: h1, pageX: 0, clientY: windowHeight - 200 })],
      });
      fireEvent.touchMove(h1, {
        touches: [new Touch({ identifier: 0, target: h1, pageX: 0, clientY: windowHeight - 180 })],
      });
      fireEvent.touchMove(h1, {
        touches: [new Touch({ identifier: 0, target: h1, pageX: 0, clientY: windowHeight - 10 })],
      });
      fireEvent.touchEnd(h1, {
        changedTouches: [
          new Touch({ identifier: 0, target: h1, pageX: 0, clientY: windowHeight - 10 }),
        ],
      });
      expect(handleClose.callCount).to.equal(0);
    });
  });
});
