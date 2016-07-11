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
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should track dirty and focused state and apply the focus class when focused', () => {
    const wrapper = shallow(
      <TextField><input id="test-input" /></TextField>
    );

    assert.strictEqual(wrapper.state('dirty'), false, 'should not be dirty by default');
    assert.strictEqual(wrapper.state('focused'), false, 'should not be focused by default');
    assert.strictEqual(wrapper.hasClass(classes.focused), false, 'should not have the focused class');

    const instance = wrapper.instance();

    instance.handleDirty();
    wrapper.update(); // enzyme only updates wrapper if using `setProps` or `setState`

    assert.strictEqual(wrapper.state('dirty'), true, 'should be dirty');
    assert.strictEqual(wrapper.state('focused'), false, 'should not be focused');
    assert.strictEqual(wrapper.hasClass(classes.focused), false, 'should not have the focused class');

    instance.handleFocus();
    wrapper.update(); // enzyme only updates wrapper if using `setProps` or `setState`

    assert.strictEqual(wrapper.state('dirty'), true, 'should be dirty');
    assert.strictEqual(wrapper.state('focused'), true, 'should be focused');
    assert.strictEqual(wrapper.hasClass(classes.focused), true, 'should have the focused class');

    instance.handleClean();
    wrapper.update(); // enzyme only updates wrapper if using `setProps` or `setState`

    assert.strictEqual(wrapper.state('dirty'), false, 'should not be dirty');
    assert.strictEqual(wrapper.state('focused'), true, 'should be focused');
    assert.strictEqual(wrapper.hasClass(classes.focused), true, 'should have the focused class');

    instance.handleDirty();
    wrapper.update(); // enzyme only updates wrapper if using `setProps` or `setState`

    assert.strictEqual(wrapper.state('dirty'), true, 'should be dirty');
    assert.strictEqual(wrapper.state('focused'), true, 'should be focused');
    assert.strictEqual(wrapper.hasClass(classes.focused), true, 'should have the focused class');

    instance.handleBlur();
    wrapper.update(); // enzyme only updates wrapper if using `setProps` or `setState`

    assert.strictEqual(wrapper.state('dirty'), true, 'should be dirty');
    assert.strictEqual(wrapper.state('focused'), false, 'should not be focused');
    assert.strictEqual(wrapper.hasClass(classes.focused), false, 'should not have the focused class');
  });

  describe('rendering the input', () => {
    let TextFieldInput;

    before(() => {
      TextFieldInput = (props) => <input {...props} />;
      TextFieldInput.muiName = 'TextFieldInput';
    });

    it('should attach handlers and pass the input class to a TextFieldInput child', () => {
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

  describe('rendering the label', () => {
    let TextFieldLabel;

    before(() => {
      TextFieldLabel = (props) => <label {...props} />;
      TextFieldLabel.muiName = 'TextFieldLabel';
    });

    it('should pass the label class and shrink prop to a TextFieldLabel child', () => {
      const wrapper = shallow(
        <TextField>
          <TextFieldLabel>Label</TextFieldLabel>
        </TextField>
      );

      const label = wrapper.find('TextFieldLabel');

      assert.strictEqual(label.prop('className'), classes.label, 'should have the label class');
      assert.strictEqual(label.prop('shrink'), false, 'should be false by default');
    });

    it('should change the shrink prop depending on focused, dirty state', () => {
      const wrapper = shallow(
        <TextField>
          <TextFieldLabel>Label</TextFieldLabel>
        </TextField>
      );

      assert.strictEqual(
        wrapper.find('TextFieldLabel').prop('shrink'),
        false,
        'should be false by default'
      );

      wrapper.setState({focused: true});

      assert.strictEqual(
        wrapper.find('TextFieldLabel').prop('shrink'),
        true,
        'should be true when the TextField is focused and not dirty'
      );

      wrapper.setState({focused: false});

      assert.strictEqual(
        wrapper.find('TextFieldLabel').prop('shrink'),
        false,
        'should be false when the TextField is not focused and not dirty'
      );

      wrapper.setState({dirty: true});

      assert.strictEqual(
        wrapper.find('TextFieldLabel').prop('shrink'),
        true,
        'should be true when the TextField is dirty but not focused'
      );

      wrapper.setState({dirty: false});

      assert.strictEqual(
        wrapper.find('TextFieldLabel').prop('shrink'),
        false,
        'should be false when the TextField is not dirty or focused'
      );
    });

    it('should not change the shrink pop based on dirty/focused state if there is an override', () => {
      const wrapper = shallow(
        <TextField>
          <TextFieldLabel shrink={true}>Label</TextFieldLabel>
        </TextField>
      );

      assert.strictEqual(
        wrapper.find('TextFieldLabel').prop('shrink'),
        true,
        'should be true by default'
      );

      wrapper.setState({focused: true});

      assert.strictEqual(
        wrapper.find('TextFieldLabel').prop('shrink'),
        true,
        'should be true when the TextField is focused and not dirty'
      );

      wrapper.setState({focused: false});

      assert.strictEqual(
        wrapper.find('TextFieldLabel').prop('shrink'),
        true,
        'should be true when the TextField is not focused and not dirty'
      );

      wrapper.setState({dirty: true});

      assert.strictEqual(
        wrapper.find('TextFieldLabel').prop('shrink'),
        true,
        'should be true when the TextField is dirty but not focused'
      );

      wrapper.setState({dirty: false});

      assert.strictEqual(
        wrapper.find('TextFieldLabel').prop('shrink'),
        true,
        'should be true when the TextField is not dirty or focused'
      );
    });
  });
});
