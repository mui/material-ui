import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import ReactDOM, { findDOMNode } from 'react-dom';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import mockPortal from '../../test/utils/mockPortal';
import Slide from '../transitions/Slide';
import createMuiTheme from '../styles/createMuiTheme';
import Paper from '../Paper';
import Modal from '../Modal';
import Drawer from './Drawer';

describe.only('<Drawer />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(
      <Drawer>
        <div />
      </Drawer>,
    );
    mockPortal.init();
  });

  after(() => {
    mount.cleanUp();
    mockPortal.reset();
  })

  describe('prop: variant=temporary', () => {
    it('should render a Modal', () => {
      const wrapper = shallow(
        <Drawer>
          <div />
        </Drawer>,
      );
      assert.strictEqual(wrapper.type(), Modal);
    });

    it('should render Slide > Paper inside the Modal', () => {
      const wrapper = shallow(
        <Drawer>
          <div />
        </Drawer>,
      );

      const slide = wrapper.childAt(0);
      assert.strictEqual(
        slide.length === 1 && slide.is(Slide),
        true,
        'immediate wrapper child should be Slide',
      );

      const paper = slide.childAt(0);
      assert.strictEqual(paper.length === 1 && paper.type(), Paper);

      assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the paper class');
    });

    describe('transitionDuration property', () => {
      const transitionDuration = {
        enter: 854,
        exit: 2967,
      };

      it('should be passed to Slide', () => {
        const wrapper = shallow(
          <Drawer transitionDuration={transitionDuration}>
            <div />
          </Drawer>,
        );
        assert.strictEqual(wrapper.find(Slide).props().timeout, transitionDuration);
      });

      it("should be passed to to Modal's BackdropTransitionDuration when open=true", () => {
        const wrapper = shallow(
          <Drawer open transitionDuration={transitionDuration}>
            <div />
          </Drawer>,
        );
        assert.strictEqual(
          wrapper.find(Modal).props().BackdropProps.transitionDuration,
          transitionDuration,
        );
      });
    });

    it("should override Modal's BackdropTransitionDuration from property when specified", () => {
      const testDuration = 335;
      const wrapper = shallow(
        <Drawer BackdropTransitionDuration={testDuration}>
          <div />
        </Drawer>,
      );
      assert.strictEqual(wrapper.find(Modal).props().BackdropTransitionDuration, testDuration);
    });

    it('should set the custom className for Modal when variant is temporary', () => {
      const wrapper = shallow(
        <Drawer className="woofDrawer" variant="temporary">
          <h1>Hello</h1>
        </Drawer>,
      );

      const modal = wrapper.find(Modal);

      assert.strictEqual(modal.hasClass('woofDrawer'), true, 'should have the woofDrawer class');
    });

    it('should set the Paper className', () => {
      const wrapper = shallow(
        <Drawer classes={{ paper: 'woofDrawer' }}>
          <h1>Hello</h1>
        </Drawer>,
      );
      const paper = wrapper.find(Paper);
      assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the paper class');
      assert.strictEqual(paper.hasClass('woofDrawer'), true, 'should have the woofDrawer class');
    });

    it('should be closed by default', () => {
      const wrapper = shallow(
        <Drawer>
          <h1>Hello</h1>
        </Drawer>,
      );

      const modal = wrapper;
      const slide = modal.find(Slide);

      assert.strictEqual(modal.props().open, false, 'should not show the modal');
      assert.strictEqual(slide.props().in, false, 'should not transition in');
    });

    describe('opening and closing', () => {
      let wrapper;

      before(() => {
        wrapper = shallow(
          <Drawer>
            <h1>Hello</h1>
          </Drawer>,
        );
        wrapper.update()
      });

      it('should start closed', () => {
        assert.strictEqual(wrapper.props().open, false, 'should not show the modal');
        assert.strictEqual(wrapper.find(Slide).props().in, false, 'should not transition in');
      });

      it('should open', () => {
        wrapper.setProps({ open: true });
        assert.strictEqual(wrapper.props().open, true, 'should show the modal');
        assert.strictEqual(wrapper.find(Slide).props().in, true, 'should transition in');
      });

      it('should close', () => {
        wrapper.setProps({ open: false });
        assert.strictEqual(wrapper.props().open, false, 'should not show the modal');
        assert.strictEqual(wrapper.find(Slide).props().in, false, 'should not transition in');
      });
    });

    describe('swipe to open', () => {
      let wrapper;
      let instance;
      let DrawerNaked;
      let findDOMNodeStub;

      function fireBodyMouseEvent (name, properties) {
        const event = document.createEvent('MouseEvents');
        event.initEvent(name, true, true);
        Object.keys(properties).forEach((key) => { event[key] = properties[key] });
        document.body.dispatchEvent(event);
      }

      before(() => {
        DrawerNaked = unwrap(Drawer);

        // mock the drawer DOM node, since jsdom doesn't do layouting but its size is required
        const findDOMNode = ReactDOM.findDOMNode
        findDOMNodeStub = stub(ReactDOM, 'findDOMNode').callsFake(arg => {
          if (arg instanceof Paper) {
            return { clientWidth: 250, clientHeight: 250, style: {} };
          } else {
            return findDOMNode(arg)
          }
        });
      });

      after(() =>  {
        findDOMNodeStub.restore();
      });

      beforeEach(() => {
        wrapper = mount(
          <DrawerNaked classes={{}} theme={{ direction: 'ltr' }}>
            <h1>Hello</h1>
          </DrawerNaked>
        );
      });

      const bodyWidth = document.body.offsetWidth // jsdom emulates these
      const windowHeight = window.innerHeight
      const toTouchPoint = ({x, y}) => ({pageX: x, clientY: y})
      const tests = [{
        anchor: 'left',
        openTouches: [{x: 0, y: 0}, {x: 20, y: 0}, {x: 180, y: 0}].map(toTouchPoint),
        closeTouches: [{x: 200, y: 0}, {x: 180, y: 0}, {x: 10, y: 0}].map(toTouchPoint),
        edgeTouch: {x: 10, y: 50}
      }, {
        anchor: 'right',
        openTouches: [{x: bodyWidth, y: 0}, {x: bodyWidth - 20, y: 0}, {x: bodyWidth - 180, y: 0}].map(toTouchPoint),
        closeTouches: [{x: bodyWidth - 200, y: 0}, {x: bodyWidth - 180, y: 0}, {x: bodyWidth - 10, y: 0}].map(toTouchPoint),
        edgeTouch: {x: bodyWidth - 10, y: 50}
      }, {
        anchor: 'top',
        openTouches: [{x: 0, y: 0}, {x: 0, y: 20}, {x: 0, y: 180}].map(toTouchPoint),
        closeTouches: [{x: 0, y: 200}, {x: 0, y: 180}, {x: 0, y: 10}].map(toTouchPoint),
        edgeTouch: {x: 50, y: 10}
      }, {
        anchor: 'bottom',
        openTouches: [{x: 0, y: windowHeight}, {x: 0, y: windowHeight - 20}, {x: 0, y: windowHeight - 180}].map(toTouchPoint),
        closeTouches: [{x: 0, y: windowHeight - 200}, {x: 0, y: windowHeight - 180}, {x: 0, y: windowHeight - 10}].map(toTouchPoint),
        edgeTouch: {x: 50, y: windowHeight - 10}
      }]

      tests.forEach((params) => {
        it(`should open and close when swiping from ${params.anchor}`, () => {
          wrapper.setProps({ anchor: params.anchor });

          // simulate open swipe
          const handleOpen = spy();
          wrapper.setProps({ onOpen: handleOpen })
          fireBodyMouseEvent('touchstart', {touches: [params.openTouches[0]]})
          assert.strictEqual(wrapper.instance().maybeSwiping, true, 'should be listening for swipe')
          fireBodyMouseEvent('touchmove', {touches: [params.openTouches[1]]})
          assert.strictEqual(wrapper.state().swiping, 'opening', 'should be opening')
          fireBodyMouseEvent('touchend', {changedTouches: [params.openTouches[2]]})
          assert.strictEqual(handleOpen.callCount, 1, 'should call onOpen')

          // simulate close swipe
          const handleClose = spy();
          wrapper.setProps({ open: true, onClose: handleClose })
          fireBodyMouseEvent('touchstart', {touches: [params.closeTouches[0]]});
          assert.strictEqual(wrapper.instance().maybeSwiping, true, 'should be listening for swipe');
          fireBodyMouseEvent('touchmove', {touches: [params.closeTouches[1]]});
          assert.strictEqual(wrapper.state().swiping, 'closing', 'should be closing');
          fireBodyMouseEvent('touchend', {changedTouches: [params.closeTouches[2]]});
          assert.strictEqual(handleClose.callCount, 1, 'should call onClose');
        });
        
        it(`should slide in a bit when touching near the ${params.anchor} edge`, () => {
          wrapper.setProps({ anchor: params.anchor });

          // mock the internal setPosition function that moves the drawer while swiping
          const setPosition = spy();
          Object.defineProperty(wrapper.instance(), 'setPosition', { value: setPosition });

          const handleOpen = spy();
          const handleClose = spy();
          wrapper.setProps({ onOpen: handleOpen, onClose: handleClose });
          fireBodyMouseEvent('touchstart', {touches: [params.edgeTouch]})
          assert.strictEqual(wrapper.instance().maybeSwiping, true, 'should be listening for swipe')
          assert.strictEqual(setPosition.callCount, 1, 'should slide in a bit')
          fireBodyMouseEvent('touchend', {changedTouches: [params.edgeTouch]})
          assert.strictEqual(handleOpen.callCount, 0, 'should not call onOpen')
          assert.strictEqual(handleClose.callCount, 0, 'should not call onClose')
        });
      });

      it('removes event listeners on unmount', () => {
        fireBodyMouseEvent('touchstart', {touches: [{pageX: 0, clientY: 0}]})
        wrapper.unmount();
        // should trigger setState warning if listeners aren't cleaned.
        fireBodyMouseEvent('touchmove', {touches: [{pageX: 180, clientY: 0}]});
        // should trigger setState warning if swipe handling is not cleaned, too
        fireBodyMouseEvent('touchstart', {touches: [{pageX: 0, clientY: 0}]});
      })
    })
  });

  describe('prop: variant=persistent', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Drawer variant="persistent">
          <h1>Hello</h1>
        </Drawer>,
      );
    });

    it('should render a div instead of a Modal when persistent', () => {
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.docked), true, 'should have the docked class');
    });

    it('should render Slide > Paper inside the div', () => {
      const slide = wrapper.childAt(0);
      assert.strictEqual(slide.length, 1);
      assert.strictEqual(slide.type(), Slide);

      const paper = slide.childAt(0);
      assert.strictEqual(paper.length === 1 && paper.type(), Paper);
    });
  });

  describe('prop: variant=permanent', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Drawer variant="permanent">
          <h1>Hello</h1>
        </Drawer>,
      );
    });

    it('should render a div instead of a Modal when permanent', () => {
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.docked), true, 'should have the docked class');
    });

    it('should render div > Paper inside the div', () => {
      const slide = wrapper;
      assert.strictEqual(slide.length, 1);
      assert.strictEqual(slide.name(), 'div');

      const paper = slide.childAt(0);
      assert.strictEqual(paper.length === 1 && paper.type(), Paper);
    });
  });

  describe('slide direction', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Drawer>
          <div />
        </Drawer>,
      );
    });

    it('should return the opposing slide direction', () => {
      wrapper.setProps({ anchor: 'left' });
      assert.strictEqual(wrapper.find(Slide).props().direction, 'right');

      wrapper.setProps({ anchor: 'right' });
      assert.strictEqual(wrapper.find(Slide).props().direction, 'left');

      wrapper.setProps({ anchor: 'top' });
      assert.strictEqual(wrapper.find(Slide).props().direction, 'down');

      wrapper.setProps({ anchor: 'bottom' });
      assert.strictEqual(wrapper.find(Slide).props().direction, 'up');
    });

    it('should recognize left and right as horizontal swiping directions', () => {
      wrapper.setProps({ anchor: 'left' });
      assert.strictEqual(wrapper.instance().isHorizontalSwiping(), true);

      wrapper.setProps({ anchor: 'right' });
      assert.strictEqual(wrapper.instance().isHorizontalSwiping(), true);

      wrapper.setProps({ anchor: 'top' });
      assert.strictEqual(wrapper.instance().isHorizontalSwiping(), false);

      wrapper.setProps({ anchor: 'bottom' });
      assert.strictEqual(wrapper.instance().isHorizontalSwiping(), false);
    })
  });

  describe('Right To Left', () => {
    let wrapper;

    before(() => {
      const theme = createMuiTheme({
        direction: 'rtl',
      });
      wrapper = shallow(
        <Drawer theme={theme}>
          <div />
        </Drawer>,
      );
    });

    it('should switch left and right anchor when theme is right-to-left', () => {
      wrapper.setProps({ anchor: 'left' });
      // slide direction for left is right, if left is switched to right, we should get left
      assert.strictEqual(wrapper.find(Slide).props().direction, 'left');

      wrapper.setProps({ anchor: 'right' });
      // slide direction for right is left, if right is switched to left, we should get right
      assert.strictEqual(wrapper.find(Slide).props().direction, 'right');
    });
  });
});
