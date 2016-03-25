/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import TextField from './TextField';
import TextFieldLabel from './TextFieldLabel';

describe('<TextField />', () => {
  it('passes event and value to the onChange callback', (done) => {
    const wrapper = shallow(
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
    const wrapper = shallow(
      <TextField
        floatingLabelText="floating label text"
        defaultValue="default value"
        value={null}
      />
    );

    assert.equal(wrapper.find(TextFieldLabel).props().shrink, true, 'should shrink TextFieldLabel');

    // set a new prop to trigger componentWillReceiveProps
    wrapper.setProps({id: '1'});
    assert.equal(wrapper.find(TextFieldLabel).props().shrink, true, 'should shrink TextFieldLabel');
  });

  it(`unshrinks TextFieldLabel when defaultValue is set, the component has had input change,
        and value is re-set to null`, () => {
    const wrapper = shallow(
      <TextField
        floatingLabelText="floating label text"
        defaultValue="default value"
        value={null}
      />
      );
    assert.equal(wrapper.find(TextFieldLabel).props().shrink, true, 'should shrink TextFieldLabel');

    // make input change
    const input = wrapper.find('input');
    input.simulate('change', {target: {value: 'foo'}});
    assert.equal(wrapper.find(TextFieldLabel).props().shrink, true, 'should shrink TextFieldLabel');

    // set value to null again, which should unshrink the TextFieldLabel, even though TextField's isClean
    // state propety is false.
    wrapper.setProps({value: null});
    assert.equal(wrapper.state().isClean, false);
    assert.equal(wrapper.find(TextFieldLabel).props().shrink, false, 'should shrink TextFieldLabel');
  });
});
