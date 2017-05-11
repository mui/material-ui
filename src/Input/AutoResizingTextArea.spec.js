// @flow weak

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import AutoResizingTextArea, { styleSheet } from './Input';

describe('<AutoResizingTextArea />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it("should render 3 textareas", () => {
    let wrapper = shallow(<AutoResizingTextArea multiline />);
    wrapper = shallow(wrapper.props().children); // no idea why this is necessary
    assert.strictEqual(wrapper.find('textarea').length, 3);
  });
  it("should change its height when the height of its shadows changes", () => {
    let wrapper = shallow(<AutoResizingTextArea multiline onChange={(() => {})} />);
    wrapper = shallow(wrapper.props().children); // no idea why this is necessary
    assert.strictEqual(wrapper.state().height, 24);

    // refs don't work with shallow renders in enzyme so here we directly define "this.input", "this.shadow", etc. for this AutoResizingTextArea
    const textArea = wrapper.instance().input = wrapper.find('textarea').last();
    const shadow = wrapper.instance().shadow = wrapper.find('textarea').at(2);
    const singleLineShandow = wrapper.instance().singleLineShadow = wrapper.find('textarea').first();

    // jsdom doesn't support scroll height so we have to simulate it changing, makes this not so great of a test :(
    shadow.scrollHeight = 43;
    singleLineShandow.scrollHeight = 43;
    textArea.simulate('change', {target: { value: 'x' } }); // this is needed to trigger the resize
    assert.strictEqual(wrapper.state().height, 43);

    shadow.scrollHeight = 24;
    singleLineShandow.scrollHeight = 24;
    textArea.simulate('change', {target: { value: '' } });
    assert.strictEqual(wrapper.state().height, 24);
  });

  it("should set dirty", () => {
    let wrapper = shallow(<AutoResizingTextArea multiline />);
    wrapper = shallow(wrapper.props().children); // no idea why this is necessary
    assert.strictEqual(wrapper.find('textarea').length, 3);

    // refs don't work with shallow renders in enzyme so here we directly define "this.input", "this.shadow", etc. for this AutoResizingTextArea
    const textArea = wrapper.instance().input = wrapper.find('textarea').last();
    const shadow = wrapper.instance().shadow = wrapper.find('textarea').at(2);
    const singleLineShandow = wrapper.instance().singleLineShadow = wrapper.find('textarea').first();

    assert.strictEqual(wrapper.state().dirty, false)
    textArea.simulate('change', {target: { value: 'x' } }); // this is needed to trigger the resize
    assert.strictEqual(wrapper.state().dirty, true)
    textArea.simulate('change', {target: { value: '' } }); // this is needed to trigger the resize
    assert.strictEqual(wrapper.state().dirty, false)
  });
});
