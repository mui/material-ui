/* eslint-env mocha */
import React from 'react';
import {assert} from 'chai';
import TouchRipple, {styleSheet} from './TouchRipple';
import {createShallowWithContext} from 'test/utils';

describe('<TouchRipple>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a <ReactTransitionGroup> component', () => {
    const wrapper = shallow(<TouchRipple />);
    assert.strictEqual(wrapper.is('ReactTransitionGroup'), true, 'should be a transition group');
    assert.strictEqual(wrapper.prop('component'), 'span', 'should be pass a span as the component');
  });

  it('should have the root class', () => {
    const wrapper = shallow(<TouchRipple />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render the custom className', () => {
    const wrapper = shallow(
      <TouchRipple className="test-class-name" />
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should contain the test className');
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
      instance.start({clientX: 0, clientY: 0});
      assert.strictEqual(wrapper.state('ripples').length, 1);
    });

    it('should create another ripple', () => {
      instance.start({clientX: 0, clientY: 0});
      assert.strictEqual(wrapper.state('ripples').length, 2);
    });

    it('should create another ripple', () => {
      instance.start({clientX: 0, clientY: 0});
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
});
