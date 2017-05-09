// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import TouchRipple, { styleSheet } from './TouchRipple';

describe('<TouchRipple />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a <ReactTransitionGroup> component', () => {
    const wrapper = shallow(<TouchRipple />);
    assert.strictEqual(wrapper.name(), 'TransitionGroup');
    assert.strictEqual(wrapper.props().component, 'span', 'should be pass a span as the component');
  });

  it('should have the root class', () => {
    const wrapper = shallow(<TouchRipple />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render the custom className', () => {
    const wrapper = shallow(
      <TouchRipple className="test-class-name" />,
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should contain the test className');
  });

  describe('prop: center', () => {
    it('should should compute the right ripple dimensions', () => {
      const wrapper = shallow(<TouchRipple center />);
      const instance = wrapper.instance();
      instance.start();
      assert.strictEqual(wrapper.childAt(0).props().rippleSize, 1, 'should be odd');
    });
  });

  describe('creating individual ripples', () => {
    let wrapper;
    let instance;

    before(() => {
      wrapper = shallow(<TouchRipple />);
      instance = wrapper.instance();
    });

    it('should start with no ripples', () => {
      assert.strictEqual(wrapper.state('ripples').length, 0);
    });

    it('should create a ripple', () => {
      instance.start({ clientX: 0, clientY: 0 });
      assert.strictEqual(wrapper.state('ripples').length, 1);
    });

    it('should create another ripple', () => {
      instance.start({ clientX: 0, clientY: 0 });
      assert.strictEqual(wrapper.state('ripples').length, 2);
    });

    it('should create another ripple', () => {
      instance.start({ clientX: 0, clientY: 0 });
      assert.strictEqual(wrapper.state('ripples').length, 3);
    });

    it('should remove a ripple', () => {
      instance.stop();
      assert.strictEqual(wrapper.state('ripples').length, 2);
    });

    it('should remove a ripple', () => {
      instance.stop();
      assert.strictEqual(wrapper.state('ripples').length, 1);
    });

    it('should remove another ripple', () => {
      instance.stop();
      assert.strictEqual(wrapper.state('ripples').length, 0);
    });
  });

  describe('creating unique ripples', () => {
    it('should create a ripple', () => {
      const wrapper = shallow(<TouchRipple />);
      const instance = wrapper.instance();
      instance.pulsate();
      assert.strictEqual(wrapper.state('ripples').length, 1);
    });

    it('should ignore a mousedown event', () => {
      const wrapper = shallow(<TouchRipple />);
      const instance = wrapper.instance();
      instance.ignoringMouseDown = true;
      instance.start({ type: 'mousedown' });
      assert.strictEqual(wrapper.state('ripples').length, 0);
    });

    it('should set ignoringMouseDown to true', () => {
      const wrapper = shallow(<TouchRipple />);
      const instance = wrapper.instance();
      assert.strictEqual(instance.ignoringMouseDown, false);
      instance.start({ type: 'touchstart' });
      assert.strictEqual(wrapper.state('ripples').length, 1);
      assert.strictEqual(instance.ignoringMouseDown, true);
    });

    it('should create a specific ripple', () => {
      const wrapper = shallow(<TouchRipple />);
      const instance = wrapper.instance();
      const clientX = 1;
      const clientY = 1;
      instance.start({ clientX, clientY });
      assert.strictEqual(wrapper.state('ripples').length, 1);
      assert.strictEqual(wrapper.state('ripples')[0].props.rippleX, clientX);
      assert.strictEqual(wrapper.state('ripples')[0].props.rippleY, clientY);
    });
  });
});
