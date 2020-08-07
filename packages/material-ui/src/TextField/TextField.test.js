import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import FormControl from '../FormControl';
import Input from '../Input';
import OutlinedInput from '../OutlinedInput';
import TextField from './TextField';
import MenuItem from '../MenuItem';

describe('<TextField />', () => {
  let classes;
  const mount = createMount();
  const render = createClientRender();

  before(() => {
    classes = getClasses(<TextField />);
  });

  describeConformance(<TextField />, () => ({
    classes,
    inheritComponent: FormControl,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  describe('structure', () => {
    it('should have an input as the only child', () => {
      const { getAllByRole } = render(<TextField />);

      expect(getAllByRole('textbox')).to.have.lengthOf(1);
    });

    it('should forward the multiline prop to Input', () => {
      const wrapper = mount(<TextField multiline />);

      expect(wrapper.find(Input).props()).to.have.property('multiline', true);
    });

    it('should forward the fullWidth prop to Input', () => {
      const wrapper = mount(<TextField fullWidth />);

      expect(wrapper.find(Input).props()).to.have.property('fullWidth', true);
    });
  });

  describe('with a label', () => {
    it('label the input', () => {
      const { getByLabelText } = render(<TextField id="labelled" label="Foo bar" />);

      expect(getByLabelText('Foo bar')).not.to.equal(null);
    });

    it('should apply the className to the label', () => {
      const { container } = render(
        <TextField id="labelled" label="Foo bar" InputLabelProps={{ className: 'foo' }} />,
      );

      expect(container.querySelector('label')).to.have.class('foo');
    });

    ['', undefined].forEach((label) => {
      it(`should not render empty (${label}) label element`, () => {
        const { container } = render(<TextField id="labelled" label={label} />);

        expect(container.querySelector('label')).to.equal(null);
      });
    });
  });

  describe('with a helper text', () => {
    it('should apply the className to the FormHelperText', () => {
      const { getDescriptionOf, getByRole } = render(
        <TextField
          id="aria-test"
          helperText="Foo bar"
          FormHelperTextProps={{ className: 'foo' }}
        />,
      );

      expect(getDescriptionOf(getByRole('textbox'))).to.have.class('foo');
    });

    it('should add accessibility labels to the input', () => {
      const { getDescriptionOf, getByRole } = render(
        <TextField
          id="aria-test"
          helperText="Foo bar"
          FormHelperTextProps={{ className: 'foo' }}
        />,
      );

      expect(getDescriptionOf(getByRole('textbox'))).to.have.text('Foo bar');
    });
  });

  describe('with an outline', () => {
    it('should set outline props', () => {
      const { container, getAllByTestId } = render(
        <TextField
          InputProps={{ classes: { notchedOutline: 'notch' } }}
          label={<div data-testid="label">label</div>}
          required
          variant="outlined"
        />,
      );

      const [, fakeLabel] = getAllByTestId('label');
      const notch = container.querySelector('.notch legend');
      expect(notch).to.contain(fakeLabel);
      expect(notch).to.have.text('label\u00a0*');
    });

    it('should set shrink prop on outline from label', () => {
      const wrapper = mount(
        <TextField variant="outlined" InputLabelProps={{ shrink: true }} classes={{}} />,
      );

      expect(wrapper.find(OutlinedInput).props()).to.have.property('notched', true);
    });
  });

  describe('prop: InputProps', () => {
    it('should apply additional props to the Input component', () => {
      const { getByTestId } = render(
        <TextField InputProps={{ 'data-testid': 'InputComponent' }} />,
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
        <TextField select SelectProps={{ native: true }}>
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>,
      );

      const select = container.querySelector('select');
      expect(select).not.to.equal(null);
      expect(select.options).to.have.lengthOf(2);
    });

    it('associates the label with the <select /> when `native={true}` and `id`', () => {
      const { getByLabelText } = render(
        <TextField
          label="Currency:"
          id="labelled-select"
          select
          SelectProps={{ native: true }}
          value="$"
        >
          <option value="dollar">$</option>
        </TextField>,
      );

      expect(getByLabelText('Currency:')).to.have.property('value', 'dollar');
    });

    it('renders a combobox with the appropriate accessible name', () => {
      const { getByRole } = render(
        <TextField select id="my-select" label="Release: " value="stable">
          <MenuItem value="alpha">Alpha</MenuItem>
          <MenuItem value="beta">Beta</MenuItem>
          <MenuItem value="stable">Stable</MenuItem>
        </TextField>,
      );

      expect(getByRole('button')).toHaveAccessibleName('Release: Stable');
    });

    it('creates an input[hidden] that has no accessible properties', () => {
      const { container } = render(
        <TextField select id="my-select" label="Release: " value="stable">
          <MenuItem value="stable">Stable</MenuItem>
        </TextField>,
      );

      const input = container.querySelector('input[aria-hidden]');
      expect(input).not.to.have.attribute('id');
      expect(input).not.to.have.attribute('aria-describedby');
    });
  });
});
