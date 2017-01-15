// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Chip, { styleSheet } from './Chip.js';
import Avatar from '../Avatar/Avatar.js';

describe('<Chip />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  describe('text only', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Chip
          className="my-Chip"
          data-my-prop="woof"
        >
          Text Chip
        </Chip>,
      );
    });

    it('should render a button containing a span', () => {
      assert.strictEqual(wrapper.is('button'), true, 'should be a button');
      assert.strictEqual(wrapper.childAt(0).is('span'), true, 'should be a span');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-Chip'), true);
      assert.strictEqual(wrapper.prop('data-my-prop'), 'woof');
    });

    it('should have a tabIndex prop with value -1', () => {
      assert.strictEqual(wrapper.prop('tabIndex'), -1);
    });
  });

  describe('clickable text chip', () => {
    let wrapper;
    let handleClick;

    before(() => {
      handleClick = () => {};
      wrapper = shallow(
        <Chip
          className="my-Chip"
          data-my-prop="woof"
          onClick={handleClick}
        >
          Text Chip
        </Chip>,
      );
    });

    it('should render a button containing a span', () => {
      assert.strictEqual(wrapper.is('button'), true, 'should be a button');
      assert.strictEqual(wrapper.childAt(0).is('span'), true, 'should be a span');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-Chip'), true);
      assert.strictEqual(wrapper.prop('data-my-prop'), 'woof');
      assert.strictEqual(wrapper.prop('onClick'), handleClick);
    });

    it('should not have a tabIndex prop', () => {
      assert.strictEqual(wrapper.prop('tabIndex'), undefined);
    });

    it('should apply user value of tabIndex', () => {
      wrapper = shallow(
        <Chip
          onClick={() => {}}
          tabIndex={5} // eslint-disable-line jsx-a11y/tabindex-no-positive
        >
          Text Chip
        </Chip>,
      );
      assert.strictEqual(wrapper.prop('tabIndex'), 5);
    });
  });

  describe('deletable Avatar chip', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Chip
          avatar={
            <Avatar className="my-Avatar" data-my-prop="woof">
              MB
            </Avatar>
          }
          label="Text Avatar Chip"
          onRequestDelete={() => {}}
          className="my-Chip"
          data-my-prop="woof"
        />,
      );
    });

    it('should render a button containing an Avatar, span and svg', () => {
      assert.strictEqual(wrapper.is('button'), true, 'should be a button');
      assert.strictEqual(wrapper.childAt(0).is('Avatar'), true, 'should have an Avatar');
      assert.strictEqual(wrapper.childAt(1).is('span'), true, 'should have a span');
      assert.strictEqual(wrapper.childAt(2).is('pure(Cancel)'), true,
        'should be an svg icon');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-Chip'), true);
      assert.strictEqual(wrapper.prop('data-my-prop'), 'woof');
    });

    it('should merge user classes & spread custom props to the Avatar node', () => {
      assert.strictEqual(wrapper.childAt(0).hasClass(classes.avatar), true);
      assert.strictEqual(wrapper.childAt(0).hasClass('my-Avatar'), true);
      assert.strictEqual(wrapper.childAt(0).prop('data-my-prop'), 'woof');
    });

    it('should not have a tabIndex prop', () => {
      assert.strictEqual(wrapper.prop('tabIndex'), undefined);
    });
  });
});
