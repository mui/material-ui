import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import FormControl from '../FormControl';
import Input from '../Input';
import OutlinedInput from '../OutlinedInput';
import TextField from './TextField';
import MenuItem from '../MenuItem';

describe('<TextField />', () => {
  let classes;
  let mount;
  const render = createClientRender({ strict: true });

  before(() => {
    classes = getClasses(<TextField />);
    mount = createMount({ strict: true });
  });

  describeConformance(<TextField />, () => ({
    classes,
    inheritComponent: FormControl,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    after: () => mount.cleanUp(),
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

      expect(getByLabelText('Foo bar')).to.be.ok;
    });

    it('should apply the className to the label', () => {
      const { container } = render(
        <TextField id="labelled" label="Foo bar" InputLabelProps={{ className: 'foo' }} />,
      );

      expect(container.querySelector('label')).to.have.class('foo');
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
      const wrapper = mount(<TextField variant="outlined" />);

      expect(wrapper.find(OutlinedInput).props()).to.have.property('labelWidth', 0);
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

      expect(getByTestId('InputComponent')).to.be.ok;
    });
  });

  describe('prop: select', () => {
    it('should be able to render a select as expected', () => {
      const currencies = [{ value: 'USD', label: '$' }, { value: 'BTC', label: '฿' }];

      const { getByRole } = render(
        <TextField select SelectProps={{ native: true }}>
          {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>,
      );

      const select = getByRole('listbox');

      expect(select).to.be.ok;
      expect(select.querySelectorAll('option')).to.have.lengthOf(2);
    });

    it('renders a combobox with the appropriate accessible name', () => {
      const { getByRole } = render(
        <TextField select id="my-select" label="Release: " value="stable">
          <MenuItem value="alpha">Alpha</MenuItem>
          <MenuItem value="beta">Beta</MenuItem>
          <MenuItem value="stable">Stable</MenuItem>
        </TextField>,
      );

      const label = getByRole('button')
        .getAttribute('aria-labelledby')
        .split(' ')
        .map(idref => document.getElementById(idref))
        .reduce((partial, element) => `${partial} ${element.textContent}`, '');
      // this whitespace is ok since actual AT will only use so called "flat strings"
      // https://w3c.github.io/accname/#mapping_additional_nd_te
      expect(label).to.equal(' Release:  Stable');
    });

    it('creates an input[hidden] that has no accessible properties', () => {
      const { container } = render(
        <TextField select id="my-select" label="Release: " value="stable">
          <MenuItem value="stable">Stable</MenuItem>
        </TextField>,
      );

      const input = container.querySelector('input[type="hidden"]');
      expect(input).not.to.have.attribute('id');
      expect(input).not.to.have.attribute('aria-describedby');
    });
  });
});
