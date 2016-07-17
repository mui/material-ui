/* eslint-env mocha */
import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import TextFieldInput, { styleSheet } from './TextFieldInput';
import { createShallowWithContext } from 'test/utils';

describe('<TextFieldInput>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, { group: 'mui' });
  });

  it('should render an <input>', () => {
    const wrapper = shallow(<TextFieldInput />);
    assert.strictEqual(wrapper.is('input'), true, 'should be a <input>');
    assert.strictEqual(wrapper.prop('type'), 'text', 'should pass the text type prop');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render a disabled <input>', () => {
    const wrapper = shallow(<TextFieldInput disabled />);
    assert.strictEqual(wrapper.is('input'), true, 'should be a <input>');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.disabled), true, 'should have the disabled class');
  });

  it('should fire event callbacks', () => {
    const events = ['onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown'];
    const handlers = events.reduce((result, n) => {
      result[n] = spy();
      return result;
    }, {});

    const wrapper = shallow(<TextFieldInput {...handlers} />);

    events.forEach((n) => {
      const event = n.charAt(2).toLowerCase() + n.slice(3);
      wrapper.simulate(event);
      assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
    });
  });

  describe('controlled', () => {
    let wrapper;
    let handleDirty;
    let handleClean;

    before(() => {
      handleClean = spy();
      handleDirty = spy();
      wrapper = shallow(
        <TextFieldInput value="" onDirty={handleDirty} onClean={handleClean} />
      );
    });

    it('should check that the component is controlled', () => {
      const instance = wrapper.instance();
      assert.strictEqual(instance.isControlled(), true, 'isControlled() should return true');
    });

    it('should have called the handleClean callback', () => {
      assert.strictEqual(handleClean.callCount, 1, 'should have called the onClean cb');
    });

    it('should fire the onDirty callback when dirtied', () => {
      assert.strictEqual(handleDirty.callCount, 0, 'should not have called the onDirty cb yet');
      wrapper.setProps({ value: 'hello' });
      assert.strictEqual(handleDirty.callCount, 1, 'should have called the onDirty cb');
    });

    it('should fire the onClean callback when dirtied', () => {
      assert.strictEqual(handleClean.callCount, 1, 'should have called the onClean cb once already');
      wrapper.setProps({ value: '' });
      assert.strictEqual(handleClean.callCount, 2, 'should have called the onClean cb again');
    });
  });

  /**
   * Note the initial callback when
   * uncontrolled only fires for a full mount
   */
  describe('uncontrolled', () => {
    let wrapper;
    let handleDirty;
    let handleClean;

    before(() => {
      handleClean = spy();
      handleDirty = spy();
      wrapper = shallow(
        <TextFieldInput onDirty={handleDirty} onClean={handleClean} />
      );

      // Mock the input ref
      wrapper.instance().input = { value: '' };
    });

    it('should check that the component is uncontrolled', () => {
      const instance = wrapper.instance();
      assert.strictEqual(instance.isControlled(), false, 'isControlled() should return false');
    });

    it('should fire the onDirty callback when dirtied', () => {
      assert.strictEqual(handleDirty.callCount, 0, 'should not have called the onDirty cb yet');
      wrapper.instance().input.value = 'hello';
      wrapper.simulate('change');
      assert.strictEqual(handleDirty.callCount, 1, 'should have called the onDirty cb');
    });

    it('should fire the onClean callback when dirtied', () => {
      // Because of shallow() this hasn't fired since there is no mounting
      assert.strictEqual(handleClean.callCount, 0, 'should not have called the onClean cb yet');
      wrapper.instance().input.value = '';
      wrapper.simulate('change');
      assert.strictEqual(handleClean.callCount, 1, 'should have called the onClean cb');
    });
  });
});
