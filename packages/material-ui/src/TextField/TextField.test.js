import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount, unwrap } from '@material-ui/core/test-utils';
import Input from '../Input';
import InputLabel from '../InputLabel';
import FormHelperText from '../FormHelperText';
import FormControl from '../FormControl';
import TextField from './TextField';
import Select from '../Select';

const TextFieldNaked = unwrap(TextField);

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
      wrapper = shallow(<TextFieldNaked classes={{}} />);
    });

    describe('structure', () => {
      it('should be a FormControl', () => {
        assert.strictEqual(wrapper.type(), FormControl);
        wrapper.setProps({ className: 'foo' });
        assert.strictEqual(wrapper.hasClass('foo'), true);
      });

      it('should pass margin to the FormControl', () => {
        wrapper.setProps({ margin: 'normal' });
        assert.strictEqual(wrapper.props().margin, 'normal');
      });

      it('should have an Input as the only child', () => {
        assert.strictEqual(wrapper.children().length, 1);
        assert.strictEqual(wrapper.childAt(0).type(), Input);
      });

      it('should forward the multiline prop to Input', () => {
        wrapper = shallow(<TextFieldNaked multiline classes={{}} />);
        assert.strictEqual(wrapper.childAt(0).props().multiline, true);
      });

      it('should forward the fullWidth prop to Input', () => {
        wrapper = shallow(<TextFieldNaked fullWidth classes={{}} />);
        assert.strictEqual(wrapper.childAt(0).props().fullWidth, true);
      });
    });

    describe('with a label', () => {
      beforeEach(() => {
        wrapper.setProps({ label: 'Foo bar' });
      });

      it('should have 2 children', () => {
        assert.strictEqual(wrapper.children().length, 2);
        assert.strictEqual(wrapper.childAt(0).type(), InputLabel);
      });

      it('should apply the className to the InputLabel', () => {
        wrapper.setProps({ InputLabelProps: { className: 'foo' } });
        assert.strictEqual(wrapper.childAt(0).hasClass('foo'), true);
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

      it('should apply the className to the FormHelperText', () => {
        wrapper.setProps({ FormHelperTextProps: { className: 'foo' } });
        assert.strictEqual(wrapper.childAt(1).hasClass('foo'), true);
      });

      it('should have an Input as the first child', () => {
        assert.strictEqual(wrapper.childAt(0).type(), Input);
        assert.strictEqual(wrapper.childAt(1).type(), FormHelperText);
      });

      it('should add accessibility labels to the input', () => {
        wrapper.setProps({ id: 'aria-test' });
        assert.strictEqual(wrapper.childAt(0).props()['aria-describedby'], 'aria-test-helper-text');
      });
    });

    describe('with an outline', () => {
      it('should set outline props', () => {
        wrapper = shallow(<TextFieldNaked variant="outlined" classes={{}} />);
        assert.strictEqual(wrapper.props().variant, 'outlined');
        assert.strictEqual(
          wrapper.find('WithStyles(OutlinedInput)').props().labelWidth,
          wrapper.instance().inputLabelNode ? wrapper.instance().inputLabelNode.offsetWidth : 0,
        );
      });

      it('should set shrink prop on outline from label', () => {
        wrapper = shallow(
          <TextFieldNaked variant="outlined" InputLabelProps={{ shrink: true }} classes={{}} />,
        );
        assert.strictEqual(wrapper.find('WithStyles(OutlinedInput)').props().notched, true);
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
        <TextFieldNaked select SelectProps={{ native: true }} classes={{}}>
          {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextFieldNaked>,
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
