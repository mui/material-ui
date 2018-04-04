import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import ReactDOM from 'react-dom';
import { createShallow, createMount, unwrap } from '../test-utils';
import Paper from '../Paper';
import Drawer from '../Drawer';
import SwipeableDrawer, { reset } from './SwipeableDrawer';
import createMuiTheme from '../styles/createMuiTheme';

function fireBodyMouseEvent(name, properties) {
  const event = document.createEvent('MouseEvents');
  event.initEvent(name, true, true);
  Object.keys(properties).forEach(key => {
    event[key] = properties[key];
  });
  document.body.dispatchEvent(event);
}

describe('<SwipeableDrawer />', () => {
  const SwipeableDrawerNaked = unwrap(SwipeableDrawer);
  let shallow;
  let mount;
  let findDOMNodeStub;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    // mock the drawer DOM node, since jsdom doesn't do layouting but its size is required
    const findDOMNode = ReactDOM.findDOMNode;
    findDOMNodeStub = stub(ReactDOM, 'findDOMNode').callsFake(arg => {
      if (arg instanceof Paper) {
        // mock the drawer's DOM node
        return { clientWidth: 250, clientHeight: 250, style: {} };
      }
      return findDOMNode(arg);
    });
  });

  after(() => {
    findDOMNodeStub.restore();
    mount.cleanUp();
  });

  it('should render a Drawer', () => {
    const wrapper = shallow(<SwipeableDrawer onOpen={() => {}} onClose={() => {}} open={false} />);
    assert.strictEqual(wrapper.type(), Drawer);
    wrapper.unmount();
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
    });

    afterEach(() => {
      reset();
      wrapper.unmount();
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
          fireBodyMouseEvent('touchstart', { touches: [params.openTouches[0]] });
          assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');
          fireBodyMouseEvent('touchmove', { touches: [params.openTouches[1]] });
          assert.strictEqual(instance.isSwiping, 'opening', 'should be opening');
          fireBodyMouseEvent('touchmove', { touches: [params.openTouches[2]] });
          fireBodyMouseEvent('touchend', { changedTouches: [params.openTouches[2]] });
          assert.strictEqual(handleOpen.callCount, 1, 'should call onOpen');
          assert.strictEqual(
            instance.setPosition.callCount,
            3,
            'should move the drawer on touchstart and touchmove',
          );

          // simulate close swipe
          instance.setPosition.resetHistory();
          const handleClose = spy();
          wrapper.setProps({ open: true, onClose: handleClose });
          fireBodyMouseEvent('touchstart', { touches: [params.closeTouches[0]] });
          assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');
          fireBodyMouseEvent('touchmove', { touches: [params.closeTouches[1]] });
          assert.strictEqual(instance.isSwiping, 'closing', 'should be closing');
          fireBodyMouseEvent('touchmove', { touches: [params.closeTouches[2]] });
          fireBodyMouseEvent('touchend', { changedTouches: [params.closeTouches[2]] });
          assert.strictEqual(handleClose.callCount, 1, 'should call onClose');
          assert.strictEqual(
            instance.setPosition.callCount,
            2,
            'should move the drawer on touchmove',
          );
        });

        it('should stay closed when not swiping far enough', () => {
          // simulate open swipe that doesn't swipe far enough
          const handleOpen = spy();
          wrapper.setProps({ onOpen: handleOpen });
          fireBodyMouseEvent('touchstart', { touches: [params.openTouches[0]] });
          assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');
          fireBodyMouseEvent('touchmove', { touches: [params.openTouches[1]] });
          assert.strictEqual(instance.isSwiping, 'opening', 'should be opening');
          fireBodyMouseEvent('touchend', { changedTouches: [params.openTouches[1]] });
          assert.strictEqual(handleOpen.callCount, 0, 'should not call onOpen');
        });

        it('should stay opened when not swiping far enough', () => {
          // simulate close swipe that doesn't swipe far enough
          const handleClose = spy();
          wrapper.setProps({ open: true, onClose: handleClose });
          fireBodyMouseEvent('touchstart', { touches: [params.closeTouches[0]] });
          assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');
          fireBodyMouseEvent('touchmove', { touches: [params.closeTouches[1]] });
          assert.strictEqual(instance.isSwiping, 'closing', 'should be closing');
          fireBodyMouseEvent('touchend', { changedTouches: [params.closeTouches[1]] });
          assert.strictEqual(handleClose.callCount, 0, 'should not call onClose');
        });

        it('should ignore swiping in the wrong direction if discovery is disabled', () => {
          wrapper.setProps({ disableDiscovery: true });

          fireBodyMouseEvent('touchstart', { touches: [params.openTouches[0]] });
          if (['left', 'right'].includes(params.anchor)) {
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
          assert.strictEqual(instance.isSwiping, undefined, 'should not be swiping');
        });

        it('should slide in a bit when touching near the edge', () => {
          // mock the internal setPosition function that moves the drawer while swiping
          instance.setPosition = spy();

          const handleOpen = spy();
          const handleClose = spy();
          wrapper.setProps({ onOpen: handleOpen, onClose: handleClose });
          fireBodyMouseEvent('touchstart', { touches: [params.edgeTouch] });
          assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');
          assert.strictEqual(instance.setPosition.callCount, 1, 'should slide in a bit');
          fireBodyMouseEvent('touchend', { changedTouches: [params.edgeTouch] });
          assert.strictEqual(handleOpen.callCount, 0, 'should not call onOpen');
          assert.strictEqual(handleClose.callCount, 0, 'should not call onClose');
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
          fireBodyMouseEvent('touchstart', { touches: [params.edgeTouch] });
          assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');
          assert.strictEqual(instance.setPosition.callCount, 1, 'should slide in');
          fireBodyMouseEvent('touchend', { changedTouches: [params.edgeTouch] });
          assert.strictEqual(handleOpen.callCount, 0, 'should not call onOpen');
          assert.strictEqual(handleClose.callCount, 0, 'should not call onClose');
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
          fireBodyMouseEvent('touchstart', { touches: [params.ignoreTouch] });
          assert.strictEqual(wrapper.state().maybeSwiping, false, 'should be listening for swipe');
          assert.strictEqual(instance.setPosition.callCount, 0, 'should slide in');
          fireBodyMouseEvent('touchend', { changedTouches: [params.ignoreTouch] });
          assert.strictEqual(handleOpen.callCount, 0, 'should not call onOpen');
          assert.strictEqual(handleClose.callCount, 0, 'should not call onClose');
        });
      });
    });

    it('should wait for a clear signal to determin this.isSwiping', () => {
      assert.strictEqual(instance.isSwiping, undefined);
      fireBodyMouseEvent('touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
      assert.strictEqual(instance.isSwiping, undefined);
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 3, clientY: 0 }] });
      assert.strictEqual(instance.isSwiping, undefined);
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 10, clientY: 0 }] });
      assert.strictEqual(instance.isSwiping, 'opening');
    });

    it('removes event listeners on unmount', () => {
      fireBodyMouseEvent('touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
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
      fireBodyMouseEvent('touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
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
      fireBodyMouseEvent('touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 20, clientY: 0 }] });
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 180, clientY: 0 }] });
      fireBodyMouseEvent('touchend', { changedTouches: [{ pageX: 180, clientY: 0 }] });
      assert.strictEqual(handleOpen.callCount, 1, 'should call onOpen once, not twice');
      wrapper.unmount();
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
    fireBodyMouseEvent('touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
    // simulate paper ref being null because of the drawer being updated
    wrapper.instance().handlePaperRef(null);
    fireBodyMouseEvent('touchmove', { touches: [{ pageX: 20, clientY: 0 }] });
  });
});
