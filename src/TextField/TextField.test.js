import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import Input, { InputLabel } from '../Input';
import FormHelperText from '../Form/FormHelperText';
import FormControl from '../Form/FormControl';
import TextField from './TextField';
import Select from '../Select/Select';

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
        assert.strictEqual(wrapper.type(), FormControl);
      });

      it('should pass className to the FormControl', () => {
        wrapper.setProps({ className: 'foo' });
        assert.strictEqual(wrapper.dive().hasClass('foo'), true);
      });

      it('should pass margin to the FormControl', () => {
        wrapper.setProps({ margin: 'normal' });
        assert.strictEqual(wrapper.dive().props().margin, 'normal');
      });

      it('should have an Input as the only child', () => {
        assert.strictEqual(wrapper.children().length, 1);
        assert.strictEqual(wrapper.childAt(0).type(), Input);
      });

      it('should forward the multiline prop to Input', () => {
        wrapper = shallow(<TextField multiline />);
        assert.strictEqual(wrapper.childAt(0).props().multiline, true);
      });

      it('should forward the fullWidth prop to Input', () => {
        wrapper = shallow(<TextField fullWidth />);
        assert.strictEqual(wrapper.childAt(0).props().fullWidth, true);
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
        assert.strictEqual(wrapper.childAt(0).type(), InputLabel);
      });

      it('should apply the className to the InputLabel', () => {
        wrapper.setProps({ InputLabelProps: { className: 'foo' } });
        assert.strictEqual(wrapper.find(InputLabel).hasClass('foo'), true);
      });

      it('should have an Input as the second child', () => {
        assert.strictEqual(wrapper.childAt(1).type(), Input);
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
        assert.strictEqual(wrapper.childAt(1).type(), FormHelperText);
      });

      it('should apply the className to the FormHelperText', () => {
        wrapper.setProps({ FormHelperTextProps: { className: 'foo' } });
        assert.strictEqual(wrapper.find(FormHelperText).hasClass('foo'), true);
      });

      it('should have an Input as the first child', () => {
        assert.strictEqual(wrapper.childAt(0).type(), Input);
      });
    });

    describe('prop: InputProps', () => {
      it('should apply additional properties to the Input component', () => {
        wrapper.setProps({ InputProps: { inputClassName: 'fullWidth' } });
        assert.strictEqual(wrapper.find(Input).props().inputClassName, 'fullWidth');
      });
    });
  });

  describe('prop: InputProps', () => {
    it('should apply additional properties to the Input component', () => {
      const wrapper = mount(<TextField InputProps={{ readOnly: true }} />);
      assert.strictEqual(wrapper.find('input').props().readOnly, true);
    });
  });

  describe('prop: select', () => {
    it('should be able to render a select as expected', () => {
      const currencies = [{ value: 'USD', label: '$' }, { value: 'BTC', label: '฿' }];

      const wrapper = shallow(
        <TextField select SelectProps={{ native: true }}>
          {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>,
      );
      assert.strictEqual(wrapper.childAt(0).type(), Select);
      assert.strictEqual(wrapper.childAt(0).props().input.type, Input);
      assert.strictEqual(
        wrapper
          .childAt(0)
          .children()
          .every('option'),
        true,
      );
    });
  });
});
