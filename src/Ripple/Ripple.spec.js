// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import Ripple, { styleSheet } from './Ripple';
import { createShallowWithContext } from 'test/utils';

describe('<Ripple>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, { group: 'mui' });
  });

  it('should render a span', () => {
    const wrapper = shallow(<Ripple />);
    assert.strictEqual(wrapper.is('span'), true, 'should be a span');
  });

  it('should have the ripple and animating classNames', () => {
    const wrapper = shallow(<Ripple />);
    assert.strictEqual(wrapper.hasClass(classes.ripple), true, 'should have the ripple class');
    assert.strictEqual(wrapper.hasClass(classes.animating), true, 'should have the animating class');
    assert.strictEqual(wrapper.hasClass(classes.fast), false, 'should not have the fast (pulse) class');
  });

  describe('starting and stopping', () => {
    let wrapper;

    before(() => wrapper = shallow(<Ripple />));

    it('should start the ripple', () => {
      assert.strictEqual(wrapper.state('rippleVisible'), false, 'should not be visible');
      assert.strictEqual(wrapper.state('rippleStart'), false, 'should not be starting');

      wrapper.instance().start(() => {
        // This happens extremely quickly due to a forced reflow in the same tick
        assert.strictEqual(wrapper.state('rippleStart'), true, 'should be starting');
      });
      wrapper.update(); // needed for class assertion since we used instance method to change state

      assert.strictEqual(wrapper.state('rippleVisible'), true, 'should be visible');
      assert.strictEqual(wrapper.hasClass(classes.visible), true, 'should have the visible class');
    });

    it('should stop starting immediately', () => {
      assert.strictEqual(wrapper.state('rippleVisible'), true, 'should be visible');
      assert.strictEqual(wrapper.hasClass(classes.visible), true, 'should have the visible class');
      assert.strictEqual(wrapper.state('rippleStart'), false, 'should not be starting');
    });

    it('should stop the ripple', () => {
      assert.strictEqual(wrapper.state('rippleVisible'), true, 'should be visible');
      assert.strictEqual(wrapper.hasClass(classes.visible), true, 'should have the visible class');
      assert.strictEqual(wrapper.state('rippleStart'), false, 'should not be starting');

      wrapper.instance().stop();
      wrapper.update(); // needed for class assertion since we used instance method to change state

      assert.strictEqual(wrapper.state('rippleVisible'), false, 'should not be visible');
      assert.strictEqual(wrapper.hasClass(classes.visible), false, 'should not have the visible class');
      assert.strictEqual(wrapper.state('rippleStart'), false, 'should not be starting');
    });
  });

  describe('pulsating and stopping', () => {
    let wrapper;

    before(() => wrapper = shallow(<Ripple pulsate />));

    it('should render the ripple inside an extra pulsating span', () => {
      assert.strictEqual(wrapper.is('span'), true, 'should be a span');
      assert.strictEqual(wrapper.hasClass(classes.pulsating), true, 'should have the pulsating class');
      const ripple = wrapper.childAt(0);
      assert.strictEqual(ripple.hasClass(classes.ripple), true, 'should have the ripple class');
      assert.strictEqual(ripple.hasClass(classes.animating), true, 'should have the animating class');
      assert.strictEqual(ripple.hasClass(classes.fast), true, 'should have the fast class');
    });

    it('should start the ripple', () => {
      assert.strictEqual(wrapper.state('rippleVisible'), false, 'should not be visible');
      assert.strictEqual(wrapper.state('rippleStart'), false, 'should not be starting');

      wrapper.instance().start(() => {
        // This happens extremely quickly due to a forced reflow in the same tick
        assert.strictEqual(wrapper.state('rippleStart'), true, 'should be starting');
      });
      wrapper.update(); // needed for class assertion since we used instance method to change state

      assert.strictEqual(wrapper.state('rippleVisible'), true, 'should be visible');
      assert.strictEqual(wrapper.hasClass(classes.pulsating), true, 'should have the pulsating class');
      assert.strictEqual(wrapper.childAt(0).hasClass(classes.visible), true, 'should have the visible class');
    });

    it('should stop starting immediately', () => {
      assert.strictEqual(wrapper.state('rippleVisible'), true, 'should be visible');
      assert.strictEqual(wrapper.hasClass(classes.pulsating), true, 'should have the pulsating class');
      assert.strictEqual(wrapper.childAt(0).hasClass(classes.visible), true, 'should have the visible class');
      assert.strictEqual(wrapper.state('rippleStart'), false, 'should not be starting');
    });

    it('should stop the ripple', () => {
      assert.strictEqual(wrapper.state('rippleVisible'), true, 'should be visible');
      assert.strictEqual(wrapper.childAt(0).hasClass(classes.visible), true, 'should have the visible class');
      assert.strictEqual(wrapper.state('rippleStart'), false, 'should not be starting');

      wrapper.instance().stop();
      wrapper.update(); // needed for class assertion since we used instance method to change state

      assert.strictEqual(wrapper.state('rippleVisible'), false, 'should not be visible');
      assert.strictEqual(wrapper.childAt(0).hasClass(classes.visible), false, 'should not have the visible class');
      assert.strictEqual(wrapper.state('rippleStart'), false, 'should not be starting');
    });
  });
});
