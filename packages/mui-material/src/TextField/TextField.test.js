import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent, screen, isJsdom } from '@mui/internal-test-utils';
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

    it.skipIf(isJsdom())(
      'should not set padding for empty, null or undefined label props',
      function test() {
        const spanStyle = { paddingLeft: '0px', paddingRight: '0px' };
        ['', undefined, null].forEach((prop) => {
          const { container: container1 } = render(
            <TextField InputProps={{ classes: { notchedOutline: 'notch' } }} label={prop} />,
          );
          expect(container1.querySelector('span')).toHaveComputedStyle(spanStyle);
        });
      },
    );
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

  describe('prop: slotProps', () => {
    it('should merge deprecated props with their matching slot props', () => {
      const handleInputMouseDown = spy();
      const handleSlotInputMouseDown = spy();
      const { container, unmount } = render(
        <TextField
          label="Name"
          helperText="Helper"
          InputProps={{
            className: 'deprecated-input',
            'data-deprecated-input': 'true',
            'data-precedence': 'deprecated',
            onMouseDown: handleInputMouseDown,
            style: { color: 'red', backgroundColor: 'blue' },
          }}
          InputLabelProps={{
            className: 'deprecated-input-label',
            'data-deprecated-input-label': 'true',
          }}
          inputProps={{
            className: 'deprecated-html-input',
            'data-deprecated-html-input': 'true',
            maxLength: 2,
          }}
          FormHelperTextProps={{
            className: 'deprecated-helper-text',
            'data-deprecated-helper-text': 'true',
          }}
          slotProps={{
            input: {
              className: 'slot-input',
              'data-slot-input': 'true',
              'data-precedence': 'slot',
              onMouseDown: handleSlotInputMouseDown,
              style: { backgroundColor: 'green' },
            },
            inputLabel: {
              className: 'slot-input-label',
              'data-slot-input-label': 'true',
            },
            htmlInput: {
              className: 'slot-html-input',
              'data-slot-html-input': 'true',
              maxLength: 4,
            },
            formHelperText: {
              className: 'slot-helper-text',
              'data-slot-helper-text': 'true',
            },
          }}
        />,
      );

      const textbox = screen.getByRole('textbox');
      const inputRoot = textbox.closest(`.${inputBaseClasses.root}`);
      const inputLabel = container.querySelector('label');
      const helperTextElement = screen.getByText('Helper');

      expect(inputRoot).not.to.equal(null);
      expect(inputRoot).to.have.class('deprecated-input');
      expect(inputRoot).to.have.class('slot-input');
      expect(inputRoot).to.have.attribute('data-deprecated-input', 'true');
      expect(inputRoot).to.have.attribute('data-slot-input', 'true');
      expect(inputRoot).to.have.attribute('data-precedence', 'slot');
      expect(inputRoot.style.color).to.equal('red');
      expect(inputRoot.style.backgroundColor).to.equal('green');

      fireEvent.mouseDown(inputRoot);
      expect(handleInputMouseDown.callCount).to.equal(1);
      expect(handleSlotInputMouseDown.callCount).to.equal(1);

      expect(inputLabel).to.have.class('deprecated-input-label');
      expect(inputLabel).to.have.class('slot-input-label');
      expect(inputLabel).to.have.attribute('data-deprecated-input-label', 'true');
      expect(inputLabel).to.have.attribute('data-slot-input-label', 'true');

      expect(textbox).to.have.class('deprecated-html-input');
      expect(textbox).to.have.class('slot-html-input');
      expect(textbox).to.have.attribute('data-deprecated-html-input', 'true');
      expect(textbox).to.have.attribute('data-slot-html-input', 'true');
      expect(textbox).to.have.property('maxLength', 4);

      expect(helperTextElement).to.have.class('deprecated-helper-text');
      expect(helperTextElement).to.have.class('slot-helper-text');
      expect(helperTextElement).to.have.attribute('data-deprecated-helper-text', 'true');
      expect(helperTextElement).to.have.attribute('data-slot-helper-text', 'true');

      unmount();

      const { container: selectContainer } = render(
        <TextField
          select
          value="one"
          SelectProps={{
            native: true,
            className: 'deprecated-select',
            'data-deprecated-select': 'true',
          }}
          slotProps={{
            select: {
              className: 'slot-select',
              'data-slot-select': 'true',
            },
          }}
        >
          <option value="one">One</option>
        </TextField>,
      );

      const selectRoot = selectContainer.querySelector('.deprecated-select.slot-select');
      expect(selectRoot).not.to.equal(null);
      expect(selectRoot).to.have.attribute('data-deprecated-select', 'true');
      expect(selectRoot).to.have.attribute('data-slot-select', 'true');
      expect(screen.getByRole('combobox')).to.have.property('nodeName', 'SELECT');
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

      function fireAnimationStart(element, animationName) {
        const event = new Event('animationstart', { bubbles: true });
        Object.defineProperty(event, 'animationName', { value: animationName });
        fireEvent(element, event);
      }

      render(<AutoFillComponentTest />);
      fireAnimationStart(screen.getByTestId('htmlInput'), 'mui-auto-fill');
      expect(screen.getByTestId('label').getAttribute('data-shrink')).to.equal('true');

      fireAnimationStart(screen.getByTestId('htmlInput'), 'mui-auto-fill-cancel');
      expect(screen.getByTestId('label').getAttribute('data-shrink')).to.equal('false');
    });
  });
});
