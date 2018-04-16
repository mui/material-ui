import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import MenuList from './MenuList';

describe('<MenuList />', () => {
  let shallow;

  before(() => {
    shallow = createShallow({ dive: true, disableLifecycleMethods: true });
  });

  describe('list node', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<MenuList className="test-class" data-test="hi" />);
    });

    it('should render a List', () => {
      assert.strictEqual(wrapper.name(), 'List');
      assert.strictEqual(wrapper.props()['data-test'], 'hi');
      assert.strictEqual(wrapper.hasClass('test-class'), true);
    });
  });

  describe('prop: children', () => {
    it('should support invalid children', () => {
      const wrapper = shallow(
        <MenuList>
          <div />
          <div />
          {null}
        </MenuList>,
      );
      assert.strictEqual(wrapper.find('div').length, 2);
    });
  });
});
