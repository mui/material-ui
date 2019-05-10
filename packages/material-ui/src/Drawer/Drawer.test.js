import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import Slide from '../Slide';
import createMuiTheme from '../styles/createMuiTheme';
import Paper from '../Paper';
import Modal from '../Modal';
import Drawer, { getAnchor, isHorizontal } from './Drawer';

describe('<Drawer />', () => {
  let mount;
  let classes;

  before(() => {
    // StrictModeViolation: uses Slide
    mount = createMount({ strict: false });
    classes = getClasses(
      <Drawer>
        <div />
      </Drawer>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(
    <Drawer open>
      <div />
    </Drawer>,
    () => ({
      classes,
      inheritComponent: 'div',
      mount,
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp'],
    }),
  );

  describe('prop: variant=temporary', () => {
    it('should render a Modal', () => {
      const wrapper = mount(
        <Drawer>
          <div />
        </Drawer>,
      );
      assert.strictEqual(wrapper.find(Modal).exists(), true);
    });

    it('should render Slide > Paper inside the Modal', () => {
      const wrapper = mount(
        <Drawer open>
          <div />
        </Drawer>,
      );
      const modal = wrapper.find(Modal);

      const slide = modal.find(Slide);
      assert.strictEqual(slide.exists(), true);

      const paper = slide.find(Paper);
      assert.strictEqual(paper.exists(), true);
      assert.strictEqual(paper.hasClass(classes.paper), true);
    });

    describe('transitionDuration property', () => {
      const transitionDuration = {
        enter: 854,
        exit: 2967,
      };

      it('should be passed to Slide', () => {
        const wrapper = mount(
          <Drawer open transitionDuration={transitionDuration}>
            <div />
          </Drawer>,
        );
        assert.strictEqual(wrapper.find(Slide).props().timeout, transitionDuration);
      });

      it("should be passed to to Modal's BackdropTransitionDuration when open=true", () => {
        const wrapper = mount(
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
      const wrapper = mount(
        <Drawer BackdropTransitionDuration={testDuration}>
          <div />
        </Drawer>,
      );
      assert.strictEqual(wrapper.find(Modal).props().BackdropTransitionDuration, testDuration);
    });

    it('should set the custom className for Modal when variant is temporary', () => {
      const wrapper = mount(
        <Drawer className="woofDrawer" variant="temporary">
          <h1>Hello</h1>
        </Drawer>,
      );

      const modal = wrapper.find('Modal');

      assert.strictEqual(modal.hasClass('woofDrawer'), true);
    });

    it('should set the Paper className', () => {
      const wrapper = mount(
        <Drawer classes={{ paper: 'woofDrawer' }} open>
          <h1>Hello</h1>
        </Drawer>,
      );
      const paper = wrapper.find(Paper);
      assert.strictEqual(paper.hasClass(classes.paper), true);
      assert.strictEqual(paper.hasClass('woofDrawer'), true);
    });

    it('should be closed by default', () => {
      const wrapper = mount(
        <Drawer>
          <h1>Hello</h1>
        </Drawer>,
      );

      const modal = wrapper.find('Modal');

      assert.strictEqual(modal.props().open, false);
    });

    describe('opening and closing', () => {
      const drawerElement = (
        <Drawer>
          <h1>Hello</h1>
        </Drawer>
      );

      it('should start closed', () => {
        const wrapper = mount(drawerElement);
        assert.strictEqual(wrapper.find('Modal').props().open, false);
      });

      it('should open and close', () => {
        const wrapper = mount(drawerElement);

        wrapper.setProps({ open: true });
        wrapper.update();
        assert.strictEqual(wrapper.find(Slide).props().in, true);

        wrapper.setProps({ open: false });
        wrapper.update();
        assert.strictEqual(wrapper.find(Slide).props().in, false);
      });
    });
  });

  describe('prop: variant=persistent', () => {
    const drawerElement = (
      <Drawer variant="persistent">
        <h1>Hello</h1>
      </Drawer>
    );

    it('should render a div instead of a Modal when persistent', () => {
      const wrapper = mount(drawerElement);
      const root = findOutermostIntrinsic(wrapper);
      assert.strictEqual(root.type(), 'div');
      assert.strictEqual(root.hasClass(classes.docked), true);
    });

    it('should render Slide > Paper inside the div', () => {
      const wrapper = mount(drawerElement);
      const div = wrapper.find('div').first();
      const slide = div.childAt(0);
      assert.strictEqual(slide.length, 1);
      assert.strictEqual(slide.type(), Slide);

      const paper = findOutermostIntrinsic(slide);
      assert.strictEqual(paper.exists(), true);
      assert.strictEqual(paper.hasClass(classes.paper), true);
    });
  });

  describe('prop: variant=permanent', () => {
    const drawerElement = (
      <Drawer variant="permanent">
        <h1>Hello</h1>
      </Drawer>
    );

    it('should render a div instead of a Modal when permanent', () => {
      const wrapper = mount(drawerElement);
      const root = wrapper.find(`.${classes.root}`);
      assert.strictEqual(root.type(), 'div');
      assert.strictEqual(root.hasClass(classes.docked), true);
    });

    it('should render div > Paper inside the div', () => {
      const wrapper = mount(drawerElement);

      const root = wrapper.find(`div.${classes.root}`);
      assert.strictEqual(root.exists(), true);
    });
  });

  describe('slide direction', () => {
    it('should return the opposing slide direction', () => {
      const wrapper = mount(
        <Drawer open>
          <div />
        </Drawer>,
      );

      wrapper.setProps({ anchor: 'left' });
      assert.strictEqual(wrapper.find(Slide).props().direction, 'right');

      wrapper.setProps({ anchor: 'right' });
      assert.strictEqual(wrapper.find(Slide).props().direction, 'left');

      wrapper.setProps({ anchor: 'top' });
      assert.strictEqual(wrapper.find(Slide).props().direction, 'down');

      wrapper.setProps({ anchor: 'bottom' });
      assert.strictEqual(wrapper.find(Slide).props().direction, 'up');
    });
  });

  describe('Right To Left', () => {
    it('should switch left and right anchor when theme is right-to-left', () => {
      const theme = createMuiTheme({
        direction: 'rtl',
      });
      const wrapper = mount(
        <Drawer open theme={theme}>
          <div />
        </Drawer>,
      );

      wrapper.setProps({ anchor: 'left' });
      // slide direction for left is right, if left is switched to right, we should get left
      assert.strictEqual(wrapper.find(Slide).props().direction, 'left');

      wrapper.setProps({ anchor: 'right' });
      // slide direction for right is left, if right is switched to left, we should get right
      assert.strictEqual(wrapper.find(Slide).props().direction, 'right');
    });
  });

  describe('isHorizontal', () => {
    it('should recognize left and right as horizontal swiping directions', () => {
      assert.strictEqual(isHorizontal('left'), true);
      assert.strictEqual(isHorizontal('right'), true);
      assert.strictEqual(isHorizontal('top'), false);
      assert.strictEqual(isHorizontal('bottom'), false);
    });
  });

  describe('getAnchor', () => {
    it('should return the anchor', () => {
      const theme = { direction: 'ltr' };

      assert.strictEqual(getAnchor(theme, 'left'), 'left');
      assert.strictEqual(getAnchor(theme, 'right'), 'right');
      assert.strictEqual(getAnchor(theme, 'top'), 'top');
      assert.strictEqual(getAnchor(theme, 'bottom'), 'bottom');
    });

    it('should switch left/right if RTL is enabled', () => {
      const theme = { direction: 'rtl' };

      assert.strictEqual(getAnchor(theme, 'left'), 'right');
      assert.strictEqual(getAnchor(theme, 'right'), 'left');
    });
  });
});
