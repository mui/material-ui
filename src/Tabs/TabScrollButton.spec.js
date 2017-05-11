// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from 'src/test-utils';
import TabScrollButton, { styleSheet } from './TabScrollButton';
import ButtonBase from '../internal/ButtonBase';
import KeyboardArrowLeft from '../svg-icons/keyboard-arrow-left';
import KeyboardArrowRight from '../svg-icons/keyboard-arrow-right';

describe('<TabScrollButton />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('prop: visible', () => {
    it('should render as a button with the root class', () => {
      const wrapper = shallow(
        <TabScrollButton visible />,
      );

      assert.strictEqual(wrapper.is(ButtonBase), true, 'should be a button');
      assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    });
  });

  describe('prop: !visible', () => {
    it('should render as a div with root class', () => {
      const wrapper = shallow(
        <TabScrollButton visible={false} />,
      );

      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    });
  });

  describe('prop: className', () => {
    it('should render with the user and root classes', () => {
      const wrapper = shallow(
        <TabScrollButton className="woof" />,
      );
      assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
      assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    });
  });

  describe('prop: direction', () => {
    it('should render with the left icon', () => {
      const wrapper = mount(
        <TabScrollButton direction={'left'} visible />,
      );
      assert.strictEqual(wrapper.childAt(0).is(KeyboardArrowLeft), true, 'should be the left icon');
    });

    it('should render with the right icon', () => {
      const wrapper = mount(
        <TabScrollButton direction={'right'} visible />,
      );
      assert.strictEqual(wrapper.childAt(0).is(KeyboardArrowRight), true,
        'should be the right icon');
    });
  });
});
