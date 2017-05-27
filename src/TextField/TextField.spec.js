// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import Input, { InputLabel } from '../Input';
import FormHelperText from '../Form/FormHelperText';
import TextField from './TextField';

describe('<TextField />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow();
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('shallow', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<TextField />);
    });

    describe('structure', () => {
      it('should be a FormControl', () => {
        assert.strictEqual(wrapper.name(), 'withStyles(FormControl)');
      });

      it('should pass className to the FormControl', () => {
        wrapper.setProps({ className: 'foo' });
        assert.strictEqual(wrapper.hasClass('foo'), true);
      });

      it('should have an Input as the only child', () => {
        assert.strictEqual(wrapper.children().length, 1);
        assert.strictEqual(wrapper.childAt(0).is(Input), true);
      });

      it('should forward the multiline prop to Input', () => {
        wrapper = shallow(<TextField multiline />);
        assert.strictEqual(wrapper.childAt(0).props().multiline, true);
      });

      it('should pass inputClassName to the input as className', () => {
        wrapper.setProps({ inputClassName: 'foo' });
        assert.strictEqual(wrapper.find(Input).props().inputProps.className, 'foo');
      });

      it('should pass InputClassName to the Input as className', () => {
        wrapper.setProps({ InputClassName: 'foo' });
        assert.strictEqual(wrapper.find(Input).hasClass('foo'), true);
      });
    });

    describe('with a label', () => {
      beforeEach(() => {
        wrapper.setProps({ label: 'Foo bar' });
      });

      it('should have 2 children', () => {
        assert.strictEqual(wrapper.children().length, 2);
      });

      it('should have an InputLabel as the first child', () => {
        assert.strictEqual(wrapper.childAt(0).is(InputLabel), true);
      });

      it('should pass labelClassName to the InputLabel as className', () => {
        wrapper.setProps({ labelClassName: 'foo' });
        assert.strictEqual(wrapper.find(InputLabel).hasClass('foo'), true);
      });

      it('should have an Input as the second child', () => {
        assert.strictEqual(wrapper.childAt(1).is(Input), true);
      });
    });

    describe('with a helper text', () => {
      beforeEach(() => {
        wrapper.setProps({ helperText: 'Foo bar' });
      });

      it('should have 2 children', () => {
        assert.strictEqual(wrapper.children().length, 2);
      });

      it('should have an FormHelperText as the second child', () => {
        assert.strictEqual(wrapper.childAt(1).is(FormHelperText), true);
      });

      it('should pass helperTextClassName to the FormHelperText as className', () => {
        wrapper.setProps({ helperTextClassName: 'foo' });
        assert.strictEqual(wrapper.find(FormHelperText).hasClass('foo'), true);
      });

      it('should have an Input as the first child', () => {
        assert.strictEqual(wrapper.childAt(0).is(Input), true);
      });
    });

    describe('prop: InputProps', () => {
      it('should apply additional properties to the Input component', () => {
        wrapper.setProps({
          InputProps: {
            inputClassName: 'fullWidth',
          },
        });
        assert.strictEqual(wrapper.find(Input).props().inputClassName, 'fullWidth');
      });
    });
  });

  describe('prop: inputProps', () => {
    it('should apply additional properties to the Input component', () => {
      const wrapper = mount(
        <TextField
          inputProps={{
            readOnly: true,
          }}
        />,
      );
      assert.strictEqual(wrapper.find('input').props().readOnly, true);
    });
  });
});
