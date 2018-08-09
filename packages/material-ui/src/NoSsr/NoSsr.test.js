// @flow

import React from 'react';
import { assert } from 'chai';
import { createMount, createShallow } from '../test-utils';
import NoSsr from './NoSsr';

describe('<NoSsr />', () => {
  let mount;
  let shallow;

  before(() => {
    mount = createMount();
    shallow = createShallow({ disableLifecycleMethods: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describe('server side rendering', () => {
    it('should not render the children as the width is unknown', () => {
      const wrapper = shallow(
        <NoSsr>
          <span>Hello</span>
        </NoSsr>,
      );
      assert.strictEqual(wrapper.name(), null);
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
      const wrapper = shallow(
        <NoSsr fallback="fallback">
          <span>Hello</span>
        </NoSsr>,
      );
      assert.strictEqual(wrapper.text(), 'fallback');
    });
  });

  describe('prop: defer', () => {
    it('should defer the rendering', done => {
      const wrapper = mount(
        <NoSsr defer>
          <span>Hello</span>
        </NoSsr>,
      );
      assert.strictEqual(wrapper.find('span').length, 0);
      setTimeout(() => {
        wrapper.update();
        assert.strictEqual(wrapper.find('span').length, 1);
        assert.strictEqual(wrapper.text(), 'Hello');
        done();
      }, 100);
    });
  });
});
