/* eslint-env mocha */

import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import NestedList from './NestedList';

describe('<NestedList />', () => {
  describe('prop: open', () => {
    it('should render the children when open is true', () => {
      const wrapper = shallow(
        <NestedList nestedLevel={1} open={true}>
          <div />
          <div />
        </NestedList>
      );
      assert.strictEqual(wrapper.children().length, 2);
    });

    it('should not render the children when open is false', () => {
      const wrapper = shallow(
        <NestedList nestedLevel={1} open={false}>
          <div />
          <div />
        </NestedList>
      );
      assert.strictEqual(wrapper.children().length, 0);
    });
  });
});
