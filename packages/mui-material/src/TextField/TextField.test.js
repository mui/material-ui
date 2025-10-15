import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import FormControl from '@mui/material/FormControl';
import { inputBaseClasses } from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import TextField, { textFieldClasses as classes } from '@mui/material/TextField';
import describeConformance from '../../test/describeConformance';

describe('<TextField />', () => {
  const { render } = createRenderer();

  function TestComponent(props) {
    const { children, className, 'data-testid': testId } = props;
    return (
      <div className={className} data-testid={testId ?? 'custom'}>
        {typeof children === 'function' ? children({}) : children}
      </div>
    );
  }

  function TestFormControl(props) {
    const { children, error, ...other } = props;
    return (
      <FormControl data-testid={'custom'} {...other}>
        {children}
      </FormControl>
    );
  }

  describeConformance(
    <TextField variant="standard" helperText="Helper text" label="Label" />,
    () => ({
      classes,
      inheritComponent: FormControl,
      render,
      muiName: 'MuiTextField',
      refInstanceof: window.HTMLDivElement,
      testVariantProps: { variant: 'outlined' },
      slots: {
        input: {
          testWithComponent: TestComponent,
          testWithElement: null,
        },
        inputLabel: {},
        htmlInput: {
          testWithElement: 'input',
        },
        formHelperText: {},
        root: {
          expectedClassName: classes.root,
          testWithElement: TestFormControl,
        },
      },
      skip: ['componentProp', 'componentsProp'],
    }),
  );

  describeConformance(
    <TextField select>
      <option>A</option>
    </TextField>,
    () => ({
      classes,
      inheritComponent: FormControl,
      render,
      muiName: 'MuiTextField',
      slots: {
        select: {
          testWithComponent: TestComponent,
          testWithElement: null,
        },
      },
      only: [
        'slotsProp',
        'slotPropsProp',
        'slotPropsCallback', // not supported yet
        'slotPropsCallbackWithPropsAsOwnerState', // not supported yet
      ],
    }),
  );

  describe('structure', () => {
    it('should have an input as the only child', () => {
      render(<TextField variant="standard" />);

      expect(screen.getAllByRole('textbox')).to.have.lengthOf(1);
    });

    it('should forward the multiline prop to Input', () => {
      render(<TextField variant="standard" multiline />);

      expect(screen.getByRole('textbox', { hidden: false })).to.have.class(
        inputBaseClasses.inputMultiline,
      );
    });

    it('should forward the fullWidth prop to Input', () => {
      render(
        <TextField
          variant="standard"
          fullWidth
          InputProps={{ 'data-testid': 'mui-input-base-root' }}
        />,
      );

      expect(screen.getByTestId('mui-input-base-root')).to.have.class(inputBaseClasses.fullWidth);
    });
  });

  describe('with a label', () => {
    it('label the input', () => {
      render(<TextField label="Foo bar" variant="standard" />);

      expect(screen.getByRole('textbox')).toHaveAccessibleName('Foo bar');
    });

    it('should apply the className to the label', () => {
      const { container } = render(
        <TextField label="Foo bar" InputLabelProps={{ className: 'foo' }} variant="standard" />,
      );

      expect(container.querySelector('label')).to.have.class('foo');
    });

    ['', undefined].forEach((label) => {
      it(`should not render empty (${label}) label element`, () => {
        const { container } = render(<TextField label={label} variant="standard" />);

        expect(container.querySelector('label')).to.equal(null);
      });
    });
  });

  describe('with a helper text', () => {
    it('should apply the className to the FormHelperText', () => {
      const { getDescriptionOf } = render(
        <TextField
          helperText="Foo bar"
          FormHelperTextProps={{ className: 'foo' }}
          variant="standard"
        />,
      );

      expect(getDescriptionOf(screen.getByRole('textbox'))).to.have.class('foo');
    });

    it('has an accessible description', () => {
      render(
        <TextField
          helperText="Foo bar"
          FormHelperTextProps={{ className: 'foo' }}
          variant="standard"
        />,
      );

      expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Foo bar');
    });
  });

  describe('with an outline', () => {
    it('should set outline props', () => {
      const { container } = render(
        <TextField
          InputProps={{ classes: { notchedOutline: 'notch' } }}
          label={<div data-testid="label">label</div>}
          required
        />,
      );

      const [, fakeLabel] = screen.getAllByTestId('label');
      const notch = container.querySelector('.notch legend');
      expect(notch).to.contain(fakeLabel);
      expect(notch).to.have.text('label\u2009*');
    });

    it('should set shrink prop on outline from label', () => {
      const { container } = render(<TextField InputLabelProps={{ shrink: true }} classes={{}} />);

      expect(container.querySelector('fieldset')).to.have.class(
        outlinedInputClasses.notchedOutline,
      );
    });

    it('should render `0` label properly', () => {
      const { container } = render(
        <TextField InputProps={{ classes: { notchedOutline: 'notch' } }} label={0} required />,
      );

      const notch = container.querySelector('.notch legend');
      expect(notch).to.have.text('0\u2009*');
    });

    it('should not set padding for empty, null or undefined label props', function test() {
      if (window.navigator.userAgent.includes('jsdom')) {
        this.skip();
      }
      const spanStyle = { paddingLeft: '0px', paddingRight: '0px' };
      ['', undefined, null].forEach((prop) => {
        const { container: container1 } = render(
          <TextField InputProps={{ classes: { notchedOutline: 'notch' } }} label={prop} />,
        );
        expect(container1.querySelector('span')).toHaveComputedStyle(spanStyle);
      });
    });
  });

  describe('prop: InputProps', () => {
    it('should apply additional props to the Input component', () => {
      render(<TextField InputProps={{ 'data-testid': 'InputComponent' }} variant="standard" />);

      expect(screen.getByTestId('InputComponent')).not.to.equal(null);
    });
  });

  describe('prop: select', () => {
    it('can render a <select /> when `native`', () => {
      const currencies = [
        { value: 'USD', label: '$' },
        { value: 'BTC', label: '฿' },
      ];

      const { container } = render(
        <TextField select SelectProps={{ native: true }} variant="standard">
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

    it('associates the label with the <select /> when `native={true}`', () => {
      render(
        <TextField
          label="Currency:"
          select
          SelectProps={{ native: true }}
          value="$"
          variant="standard"
        >
          <option value="dollar">$</option>
        </TextField>,
      );

      expect(screen.getByRole('combobox', { name: 'Currency:' })).to.have.property(
        'value',
        'dollar',
      );
    });

    it('renders a combobox with the appropriate accessible name', () => {
      render(
        <TextField select label="Release: " value="stable" variant="standard">
          <MenuItem value="alpha">Alpha</MenuItem>
          <MenuItem value="beta">Beta</MenuItem>
          <MenuItem value="stable">Stable</MenuItem>
        </TextField>,
      );

      expect(screen.getByRole('combobox')).toHaveAccessibleName('Release:');
    });

    it('creates an input[hidden] that has no accessible properties', () => {
      const { container } = render(
        <TextField select label="Release: " value="stable" variant="standard">
          <MenuItem value="stable">Stable</MenuItem>
        </TextField>,
      );

      const input = container.querySelector('input[aria-hidden]');
      expect(input).not.to.have.attribute('id');
      expect(input).not.to.have.attribute('aria-describedby');
    });

    it('renders a combobox with the appropriate accessible description', () => {
      render(
        <TextField select helperText="Foo bar" value="10">
          <MenuItem value={10}>Ten</MenuItem>
        </TextField>,
      );

      expect(screen.getByRole('combobox')).toHaveAccessibleDescription('Foo bar');
    });
  });

  describe('event: click', () => {
    it('registers `onClick` on the root slot', () => {
      const handleClick = spy((event) => event.currentTarget);

      render(<TextField data-testid="root" onClick={handleClick} />);

      const input = screen.getByRole('textbox');

      const root = screen.getByTestId('root');

      fireEvent.click(input);

      expect(handleClick.callCount).to.equal(1);
      // return value is event.currentTarget
      expect(handleClick.returned(root)).to.equal(true);
    });
  });

  describe('prop: inputProps', () => {
    it('should apply additional props to the input element', () => {
      render(<TextField inputProps={{ 'data-testid': 'input-element' }} />);

      expect(screen.getByRole('textbox')).to.have.attribute('data-testid', 'input-element');
    });
  });

  describe('autofill', () => {
    it('should be filled after auto fill event', () => {
      function AutoFillComponentTest() {
        const [value, setValue] = React.useState('');
        return (
          <TextField
            value={value}
            onChange={(event) => setValue(event.target.value)}
            label="test"
            variant="standard"
            slotProps={{
              htmlInput: { 'data-testid': 'htmlInput' },
              inputLabel: { 'data-testid': 'label' },
            }}
          />
        );
      }

      render(<AutoFillComponentTest />);
      fireEvent.animationStart(screen.getByTestId('htmlInput'), { animationName: 'mui-auto-fill' });
      expect(screen.getByTestId('label').getAttribute('data-shrink')).to.equal('true');
    });
  });
});
