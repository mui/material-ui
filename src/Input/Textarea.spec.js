// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount } from '../test-utils';
import Textarea from './Textarea';

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

    // refs don't work with shallow renders in enzyme so here we directly define
    // 'this.input', 'this.shadow', etc. for this Textarea via wrapper.instance()
    const textarea = wrapper.find('textarea').last();
    wrapper.instance().input = textarea;
    const shadow = wrapper.find('textarea').at(2);
    wrapper.instance().shadow = shadow;
    const singlelineShadow = wrapper.find('textarea').first();
    wrapper.instance().singlelineShadow = singlelineShadow;

    // jsdom doesn't support scroll height so we have to simulate it changing
    // which makes this not so great of a test :(
    shadow.scrollHeight = 43;
    singlelineShadow.scrollHeight = 43;
    textarea.simulate('change', { target: { value: 'x' } }); // this is needed to trigger the resize
    assert.strictEqual(wrapper.state().height, 43);

    shadow.scrollHeight = 24;
    singlelineShadow.scrollHeight = 24;
    textarea.simulate('change', { target: { value: '' } });
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

    // refs don't work with shallow renders in enzyme so here we directly define
    // 'this.input', 'this.shadow', etc. for this Textarea via wrapper.instance()
    const textarea = wrapper.find('textarea').last();
    wrapper.instance().input = textarea;
    const shadow = wrapper.find('textarea').at(2);
    wrapper.instance().shadow = shadow;
    const singlelineShadow = wrapper.find('textarea').first();
    wrapper.instance().singlelineShadow = singlelineShadow;

    textarea.simulate('change', { target: { value: 'x' } }); // this is needed to trigger the resize
    assert.strictEqual(wrapper.instance().value, 'x');
    textarea.simulate('change', { target: { value: '' } }); // this is needed to trigger the resize
    assert.strictEqual(wrapper.instance().value, '');
  });

  describe('prop: textareaRef', () => {
    it('should be able to access the native textarea', () => {
      const handleRef = spy();
      mount(<Textarea textareaRef={handleRef} />);
      assert.strictEqual(handleRef.callCount, 1);
    });
  });
});
