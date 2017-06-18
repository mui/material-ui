// @flow

import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createShallow, createMount } from '../test-utils';
import Textarea from './Textarea';

function assignRefs(wrapper) {
  // refs don't work with shallow renders in enzyme so here we directly define
  // 'this.input', 'this.shadow', etc. for this Textarea via wrapper.instance()
  const input = wrapper.find('textarea').last();
  wrapper.instance().input = input;
  const textareaShadow = wrapper.find('textarea').at(2);
  wrapper.instance().shadow = textareaShadow;
  const singlelineShadow = wrapper.find('textarea').first();
  wrapper.instance().singlelineShadow = singlelineShadow;

  return {
    singlelineShadow,
    textareaShadow,
    input,
  };
}

describe('<Textarea />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render 3 textareas', () => {
    const wrapper = shallow(<Textarea />);
    assert.strictEqual(wrapper.find('textarea').length, 3);
  });

  it('should change its height when the height of its shadows changes', () => {
    const wrapper = shallow(<Textarea />);
    assert.strictEqual(wrapper.state().height, 24);

    const refs = assignRefs(wrapper);

    // jsdom doesn't support scroll height so we have to simulate it changing
    // which makes this not so great of a test :(
    refs.textareaShadow.scrollHeight = 43;
    refs.singlelineShadow.scrollHeight = 43;
    // this is needed to trigger the resize
    refs.input.simulate('change', { target: { value: 'x' } });
    assert.strictEqual(wrapper.state().height, 43);

    refs.textareaShadow.scrollHeight = 24;
    refs.singlelineShadow.scrollHeight = 24;
    refs.input.simulate('change', { target: { value: '' } });
    assert.strictEqual(wrapper.state().height, 24);
  });

  describe('height behavior', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Textarea.Naked classes={{}} value="f" />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should update the height when the value change', () => {
      const instance = wrapper.instance();
      instance.singlelineShadow = {
        scrollHeight: 24,
      };
      instance.shadow = {
        scrollHeight: 24,
      };
      wrapper.setProps({
        value: 'fo',
      });
      assert.strictEqual(wrapper.state().height, 24);
      instance.shadow = {
        scrollHeight: 48,
      };
      wrapper.setProps({
        value: 'foooooo',
      });
      assert.strictEqual(wrapper.state().height, 48);
    });

    it('should call onHeightChange when the height change', () => {
      const instance = wrapper.instance();
      instance.singlelineShadow = {
        scrollHeight: 24,
      };
      instance.shadow = {
        scrollHeight: 24,
      };
      const handleHeightChange = spy();
      wrapper.setProps({
        onHeightChange: handleHeightChange,
        value: 'fo',
      });
      assert.strictEqual(handleHeightChange.callCount, 1);
    });

    it('should respect the rowsMax property', () => {
      const instance = wrapper.instance();
      const rowsMax = 2;
      const lineHeight = 24;
      instance.singlelineShadow = {
        scrollHeight: lineHeight,
      };
      instance.shadow = {
        scrollHeight: lineHeight * 3,
      };
      wrapper.setProps({
        rowsMax,
      });
      assert.strictEqual(wrapper.state().height, lineHeight * rowsMax);
    });
  });

  it('should set dirty', () => {
    const wrapper = shallow(<Textarea />);
    assert.strictEqual(wrapper.find('textarea').length, 3);

    const refs = assignRefs(wrapper);
    // this is needed to trigger the resize
    refs.input.simulate('change', { target: { value: 'x' } });
    assert.strictEqual(wrapper.instance().value, 'x');
    // this is needed to trigger the resize
    refs.input.simulate('change', { target: { value: '' } });
    assert.strictEqual(wrapper.instance().value, '');
  });

  describe('prop: textareaRef', () => {
    it('should be able to access the native textarea', () => {
      const handleRef = spy();
      mount(<Textarea textareaRef={handleRef} />);
      assert.strictEqual(handleRef.callCount, 1);
    });
  });

  describe('prop: onChange', () => {
    it('should be call the callback', () => {
      const handleChange = spy();
      const wrapper = shallow(<Textarea value="x" onChange={handleChange} />);
      assert.strictEqual(wrapper.find('textarea').length, 3);

      const refs = assignRefs(wrapper);
      const event = { target: { value: 'xx' } };
      refs.input.simulate('change', event);
      assert.strictEqual(wrapper.instance().value, 'xx');
      assert.strictEqual(handleChange.callCount, 1);
      assert.deepEqual(handleChange.args[0], [event]);
    });
  });

  describe('resize', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should handle the resize event', () => {
      const wrapper = shallow(<Textarea />);
      const refs = assignRefs(wrapper);
      refs.textareaShadow.scrollHeight = 43;
      refs.singlelineShadow.scrollHeight = 43;
      wrapper.find('EventListener').at(0).simulate('resize');
      assert.strictEqual(wrapper.state().height, 24);
      clock.tick(100);
      assert.strictEqual(wrapper.state().height, 43);
    });
  });
});
