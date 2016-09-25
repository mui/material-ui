// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Ripple, { styleSheet } from './Ripple';

describe('<Ripple>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a span', () => {
    const wrapper = shallow(<Ripple />);
    assert.strictEqual(wrapper.is('span'), true, 'should be a span');
  });

  it('should have the ripple className', () => {
    const wrapper = shallow(<Ripple />);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.ripple), true, 'should have the ripple class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.fast), false,
      'should not have the fast (pulse) class');
  });

  describe('starting and stopping', () => {
    let wrapper;

    before(() => wrapper = shallow(<Ripple />));

    it('should start the ripple', () => {
      assert.strictEqual(wrapper.state('rippleVisible'), false, 'should not be visible');

      wrapper.instance().componentWillEnter();
      wrapper.update(); // needed for class assertion since we used instance method to change state

      assert.strictEqual(wrapper.state('rippleVisible'), true, 'should be visible');
      assert.strictEqual(wrapper.childAt(0).hasClass(classes.visible), true, 'should have the visible class');
    });

    it('should stop the ripple', () => {
      wrapper.instance().stop();
      wrapper.update(); // needed for class assertion since we used instance method to change state

      assert.strictEqual(wrapper.state('rippleLeaving'), true, 'should be leaving');
      assert.strictEqual(wrapper.hasClass(classes.leaving), true, 'should have the leaving class');
    });
  });

  describe('pulsating and stopping', () => {
    let wrapper;

    before(() => wrapper = shallow(<Ripple pulsate />));

    it('should render the ripple inside a pulsating span', () => {
      assert.strictEqual(wrapper.is('span'), true, 'should be a span');
      assert.strictEqual(wrapper.hasClass(classes.pulsating), true, 'should have the pulsating class');
      const ripple = wrapper.childAt(0);
      assert.strictEqual(ripple.hasClass(classes.ripple), true, 'should have the ripple class');
      assert.strictEqual(ripple.hasClass(classes.animating), true, 'should have the animating class');
      assert.strictEqual(ripple.hasClass(classes.fast), true, 'should have the fast class');
    });

    it('should start the ripple', () => {
      assert.strictEqual(wrapper.state('rippleVisible'), false, 'should not be visible');

      wrapper.instance().componentWillEnter();
      wrapper.update(); // needed for class assertion since we used instance method to change state

      assert.strictEqual(wrapper.state('rippleVisible'), true, 'should be visible');
      assert.strictEqual(wrapper.hasClass(classes.pulsating), true, 'should have the pulsating class');
      assert.strictEqual(wrapper.childAt(0).hasClass(classes.visible), true, 'should have the visible class');
    });

    it('should stop the ripple', () => {
      wrapper.instance().stop();
      wrapper.update(); // needed for class assertion since we used instance method to change state

      assert.strictEqual(wrapper.state('rippleLeaving'), true, 'should be leaving');
      assert.strictEqual(wrapper.hasClass(classes.leaving), true, 'should have the leaving class');
    });
  });
});
