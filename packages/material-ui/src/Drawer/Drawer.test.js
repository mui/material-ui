import * as React from 'react';
import { expect } from 'chai';
import { findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import describeConformance from '../test-utils/describeConformance';
import Slide from '../Slide';
import Paper from '../Paper';
import Modal from '../Modal';
import Drawer, { getAnchor, isHorizontal } from './Drawer';
import { createClientRender } from 'test/utils/createClientRender';

describe('<Drawer />', () => {
  // StrictModeViolation: uses Slide
  const mount = createMount({ strict: false });
  let classes;
  const render = createClientRender({ strict: false });

  before(() => {
    classes = getClasses(
      <Drawer>
        <div />
      </Drawer>,
    );
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
      skip: [
        'componentProp',
        // react-transition-group issue
        'reactTestRenderer',
      ],
    }),
  );

  describe('prop: variant=temporary', () => {
    it('should render a Modal', () => {
      const wrapper = mount(
        <Drawer>
          <div />
        </Drawer>,
      );
      expect(wrapper.find(Modal).exists()).to.equal(true);
    });

    it('should render Slide > Paper inside the Modal', () => {
      const wrapper = mount(
        <Drawer open>
          <div />
        </Drawer>,
      );
      const modal = wrapper.find(Modal);

      const slide = modal.find(Slide);
      expect(slide.exists()).to.equal(true);

      const paper = slide.find(Paper);
      expect(paper.exists()).to.equal(true);
      expect(paper.hasClass(classes.paper)).to.equal(true);
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
        expect(wrapper.find(Slide).props().timeout).to.equal(transitionDuration);
      });

      it("should be passed to to Modal's BackdropTransitionDuration when open=true", () => {
        const wrapper = mount(
          <Drawer open transitionDuration={transitionDuration}>
            <div />
          </Drawer>,
        );
        expect(wrapper.find(Modal).props().BackdropProps.transitionDuration).to.equal(
          transitionDuration,
        );
      });
    });

    it("should override Modal's BackdropTransitionDuration from prop when specified", () => {
      const testDuration = 335;
      const wrapper = mount(
        <Drawer BackdropTransitionDuration={testDuration}>
          <div />
        </Drawer>,
      );
      expect(wrapper.find(Modal).props().BackdropTransitionDuration).to.equal(testDuration);
    });

    it('should set the custom className for Modal when variant is temporary', () => {
      const wrapper = mount(
        <Drawer className="woofDrawer" variant="temporary">
          <h1>Hello</h1>
        </Drawer>,
      );

      const modal = wrapper.find(Modal);

      expect(modal.hasClass('woofDrawer')).to.equal(true);
    });

    it('should set the Paper className', () => {
      const wrapper = mount(
        <Drawer classes={{ paper: 'woofDrawer' }} open>
          <h1>Hello</h1>
        </Drawer>,
      );
      const paper = wrapper.find(Paper);
      expect(paper.hasClass(classes.paper)).to.equal(true);
      expect(paper.hasClass('woofDrawer')).to.equal(true);
    });

    it('should be closed by default', () => {
      const wrapper = mount(
        <Drawer>
          <h1>Hello</h1>
        </Drawer>,
      );

      const modal = wrapper.find(Modal);

      expect(modal.props().open).to.equal(false);
    });

    describe('opening and closing', () => {
      const drawerElement = (
        <Drawer>
          <h1>Hello</h1>
        </Drawer>
      );

      it('should start closed', () => {
        const wrapper = mount(drawerElement);
        expect(wrapper.find(Modal).props().open).to.equal(false);
      });

      it('should open and close', () => {
        const wrapper = mount(drawerElement);

        wrapper.setProps({ open: true });
        wrapper.update();
        expect(wrapper.find(Slide).props().in).to.equal(true);

        wrapper.setProps({ open: false });
        wrapper.update();
        expect(wrapper.find(Slide).props().in).to.equal(false);
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
      expect(root.type()).to.equal('div');
      expect(root.hasClass(classes.docked)).to.equal(true);
    });

    it('should render Slide > Paper inside the div', () => {
      const wrapper = mount(drawerElement);
      const div = wrapper.find('div').first();
      const slide = div.childAt(0);
      expect(slide.length).to.equal(1);
      expect(slide.type()).to.equal(Slide);

      const paper = findOutermostIntrinsic(slide);
      expect(paper.exists()).to.equal(true);
      expect(paper.hasClass(classes.paper)).to.equal(true);
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
      expect(root.type()).to.equal('div');
      expect(root.hasClass(classes.docked)).to.equal(true);
    });

    it('should render div > Paper inside the div', () => {
      const wrapper = mount(drawerElement);

      const root = wrapper.find(`div.${classes.root}`);
      expect(root.exists()).to.equal(true);
    });
  });

  describe('prop: PaperProps', () => {
    it('should merge class names', () => {
      const { container } = render(
        <Drawer PaperProps={{ className: 'my-class' }} variant="permanent">
          <h1>Hello</h1>
        </Drawer>,
      );
      expect(container.querySelector(`.${classes.paper}`)).to.have.class('my-class');
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
      expect(wrapper.find(Slide).props().direction).to.equal('right');

      wrapper.setProps({ anchor: 'right' });
      expect(wrapper.find(Slide).props().direction).to.equal('left');

      wrapper.setProps({ anchor: 'top' });
      expect(wrapper.find(Slide).props().direction).to.equal('down');

      wrapper.setProps({ anchor: 'bottom' });
      expect(wrapper.find(Slide).props().direction).to.equal('up');
    });
  });

  describe('Right To Left', () => {
    it('should switch left and right anchor when theme is right-to-left', () => {
      const theme = createMuiTheme({
        direction: 'rtl',
      });
      const wrapper1 = mount(
        <ThemeProvider theme={theme}>
          <Drawer open anchor="left">
            <div />
          </Drawer>
        </ThemeProvider>,
      );
      // slide direction for left is right, if left is switched to right, we should get left
      expect(wrapper1.find(Slide).props().direction).to.equal('left');

      const wrapper2 = mount(
        <ThemeProvider theme={theme}>
          <Drawer open anchor="right">
            <div />
          </Drawer>
        </ThemeProvider>,
      );
      // slide direction for right is left, if right is switched to left, we should get right
      expect(wrapper2.find(Slide).props().direction).to.equal('right');
    });
  });

  describe('isHorizontal', () => {
    it('should recognize left and right as horizontal swiping directions', () => {
      expect(isHorizontal('left')).to.equal(true);
      expect(isHorizontal('right')).to.equal(true);
      expect(isHorizontal('top')).to.equal(false);
      expect(isHorizontal('bottom')).to.equal(false);
    });
  });

  describe('getAnchor', () => {
    it('should return the anchor', () => {
      const theme = { direction: 'ltr' };

      expect(getAnchor(theme, 'left')).to.equal('left');
      expect(getAnchor(theme, 'right')).to.equal('right');
      expect(getAnchor(theme, 'top')).to.equal('top');
      expect(getAnchor(theme, 'bottom')).to.equal('bottom');
    });

    it('should switch left/right if RTL is enabled', () => {
      const theme = { direction: 'rtl' };

      expect(getAnchor(theme, 'left')).to.equal('right');
      expect(getAnchor(theme, 'right')).to.equal('left');
    });
  });
});
