/* eslint-env mocha */
import React from 'react';
import {assert} from 'chai';
import {spy} from 'sinon';
import TextField, {styleSheet} from './TextField';
import {createShallowWithContext} from 'test/utils';

describe('<TextField>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, {group: 'mui'});
  });

  it('should render an <div> root element and pass the child through', () => {
    const wrapper = shallow(
      <TextField><input id="test-input" /></TextField>
    );

    assert.strictEqual(wrapper.is('div'), true, 'should be a <div>');
    assert.strictEqual(wrapper.find('#test-input').length, 1, 'should pass the child through');
  });

  it('should track dirty and focused state', () => {
    const wrapper = shallow(
      <TextField><input id="test-input" /></TextField>
    );

    assert.strictEqual(wrapper.state('dirty'), false, 'should not be dirty by default');
    assert.strictEqual(wrapper.state('focused'), false, 'should not be focused by default');

    const instance = wrapper.instance();

    instance.handleDirty();

    assert.strictEqual(wrapper.state('dirty'), true, 'should be dirty');
    assert.strictEqual(wrapper.state('focused'), false, 'should not be focused');

    instance.handleFocus();

    assert.strictEqual(wrapper.state('dirty'), true, 'should be dirty');
    assert.strictEqual(wrapper.state('focused'), true, 'should be focused');

    instance.handleClean();

    assert.strictEqual(wrapper.state('dirty'), false, 'should not be dirty');
    assert.strictEqual(wrapper.state('focused'), true, 'should be focused');

    instance.handleDirty();

    assert.strictEqual(wrapper.state('dirty'), true, 'should be dirty');
    assert.strictEqual(wrapper.state('focused'), true, 'should be focused');

    instance.handleBlur();

    assert.strictEqual(wrapper.state('dirty'), true, 'should be dirty');
    assert.strictEqual(wrapper.state('focused'), false, 'should not be focused');
  });

  it('should attach handlers and pass the input class to a TextFieldInput child', () => {
    const TextFieldInput = (props) => <input {...props} />;
    TextFieldInput.muiName = 'TextFieldInput';

    const wrapper = shallow(
      <TextField>
        <TextFieldInput />
      </TextField>
    );

    const instance = wrapper.instance();

    const input = wrapper.find('TextFieldInput');

    assert.strictEqual(input.prop('className'), classes.input, 'should have the input class');
    assert.strictEqual(input.prop('onDirty'), instance.handleDirty);
    assert.strictEqual(input.prop('onClean'), instance.handleClean);
    assert.strictEqual(input.prop('onFocus'), instance.handleFocus);
    assert.strictEqual(input.prop('onBlur'), instance.handleBlur);
  });

  it('should honor user props existing on a TextFieldInput child', () => {
    const TextFieldInput = (props) => <input {...props} />;
    TextFieldInput.muiName = 'TextFieldInput';

    const className = 'woof';
    const onFocus = spy();
    const onBlur = spy();

    const wrapper = shallow(
      <TextField>
        <TextFieldInput
          className={className}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </TextField>
    );

    const input = wrapper.find('TextFieldInput');

    assert.strictEqual(
      input.prop('className'),
      `${classes.input} ${className}`,
      'should have the input class and the user class'
    );

    input.prop('onFocus')();
    assert.strictEqual(onFocus.callCount, 1, 'should have called the user handler');

    input.prop('onBlur')();
    assert.strictEqual(onBlur.callCount, 1, 'should have called the user handler');
  });
});
