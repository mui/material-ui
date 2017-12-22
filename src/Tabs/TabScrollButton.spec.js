import React from 'react';
import { assert } from 'chai';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import { createShallow, createMount, getClasses } from '../test-utils';
import TabScrollButton from './TabScrollButton';
import ButtonBase from '../ButtonBase';

describe('<TabScrollButton />', () => {
  const props = {
    direction: 'left',
  };
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TabScrollButton {...props} />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('prop: visible', () => {
    it('should render as a button with the root class', () => {
      const wrapper = shallow(<TabScrollButton {...props} visible />);

      assert.strictEqual(wrapper.is(ButtonBase), true, 'should be a button');
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });

  describe('prop: !visible', () => {
    it('should render as a div with root class', () => {
      const wrapper = shallow(<TabScrollButton {...props} visible={false} />);

      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });

  describe('prop: className', () => {
    it('should render with the user and root classes', () => {
      const wrapper = shallow(<TabScrollButton {...props} className="woofTabScrollButton" />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('woofTabScrollButton'), true);
    });
  });

  describe('prop: direction', () => {
    it('should render with the left icon', () => {
      const wrapper = mount(<TabScrollButton {...props} direction="left" visible />);
      assert.strictEqual(wrapper.find(KeyboardArrowLeft).length, 1, 'should be the left icon');
    });

    it('should render with the right icon', () => {
      const wrapper = mount(<TabScrollButton {...props} direction="right" visible />);
      assert.strictEqual(wrapper.find(KeyboardArrowRight).length, 1, 'should be the right icon');
    });
  });
});
