// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount, getClasses } from '../test-utils';
import TabScrollButton from './TabScrollButton';
import ButtonBase from '../ButtonBase';
import KeyboardArrowLeft from '../svg-icons/keyboard-arrow-left';
import KeyboardArrowRight from '../svg-icons/keyboard-arrow-right';

describe('<TabScrollButton />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TabScrollButton />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('prop: visible', () => {
    it('should render as a button with the root class', () => {
      const wrapper = shallow(<TabScrollButton visible />);

      assert.strictEqual(wrapper.is(ButtonBase), true, 'should be a button');
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });

  describe('prop: !visible', () => {
    it('should render as a div with root class', () => {
      const wrapper = shallow(<TabScrollButton visible={false} />);

      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });

  describe('prop: className', () => {
    it('should render with the user and root classes', () => {
      const wrapper = shallow(<TabScrollButton className="woofTabScrollButton" />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('woofTabScrollButton'), true);
    });
  });

  describe('prop: direction', () => {
    it('should render with the left icon', () => {
      const wrapper = mount(<TabScrollButton direction={'left'} visible />);
      assert.strictEqual(wrapper.childAt(0).is(KeyboardArrowLeft), true, 'should be the left icon');
    });

    it('should render with the right icon', () => {
      const wrapper = mount(<TabScrollButton direction={'right'} visible />);
      assert.strictEqual(
        wrapper.childAt(0).is(KeyboardArrowRight),
        true,
        'should be the right icon',
      );
    });
  });
});
