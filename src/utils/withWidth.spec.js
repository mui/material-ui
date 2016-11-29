// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext, createMountWithContext } from 'test/utils';
import withWidth, { isWidthUp, isWidthDown } from './withWidth';

const Empty = () => <div />;
Empty.propTypes = {}; // Breaks the referencial transparency for testing purposes.
const EmptyWithWidth = withWidth()(Empty);

describe('withWidth', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallowWithContext();
    mount = createMountWithContext();
  });

  describe('server side rendering', () => {
    it('should not render the children as the width is unkown', () => {
      const wrapper = shallow(<EmptyWithWidth />);
      assert.strictEqual(wrapper.type(), null, 'should render nothing');
    });
  });

  describe('prop: width', () => {
    it('should be able to override it', () => {
      const wrapper = mount(<EmptyWithWidth width="foo" />);

      assert.strictEqual(wrapper.find(Empty).props().width, 'foo');
    });
  });

  describe('browser', () => {
    it('should provide the right width to the child element', () => {
      const wrapper = mount(<EmptyWithWidth />);

      assert.strictEqual(wrapper.find(Empty).props().width, 'md');
    });
  });

  describe('isWidthUp', () => {
    it('should work as expected', () => {
      assert.strictEqual(isWidthUp('md', 'lg'), true, 'should accept larger size');
      assert.strictEqual(isWidthUp('md', 'md'), true, 'should be inclusive');
      assert.strictEqual(isWidthUp('md', 'sm'), false, 'should reject smaller size');
    });
  });

  describe('isWidthDown', () => {
    it('should work as expected', () => {
      assert.strictEqual(isWidthDown('md', 'lg'), false, 'should reject larger size');
      assert.strictEqual(isWidthDown('md', 'md'), false, 'should be exclusive');
      assert.strictEqual(isWidthDown('md', 'sm'), true, 'should accept smaller size');
    });
  });

  describe('width computation', () => {
    it('should work as expected', () => {
      const wrapper = shallow(<EmptyWithWidth />);
      const instance = wrapper.instance();
      const updateWidth = instance.updateWidth.bind(instance);
      const breakpoints = wrapper.context().theme.breakpoints;

      breakpoints.keys.forEach((key) => {
        updateWidth(breakpoints.getWidth(key));
        assert.strictEqual(wrapper.state().width, key, 'should return the matching width');
      });
    });
  });
});
