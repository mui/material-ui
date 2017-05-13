// @flow weak

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import AutoResizingTextarea from './AutoResizingTextarea';

describe('<AutoResizingTextarea />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  it('should render 3 textareas', () => {
    const wrapper = shallow(<AutoResizingTextarea multiline />);
    assert.strictEqual(wrapper.find('textarea').length, 3);
  });
  it('should change its height when the height of its shadows changes', () => {
    const wrapper = shallow(<AutoResizingTextarea multiline onChange={(() => {})} />);
    assert.strictEqual(wrapper.state().height, 24);

    // refs don't work with shallow renders in enzyme so here we directly define
    // 'this.input', 'this.shadow', etc. for this AutoResizingTextarea via wrapper.instance()
    const textArea = wrapper.find('textarea').last();
    wrapper.instance().input = textArea;
    const shadow = wrapper.find('textarea').at(2);
    wrapper.instance().shadow = shadow;
    const singleLineShandow = wrapper.find('textarea').first();
    wrapper.instance().singleLineShadow = singleLineShandow;

    // jsdom doesn't support scroll height so we have to simulate it changing
    // which makes this not so great of a test :(
    shadow.scrollHeight = 43;
    singleLineShandow.scrollHeight = 43;
    textArea.simulate('change', { target: { value: 'x' } }); // this is needed to trigger the resize
    assert.strictEqual(wrapper.state().height, 43);

    shadow.scrollHeight = 24;
    singleLineShandow.scrollHeight = 24;
    textArea.simulate('change', { target: { value: '' } });
    assert.strictEqual(wrapper.state().height, 24);
  });

  it('should set dirty', () => {
    const wrapper = shallow(<AutoResizingTextarea multiline />);
    assert.strictEqual(wrapper.find('textarea').length, 3);

    // refs don't work with shallow renders in enzyme so here we directly define
    // 'this.input', 'this.shadow', etc. for this AutoResizingTextarea via wrapper.instance()
    const textArea = wrapper.find('textarea').last();
    wrapper.instance().input = textArea;
    const shadow = wrapper.find('textarea').at(2);
    wrapper.instance().shadow = shadow;
    const singleLineShandow = wrapper.find('textarea').first();
    wrapper.instance().singleLineShadow = singleLineShandow;

    textArea.simulate('change', { target: { value: 'x' } }); // this is needed to trigger the resize
    assert.strictEqual(wrapper.instance().value, 'x');
    textArea.simulate('change', { target: { value: '' } }); // this is needed to trigger the resize
    assert.strictEqual(wrapper.instance().value, '');
  });
});
