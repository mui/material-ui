/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import TextField from './TextField';
import TextFieldLabel from './TextFieldLabel';
import getMuiTheme from '../styles/getMuiTheme';
import getUniqueIdGenerator from '../utils/getUniqueIdGenerator';

describe('<TextField />', () => {
  const muiTheme = getMuiTheme();
  // getUniqueIdGenerator should be called inside the function to prevent different nodes sharing same uniqueIdGen
  const shallowWithContext = (node) =>
    shallow(node, {context: {muiTheme, uniqueIdGen: getUniqueIdGenerator()}});

  it('passes event and value to the onChange callback', (done) => {
    const wrapper = shallowWithContext(
      <TextField
        onChange={(event, value) => {
          assert.strictEqual(event.target.value, 'woof');
          assert.strictEqual(value, 'woof', 'should pass the value as the 2nd arg');
          done();
        }}
      />
    );

    wrapper.find('input').simulate('change', {target: {value: 'woof'}});
  });

  it('shrinks TextFieldLabel when defaultValue is set and value is null', () => {
    const wrapper = shallowWithContext(
      <TextField
        floatingLabelText="floating label text"
        defaultValue="default value"
        value={null}
      />
    );

    assert.strictEqual(wrapper.find(TextFieldLabel).props().shrink, true, 'should shrink TextFieldLabel');

    // set a new prop to trigger componentWillReceiveProps
    wrapper.setProps({id: '1'});
    assert.strictEqual(wrapper.find(TextFieldLabel).props().shrink, true, 'should shrink TextFieldLabel');
  });

  it(`unshrinks TextFieldLabel when defaultValue is set, the component has had input change,
        and value is re-set to null`, () => {
    const wrapper = shallowWithContext(
      <TextField
        floatingLabelText="floating label text"
        defaultValue="default value"
        value={null}
      />
      );
    assert.strictEqual(wrapper.find(TextFieldLabel).props().shrink, true, 'should shrink TextFieldLabel');

    // make input change
    const input = wrapper.find('input');
    input.simulate('change', {target: {value: 'foo'}});
    assert.strictEqual(wrapper.find(TextFieldLabel).props().shrink, true, 'should shrink TextFieldLabel');

    // set value to null again, which should unshrink the TextFieldLabel, even though TextField's isClean
    // state property is false.
    wrapper.setProps({value: null});
    assert.strictEqual(wrapper.state().isClean, false);
    assert.strictEqual(wrapper.find(TextFieldLabel).props().shrink, false, 'should not shrink TextFieldLabel');
  });

  describe('multiple instances in a same context', () => {
    let wrapper1;
    let wrapper2;

    beforeEach(() => {
      const context = {muiTheme, uniqueIdGen: getUniqueIdGenerator()};
      wrapper1 = shallow(<TextField />, {context});
      wrapper2 = shallow(<TextField />, {context});
    });

    it('should render inputs with different ids', () => {
      const input1 = wrapper1.find('input');
      const input2 = wrapper2.find('input');

      assert.notStrictEqual(input1.prop('id').toString(), input2.prop('id').toString());
    });
  });


  describe('multiple instances with the same order in different contexts', () => {
    let wrapper1;
    let wrapper2;

    beforeEach(() => {
      wrapper1 = shallowWithContext(<TextField />);
      wrapper2 = shallowWithContext(<TextField />);
    });

    it('should render inputs with same ids', () => {
      const input1 = wrapper1.find('input');
      const input2 = wrapper2.find('input');

      assert.strictEqual(input1.prop('id').toString(), input2.prop('id').toString());
    });
  });
});
