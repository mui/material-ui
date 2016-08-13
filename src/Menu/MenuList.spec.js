// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import MenuList from './MenuList';

describe('<MenuList>', () => {
  let shallow;

  before(() => {
    shallow = createShallowWithContext();
  });

  describe('list node', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<MenuList className="test-class" data-test="hi" />);
    });

    it('should render a List', () => {
      assert.strictEqual(wrapper.is('List'), true, 'should have a list as the immediate child');
    });

    it('should spread other props on the list', () => {
      assert.strictEqual(wrapper.prop('data-test'), 'hi', 'should have the custom prop');
    });

    it('should have the user classes', () => {
      assert.strictEqual(wrapper.hasClass('test-class'), true, 'should have the user class');
    });
  });
});
