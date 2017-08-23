// @flow

import * as React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import MenuList from './MenuList';

describe('<MenuList />', () => {
  let shallow;

  before(() => {
    shallow = createShallow({ dive: true });
  });

  describe('list node', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<MenuList className="test-class" data-test="hi" />);
    });

    it('should render a List', () => {
      assert.strictEqual(wrapper.name(), 'List');
    });

    it('should spread other props on the list', () => {
      assert.strictEqual(wrapper.props()['data-test'], 'hi');
    });

    it('should have the user classes', () => {
      assert.strictEqual(wrapper.hasClass('test-class'), true);
    });
  });
});
