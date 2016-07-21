/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import TextField from './TextFieldFlat';
import getMuiTheme from '../styles/getMuiTheme';

describe('<TextFieldFlat />', () => {
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

  describe('props: children', () => {
    it('should forward any property to the root', () => {
      const wrapper = shallowWithContext(
        <TextField data-test="hello">
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
          <TextField id="isValid" value={value} />
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
          <TextField id="isValid" value={value} />
        );

        assert.strictEqual(wrapper.state().hasValue, true,
          `Should consider '${value}' as not empty`);
      });
    });
  });
});
