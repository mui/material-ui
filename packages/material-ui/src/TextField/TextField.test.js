import React from 'react';
import { assert } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import Input from '../Input';
import FormControl from '../FormControl';
import OutlinedInput from '../OutlinedInput';
import TextField from './TextField';

describe('<TextField />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('mount', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<TextField />);
    });

    describe('structure', () => {
      it('should be a FormControl', () => {
        wrapper.setProps({ className: 'foo' });
        const formControl = wrapper.find(FormControl);
        assert.strictEqual(formControl.exists(), true);
        assert.strictEqual(formControl.hasClass('foo'), true);
      });

      it('should pass margin to the FormControl', () => {
        wrapper.setProps({ margin: 'normal' });
        assert.strictEqual(wrapper.find(FormControl).props().margin, 'normal');
      });

      it('should have an input as the only child', () => {
        assert.strictEqual(wrapper.find(Input).length, 1);
      });

      it('should forward the multiline prop to Input', () => {
        wrapper = mount(<TextField multiline />);
        assert.strictEqual(wrapper.find(Input).props().multiline, true);
      });

      it('should forward the fullWidth prop to Input', () => {
        wrapper = mount(<TextField fullWidth />);
        assert.strictEqual(wrapper.find(Input).props().fullWidth, true);
      });
    });

    describe('with a label', () => {
      beforeEach(() => {
        wrapper.setProps({ id: 'label-test', label: 'Foo bar' });
      });

      it('label the input', () => {
        const input = wrapper.find('input#label-test');
        const label = wrapper.find('label[htmlFor="label-test"]');

        assert.strictEqual(input.exists(), true);
        assert.strictEqual(label.exists(), true);
        assert.strictEqual(label.text(), 'Foo bar');
      });

      it('should apply the className to the label', () => {
        wrapper.setProps({ InputLabelProps: { className: 'foo' } });
        assert.strictEqual(wrapper.find('label').hasClass('foo'), true);
      });
    });

    describe('with a helper text', () => {
      let helperTextId;
      /**
       * @return {ReactWrapper} holding the DOM node with the helper text
       */
      function findHelperTextWrapper() {
        return wrapper.find(`#${helperTextId}`).hostNodes();
      }

      beforeEach(() => {
        wrapper.setProps({ id: 'aria-test', helperText: 'Foo bar' });
        helperTextId = wrapper.find('input').props()['aria-describedby'];
      });

      it('should apply the className to the FormHelperText', () => {
        wrapper.setProps({ FormHelperTextProps: { className: 'foo' } });
        assert.strictEqual(findHelperTextWrapper().hasClass('foo'), true);
      });

      it('should add accessibility labels to the input', () => {
        assert.strictEqual(helperTextId.length > 0, true);
        assert.strictEqual(findHelperTextWrapper().text(), 'Foo bar');
      });
    });

    describe('with an outline', () => {
      it('should set outline props', () => {
        wrapper = mount(<TextField variant="outlined" classes={{}} />);
        assert.strictEqual(wrapper.props().variant, 'outlined');
        assert.strictEqual(
          wrapper.find(OutlinedInput).props().labelWidth,
          wrapper.instance().inputLabelNode ? wrapper.instance().inputLabelNode.offsetWidth : 0,
        );
      });

      it('should set shrink prop on outline from label', () => {
        wrapper = mount(
          <TextField variant="outlined" InputLabelProps={{ shrink: true }} classes={{}} />,
        );
        assert.strictEqual(wrapper.find(OutlinedInput).props().notched, true);
      });
    });

    describe('prop: InputProps', () => {
      it('should apply additional properties to the Input component', () => {
        wrapper.setProps({ InputProps: { inputclassname: 'fullWidth' } });
        assert.strictEqual(wrapper.find(Input).props().inputclassname, 'fullWidth');
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

      const wrapper = mount(
        <TextField select SelectProps={{ native: true }}>
          {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>,
      );

      const select = wrapper.find('select');

      assert.strictEqual(select.exists(), true);
      assert.strictEqual(select.children().every('option'), true);
    });
  });
});
