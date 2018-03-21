import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import ReactDOM from 'react-dom';
import { createShallow, createMount, unwrap } from '../test-utils';
import Paper from '../Paper';
import Drawer from '../Drawer';
import SwipeableDrawer from './SwipeableDrawer';

describe('<SwipeableDrawer />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a Drawer', () => {
    const wrapper = shallow(
      <SwipeableDrawer onOpen={() => {}} onClose={() => {}} open={false}>
        <div />
      </SwipeableDrawer>,
    );
    assert.strictEqual(wrapper.type(), Drawer);

    // temporary drawers need to be unmounted in the tests to remove the touchstart event handler
    wrapper.unmount();
  });

  describe('swipe to open', () => {
    let wrapper;
    let DrawerNaked;
    let findDOMNodeStub;

    function fireBodyMouseEvent(name, properties) {
      const event = document.createEvent('MouseEvents');
      event.initEvent(name, true, true);
      Object.keys(properties).forEach(key => {
        event[key] = properties[key];
      });
      document.body.dispatchEvent(event);
    }

    before(() => {
      DrawerNaked = unwrap(SwipeableDrawer);

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
    });

    beforeEach(() => {
      wrapper = mount(
        <DrawerNaked theme={{ direction: 'ltr' }} onOpen={() => {}} onClose={() => {}} open={false}>
          <h1>Hello</h1>
        </DrawerNaked>,
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    const bodyWidth = document.body.offsetWidth; // jsdom emulates these
    const windowHeight = window.innerHeight;
    const toTouchPoint = ({ x, y }) => ({ pageX: x, clientY: y });
    const tests = [
      {
        anchor: 'left',
        openTouches: [{ x: 0, y: 0 }, { x: 20, y: 0 }, { x: 180, y: 0 }].map(toTouchPoint),
        closeTouches: [{ x: 200, y: 0 }, { x: 180, y: 0 }, { x: 10, y: 0 }].map(toTouchPoint),
        edgeTouch: { x: 10, y: 50 },
      },
      {
        anchor: 'right',
        openTouches: [
          { x: bodyWidth, y: 0 },
          { x: bodyWidth - 20, y: 0 },
          { x: bodyWidth - 180, y: 0 },
        ].map(toTouchPoint),
        closeTouches: [
          { x: bodyWidth - 200, y: 0 },
          { x: bodyWidth - 180, y: 0 },
          { x: bodyWidth - 10, y: 0 },
        ].map(toTouchPoint),
        edgeTouch: { x: bodyWidth - 10, y: 50 },
      },
      {
        anchor: 'top',
        openTouches: [{ x: 0, y: 0 }, { x: 0, y: 20 }, { x: 0, y: 180 }].map(toTouchPoint),
        closeTouches: [{ x: 0, y: 200 }, { x: 0, y: 180 }, { x: 0, y: 10 }].map(toTouchPoint),
        edgeTouch: { x: 50, y: 10 },
      },
      {
        anchor: 'bottom',
        openTouches: [
          { x: 0, y: windowHeight },
          { x: 0, y: windowHeight - 20 },
          { x: 0, y: windowHeight - 180 },
        ].map(toTouchPoint),
        closeTouches: [
          { x: 0, y: windowHeight - 200 },
          { x: 0, y: windowHeight - 180 },
          { x: 0, y: windowHeight - 10 },
        ].map(toTouchPoint),
        edgeTouch: { x: 50, y: windowHeight - 10 },
      },
    ];

    tests.forEach(params => {
      it(`should open and close when swiping from ${params.anchor}`, () => {
        wrapper.setProps({ anchor: params.anchor });

        // mock the internal setPosition function that moves the drawer while swiping
        const setPosition = spy();
        wrapper.instance().setPosition = setPosition;

        // simulate open swipe
        const handleOpen = spy();
        wrapper.setProps({ onOpen: handleOpen });
        fireBodyMouseEvent('touchstart', { touches: [params.openTouches[0]] });
        assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');
        fireBodyMouseEvent('touchmove', { touches: [params.openTouches[1]] });
        assert.strictEqual(wrapper.state().swiping, 'opening', 'should be opening');
        fireBodyMouseEvent('touchmove', { touches: [params.openTouches[2]] });
        fireBodyMouseEvent('touchend', { changedTouches: [params.openTouches[2]] });
        assert.strictEqual(handleOpen.callCount, 1, 'should call onOpen');
        assert.strictEqual(
          setPosition.callCount,
          3,
          'should move the drawer on touchstart and touchmove',
        );

        // simulate close swipe
        setPosition.resetHistory();
        const handleClose = spy();
        wrapper.setProps({ open: true, onClose: handleClose });
        fireBodyMouseEvent('touchstart', { touches: [params.closeTouches[0]] });
        assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');
        fireBodyMouseEvent('touchmove', { touches: [params.closeTouches[1]] });
        assert.strictEqual(wrapper.state().swiping, 'closing', 'should be closing');
        fireBodyMouseEvent('touchmove', { touches: [params.closeTouches[2]] });
        fireBodyMouseEvent('touchend', { changedTouches: [params.closeTouches[2]] });
        assert.strictEqual(handleClose.callCount, 1, 'should call onClose');
        assert.strictEqual(setPosition.callCount, 2, 'should move the drawer on touchmove');
      });

      it(`should stay closed when not swiping far enough from ${params.anchor}`, () => {
        wrapper.setProps({ anchor: params.anchor });

        // simulate open swipe that doesn't swipe far enough
        const handleOpen = spy();
        wrapper.setProps({ onOpen: handleOpen });
        fireBodyMouseEvent('touchstart', { touches: [params.openTouches[0]] });
        assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');
        fireBodyMouseEvent('touchmove', { touches: [params.openTouches[1]] });
        assert.strictEqual(wrapper.state().swiping, 'opening', 'should be opening');
        fireBodyMouseEvent('touchend', { changedTouches: [params.openTouches[1]] });
        assert.strictEqual(handleOpen.callCount, 0, 'should not call onOpen');
      });

      it(`should stay opened when not swiping ${params.anchor} far enough`, () => {
        wrapper.setProps({ anchor: params.anchor, open: true });

        // simulate close swipe that doesn't swipe far enough
        const handleClose = spy();
        wrapper.setProps({ open: true, onClose: handleClose });
        fireBodyMouseEvent('touchstart', { touches: [params.closeTouches[0]] });
        assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');
        fireBodyMouseEvent('touchmove', { touches: [params.closeTouches[1]] });
        assert.strictEqual(wrapper.state().swiping, 'closing', 'should be closing');
        fireBodyMouseEvent('touchend', { changedTouches: [params.closeTouches[1]] });
        assert.strictEqual(handleClose.callCount, 0, 'should not call onClose');
      });

      it('should not start swiping when swiping in the wrong direction', () => {
        wrapper.setProps({ anchor: params.anchor });

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
        assert.equal(wrapper.state().swiping, false, 'should not be swiping');
      });

      it(`should slide in a bit when touching near the ${params.anchor} edge`, () => {
        wrapper.setProps({ anchor: params.anchor });

        // mock the internal setPosition function that moves the drawer while swiping
        const setPosition = spy();
        wrapper.instance().setPosition = setPosition;

        const handleOpen = spy();
        const handleClose = spy();
        wrapper.setProps({ onOpen: handleOpen, onClose: handleClose });
        fireBodyMouseEvent('touchstart', { touches: [params.edgeTouch] });
        assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');
        assert.strictEqual(setPosition.callCount, 1, 'should slide in a bit');
        fireBodyMouseEvent('touchend', { changedTouches: [params.edgeTouch] });
        assert.strictEqual(handleOpen.callCount, 0, 'should not call onOpen');
        assert.strictEqual(handleClose.callCount, 0, 'should not call onClose');
      });

      describe('disableDiscovery', () => {
        it(`makes the drawer stay hidden when touching near the ${params.anchor} edge `, () => {
          wrapper.setProps({ anchor: params.anchor, disableDiscovery: true });

          // mock the internal setPosition function that moves the drawer while swiping
          const setPosition = spy();
          wrapper.instance().setPosition = setPosition;

          const handleOpen = spy();
          const handleClose = spy();
          wrapper.setProps({ onOpen: handleOpen, onClose: handleClose });
          fireBodyMouseEvent('touchstart', { touches: [params.edgeTouch] });
          assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');
          assert.strictEqual(setPosition.callCount, 0, 'should not slide in');
          fireBodyMouseEvent('touchend', { changedTouches: [params.edgeTouch] });
          assert.strictEqual(handleOpen.callCount, 0, 'should not call onOpen');
          assert.strictEqual(handleClose.callCount, 0, 'should not call onClose');
        });
      });
    });

    it('removes event listeners on unmount', () => {
      fireBodyMouseEvent('touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
      wrapper.unmount();
      // should trigger setState warning if listeners aren't cleaned.
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 180, clientY: 0 }] });
      // should trigger setState warning if swipe handling is not cleaned, too
      fireBodyMouseEvent('touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
    });

    it('toggles swipe handling when the variant is changed', () => {
      // variant is 'temporary' by default
      spy(wrapper.instance(), 'disableSwipeHandling');
      wrapper.setProps({ variant: 'persistent' });
      assert.strictEqual(wrapper.instance().disableSwipeHandling.callCount, 1);

      spy(wrapper.instance(), 'enableSwipeHandling');
      wrapper.setProps({ variant: 'temporary' });
      assert.strictEqual(wrapper.instance().enableSwipeHandling.callCount, 1);
    });
  });
});
