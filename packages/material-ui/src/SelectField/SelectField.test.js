import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import SelectField, { selectFieldClasses as classes } from '@material-ui/core/SelectField';
import { inputBaseClasses } from '@material-ui/core/InputBase';
import { outlinedInputClasses } from '@material-ui/core/OutlinedInput';

describe('<SelectField />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceV5(<SelectField variant="standard" value="" />, () => ({
    classes,
    inheritComponent: FormControl,
    render,
    mount,
    muiName: 'MuiSelectField',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { variant: 'outlined' },
    skip: ['componentProp', 'componentsProp'],
  }));

  describe('structure', () => {
    it('should forward the fullWidth prop to Input', () => {
      const { getByTestId } = render(
        <SelectField
          value=""
          variant="standard"
          fullWidth
          InputProps={{ 'data-testid': 'mui-input-base-root' }}
        />,
      );

      expect(getByTestId('mui-input-base-root')).to.have.class(inputBaseClasses.fullWidth);
    });

    it('renders a combobox with the appropriate accessible name', () => {
      const { getByRole } = render(
        <SelectField id="my-select" label="Release: " value="stable" variant="standard">
          <MenuItem value="alpha">Alpha</MenuItem>
          <MenuItem value="beta">Beta</MenuItem>
          <MenuItem value="stable">Stable</MenuItem>
        </SelectField>,
      );

      expect(getByRole('button')).toHaveAccessibleName('Release: Stable');
    });

    it('creates an input[hidden] that has no accessible properties', () => {
      const { container } = render(
        <SelectField id="my-select" label="Release: " value="stable" variant="standard">
          <MenuItem value="stable">Stable</MenuItem>
        </SelectField>,
      );

      const input = container.querySelector('input[aria-hidden]');
      expect(input).not.to.have.attribute('id');
      expect(input).not.to.have.attribute('aria-describedby');
    });

    it('renders a combobox with the appropriate accessible description', () => {
      const { getByRole } = render(
        <SelectField id="aria-test" helperText="Foo bar" value="10">
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(getByRole('button')).toHaveAccessibleDescription('Foo bar');
    });
  });

  describe('multiple', () => {
    it('should have comma separated value if multiple', () => {
      const { getByRole } = render(
        <SelectField variant="standard" multiple value={['foo', 'bar']} />,
      );

      expect(getByRole('textbox', { hidden: true })).to.have.value('foo,bar');
    });
  });

  describe('with a label', () => {
    it('should apply the className to the label', () => {
      const { container } = render(
        <SelectField
          id="labelled"
          label="Foo bar"
          InputLabelProps={{ className: 'foo' }}
          value=""
          variant="standard"
        />,
      );

      expect(container.querySelector('label')).to.have.class('foo');
    });

    ['', undefined].forEach((label) => {
      it(`should not render empty (${label}) label element`, () => {
        const { container } = render(
          <SelectField id="labelled" label={label} value="" variant="standard" />,
        );

        expect(container.querySelector('label')).to.equal(null);
      });
    });
  });

  describe('with a helper text', () => {
    it('should apply the className to the FormHelperText', () => {
      const { getDescriptionOf, getByRole } = render(
        <SelectField
          id="aria-test"
          helperText="Foo bar"
          FormHelperTextProps={{ className: 'foo' }}
          value=""
          variant="standard"
        />,
      );

      expect(getDescriptionOf(getByRole('button'))).to.have.class('foo');
    });

    it('should add accessibility labels to the input', () => {
      const { getDescriptionOf, getByRole } = render(
        <SelectField
          id="aria-test"
          helperText="Foo bar"
          FormHelperTextProps={{ className: 'foo' }}
          value=""
          variant="standard"
        />,
      );

      expect(getDescriptionOf(getByRole('button'))).to.have.text('Foo bar');
    });
  });

  describe('with an outline', () => {
    it('should set outline props', () => {
      const { container, getAllByTestId } = render(
        <SelectField
          value=""
          InputProps={{ classes: { notchedOutline: 'notch' } }}
          label={<div data-testid="label">label</div>}
          required
        />,
      );

      const [, fakeLabel] = getAllByTestId('label');
      const notch = container.querySelector('.notch legend');
      expect(notch).to.contain(fakeLabel);
      expect(notch).to.have.text('label\u00a0*');
    });

    it('should set shrink prop on outline from label', () => {
      const { container } = render(
        <SelectField value="" InputLabelProps={{ shrink: true }} classes={{}} />,
      );

      expect(container.querySelector('fieldset')).to.have.class(
        outlinedInputClasses.notchedOutline,
      );
    });
  });

  describe('prop: InputProps', () => {
    it('should apply additional props to the Input component', () => {
      const { getByTestId } = render(
        <SelectField
          value=""
          InputProps={{ 'data-testid': 'InputComponent' }}
          variant="standard"
        />,
      );

      expect(getByTestId('InputComponent')).not.to.equal(null);
    });
  });

  describe('prop: native', () => {
    it('can render a <select /> when `native`', () => {
      const currencies = [
        { value: 'USD', label: '$' },
        { value: 'BTC', label: '฿' },
      ];

      const { container } = render(
        <SelectField native variant="standard">
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>,
      );

      const select = container.querySelector('select');
      expect(select).not.to.equal(null);
      expect(select.options).to.have.lengthOf(2);
    });

    it('associates the label with the <select /> when `native={true}` and `id`', () => {
      const { getByRole } = render(
        <SelectField label="Currency:" id="labelled-select" native value="$" variant="standard">
          <option value="dollar">$</option>
        </SelectField>,
      );

      expect(getByRole('combobox', { name: 'Currency:' })).to.have.property('value', 'dollar');
    });
  });
});
