import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, describeConformance, fireEvent } from '@mui-internal/test-utils';
import FormControl from '@mui/material/FormControl';
import { inputBaseClasses } from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import SelectField, { selectFieldClasses as classes } from '@mui/material/SelectField';

describe('<SelectField />', () => {
  const { render } = createRenderer();

  describeConformance(
    <SelectField variant="standard" value="10">
      <MenuItem value={10}>Ten</MenuItem>
    </SelectField>,
    () => ({
      classes,
      inheritComponent: FormControl,
      render,
      muiName: 'MuiSelectField',
      refInstanceof: window.HTMLDivElement,
      testVariantProps: { variant: 'outlined' },
      skip: ['componentProp', 'componentsProp'],
    }),
  );

  describe('structure', () => {
    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip('should have an input as the only child', () => {
      const { getAllByRole } = render(<SelectField variant="standard" />);

      expect(getAllByRole('textbox')).to.have.lengthOf(1);
    });

    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip('should forward the multiline prop to Input', () => {
      const { getByRole } = render(
        <SelectField variant="standard" value="10" multiline>
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(getByRole('textbox', { hidden: false })).to.have.class(
        inputBaseClasses.inputMultiline,
      );
    });

    it('should forward the fullWidth prop to Input', () => {
      const { getByTestId } = render(
        <SelectField
          variant="standard"
          value="10"
          fullWidth
          InputProps={{ 'data-testid': 'mui-input-base-root' }}
        >
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(getByTestId('mui-input-base-root')).to.have.class(inputBaseClasses.fullWidth);
    });

    it('slotProps: should forward the fullWidth prop to Input', () => {
      const { getByTestId } = render(
        <SelectField
          variant="standard"
          value="10"
          fullWidth
          slotProps={{ input: { root: { 'data-testid': 'mui-input-base-root' } } }}
        >
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(getByTestId('mui-input-base-root')).to.have.class(inputBaseClasses.fullWidth);
    });
  });

  describe('with a label', () => {
    it('label the input', () => {
      const { getByRole } = render(
        <SelectField label="Foo bar" variant="standard" value="10">
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(getByRole('combobox')).toHaveAccessibleName('Foo bar');
    });

    it('should apply the className to the label', () => {
      const { container } = render(
        <SelectField
          label="Foo bar"
          InputLabelProps={{ className: 'foo' }}
          variant="standard"
          value="10"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(container.querySelector('label')).to.have.class('foo');
    });

    it('slotProps: should apply the className to the label', () => {
      const { container } = render(
        <SelectField
          label="Foo bar"
          slotProps={{ inputLabel: { root: { className: 'foo' } } }}
          variant="standard"
          value="10"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(container.querySelector('label')).to.have.class('foo');
    });

    ['', undefined].forEach((label) => {
      it(`should not render empty (${label}) label element`, () => {
        const { container } = render(
          <SelectField label={label} variant="standard" value="10">
            <MenuItem value={10}>Ten</MenuItem>
          </SelectField>,
        );

        expect(container.querySelector('label')).to.equal(null);
      });
    });
  });

  describe('with a helper text', () => {
    it('should apply the className to the FormHelperText', () => {
      const { getDescriptionOf, getByRole } = render(
        <SelectField
          helperText="Foo bar"
          FormHelperTextProps={{ className: 'foo' }}
          variant="standard"
          value="10"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(getDescriptionOf(getByRole('combobox'))).to.have.class('foo');
    });

    it('slotProps: should apply the className to the FormHelperText', () => {
      const { getDescriptionOf, getByRole } = render(
        <SelectField
          helperText="Foo bar"
          slotProps={{ formHelperText: { root: { className: 'foo' } } }}
          variant="standard"
          value="10"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(getDescriptionOf(getByRole('combobox'))).to.have.class('foo');
    });

    it('has an accessible description', () => {
      const { getByRole } = render(
        <SelectField
          helperText="Foo bar"
          FormHelperTextProps={{ className: 'foo' }}
          variant="standard"
          value="10"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(getByRole('combobox')).toHaveAccessibleDescription('Foo bar');
    });

    it('slotProps: has an accessible description', () => {
      const { getByRole } = render(
        <SelectField
          helperText="Foo bar"
          slotProps={{ formHelperText: { root: { className: 'foo' } } }}
          variant="standard"
          value="10"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(getByRole('combobox')).toHaveAccessibleDescription('Foo bar');
    });
  });

  describe('with an outline', () => {
    it('should set outline props', () => {
      const { container, getAllByTestId } = render(
        <SelectField
          InputProps={{ classes: { notchedOutline: 'notch' } }}
          label={<div data-testid="label">label</div>}
          required
          value="10"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      const [, fakeLabel] = getAllByTestId('label');
      const notch = container.querySelector('.notch legend');
      expect(notch).to.contain(fakeLabel);
      expect(notch).to.have.text('label\u2009*');
    });

    it('slotProps: should set outline props', () => {
      const { container, getAllByTestId } = render(
        <SelectField
          slotProps={{ input: { root: { classes: { notchedOutline: 'notch' } } } }}
          label={<div data-testid="label">label</div>}
          required
          value="10"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      const [, fakeLabel] = getAllByTestId('label');
      const notch = container.querySelector('.notch legend');
      expect(notch).to.contain(fakeLabel);
      expect(notch).to.have.text('label\u2009*');
    });

    it('should set shrink prop on outline from label', () => {
      const { container } = render(
        <SelectField InputLabelProps={{ shrink: true }} classes={{}} value="10">
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(container.querySelector('fieldset')).to.have.class(
        outlinedInputClasses.notchedOutline,
      );
    });

    it('slotProps: should set shrink prop on outline from label', () => {
      const { container } = render(
        <SelectField slotProps={{ inputLabel: { root: { shrink: true } } }} classes={{}} value="10">
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(container.querySelector('fieldset')).to.have.class(
        outlinedInputClasses.notchedOutline,
      );
    });

    it('should render `0` label properly', () => {
      const { container } = render(
        <SelectField
          InputProps={{ classes: { notchedOutline: 'notch' } }}
          label={0}
          required
          value="10"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      const notch = container.querySelector('.notch legend');
      expect(notch).to.have.text('0\u2009*');
    });

    it('slotProps: should render `0` label properly', () => {
      const { container } = render(
        <SelectField
          slotProps={{ input: { root: { classes: { notchedOutline: 'notch' } } } }}
          label={0}
          required
          value="10"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      const notch = container.querySelector('.notch legend');
      expect(notch).to.have.text('0\u2009*');
    });

    it('should not set padding for empty, null or undefined label props', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const spanStyle = { paddingLeft: '0px', paddingRight: '0px' };
      ['', undefined, null].forEach((prop) => {
        const { container: container1 } = render(
          <SelectField
            InputProps={{ classes: { notchedOutline: 'notch' } }}
            label={prop}
            value="10"
          >
            <MenuItem value={10}>Ten</MenuItem>
          </SelectField>,
        );
        expect(container1.querySelector('span')).toHaveComputedStyle(spanStyle);
      });
    });

    it('slotProps: should not set padding for empty, null or undefined label props', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const spanStyle = { paddingLeft: '0px', paddingRight: '0px' };
      ['', undefined, null].forEach((prop) => {
        const { container: container1 } = render(
          <SelectField
            slotProps={{ input: { root: { classes: { notchedOutline: 'notch' } } } }}
            label={prop}
            value="10"
          >
            <MenuItem value={10}>Ten</MenuItem>
          </SelectField>,
        );
        expect(container1.querySelector('span')).toHaveComputedStyle(spanStyle);
      });
    });
  });

  describe('prop: InputProps', () => {
    it('should apply additional props to the Input component', () => {
      const { getByTestId } = render(
        <SelectField InputProps={{ 'data-testid': 'InputComponent' }} variant="standard" value="10">
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(getByTestId('InputComponent')).not.to.equal(null);
    });

    it('slotProps: should apply additional props to the Input component', () => {
      const { getByTestId } = render(
        <SelectField
          slotProps={{ input: { root: { 'data-testid': 'InputComponent' } } }}
          variant="standard"
          value="10"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(getByTestId('InputComponent')).not.to.equal(null);
    });
  });

  describe('prop: select', () => {
    it('can render a <select /> when `native`', () => {
      const currencies = [
        { value: 'USD', label: '$' },
        { value: 'BTC', label: '฿' },
      ];

      const { container } = render(
        <SelectField SelectProps={{ native: true }} variant="standard">
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

    it('slotProps: can render a <select /> when `native`', () => {
      const currencies = [
        { value: 'USD', label: '$' },
        { value: 'BTC', label: '฿' },
      ];

      const { container } = render(
        <SelectField slotProps={{ select: { root: { native: true } } }} variant="standard">
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

    it('associates the label with the <select /> when `native={true}`', () => {
      const { getByRole } = render(
        <SelectField label="Currency:" SelectProps={{ native: true }} value="$" variant="standard">
          <option value="dollar">$</option>
        </SelectField>,
      );

      expect(getByRole('combobox', { name: 'Currency:' })).to.have.property('value', 'dollar');
    });

    it('slotProps: associates the label with the <select /> when `native={true}`', () => {
      const { getByRole } = render(
        <SelectField
          label="Currency:"
          slotProps={{ select: { root: { native: true } } }}
          value="$"
          variant="standard"
        >
          <option value="dollar">$</option>
        </SelectField>,
      );

      expect(getByRole('combobox', { name: 'Currency:' })).to.have.property('value', 'dollar');
    });

    it('renders a combobox with the appropriate accessible name', () => {
      const { getByRole } = render(
        <SelectField label="Release: " value="stable" variant="standard">
          <MenuItem value="alpha">Alpha</MenuItem>
          <MenuItem value="beta">Beta</MenuItem>
          <MenuItem value="stable">Stable</MenuItem>
        </SelectField>,
      );

      expect(getByRole('combobox')).toHaveAccessibleName('Release:');
    });

    it('creates an input[hidden] that has no accessible properties', () => {
      const { container } = render(
        <SelectField label="Release: " value="stable" variant="standard">
          <MenuItem value="stable">Stable</MenuItem>
        </SelectField>,
      );

      const input = container.querySelector('input[aria-hidden]');
      expect(input).not.to.have.attribute('id');
      expect(input).not.to.have.attribute('aria-describedby');
    });

    it('renders a combobox with the appropriate accessible description', () => {
      const { getByRole } = render(
        <SelectField helperText="Foo bar" value="10">
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      expect(getByRole('combobox')).toHaveAccessibleDescription('Foo bar');
    });
  });

  describe('event: click', () => {
    it('registers `onClick` on the root slot', () => {
      const handleClick = spy((event) => event.currentTarget);
      const { getByTestId, getByRole } = render(
        <SelectField data-testid="root" onClick={handleClick} value="10">
          <MenuItem value={10}>Ten</MenuItem>
        </SelectField>,
      );

      const combobox = getByRole('combobox');

      const root = getByTestId('root');

      fireEvent.click(combobox);

      expect(handleClick.callCount).to.equal(1);
      // return value is event.currentTarget
      expect(handleClick.returned(root)).to.equal(true);
    });
  });
});
