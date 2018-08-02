import * as React from 'react';
import { spy } from 'sinon';
import { assert } from 'chai';
import { createMount } from '../test-utils';
import Button from '../Button';
import Popper from '../Popper';
import Popover from '../Popover';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import PopupState, { bindMenu, bindPopover, bindPopper, bindTrigger, bindToggle, bindHover } from './PopupState';

/* eslint-disable react/jsx-handler-names */

describe('<PopupState />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('bindMenu/bindTrigger', () => {
    let buttonRef;
    let button;
    let menu;

    const render = spy(popupState => (
      <React.Fragment>
        <Button
          buttonRef={c => {
            buttonRef = c;
          }}
          {...bindTrigger(popupState)}
        >
          Open Menu
        </Button>
        <Menu {...bindMenu(popupState)}>
          <MenuItem onClick={popupState.close}>Test</MenuItem>
        </Menu>
      </React.Fragment>
    ));

    beforeEach(() => render.resetHistory());

    it('passes correct props to bindTrigger/bindPopup', () => {
      const wrapper = mount(<PopupState popupId="menu">{render}</PopupState>);
      button = wrapper.find(Button);
      menu = wrapper.find(Menu);
      assert.strictEqual(render.args[0][0].isOpen, false);
      assert.strictEqual(button.prop('aria-owns'), null);
      assert.strictEqual(button.prop('aria-haspopup'), true);
      assert.strictEqual(button.prop('onClick'), render.args[0][0].open);
      assert.strictEqual(menu.prop('id'), 'menu');
      assert.strictEqual(menu.prop('anchorEl'), null);
      assert.strictEqual(menu.prop('open'), false);
      assert.strictEqual(menu.prop('onClose'), render.args[0][0].close);

      button.simulate('click');
      wrapper.update();
      button = wrapper.find(Button);
      menu = wrapper.find(Menu);
      assert.strictEqual(render.args[1][0].isOpen, true);
      assert.strictEqual(button.prop('aria-owns'), 'menu');
      assert.strictEqual(button.prop('aria-haspopup'), true);
      assert.strictEqual(button.prop('onClick'), render.args[1][0].open);
      assert.strictEqual(menu.prop('id'), 'menu');
      assert.strictEqual(menu.prop('anchorEl'), buttonRef);
      assert.strictEqual(menu.prop('open'), true);
      assert.strictEqual(menu.prop('onClose'), render.args[1][0].close);

      wrapper.find(MenuItem).simulate('click');
      wrapper.update();
      button = wrapper.find(Button);
      menu = wrapper.find(Menu);
      assert.strictEqual(render.args[2][0].isOpen, false);
      assert.strictEqual(button.prop('aria-owns'), null);
      assert.strictEqual(button.prop('aria-haspopup'), true);
      assert.strictEqual(button.prop('onClick'), render.args[2][0].open);
      assert.strictEqual(menu.prop('id'), 'menu');
      assert.strictEqual(menu.prop('anchorEl'), null);
      assert.strictEqual(menu.prop('open'), false);
      assert.strictEqual(menu.prop('onClose'), render.args[2][0].close);
    });
    it('open/close works', () => {
      const wrapper = mount(<PopupState popupId="menu">{render}</PopupState>);

      render.args[0][0].open(buttonRef);
      wrapper.update();
      assert.strictEqual(render.args[1][0].isOpen, true);

      render.args[1][0].close();
      wrapper.update();
      assert.strictEqual(render.args[2][0].isOpen, false);
    });
    it('toggle works', () => {
      const wrapper = mount(<PopupState popupId="menu">{render}</PopupState>);

      render.args[0][0].toggle(buttonRef);
      wrapper.update();
      assert.strictEqual(render.args[1][0].isOpen, true);

      render.args[1][0].toggle(buttonRef);
      wrapper.update();
      assert.strictEqual(render.args[2][0].isOpen, false);
    });
    it('setOpen works', () => {
      const wrapper = mount(<PopupState popupId="menu">{render}</PopupState>);

      render.args[0][0].setOpen(true, buttonRef);
      wrapper.update();
      assert.strictEqual(render.args[1][0].isOpen, true);

      render.args[1][0].setOpen(false);
      wrapper.update();
      assert.strictEqual(render.args[2][0].isOpen, false);
    });
  });
  describe('bindToggle/bindPopper', () => {
    let buttonRef;
    let button;
    let popper;

    const render = spy(popupState => (
      <React.Fragment>
        <Button
          buttonRef={c => {
            buttonRef = c;
          }}
          {...bindToggle(popupState)}
        >
          Open Menu
        </Button>
        <Popper {...bindPopper(popupState)}>The popper content</Popper>
      </React.Fragment>
    ));

    beforeEach(() => render.resetHistory());

    it('passes correct props to bindToggle/bindPopup', () => {
      const wrapper = mount(<PopupState popupId="popper">{render}</PopupState>);
      button = wrapper.find(Button);
      popper = wrapper.find(Popper);
      assert.strictEqual(render.args[0][0].isOpen, false);
      assert.strictEqual(button.prop('aria-owns'), null);
      assert.strictEqual(button.prop('aria-haspopup'), true);
      assert.strictEqual(button.prop('onClick'), render.args[0][0].toggle);
      assert.strictEqual(popper.prop('id'), 'popper');
      assert.strictEqual(popper.prop('anchorEl'), null);
      assert.strictEqual(popper.prop('open'), false);
      assert.strictEqual(popper.prop('onClose'), undefined);

      button.simulate('click');
      wrapper.update();
      button = wrapper.find(Button);
      popper = wrapper.find(Popper);
      assert.strictEqual(render.args[1][0].isOpen, true);
      assert.strictEqual(button.prop('aria-owns'), 'popper');
      assert.strictEqual(button.prop('aria-haspopup'), true);
      assert.strictEqual(button.prop('onClick'), render.args[1][0].toggle);
      assert.strictEqual(popper.prop('id'), 'popper');
      assert.strictEqual(popper.prop('anchorEl'), buttonRef);
      assert.strictEqual(popper.prop('open'), true);
      assert.strictEqual(popper.prop('onClose'), undefined);

      button.simulate('click');
      wrapper.update();
      button = wrapper.find(Button);
      popper = wrapper.find(Popper);
      assert.strictEqual(render.args[2][0].isOpen, false);
      assert.strictEqual(button.prop('aria-owns'), null);
      assert.strictEqual(button.prop('aria-haspopup'), true);
      assert.strictEqual(button.prop('onClick'), render.args[2][0].toggle);
      assert.strictEqual(popper.prop('id'), 'popper');
      assert.strictEqual(popper.prop('anchorEl'), null);
      assert.strictEqual(popper.prop('open'), false);
      assert.strictEqual(popper.prop('onClose'), undefined);
    });
  });
  describe('bindHover/bindPopover', () => {
    let buttonRef;
    let button;
    let popover;

    const render = spy(popupState => (
      <React.Fragment>
        <Button
          buttonRef={c => {
            buttonRef = c;
          }}
          {...bindHover(popupState)}
        >
          Open Menu
        </Button>
        <Popover {...bindPopover(popupState)}>The popover content</Popover>
      </React.Fragment>
    ));

    beforeEach(() => render.resetHistory());

    it('passes correct props to bindHover/bindPopover', () => {
      const wrapper = mount(<PopupState popupId="popover">{render}</PopupState>);
      button = wrapper.find(Button);
      popover = wrapper.find(Popover);
      assert.strictEqual(render.args[0][0].isOpen, false);
      assert.strictEqual(button.prop('aria-owns'), null);
      assert.strictEqual(button.prop('aria-haspopup'), true);
      assert.strictEqual(button.prop('onMouseEnter'), render.args[0][0].open);
      assert.strictEqual(button.prop('onMouseLeave'), render.args[0][0].close);
      assert.strictEqual(popover.prop('id'), 'popover');
      assert.strictEqual(popover.prop('anchorEl'), null);
      assert.strictEqual(popover.prop('open'), false);
      assert.strictEqual(popover.prop('onClose'), render.args[0][0].close);

      button.simulate('mouseenter');
      wrapper.update();
      button = wrapper.find(Button);
      popover = wrapper.find(Popover);
      assert.strictEqual(render.args[1][0].isOpen, true);
      assert.strictEqual(button.prop('aria-owns'), 'popover');
      assert.strictEqual(button.prop('aria-haspopup'), true);
      assert.strictEqual(button.prop('onMouseEnter'), render.args[1][0].open);
      assert.strictEqual(button.prop('onMouseLeave'), render.args[1][0].close);
      assert.strictEqual(popover.prop('id'), 'popover');
      assert.strictEqual(popover.prop('anchorEl'), buttonRef);
      assert.strictEqual(popover.prop('open'), true);
      assert.strictEqual(popover.prop('onClose'), render.args[1][0].close);

      button.simulate('mouseleave');
      wrapper.update();
      button = wrapper.find(Button);
      popover = wrapper.find(Popover);
      assert.strictEqual(render.args[2][0].isOpen, false);
      assert.strictEqual(button.prop('aria-owns'), null);
      assert.strictEqual(button.prop('aria-haspopup'), true);
      assert.strictEqual(button.prop('onMouseEnter'), render.args[2][0].open);
      assert.strictEqual(button.prop('onMouseLeave'), render.args[2][0].close);
      assert.strictEqual(popover.prop('id'), 'popover');
      assert.strictEqual(popover.prop('anchorEl'), null);
      assert.strictEqual(popover.prop('open'), false);
      assert.strictEqual(popover.prop('onClose'), render.args[1][0].close);
    });
  });
});
