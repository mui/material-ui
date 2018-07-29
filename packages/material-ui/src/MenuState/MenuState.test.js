import * as React from 'react';
import { spy } from 'sinon';
import { assert } from 'chai';
import { createMount } from '../test-utils';
import Button from '../Button';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import MenuState from './MenuState';

describe('<MenuState />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('works', () => {
    let buttonRef;
    let button;
    let menu;
    const render = spy(({ close, bindTrigger, bindMenu }) => (
      <React.Fragment>
        <Button
          buttonRef={c => {
            buttonRef = c;
          }}
          {...bindTrigger}
        >
          Open Menu
        </Button>
        <Menu {...bindMenu}>
          <MenuItem onClick={close}>Test</MenuItem>
        </Menu>
      </React.Fragment>
    ));
    const wrapper = mount(<MenuState menuId="menu">{render}</MenuState>);
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
});
