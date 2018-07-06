import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import Input from '../Input';
import InputLabel from '../InputLabel';
import FormHelperText from '../FormHelperText';
import FormControl from '../FormControl';
import TextField from './TextField';
import Select from '../Select';

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
        assert.isTrue(wrapper.is(FormControl));
      });

      it('should pass className to the FormControl', () => {
        wrapper.setProps({ className: 'foo' });
        assert.strictEqual(wrapper.hasClass('foo'), true);
      });

      it('should pass margin to the FormControl', () => {
        wrapper.setProps({ margin: 'normal' });
        assert.strictEqual(wrapper.props().margin, 'normal');
      });

      it('should have an Input as the only child', () => {
        assert.strictEqual(wrapper.children().length, 1);
        assert.isTrue(wrapper.childAt(0).is(Input));
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
        assert.isTrue(wrapper.childAt(0).is(InputLabel));
      });

      it('should apply the className to the InputLabel', () => {
        wrapper.setProps({ InputLabelProps: { className: 'foo' } });
        assert.strictEqual(wrapper.childAt(0).hasClass('foo'), true);
      });

      it('should have an Input as the second child', () => {
        assert.isTrue(wrapper.childAt(1).is(Input));
      });
    });

    describe('with a helper text', () => {
      beforeEach(() => {
        wrapper.setProps({ helperText: 'Foo bar' });
      });

      it('should have 2 children', () => {
        assert.strictEqual(wrapper.children().length, 2);
      });

      it('should apply the className to the FormHelperText', () => {
        wrapper.setProps({ FormHelperTextProps: { className: 'foo' } });
        assert.strictEqual(wrapper.childAt(1).hasClass('foo'), true);
      });

      it('should have an Input as the first child', () => {
        assert.isTrue(wrapper.childAt(0).is(Input));
      });

      it('should have an FormHelperText as the second child', () => {
        assert.isTrue(wrapper.childAt(1).is(FormHelperText));
      });
    });

    describe('with an outline', () => {
      beforeEach(() => {
        wrapper = shallow(<TextField variant="outlined" />);
      });

      it('should set outline props', () => {
        assert.strictEqual(wrapper.props().variant, 'outlined');
        assert.deepEqual(wrapper.find(Input).props().OutlineProps, {
          notched: undefined,
          notchWidth: wrapper.instance().inputLabelNode
            ? wrapper.instance().inputLabelNode.offsetWidth
            : 0,
        });
      });

      it('should set shrink prop on outline from label', () => {
        wrapper = shallow(<TextField variant="outlined" InputLabelProps={{ shrink: true }} />);

        assert.isTrue(wrapper.find(Input).props().OutlineProps.notched);
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

      assert.isTrue(wrapper.childAt(0).is(Select));

      assert.strictEqual(wrapper.childAt(0).props().input.type, Input);

      assert.isTrue(
        wrapper
          .childAt(0)
          .children()
          .every('option'),
      );
    });
  });
});
