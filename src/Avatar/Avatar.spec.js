// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Avatar, { styleSheet } from './Avatar';

describe('<Avatar>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  describe('image avatar', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Avatar
          className="my-avatar"
          src="something.jpg"
          alt="Hello World!"
          data-my-prop="woof"
        />
      );
    });

    it('should render a div containing an img', () => {
      assert.strictEqual(wrapper.is('div'), true, 'should be a div');
      assert.strictEqual(wrapper.childAt(0).is('img'), true, 'should be an img');
    });

    it('should spread custom props merge user classes to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-avatar'), true);
      assert.strictEqual(wrapper.prop('data-my-prop'), 'woof');
    });

    it('should not apply the defaultColor class for image avatars', () => {
      assert.strictEqual(wrapper.hasClass(classes.defaultColor), false);
    });

    it('should add the img class to the img node', () => {
      const img = wrapper.childAt(0);
      assert.strictEqual(img.hasClass(classes.img), true);
    });

    it('should apply img props to the img node', () => {
      const img = wrapper.childAt(0);
      assert.strictEqual(img.prop('alt'), 'Hello World!');
      assert.strictEqual(img.prop('src'), 'something.jpg');
    });
  });

  describe('icon avatar', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Avatar
          icon={<span className="my-icon-font">icon</span>}
          className="my-avatar"
          data-my-prop="woof"
        />
      );
    });

    it('should render a div containing the custom icon', () => {
      assert.strictEqual(wrapper.is('div'), true, 'should be a div');
      assert.strictEqual(wrapper.childAt(0).is('span'), true, 'should be a span');
      assert.strictEqual(wrapper.childAt(0).hasClass('my-icon-font'), true);
      assert.strictEqual(wrapper.childAt(0).text(), 'icon');
    });

    it('should spread custom props merge user classes to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-avatar'), true);
      assert.strictEqual(wrapper.prop('data-my-prop'), 'woof');
    });

    it('should apply the defaultColor class', () => {
      assert.strictEqual(wrapper.hasClass(classes.defaultColor), true);
    });
  });
});
