import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createShallow, createMount, unwrap } from '@material-ui/core/test-utils';
import Textarea from './Textarea';

function assignRefs(wrapper) {
  // refs don't work with shallow renders in enzyme so here we directly define
  // 'this.input', 'this.shadow', etc. for this Textarea via wrapper.instance()
  const inputRef = wrapper.find('textarea').last();
  wrapper.instance().inputRef = inputRef;
  const textareaShadowRef = wrapper.find('textarea').at(2);
  wrapper.instance().shadowRef = textareaShadowRef;
  const singlelineShadowRef = wrapper.find('textarea').first();
  wrapper.instance().singlelineShadowRef = singlelineShadowRef;

  return {
    inputRef,
    singlelineShadowRef,
    textareaShadowRef,
  };
}

const TextareaNaked = unwrap(Textarea);

describe('<Textarea />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow();
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render 3 textareas', () => {
    const wrapper = shallow(<TextareaNaked classes={{}} />);
    assert.strictEqual(wrapper.find('textarea').length, 3);
  });

  it('should change its height when the height of its shadows changes', () => {
    const wrapper = shallow(<TextareaNaked classes={{}} />);
    assert.strictEqual(wrapper.state().height, 19);

    const refs = assignRefs(wrapper);

    // jsdom doesn't support scroll height so we have to simulate it changing
    // which makes this not so great of a test :(
    refs.textareaShadowRef.scrollHeight = 43;
    refs.singlelineShadowRef.scrollHeight = 43;
    // this is needed to trigger the resize
    refs.inputRef.simulate('change', { target: { value: 'x' } });
    assert.strictEqual(wrapper.state().height, 43);

    refs.textareaShadowRef.scrollHeight = 19;
    refs.singlelineShadowRef.scrollHeight = 19;
    refs.inputRef.simulate('change', { target: { value: '' } });
    assert.strictEqual(wrapper.state().height, 19);
  });

  describe('height behavior', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<TextareaNaked classes={{}} value="f" />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should update the height when the value change', () => {
      const instance = wrapper.instance();
      instance.singlelineShadowRef = { scrollHeight: 19 };
      instance.shadowRef = { scrollHeight: 19 };
      wrapper.setProps({ value: 'fo' });
      assert.strictEqual(wrapper.state().height, 19);
      instance.shadowRef = { scrollHeight: 48 };
      wrapper.setProps({ value: 'foooooo' });
      assert.strictEqual(wrapper.state().height, 48);
    });

    it('should respect the rowsMax property', () => {
      const instance = wrapper.instance();
      const rowsMax = 4;
      const lineHeight = 19;
      instance.singlelineShadowRef = { scrollHeight: lineHeight };
      instance.shadowRef = { scrollHeight: lineHeight * 5 };
      wrapper.setProps({ rowsMax });
      assert.strictEqual(wrapper.state().height, lineHeight * rowsMax);
    });
  });

  it('should set filled', () => {
    const wrapper = shallow(<TextareaNaked classes={{}} />);
    assert.strictEqual(wrapper.find('textarea').length, 3);

    const refs = assignRefs(wrapper);
    // this is needed to trigger the resize
    refs.inputRef.simulate('change', { target: { value: 'x' } });
    assert.strictEqual(wrapper.instance().value, 'x');
    // this is needed to trigger the resize
    refs.inputRef.simulate('change', { target: { value: '' } });
    assert.strictEqual(wrapper.instance().value, '');
  });

  describe('prop: textareaRef', () => {
    it('should be able to access the native textarea', () => {
      const handleRef = spy();
      mount(<Textarea textareaRef={handleRef} />);
      assert.strictEqual(handleRef.callCount, 1);
    });

    it('should be able to return the input node via a ref object', () => {
      const ref = React.createRef();
      mount(<Textarea textareaRef={ref} />);
      assert.strictEqual(ref.current.tagName, 'TEXTAREA');
    });
  });

  describe('prop: onChange', () => {
    it('should be call the callback', () => {
      const handleChange = spy();
      const wrapper = shallow(<TextareaNaked classes={{}} value="x" onChange={handleChange} />);
      assert.strictEqual(wrapper.find('textarea').length, 3);

      const refs = assignRefs(wrapper);
      const event = { target: { value: 'xx' } };
      refs.inputRef.simulate('change', event);
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
      const wrapper = shallow(<TextareaNaked classes={{}} />);
      const refs = assignRefs(wrapper);
      refs.textareaShadowRef.scrollHeight = 43;
      refs.singlelineShadowRef.scrollHeight = 43;
      wrapper
        .find('EventListener')
        .at(0)
        .simulate('resize');
      assert.strictEqual(wrapper.state().height, 19);
      clock.tick(166);
      assert.strictEqual(wrapper.state().height, 43);
    });
  });
});
