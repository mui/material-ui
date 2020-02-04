import React from 'react';
import { assert } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import createServerRender from 'test/utils/createServerRender';
import NoSsr from './NoSsr';

describe('<NoSsr />', () => {
  let mount;
  const serverRender = createServerRender();

  before(() => {
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describe('server-side rendering', () => {
    it('should not render the children as the width is unknown', () => {
      const wrapper = serverRender(
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
          <span id="client-only" />
        </NoSsr>,
      );
      assert.strictEqual(wrapper.find('#client-only').exists(), true);
    });
  });

  describe('prop: fallback', () => {
    it('should render the fallback', () => {
      const wrapper = serverRender(
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
          <span id="client-only">Hello</span>
        </NoSsr>,
      );
      assert.strictEqual(wrapper.find('#client-only').exists(), true);
    });
  });
});
