// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from 'src/test-utils';
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
        assert.strictEqual(wrapper.name(), 'FormControl');
      });

      it('should pass className to the FormControl', () => {
        wrapper.setProps({ className: 'foo' });
        assert.strictEqual(wrapper.hasClass('foo'), true);
      });

      it('should have an Input as the only child', () => {
        assert.strictEqual(wrapper.children().length, 1);
        assert.strictEqual(wrapper.childAt(0).is('Input'), true);
      });

      it('should forward the multiline prop to Input', () => {
        wrapper = shallow(<TextField multiline />);
        assert.strictEqual(wrapper.childAt(0).props().multiline, true);
      });

      it('should pass inputClassName to the Input as className', () => {
        wrapper.setProps({ inputClassName: 'foo' });
        assert.strictEqual(wrapper.find('Input').hasClass('foo'), true);
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
        assert.strictEqual(wrapper.childAt(0).is('InputLabel'), true);
      });

      it('should pass labelClassName to the InputLabel as className', () => {
        wrapper.setProps({ labelClassName: 'foo' });
        assert.strictEqual(wrapper.find('InputLabel').hasClass('foo'), true);
      });

      it('should have an Input as the second child', () => {
        assert.strictEqual(wrapper.childAt(1).is('Input'), true);
      });
    });

    describe('prop: InputProps', () => {
      it('should apply additional properties to the Input component', () => {
        wrapper.setProps({
          InputProps: {
            inputClassName: 'fullWidth',
          },
        });
        assert.strictEqual(wrapper.find('Input').props().inputClassName, 'fullWidth');
      });
    });
  });

  describe('prop: inputProps', () => {
    it('should apply additional properties to the Input component', () => {
      const wrapper = mount((
        <TextField
          inputProps={{
            readOnly: true,
          }}
        />
      ));
      assert.strictEqual(wrapper.find('input').props().readOnly, true);
    });
  });
});
