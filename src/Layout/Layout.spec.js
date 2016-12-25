// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Layout, { styleSheet } from './Layout';

describe('<Layout />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render', () => {
    const wrapper = shallow(<Layout className="woof" />);
    assert.strictEqual(wrapper.is('div'), true, 'should be a <div />');
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the user class');
  });

  describe('prop: type', () => {
    it('should apply the right container class', () => {
      const wrapper = shallow(<Layout type="container" />);
      assert.strictEqual(wrapper.hasClass(classes.typeContainer), true);
    });

    it('should apply the right item class', () => {
      const wrapper = shallow(<Layout type="item" />);
      assert.strictEqual(wrapper.hasClass(classes.typeItem), true);
    });
  });

  describe('prop: component', () => {
    it('should change the component', () => {
      const wrapper = shallow(<Layout component="span" />);
      assert.strictEqual(wrapper.is('span'), true, 'should be a <span>');
    });
  });

  describe('prop: xs', () => {
    it('should apply the flex-grow class', () => {
      const wrapper = shallow(<Layout xs />);
      assert.strictEqual(wrapper.hasClass(classes['grid-xs']), true);
    });
  });

  describe('prop: xsGutter', () => {
    it('should have a default gutter', () => {
      const wrapper = shallow(<Layout type="container" />);
      assert.strictEqual(wrapper.hasClass(classes['gutter-xs-16']), true);
    });
  });

  describe('prop: other', () => {
    it('should spread the other properties to the root element', () => {
      const handleClick = () => {};
      const wrapper = shallow(<Layout component="span" onClick={handleClick} />);
      assert.strictEqual(wrapper.props().onClick, handleClick);
    });
  });
});
