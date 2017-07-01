// @flow

import React from 'react';
import { assert } from 'chai';
import { createMount } from '../test-utils';
import Portal from './Portal';

describe('<Portal />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render nothing directly', () => {
    const wrapper = mount(
      <Portal>
        <h1 className="woof">Hello</h1>
      </Portal>,
    );
    assert.strictEqual(wrapper.children().length, 0, 'should have no children');
  });

  it('should not open by default', () => {
    const wrapper = mount(
      <Portal>
        <h1 className="woof">Hello</h1>
      </Portal>,
    );
    const instance = wrapper.instance();
    assert.strictEqual(wrapper.props().open, false, 'should be false by default');
    assert.strictEqual(instance.layer, null, 'should not have a layer');
  });

  describe('rendering and unrendering', () => {
    let wrapper;
    let instance;
    let portal;

    before(() => {
      wrapper = mount(
        <Portal open>
          <h1 id="woof">Hello</h1>
        </Portal>,
      );
      instance = wrapper.instance();
      portal = instance.layer;
    });

    it('should render the contents through a portal layer div', () => {
      assert.strictEqual(
        portal.tagName.toLowerCase(),
        'div',
        'should render a div element as the portal',
      );
      assert.strictEqual(portal.firstChild.tagName.toLowerCase(), 'h1', 'should be a heading tag');
      assert.strictEqual(portal.firstChild.getAttribute('id'), 'woof', 'should have the woof id');
      assert.strictEqual(portal.firstChild.innerHTML, 'Hello', 'have the contents');
      portal.setAttribute('id', 'meow');
      assert.strictEqual(
        document.getElementById('meow'),
        portal,
        'should have the portal in the DOM',
      );
      assert.strictEqual(
        document.getElementById('woof'),
        portal.firstChild,
        'should have the heading in the DOM',
      );
    });

    it('should unrender the contents and remove the layer', () => {
      wrapper.setProps({ open: false });
      assert.strictEqual(
        document.getElementById('meow'),
        null,
        'should not have the portal in the DOM',
      );
      assert.strictEqual(
        document.getElementById('woof'),
        null,
        'should not have the heading in the DOM',
      );
    });
  });
});
