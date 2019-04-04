import React from 'react';
import { assert } from 'chai';
import { createMount, createRender } from '@material-ui/core/test-utils';
import NoSsr from './NoSsr';

describe('<NoSsr />', () => {
  let mount;
  let render;

  before(() => {
    mount = createMount();
    render = createRender();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('server-side rendering', () => {
    it('should not render the children as the width is unknown', () => {
      const wrapper = render(
        <NoSsr>
          <span>Hello</span>
        </NoSsr>,
      );
      assert.strictEqual(wrapper.text(), '');
    });
  });

  describe('mounted', () => {
    it('should render the children', () => {
      const wrapper = mount(
        <NoSsr>
          <span>Hello</span>
        </NoSsr>,
      );
      assert.strictEqual(wrapper.find('span').length, 1);
      assert.strictEqual(wrapper.text(), 'Hello');
    });
  });

  describe('prop: fallback', () => {
    it('should render the fallback', () => {
      const wrapper = render(
        <div>
          <NoSsr fallback="fallback">
            <span>Hello</span>
          </NoSsr>
        </div>,
      );
      assert.strictEqual(wrapper.text(), 'fallback');
    });
  });

  describe('prop: defer', () => {
    it('should defer the rendering', () => {
      const wrapper = mount(
        <NoSsr defer>
          <span>Hello</span>
        </NoSsr>,
      );
      assert.strictEqual(wrapper.find('span').length, 1);
    });
  });
});
