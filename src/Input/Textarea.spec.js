// @flow weak

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount } from 'src/test-utils';
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
    const wrapper = shallow(<Textarea onChange={(() => {})} />);
    assert.strictEqual(wrapper.state().height, 24);

    // refs don't work with shallow renders in enzyme so here we directly define
    // 'this.input', 'this.shadow', etc. for this Textarea via wrapper.instance()
    const textarea = wrapper.find('textarea').last();
    wrapper.instance().input = textarea;
    const shadow = wrapper.find('textarea').at(2);
    wrapper.instance().shadow = shadow;
    const singlelineShandow = wrapper.find('textarea').first();
    wrapper.instance().singlelineShadow = singlelineShandow;

    // jsdom doesn't support scroll height so we have to simulate it changing
    // which makes this not so great of a test :(
    shadow.scrollHeight = 43;
    singlelineShandow.scrollHeight = 43;
    textarea.simulate('change', { target: { value: 'x' } }); // this is needed to trigger the resize
    assert.strictEqual(wrapper.state().height, 43);

    shadow.scrollHeight = 24;
    singlelineShandow.scrollHeight = 24;
    textarea.simulate('change', { target: { value: '' } });
    assert.strictEqual(wrapper.state().height, 24);
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
    const singlelineShandow = wrapper.find('textarea').first();
    wrapper.instance().singlelineShadow = singlelineShandow;

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
