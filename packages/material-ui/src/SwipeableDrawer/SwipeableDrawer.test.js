import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import { createMount, unwrap } from '@material-ui/core/test-utils';
import Drawer from '../Drawer';
import SwipeableDrawer, { reset } from './SwipeableDrawer';
import SwipeArea from './SwipeArea';
import createMuiTheme from '../styles/createMuiTheme';

function fireBodyMouseEvent(name, properties = {}) {
  const event = document.createEvent('MouseEvents');
  event.initEvent(name, true, true);
  Object.keys(properties).forEach(key => {
    event[key] = properties[key];
  });
  document.body.dispatchEvent(event);
  return event;
}

function fireSwipeAreaMouseEvent(wrapper, name, properties = {}) {
  const event = document.createEvent('MouseEvents');
  event.initEvent(name, true, true);
  Object.keys(properties).forEach(key => {
    event[key] = properties[key];
  });
  const swipeArea = wrapper.find(SwipeArea);
  if (swipeArea.length >= 1) {
    // if no SwipeArea is mounted, the body event wouldn't propagate to it anyway
    swipeArea.getDOMNode().dispatchEvent(event);
  }
  return event;
}

describe('<SwipeableDrawer />', () => {
  const SwipeableDrawerNaked = unwrap(SwipeableDrawer);
  let mount;

  function mockDrawerDOMNode(wrapper) {
    wrapper.find('SwipeableDrawer').forEach(drawer => {
      // like .value() but prevent reassignment
      stub(drawer.instance(), 'paperRef')
        .set(() => {})
        .get(() => {
          return {
            clientWidth: 250,
            clientHeight: 250,
            style: {},
          };
        });
    });
  }

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a Drawer and a SwipeArea', () => {
    const wrapper = mount(
      <SwipeableDrawerNaked
        onOpen={() => {}}
        onClose={() => {}}
        open={false}
        theme={createMuiTheme()}
      />,
    );
    assert.strictEqual(wrapper.childAt(0).type(), Drawer);
    assert.strictEqual(
      wrapper
        .childAt(1)
        .childAt(0)
        .type(),
      SwipeArea,
    );
    wrapper.unmount();
  });

  it('should hide the SwipeArea if swipe to open is disabled', () => {
    const wrapper = mount(
      <SwipeableDrawerNaked
        onOpen={() => {}}
        onClose={() => {}}
        open={false}
        theme={createMuiTheme()}
        disableSwipeToOpen
      />,
    );
    assert.strictEqual(wrapper.children().length, 1);
    wrapper.unmount();
  });

  it('should accept user custom style', () => {
    const customStyle = { style: { backgroundColor: 'hotpink' } };
    const wrapper = mount(
      <SwipeableDrawerNaked
        onOpen={() => {}}
        onClose={() => {}}
        open={false}
        theme={createMuiTheme()}
        PaperProps={customStyle}
      />,
    );

    assert.strictEqual(wrapper.props().PaperProps, customStyle);
  });

  describe('swipe to open', () => {
    let wrapper;
    let instance;

    beforeEach(() => {
      wrapper = mount(
        <SwipeableDrawerNaked
          onOpen={() => {}}
          onClose={() => {}}
          open={false}
          theme={createMuiTheme()}
        >
          <h1>Hello</h1>
        </SwipeableDrawerNaked>,
      );
      instance = wrapper.instance();
      mockDrawerDOMNode(wrapper);
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

    tests.forEach(params => {
      describe(`anchor=${params.anchor}`, () => {
        beforeEach(() => {
          wrapper.setProps({ anchor: params.anchor });
        });

        it('should open and close when swiping', () => {
          // mock the internal setPosition function that moves the drawer while swiping
          instance.setPosition = spy();

          // simulate open swipe
          const handleOpen = spy();
          wrapper.setProps({ onOpen: handleOpen });
          fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [params.openTouches[0]] });
          assert.strictEqual(wrapper.state().maybeSwiping, true);
          fireBodyMouseEvent('touchmove', { touches: [params.openTouches[1]] });
          assert.strictEqual(instance.isSwiping, true);
          fireBodyMouseEvent('touchmove', { touches: [params.openTouches[2]] });
          fireBodyMouseEvent('touchend', { changedTouches: [params.openTouches[2]] });
          assert.strictEqual(handleOpen.callCount, 1);
          assert.strictEqual(instance.setPosition.callCount, 3);

          // simulate close swipe
          instance.setPosition.resetHistory();
          const handleClose = spy();
          wrapper.setProps({ open: true, onClose: handleClose });
          fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [params.closeTouches[0]] });
          assert.strictEqual(wrapper.state().maybeSwiping, true);
          fireBodyMouseEvent('touchmove', { touches: [params.closeTouches[1]] });
          assert.strictEqual(instance.isSwiping, true);
          fireBodyMouseEvent('touchmove', { touches: [params.closeTouches[2]] });
          fireBodyMouseEvent('touchend', { changedTouches: [params.closeTouches[2]] });
          assert.strictEqual(handleClose.callCount, 1);
          assert.strictEqual(instance.setPosition.callCount, 2);
        });

        it('should stay closed when not swiping far enough', () => {
          // simulate open swipe that doesn't swipe far enough
          const handleOpen = spy();
          wrapper.setProps({ onOpen: handleOpen });
          fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [params.openTouches[0]] });
          assert.strictEqual(wrapper.state().maybeSwiping, true);
          fireBodyMouseEvent('touchmove', { touches: [params.openTouches[1]] });
          assert.strictEqual(instance.isSwiping, true);
          fireBodyMouseEvent('touchend', { changedTouches: [params.openTouches[1]] });
          assert.strictEqual(handleOpen.callCount, 0);
        });

        it('should stay opened when not swiping far enough', () => {
          // simulate close swipe that doesn't swipe far enough
          const handleClose = spy();
          wrapper.setProps({ open: true, onClose: handleClose });
          fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [params.closeTouches[0]] });
          assert.strictEqual(wrapper.state().maybeSwiping, true);
          fireBodyMouseEvent('touchmove', { touches: [params.closeTouches[1]] });
          assert.strictEqual(instance.isSwiping, true);
          fireBodyMouseEvent('touchend', { changedTouches: [params.closeTouches[1]] });
          assert.strictEqual(handleClose.callCount, 0);
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
          assert.strictEqual(instance.isSwiping, null, 'should not be swiping');
        });

        it('should slide in a bit when touching near the edge', () => {
          // mock the internal setPosition function that moves the drawer while swiping
          instance.setPosition = spy();

          const handleOpen = spy();
          const handleClose = spy();
          wrapper.setProps({ onOpen: handleOpen, onClose: handleClose });
          fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [params.edgeTouch] });
          assert.strictEqual(wrapper.state().maybeSwiping, true);
          assert.strictEqual(instance.setPosition.callCount, 1);
          fireBodyMouseEvent('touchend', { changedTouches: [params.edgeTouch] });
          assert.strictEqual(handleOpen.callCount, 0);
          assert.strictEqual(handleClose.callCount, 0);
        });

        it('should makes the drawer stay hidden', () => {
          // mock the internal setPosition function that moves the drawer while swiping
          instance.setPosition = spy();

          const handleOpen = spy();
          const handleClose = spy();
          wrapper.setProps({
            disableDiscovery: true,
            onOpen: handleOpen,
            onClose: handleClose,
          });
          fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [params.edgeTouch] });
          assert.strictEqual(wrapper.state().maybeSwiping, true);
          assert.strictEqual(instance.setPosition.callCount, 1);
          fireBodyMouseEvent('touchend', { changedTouches: [params.edgeTouch] });
          assert.strictEqual(handleOpen.callCount, 0);
          assert.strictEqual(handleClose.callCount, 0);
        });

        it('should let user scroll the page', () => {
          // mock the internal setPosition function that moves the drawer while swiping
          instance.setPosition = spy();

          const handleOpen = spy();
          const handleClose = spy();
          wrapper.setProps({
            open: false,
            disableDiscovery: true,
            onOpen: handleOpen,
            onClose: handleClose,
          });
          fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [params.ignoreTouch] });
          assert.strictEqual(wrapper.state().maybeSwiping, false);
          assert.strictEqual(instance.setPosition.callCount, 0);
          fireBodyMouseEvent('touchend', { changedTouches: [params.ignoreTouch] });
          assert.strictEqual(handleOpen.callCount, 0);
          assert.strictEqual(handleClose.callCount, 0);
        });
      });
    });

    it('should abort when the SwipeableDrawer is closed', () => {
      wrapper.setProps({
        open: true,
      });
      assert.strictEqual(instance.isSwiping, null);
      fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
      assert.strictEqual(instance.isSwiping, null);
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 10, clientY: 0 }] });
      assert.strictEqual(instance.isSwiping, true);
      assert.strictEqual(wrapper.state().maybeSwiping, true);
      wrapper.setProps({
        open: false,
      });
      assert.strictEqual(wrapper.state().maybeSwiping, false);
    });

    it('should wait for a clear signal to determine this.isSwiping', () => {
      assert.strictEqual(instance.isSwiping, null);
      fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
      assert.strictEqual(instance.isSwiping, null);
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 3, clientY: 0 }] });
      assert.strictEqual(instance.isSwiping, null);
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 10, clientY: 0 }] });
      assert.strictEqual(instance.isSwiping, true);
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
      spy(instance, 'removeTouchStart');
      wrapper.setProps({ variant: 'persistent' });
      assert.strictEqual(instance.removeTouchStart.callCount, 1);

      spy(instance, 'listenTouchStart');
      wrapper.setProps({ variant: 'temporary' });
      assert.strictEqual(instance.listenTouchStart.callCount, 1);
    });
  });

  describe('disableSwipeToOpen', () => {
    it('should not support swipe to open if disableSwipeToOpen is set', () => {
      const wrapper = mount(
        <SwipeableDrawerNaked
          onOpen={() => {}}
          onClose={() => {}}
          open={false}
          theme={createMuiTheme()}
        >
          <h1>Hello</h1>
        </SwipeableDrawerNaked>,
      );

      // simulate open swipe
      wrapper.setProps({ disableSwipeToOpen: true });
      fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
      assert.strictEqual(
        wrapper.state().maybeSwiping,
        false,
        'should not be listening for open swipe',
      );
      wrapper.unmount();
    });

    it('should support swipe to close if disableSwipeToOpen is set', () => {
      const wrapper = mount(
        <SwipeableDrawerNaked
          onOpen={() => {}}
          onClose={() => {}}
          open={false}
          theme={createMuiTheme()}
        >
          <h1>Hello</h1>
        </SwipeableDrawerNaked>,
      );

      // simulate close swipe
      wrapper.setProps({ disableSwipeToOpen: true, open: true });
      fireBodyMouseEvent('touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
      assert.strictEqual(
        wrapper.state().maybeSwiping,
        true,
        'should not be listening for open swipe',
      );
      wrapper.unmount();
    });
  });

  describe('lock', () => {
    it('should handle a single swipe at the time', () => {
      const handleOpen = spy();
      const wrapper = mount(
        <div>
          <SwipeableDrawerNaked
            onOpen={handleOpen}
            onClose={() => {}}
            open={false}
            theme={createMuiTheme()}
          >
            <h1>Hello1</h1>
          </SwipeableDrawerNaked>
          <SwipeableDrawerNaked
            onOpen={handleOpen}
            onClose={() => {}}
            open={false}
            theme={createMuiTheme()}
          >
            <h1>Hello2</h1>
          </SwipeableDrawerNaked>
        </div>,
      );
      mockDrawerDOMNode(wrapper);

      fireSwipeAreaMouseEvent(wrapper.find(SwipeableDrawerNaked).at(0), 'touchstart', {
        touches: [{ pageX: 0, clientY: 0 }],
      });
      fireSwipeAreaMouseEvent(wrapper.find(SwipeableDrawerNaked).at(1), 'touchstart', {
        touches: [{ pageX: 0, clientY: 0 }],
      });
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 20, clientY: 0 }] });
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 180, clientY: 0 }] });
      fireBodyMouseEvent('touchend', { changedTouches: [{ pageX: 180, clientY: 0 }] });
      assert.strictEqual(handleOpen.callCount, 1, 'should call onOpen once, not twice');
    });
  });

  it('does not crash when updating the parent component while swiping', () => {
    const wrapper = mount(
      <SwipeableDrawerNaked
        onOpen={() => {}}
        onClose={() => {}}
        open={false}
        theme={createMuiTheme()}
      >
        <h1>Hello</h1>
      </SwipeableDrawerNaked>,
    );
    fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
    // simulate paper ref being null because of the drawer being updated
    wrapper.instance().handlePaperRef(null);
    fireBodyMouseEvent('touchmove', { touches: [{ pageX: 20, clientY: 0 }] });
  });

  describe('no backdrop', () => {
    it('does not crash when backdrop is hidden while swiping', () => {
      const wrapper = mount(
        <SwipeableDrawerNaked
          onClose={() => {}}
          onOpen={() => {}}
          open={false}
          theme={createMuiTheme()}
          hideBackdrop
        />,
      );
      fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
    });

    it('does not crash when backdrop props are empty while swiping', () => {
      const wrapper = mount(
        <SwipeableDrawerNaked
          onClose={() => {}}
          onOpen={() => {}}
          open={false}
          theme={createMuiTheme()}
          BackdropProps={{}}
        />,
      );
      fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
    });
  });
});
