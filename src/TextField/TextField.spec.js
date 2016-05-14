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

  // Server side rendering
  describe('deterministic id', () => {
    it('should use the id', () => {
      const wrapper = shallowWithContext(<TextField id="foo" />);

      assert.strictEqual(wrapper.find('input').props().id, 'foo',
        'It should use the id property'
      );
    });

    it('should use the name', () => {
      const wrapper = shallowWithContext(<TextField name="foo" />);

      assert.strictEqual(wrapper.find('input').props().id, 'foo-undefined-undefined',
        'It should use the id property'
      );
    });

    it('should use the hintText', () => {
      const wrapper = shallowWithContext(<TextField hintText="foo" />);

      assert.strictEqual(wrapper.find('input').props().id, 'undefined-foo-undefined',
        'It should use the id property'
      );
    });

    it('should use the floatingLabelText', () => {
      const wrapper = shallowWithContext(<TextField floatingLabelText="foo" />);

      assert.strictEqual(wrapper.find('input').props().id, 'undefined-undefined-foo',
        'It should use the id property'
      );
    });

    it('should use a random hash', () => {
      const wrapper1 = shallowWithContext(<TextField />);
      const wrapper2 = shallowWithContext(<TextField />);

      assert.notStrictEqual(wrapper1.find('input').props().id, wrapper2.find('input').props().id,
        'It should use a random hash'
      );
    });
  });
});
