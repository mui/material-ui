/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import TextField from './TextField';
import TextFieldLabel from './TextFieldLabel';
import getMuiTheme from '../styles/getMuiTheme';

describe('<TextField />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('passes event and value to the onChange callback', (done) => {
    const wrapper = shallowWithContext(
      <TextField
        onChange={(event, value) => {
          assert.strictEqual(event.target.value, 'woof');
          assert.strictEqual(value, 'woof', 'should pass the value as the 2nd arg');
          done();
        }}
        id="unique"
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

  describe('prop: children', () => {
    it('should forward any property to the root', () => {
      const wrapper = shallowWithContext(
        <TextField data-test="hello" id="unique">
          <div />
        </TextField>
      );

      assert.strictEqual(
        wrapper.is('[data-test="hello"]'), true,
        'The root element should receive any additional properties'
      );
    });
  });

  describe('isValid', () => {
    it('should consider the input as empty', () => {
      const values = [
        undefined,
        null,
        '',
      ];

      values.forEach((value) => {
        const wrapper = shallowWithContext(
          <TextField value={value} id="unique" />
        );

        assert.strictEqual(wrapper.state().hasValue, false,
          `Should consider '${value}' as empty`);
      });
    });

    it('should consider the input as not empty', () => {
      const values = [
        ' ',
        0,
        false,
      ];

      values.forEach((value) => {
        const wrapper = shallowWithContext(
          <TextField value={value} id="unique" />
        );

        assert.strictEqual(wrapper.state().hasValue, true,
          `Should consider '${value}' as not empty`);
      });
    });
  });
});
