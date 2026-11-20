import * as React from 'react';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { Field as BaseField } from '@base-ui/react/field';
import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import type { BaseUIEvent } from '@base-ui/react/types';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import type { IconButtonProps } from '@mui/material/IconButton';
import type { FormControlProps } from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import type { InputAdornmentProps } from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import type { OutlinedInputProps } from '@mui/material/OutlinedInput';
import NumberField, {
  numberFieldClasses as classes,
  NumberFieldRootDataAttributes,
} from '@mui/material/NumberField';
import type { NumberFieldOwnerState, NumberFieldProps } from '@mui/material/NumberField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

interface TestSlotProps {
  'data-testid'?: string;
  ownerState?: NumberFieldOwnerState;
  as?: React.ElementType;
}

interface TestNotchedOutlineProps {
  className?: string;
  label?: React.ReactNode;
  notched: boolean;
}

describe('<NumberField />', () => {
  const { render, renderToString } = createRenderer();

  const TestInput = React.forwardRef<HTMLDivElement, OutlinedInputProps & TestSlotProps>(
    function TestInput(props, ref) {
      return <OutlinedInput {...props} ref={ref} data-testid={props['data-testid'] ?? 'custom'} />;
    },
  );

  const TestHtmlInput = React.forwardRef<
    HTMLInputElement,
    React.ComponentPropsWithoutRef<'input'> & TestSlotProps
  >(function TestHtmlInput(props, ref) {
    const { ownerState, as, ...other } = props;
    return <input {...other} ref={ref} data-testid={props['data-testid'] ?? 'custom'} />;
  });

  const TestFormControl = React.forwardRef<HTMLDivElement, FormControlProps & TestSlotProps>(
    function TestFormControl(props, ref) {
      return <FormControl {...props} ref={ref} data-testid={props['data-testid'] ?? 'custom'} />;
    },
  );

  const TestIconButton = React.forwardRef<HTMLButtonElement, IconButtonProps & TestSlotProps>(
    function TestIconButton(props, ref) {
      return <IconButton {...props} ref={ref} data-testid={props['data-testid'] ?? 'custom'} />;
    },
  );

  const TestAdornment = React.forwardRef<
    HTMLDivElement,
    Partial<InputAdornmentProps> & TestSlotProps
  >(function TestAdornment(props, ref) {
    const { ownerState, as, position = 'end', ...other } = props;
    return (
      <InputAdornment
        {...other}
        position={position}
        ref={ref}
        data-testid={props['data-testid'] ?? 'custom'}
      />
    );
  });

  const createSlotCallbacks = () => {
    const createCallback = () =>
      vi.fn<(ownerState: NumberFieldOwnerState) => Record<string, never>>(() => ({}));

    return {
      controls: createCallback(),
      root: createCallback(),
      input: createCallback(),
      htmlInput: createCallback(),
      inputLabel: createCallback(),
      formHelperText: createCallback(),
      incrementButton: createCallback(),
      decrementButton: createCallback(),
      scrubArea: createCallback(),
      scrubAreaAdornment: createCallback(),
      scrubAreaCursor: createCallback(),
    };
  };

  describeConformance(
    <NumberField variant="standard" label="Amount" helperText="Helper text" />,
    () => ({
      classes,
      inheritComponent: FormControl,
      render,
      muiName: 'MuiNumberField',
      skip: ['componentProp'],
      refInstanceof: window.HTMLDivElement,
      testVariantProps: { variant: 'outlined' },
      testDeepOverrides: [
        { slotName: 'incrementButton', slotClassName: classes.incrementButton },
        { slotName: 'decrementButton', slotClassName: classes.decrementButton },
      ],
      slots: {
        controls: {
          expectedClassName: classes.controls,
          testWithComponent: TestAdornment,
          testWithElement: 'div',
        },
        root: {
          expectedClassName: classes.root,
          testWithComponent: TestFormControl,
          // Root render tests cover changing the HTML tag while keeping FormControl.
          testWithElement: null,
        },
        input: {
          expectedClassName: classes.input,
          testWithComponent: TestInput,
          testWithElement: null,
        },
        htmlInput: {
          expectedClassName: classes.htmlInput,
          testWithComponent: TestHtmlInput,
          testWithElement: 'input',
        },
        inputLabel: { expectedClassName: classes.inputLabel },
        formHelperText: { expectedClassName: classes.formHelperText },
        incrementButton: {
          expectedClassName: classes.incrementButton,
          testWithComponent: TestIconButton,
          testWithElement: 'button',
        },
        decrementButton: {
          expectedClassName: classes.decrementButton,
          testWithComponent: TestIconButton,
          testWithElement: 'button',
        },
      },
    }),
  );

  // Test the Material adapter's styles/context, state wiring and precedence.
  // Base UI owns render-element prop merging and ref lifecycle behavior.
  describe('root render', () => {
    // Spreads exercise JavaScript props that the public TypeScript API rejects.
    const unsupportedComponentProps = { component: 'section', className: 'custom-root' };
    [
      { name: 'top-level props', props: unsupportedComponentProps },
      { name: 'root slot props', props: { slotProps: { root: unsupportedComponentProps } } },
      {
        name: 'root slot callback props',
        props: { slotProps: { root: () => unsupportedComponentProps } },
      },
    ].forEach(({ name, props }) => {
      it(`ignores component from ${name} and preserves FormControl rendering`, () => {
        render(
          <NumberField {...props} label="Amount" data-testid="render-root" render={<fieldset />} />,
        );
        const root = screen.getByTestId('render-root');

        expect(root.tagName).to.equal('FIELDSET');
        expect(root).to.have.class('MuiFormControl-root');
      });
    });

    it('preserves Material styles, FormControl context and the forwarded ref', () => {
      const rootRef = React.createRef<HTMLDivElement>();
      const theme = createTheme({
        components: {
          MuiNumberField: { styleOverrides: { root: { paddingTop: 7 } } },
          MuiFormControl: { styleOverrides: { root: { paddingBottom: 9 } } },
        },
      });
      render(
        <ThemeProvider theme={theme}>
          <NumberField
            label="Amount"
            error
            ref={rootRef}
            data-testid="render-root"
            render={<section />}
          />
        </ThemeProvider>,
      );
      const root = screen.getByTestId('render-root');
      const input = screen.getByRole('textbox', { name: 'Amount' });

      expect(root.tagName).to.equal('SECTION');
      expect(getComputedStyle(root).paddingTop).to.equal('7px');
      expect(getComputedStyle(root).paddingBottom).to.equal('9px');
      expect(input.closest('.MuiInputBase-root')).to.have.class('Mui-error');
      expect(rootRef.current).to.equal(root);
    });

    it('passes live Base UI state without adding value attributes to the root', async () => {
      const { user } = render(
        <NumberField
          label="Amount"
          defaultValue={5}
          render={(props, state) => (
            <section {...props} data-testid="render-callback" data-current-value={state.value} />
          )}
        />,
      );
      const root = screen.getByTestId('render-callback');
      const input = screen.getByRole('textbox', { name: 'Amount' });

      expect(root).to.have.attribute('data-current-value', '5');
      ['data-value', 'data-inputvalue'].forEach((name) => {
        expect(root).not.to.have.attribute(name);
      });

      await user.click(input);
      await user.keyboard('{ArrowUp}');
      expect(root).to.have.attribute('data-current-value', '6');
    });

    it('lets slots.root replace the render bridge', () => {
      const renderRoot = vi.fn((props: React.HTMLAttributes<HTMLDivElement>) => (
        <section {...props} />
      ));
      render(
        <NumberField
          label="Amount"
          render={renderRoot}
          data-testid="replacement-root"
          slots={{ root: TestFormControl }}
        />,
      );
      const root = screen.getByTestId('replacement-root');

      expect(root.tagName).to.equal('DIV');
      expect(renderRoot).toHaveBeenCalledTimes(0);
    });
  });

  // These Material-only slots share the field's root state. Rendering another
  // element must retain their FormControl context and accessible input links.
  describe('label and helper text render', () => {
    it('preserves Material styles, refs and accessible links with render elements', () => {
      const labelRef = React.createRef<HTMLLabelElement>();
      const helperRef = React.createRef<HTMLParagraphElement>();
      render(
        <NumberField
          label="Amount"
          helperText="Enter an amount"
          error
          slotProps={{
            inputLabel: { render: <label data-testid="render-label" />, ref: labelRef },
            formHelperText: { render: <p data-testid="render-helper" />, ref: helperRef },
          }}
        />,
      );
      const label = screen.getByTestId('render-label');
      const helper = screen.getByTestId('render-helper');
      const input = screen.getByRole('textbox', { name: 'Amount' });

      expect(label).to.have.class('MuiInputLabel-root');
      expect(label).to.have.class('Mui-error');
      expect(helper).to.have.class('MuiFormHelperText-root');
      expect(helper).to.have.class('Mui-error');
      expect(labelRef.current).to.equal(label);
      expect(helperRef.current).to.equal(helper);
      expect(input).to.have.attribute('aria-describedby', helper.id);
    });

    it('passes live root state to both render callbacks', async () => {
      const { user } = render(
        <NumberField
          label="Amount"
          helperText="Enter an amount"
          defaultValue={5}
          slotProps={{
            inputLabel: {
              render: (props, state) => <label {...props} data-render-value={state.value} />,
            },
            formHelperText: {
              render: (props, state) => <p {...props} data-render-value={state.value} />,
            },
          }}
        />,
      );
      const label = screen.getByText('Amount', { selector: 'label' });
      const helper = screen.getByText('Enter an amount');

      expect(label).to.have.attribute('data-render-value', '5');
      expect(helper).to.have.attribute('data-render-value', '5');

      await user.click(screen.getByRole('textbox', { name: 'Amount' }));
      await user.keyboard('{ArrowUp}');

      expect(label).to.have.attribute('data-render-value', '6');
      expect(helper).to.have.attribute('data-render-value', '6');
    });

    it('lets replacement slots bypass their render adapters', () => {
      const renderLabel = vi.fn(() => <label />);
      const renderHelper = vi.fn(() => <p />);
      render(
        <NumberField
          label="Amount"
          helperText="Enter an amount"
          slots={{ inputLabel: 'label', formHelperText: 'p' }}
          slotProps={{
            inputLabel: { render: renderLabel },
            formHelperText: { render: renderHelper },
          }}
        />,
      );

      expect(renderLabel).toHaveBeenCalledTimes(0);
      expect(renderHelper).toHaveBeenCalledTimes(0);
    });
  });

  // Material props must configure the input and surrounding form controls, while
  // slot callbacks retain the public props and Base UI's resolved behavioral flags.
  describe('Material props and owner state', () => {
    it('applies NumberField theme overrides to the label, helper text and native input', () => {
      const theme = createTheme({
        components: {
          MuiNumberField: {
            styleOverrides: {
              inputLabel: { paddingTop: 7 },
              formHelperText: { marginLeft: 9 },
              htmlInput: { paddingTop: 3 },
            },
          },
        },
      });
      render(
        <ThemeProvider theme={theme}>
          <NumberField label="Amount" helperText="Helper text" />
        </ThemeProvider>,
      );

      expect(
        getComputedStyle(screen.getByText('Amount', { selector: 'label' })).paddingTop,
      ).to.equal('7px');
      expect(getComputedStyle(screen.getByText('Helper text')).marginLeft).to.equal('9px');
      expect(getComputedStyle(screen.getByRole('textbox')).paddingTop).to.equal('3px');
    });

    // Check the rendered Material components and their context-derived classes so
    // forwarding a prop only to the outer FormControl cannot satisfy the tests.
    describe('Material input and form props', () => {
      it('forwards the placeholder to the input element', () => {
        render(<NumberField placeholder="Enter amount" />);

        const input = screen.getByRole('textbox');
        expect(input).to.have.attribute('placeholder', 'Enter amount');
        expect(input.closest(`.${classes.root}`)).not.to.have.attribute('placeholder');
      });

      const variants = [
        { variant: undefined, expectedVariant: 'outlined', inputClass: 'MuiOutlinedInput-root' },
        { variant: 'filled', expectedVariant: 'filled', inputClass: 'MuiFilledInput-root' },
        { variant: 'standard', expectedVariant: 'standard', inputClass: 'MuiInput-root' },
      ] as const satisfies readonly {
        variant: NumberFieldProps['variant'];
        expectedVariant: NonNullable<NumberFieldProps['variant']>;
        inputClass: string;
      }[];

      variants.forEach(({ variant, expectedVariant, inputClass }) => {
        it(`renders the ${expectedVariant} Material input with variant=${variant}`, () => {
          render(<NumberField variant={variant} label="Amount" />);
          const input = screen.getByRole('textbox', { name: 'Amount' });
          const wrapper = input.closest('.MuiInputBase-root');
          expect(wrapper).to.have.class(inputClass);
        });
      });

      it.each([
        { label: undefined, hiddenLabel: undefined, expected: true },
        { label: false, hiddenLabel: undefined, expected: true },
        { label: 'Amount', hiddenLabel: undefined, expected: false },
        { label: undefined, hiddenLabel: false, expected: false },
      ])(
        'uses the filled hidden-label layout=$expected for label=$label and hiddenLabel=$hiddenLabel',
        ({ label, hiddenLabel, expected }) => {
          render(<NumberField variant="filled" label={label} hiddenLabel={hiddenLabel} />);
          const input = screen.getByRole('textbox');
          expect(input.closest('.MuiInputBase-hiddenLabel') !== null).to.equal(expected);
        },
      );

      it('forwards nondefault size, color and fullWidth to Material components', () => {
        render(<NumberField label="Amount" size="small" color="secondary" fullWidth />);
        const input = screen.getByRole('textbox', { name: 'Amount' });
        const wrapper = input.closest('.MuiInputBase-root')!;
        const root = input.closest(`.${classes.root}`)!;
        expect(root).to.have.class('MuiFormControl-fullWidth');
        expect(wrapper).to.have.class('MuiInputBase-fullWidth');
        expect(wrapper).to.have.class('MuiInputBase-sizeSmall');
        expect(wrapper).to.have.class('MuiInputBase-colorSecondary');
      });

      it('preserves Material error state when Base UI has no validation error', () => {
        render(
          <BaseField.Root invalid={false}>
            <NumberField label="Amount" error />
          </BaseField.Root>,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        expect(input).to.have.attribute('aria-invalid', 'true');
        expect(input.closest('.MuiInputBase-root')).to.have.class('Mui-error');
      });

      it('preserves Base UI validation errors when Material error is false', () => {
        render(
          <BaseField.Root invalid>
            <NumberField label="Amount" error={false} />
          </BaseField.Root>,
        );

        expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.attribute(
          'aria-invalid',
          'true',
        );
      });
    });

    // Observe the actual notch props through OutlinedInput's public slot so these
    // checks verify NumberField's prop precedence without depending on CSS geometry.
    describe('outlined label and notch', () => {
      const TestNotchedOutline = React.forwardRef<HTMLFieldSetElement, TestNotchedOutlineProps>(
        function TestNotchedOutline({ className, label, notched }, ref) {
          return (
            <fieldset
              ref={ref}
              className={className}
              aria-hidden
              data-testid="outline"
              data-notched={notched}
            >
              <legend>{label}</legend>
            </fieldset>
          );
        },
      );

      [
        { configuration: 'object', shrink: false },
        { configuration: 'callback', shrink: true },
      ].forEach(({ configuration, shrink }) => {
        it(`uses ${configuration} inputLabel.shrink=${shrink} for the outlined notch`, () => {
          render(
            <NumberField
              variant="outlined"
              label="Amount"
              // Make the automatic filled-state notch disagree with the explicit setting.
              defaultValue={shrink ? undefined : 5}
              slotProps={{
                inputLabel: configuration === 'object' ? { shrink } : () => ({ shrink }),
                input: { slots: { notchedOutline: TestNotchedOutline } },
              }}
            />,
          );

          expect(screen.getByText('Amount', { selector: 'label' })).to.have.attribute(
            'data-shrink',
            String(shrink),
          );
          expect(screen.getByTestId('outline')).to.have.attribute('data-notched', String(shrink));
          expect(screen.getByTestId('outline').querySelector('legend')).to.have.text('Amount');
        });
      });

      it('lets an explicit input.notched override inputLabel.shrink', () => {
        render(
          <NumberField
            label="Amount"
            slotProps={{
              inputLabel: { shrink: true },
              input: { notched: false, slots: { notchedOutline: TestNotchedOutline } },
            }}
          />,
        );

        expect(screen.getByTestId('outline')).to.have.attribute('data-notched', 'false');
      });
    });

    // Every slot callback should see normalized field props and resolved flags,
    // while formatted input text must not replace public numeric value props.
    describe('slot callback owner state', () => {
      it('exposes normalized defaults and the generated input ID to every slot callback', () => {
        const callbacks = createSlotCallbacks();
        render(
          <NumberField
            label="Amount"
            helperText="Helper text"
            scrubAreaPosition="start"
            slotProps={callbacks}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        Object.entries(callbacks).forEach(([slot, callback]) => {
          expect(callback, `slotProps.${slot}`).toHaveBeenCalled();
          expect(callback.mock.lastCall![0], `slotProps.${slot}`).to.include({
            variant: 'outlined',
            size: 'medium',
            color: 'primary',
            controlsPosition: 'end',
            autoFocus: false,
            disabled: false,
            error: false,
            fullWidth: false,
            required: false,
            readOnly: false,
            allowOutOfRange: false,
            allowWheelScrub: false,
            snapOnStep: false,
            scrubbing: false,
            id: input.id,
          });
        });
      });

      [
        { inheritedDisabled: true, required: true, readOnly: false },
        { inheritedDisabled: false, required: false, readOnly: true },
      ].forEach(({ inheritedDisabled, required, readOnly }) => {
        it(`exposes resolved disabled=${inheritedDisabled}, required=${required}, readOnly=${readOnly} to every slot callback`, () => {
          const callbacks = createSlotCallbacks();
          render(
            <BaseField.Root disabled={inheritedDisabled}>
              <NumberField
                label="Amount"
                helperText="Helper text"
                disabled={false}
                required={required}
                readOnly={readOnly}
                scrubAreaPosition="start"
                slotProps={callbacks}
              />
            </BaseField.Root>,
          );

          Object.entries(callbacks).forEach(([slot, callback]) => {
            expect(callback, `slotProps.${slot}`).toHaveBeenCalled();
            expect(callback.mock.lastCall![0], `slotProps.${slot}`).to.include({
              disabled: inheritedDisabled,
              required,
              readOnly,
            });
          });
        });
      });

      const cases = [
        {
          name: 'numeric value',
          props: { value: 1234.5 },
          expectedValue: 1234.5,
          displayValue: '$1,234.50',
        },
        {
          name: 'uncontrolled default',
          props: { defaultValue: 42 },
          expectedValue: undefined,
          displayValue: '$42.00',
        },
      ] satisfies {
        name: string;
        props: Pick<NumberFieldProps, 'value' | 'defaultValue'>;
        expectedValue: NumberFieldProps['value'];
        displayValue: string;
      }[];

      cases.forEach(({ name, props, expectedValue, displayValue }) => {
        it(`preserves public numeric props alongside formatted text for ${name}`, () => {
          const callbacks = createSlotCallbacks();
          render(
            <NumberField
              label="Amount"
              helperText="Helper text"
              locale="en-US"
              format={{ style: 'currency', currency: 'USD', useGrouping: true }}
              scrubAreaPosition="start"
              {...props}
              slotProps={callbacks}
            />,
          );
          expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value(displayValue);

          Object.entries(callbacks).forEach(([slot, callback]) => {
            expect(callback, `slotProps.${slot}`).toHaveBeenCalled();
            const ownerState = callback.mock.lastCall![0];
            expect(ownerState.value, `slotProps.${slot}.value`).to.equal(expectedValue);
            expect(ownerState.defaultValue, `slotProps.${slot}.defaultValue`).to.equal(
              'defaultValue' in props ? props.defaultValue : undefined,
            );
          });
        });
      });
    });
  });

  // Keep Base UI's resolved interaction flags aligned with Material's visual state.
  // Slot customization must preserve editing restrictions and native validation.
  describe('behavioral state', () => {
    const slotPropPaths = [
      { name: 'root', getSlotProps: (props) => ({ root: props }) },
      { name: 'input', getSlotProps: (props) => ({ input: () => props }) },
      { name: 'htmlInput', getSlotProps: (props) => ({ htmlInput: () => props }) },
    ] satisfies {
      name: string;
      getSlotProps: (
        props: Partial<Pick<NumberFieldOwnerState, 'disabled' | 'required' | 'readOnly'>>,
      ) => NumberFieldProps['slotProps'];
    }[];

    // Exercise conflicting flags at each prop path to catch late spreads that
    // override the field's disabled, required, or read-only behavior.
    describe('slot prop precedence', () => {
      slotPropPaths.forEach(({ name, getSlotProps }) => {
        // Each configuration path can introduce a later spread that changes resolved state.
        describe(`slotProps.${name}`, () => {
          [false, true].forEach((disabled) => {
            it(`preserves top-level disabled=${disabled} despite the opposite slot prop`, () => {
              render(
                <NumberField
                  label="Amount"
                  disabled={disabled}
                  slotProps={getSlotProps({ disabled: !disabled })}
                />,
              );
              const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });

              expect(input.disabled).to.equal(disabled);
              if (name === 'input') {
                expect(
                  input.closest('.MuiInputBase-root')!.classList.contains('Mui-disabled'),
                ).to.equal(disabled);
              }
              if (name === 'root') {
                expect(
                  screen
                    .getByText('Amount', { selector: 'label' })
                    .classList.contains('Mui-disabled'),
                ).to.equal(disabled);
              }
            });
          });

          [false, true].forEach((required) => {
            it(`preserves top-level required=${required} despite the opposite slot prop`, () => {
              render(
                <NumberField
                  label="Amount"
                  required={required}
                  slotProps={getSlotProps({ required: !required })}
                />,
              );
              const input = screen.getByRole<HTMLInputElement>('textbox', { name: /Amount/ });
              const label = screen.getByText('Amount', { selector: 'label' });

              expect(input.required).to.equal(required);
              if (name === 'root') {
                expect(label.classList.contains('Mui-required')).to.equal(required);
              }
            });
          });

          // FormControl does not have a readOnly prop; it applies to the Material and native inputs.
          if (name !== 'root') {
            [false, true].forEach((readOnly) => {
              it(`preserves top-level readOnly=${readOnly} despite the opposite slot prop`, () => {
                render(
                  <NumberField
                    label="Amount"
                    readOnly={readOnly}
                    slotProps={getSlotProps({ readOnly: !readOnly })}
                  />,
                );
                const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });

                expect(input.readOnly).to.equal(readOnly);
                if (name === 'input') {
                  expect(
                    input.closest('.MuiInputBase-root')!.classList.contains('Mui-readOnly'),
                  ).to.equal(readOnly);
                }
              });
            });
          }
        });
      });
    });

    // Resolved flag updates must reach Material components, including inherited flags.
    describe('prop updates', () => {
      (['NumberField prop', 'Base Field context'] as const).forEach((source) => {
        it(`updates Material disabled state from ${source} after mounting`, async () => {
          function Test() {
            const [disabled, setDisabled] = React.useState(false);
            const field = (
              <NumberField
                label="Amount"
                disabled={source === 'NumberField prop' ? disabled : false}
                slotProps={{
                  root: { disabled: false },
                  input: { disabled: false },
                  htmlInput: { disabled: false },
                }}
              />
            );

            return (
              <React.Fragment>
                <button type="button" onClick={() => setDisabled((previous) => !previous)}>
                  Toggle disabled
                </button>
                {source === 'Base Field context' ? (
                  <BaseField.Root disabled={disabled}>{field}</BaseField.Root>
                ) : (
                  field
                )}
              </React.Fragment>
            );
          }

          const { user } = render(<Test />);
          const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
          const wrapper = input.closest('.MuiInputBase-root')!;
          const label = screen.getByText('Amount', { selector: 'label' });
          const buttons = screen.getAllByRole<HTMLButtonElement>('button', {
            name: /Increase|Decrease/,
          });
          const toggle = screen.getByRole('button', { name: 'Toggle disabled' });
          const expectDisabledState = (disabled: boolean) => {
            expect(input.disabled).to.equal(disabled);
            expect(wrapper.classList.contains('Mui-disabled')).to.equal(disabled);
            expect(label.classList.contains('Mui-disabled')).to.equal(disabled);
            buttons.forEach((button) => expect(button.disabled).to.equal(disabled));
          };

          expectDisabledState(false);
          await user.click(toggle);
          expectDisabledState(true);
          await user.click(toggle);
          expectDisabledState(false);
        });
      });

      it('updates Material input and button availability when readOnly changes', async () => {
        function Test() {
          const [readOnly, setReadOnly] = React.useState(false);
          return (
            <React.Fragment>
              <button type="button" onClick={() => setReadOnly((previous) => !previous)}>
                Toggle read-only
              </button>
              <NumberField label="Amount" readOnly={readOnly} />
            </React.Fragment>
          );
        }

        const { user } = render(<Test />);
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
        const wrapper = input.closest('.MuiInputBase-root')!;
        const buttons = screen.getAllByRole<HTMLButtonElement>('button', {
          name: /Increase|Decrease/,
        });
        const toggle = screen.getByRole('button', { name: 'Toggle read-only' });
        const expectReadOnlyState = (readOnly: boolean) => {
          expect(input.readOnly).to.equal(readOnly);
          expect(input.disabled).to.equal(false);
          expect(wrapper.classList.contains('Mui-readOnly')).to.equal(readOnly);
          buttons.forEach((button) => expect(button.disabled).to.equal(readOnly));
        };

        expectReadOnlyState(false);
        await user.click(toggle);
        expectReadOnlyState(true);
        await user.click(toggle);
        expectReadOnlyState(false);
      });
    });
  });

  // Map Base UI availability and field size to the Material buttons and supply icons.
  describe('controls', () => {
    // The adapter must apply Base UI's resolved availability to IconButton,
    // even when consumer props try to re-enable a control.
    describe('availability', () => {
      it('keeps Material button availability aligned with the value limits', async () => {
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={1}
            min={0}
            max={1}
            slotProps={{
              incrementButton: { disabled: false },
              decrementButton: { disabled: false },
            }}
          />,
        );
        const increment = screen.getByRole<HTMLButtonElement>('button', { name: 'Increase' });
        const decrement = screen.getByRole<HTMLButtonElement>('button', { name: 'Decrease' });

        expect(increment.disabled).to.equal(true);
        expect(increment).to.have.class('Mui-disabled');
        expect(decrement.disabled).to.equal(false);

        await user.click(decrement);
        expect(increment.disabled).to.equal(false);
        expect(increment).not.to.have.class('Mui-disabled');
        expect(decrement.disabled).to.equal(true);
        expect(decrement).to.have.class('Mui-disabled');

        await user.click(increment);
        expect(decrement.disabled).to.equal(false);
        expect(decrement).not.to.have.class('Mui-disabled');
      });

      [
        { name: 'disabled', disabled: true, readOnly: false, inheritedDisabled: false },
        { name: 'read-only', disabled: false, readOnly: true, inheritedDisabled: false },
        { name: 'inherited disabled', disabled: false, readOnly: false, inheritedDisabled: true },
      ].forEach(({ name, disabled, readOnly, inheritedDisabled }) => {
        it(`cannot re-enable ${name} controls with disabled=false slot props`, () => {
          render(
            <BaseField.Root disabled={inheritedDisabled}>
              <NumberField
                disabled={disabled}
                readOnly={readOnly}
                slotProps={{
                  incrementButton: { disabled: false },
                  decrementButton: { disabled: false },
                }}
              />
            </BaseField.Root>,
          );
          screen.getAllByRole<HTMLButtonElement>('button').forEach((button) => {
            expect(button.disabled).to.equal(true);
            expect(button).to.have.class('Mui-disabled');
          });
        });
      });

      [
        { disabledSlot: 'incrementButton', disabledName: 'Increase', activeName: 'Decrease' },
        { disabledSlot: 'decrementButton', disabledName: 'Decrease', activeName: 'Increase' },
      ].forEach(({ disabledSlot, disabledName, activeName }) => {
        it(`disables ${disabledSlot} independently without blocking the other control`, () => {
          render(
            <NumberField
              slotProps={{
                incrementButton: { disabled: disabledSlot === 'incrementButton' },
                decrementButton: { disabled: disabledSlot === 'decrementButton' },
              }}
            />,
          );

          expect(
            screen.getByRole<HTMLButtonElement>('button', { name: disabledName }).disabled,
          ).to.equal(true);
          expect(
            screen.getByRole<HTMLButtonElement>('button', { name: activeName }).disabled,
          ).to.equal(false);
        });
      });
    });

    // Supply the appropriate icons and field size without replacing accessible names.
    describe('icons and size', () => {
      const iconCases = [
        { controlsPosition: 'end', incrementIcon: 'AddIcon', decrementIcon: 'RemoveIcon' },
        {
          controlsPosition: 'stacked',
          incrementIcon: 'KeyboardArrowUpIcon',
          decrementIcon: 'KeyboardArrowDownIcon',
        },
      ] as const;

      iconCases.forEach(({ controlsPosition, incrementIcon, decrementIcon }) => {
        it(`renders the default ${controlsPosition} icons and forwards the field size to both controls`, () => {
          render(<NumberField label="Amount" controlsPosition={controlsPosition} size="small" />);
          const increment = screen.getByRole('button', { name: 'Increase' });
          const decrement = screen.getByRole('button', { name: 'Decrease' });
          const incrementIconElement = screen.getByTestId(incrementIcon);
          const decrementIconElement = screen.getByTestId(decrementIcon);

          expect(increment).to.contain(incrementIconElement);
          expect(decrement).to.contain(decrementIconElement);
          for (const button of [increment, decrement]) {
            expect(button).to.have.class('MuiIconButton-sizeSmall');
          }
          for (const icon of [incrementIconElement, decrementIconElement]) {
            expect(icon).to.have.class('MuiSvgIcon-fontSizeInherit');
          }
        });
      });

      it.skipIf(isJsdom())('applies a size override only to the specified button', () => {
        render(<NumberField label="Amount" slotProps={{ incrementButton: { size: 'large' } }} />);

        const increment = screen.getByRole('button', { name: 'Increase' });
        const decrement = screen.getByRole('button', { name: 'Decrease' });

        expect(getComputedStyle(increment).paddingInlineStart).to.equal('12px');
        expect(getComputedStyle(decrement).paddingInlineStart).to.equal('6px');
      });

      it('replaces the default icons while preserving the button names', () => {
        render(
          <NumberField
            label="Amount"
            controlsPosition="stacked"
            slotProps={{
              incrementButton: { children: <span>Plus</span> },
              decrementButton: { children: <span>Minus</span> },
            }}
          />,
        );
        const increment = screen.getByRole('button', { name: 'Increase' });
        const decrement = screen.getByRole('button', { name: 'Decrease' });

        expect(increment).to.contain(screen.getByText('Plus'));
        expect(decrement).to.contain(screen.getByText('Minus'));
        expect(screen.queryByTestId('KeyboardArrowUpIcon')).to.equal(null);
        expect(screen.queryByTestId('KeyboardArrowDownIcon')).to.equal(null);
      });
    });
  });

  // Consumer button props must survive both useSlot and the Base UI render adapter.
  // Exercise each control's wiring without repeating the shared input variants.
  describe('button slot props', () => {
    const NativeButton = React.forwardRef<
      HTMLButtonElement,
      React.ComponentPropsWithoutRef<'button'>
    >(function NativeButton(props, ref) {
      return <button {...props} ref={ref} data-testid="button-component" />;
    });

    (
      [
        { slot: 'incrementButton', name: 'Increase', nextValue: 6 },
        { slot: 'decrementButton', name: 'Decrease', nextValue: 4 },
      ] as const
    ).forEach(({ slot, name, nextValue }) => {
      describe(`slotProps.${slot}`, () => {
        // Each button must retain its own render/replacement wiring and ref.
        describe('props and refs', () => {
          it('resolves callback props for a custom slot and preserves its ref and behavior', async () => {
            const ref = React.createRef<HTMLButtonElement>();
            const renderButton = vi.fn(() => <button />);
            const getSlotProps = (ownerState: NumberFieldOwnerState) => ({
              ref,
              render: renderButton,
              'aria-label': `Step ${ownerState.label}`,
            });
            const { user } = render(
              <NumberField
                label="Amount"
                defaultValue={5}
                slots={{ [slot]: TestIconButton }}
                slotProps={{ [slot]: getSlotProps }}
              />,
            );
            const button = screen.getByRole('button', { name: 'Step Amount' });
            const input = screen.getByRole('textbox', { name: 'Amount' });

            expect(button).to.equal(screen.getByTestId('custom'));
            expect(ref.current).to.equal(button);
            expect(renderButton).toHaveBeenCalledTimes(0);

            await user.click(button);

            expect(input).to.have.value(String(nextValue));
          });

          it('preserves Material styles, the ref and stepping with a render element', async () => {
            const ref = React.createRef<HTMLButtonElement>();
            const { user } = render(
              <NumberField
                label="Amount"
                defaultValue={5}
                slotProps={{
                  [slot]: { render: <NativeButton />, ref, sx: { paddingTop: '7px' } },
                }}
              />,
            );
            const button = screen.getByRole('button', { name });

            expect(button).to.equal(screen.getByTestId('button-component'));
            expect(button).to.have.class('MuiIconButton-root');
            expect(getComputedStyle(button).paddingTop).to.equal('7px');
            expect(ref.current).to.equal(button);
            await user.click(button);
            expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value(
              String(nextValue),
            );
          });

          it('passes live button state to render, including availability at a value limit', async () => {
            const renderButton: BaseNumberField.Increment.Props['render'] = (props, state) => (
              <button
                {...props}
                data-render-value={state.value}
                data-render-disabled={state.disabled}
              />
            );
            const { user } = render(
              <NumberField
                label="Amount"
                defaultValue={5}
                min={4}
                max={6}
                slotProps={{
                  [slot]: { render: renderButton },
                }}
              />,
            );
            const button = screen.getByRole('button', { name });

            expect(button).to.have.attribute('data-render-value', '5');
            expect(button).to.have.attribute('data-render-disabled', 'false');

            await user.click(button);

            expect(button).to.have.attribute('data-render-value', String(nextValue));
            expect(button).to.have.attribute('data-render-disabled', 'true');
            expect(button).to.have.class('Mui-disabled');
          });
        });
      });
    });

    // Both controls use the same adapter for activation and handler composition.
    describe('shared button behavior', () => {
      it('preserves Enter and Space activation for a Material button rendered as a link', async () => {
        const Link = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<'a'>>(
          function Link({ children, ...other }, ref) {
            return (
              <a {...other} href="#number-field-step" ref={ref}>
                {children}
              </a>
            );
          },
        );
        const onValueChange = vi.fn();
        const onValueCommitted = vi.fn();
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={5}
            onValueChange={onValueChange}
            onValueCommitted={onValueCommitted}
            slotProps={{ incrementButton: { render: <Link />, nativeButton: false, tabIndex: 0 } }}
          />,
        );
        expect(screen.getByRole('button', { name: 'Increase' }).tagName).to.equal('A');

        await user.tab();
        await user.tab();
        await user.keyboard('{Enter}');
        await user.keyboard(' ');

        expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value('7');
        expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([6, 7]);
        expect(onValueCommitted.mock.calls.map(([value]) => value)).to.deep.equal([6, 7]);
      });

      // Base UI owns activation on non-native steppers, including consumer cancellation.
      // Material must not synthesize another click when the composed handler returns.
      (['Enter', ' '] as const).forEach((key) => {
        // TODO: Re-enable the Enter case once https://github.com/mui/material-ui/pull/49850 lands.
        const test = it.skipIf(key === 'Enter');
        test(`allows a consumer to cancel non-native ${key === 'Enter' ? 'Enter' : 'Space'} stepping`, async () => {
          const onValueChange = vi.fn();
          const onValueCommitted = vi.fn();
          const cancelBase = vi.fn((event: BaseUIEvent<React.KeyboardEvent<HTMLButtonElement>>) => {
            if (event.key === key) {
              event.preventBaseUIHandler();
            }
          });
          const { user } = render(
            <NumberField
              label="Amount"
              defaultValue={5}
              onValueChange={onValueChange}
              onValueCommitted={onValueCommitted}
              slotProps={{
                incrementButton: {
                  render: <span />,
                  nativeButton: false,
                  tabIndex: 0,
                  onKeyDown: cancelBase,
                  onKeyUp: cancelBase,
                },
              }}
            />,
          );

          await user.tab();
          await user.tab();
          await user.keyboard(key === 'Enter' ? '{Enter}' : ' ');

          expect(cancelBase).toHaveBeenCalledWith(expect.objectContaining({ key }));
          expect(
            cancelBase.mock.calls.find(([event]) => event.key === key)![0].defaultPrevented,
          ).to.equal(true);
          expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value('5');
          expect(onValueChange).toHaveBeenCalledTimes(0);
          expect(onValueCommitted).toHaveBeenCalledTimes(0);
        });
      });

      // Host slots rely on Base UI for button semantics; Material replacements
      // add ButtonBase's own handlers, which must not duplicate activation.
      [
        { configuration: 'host slot', renderButton: undefined },
        { configuration: 'Material render element', renderButton: <span /> },
      ].forEach(({ configuration, renderButton }) => {
        // TODO: Re-enable the Material render case once https://github.com/mui/material-ui/pull/49850 lands.
        const test = it.skipIf(configuration === 'Material render element');
        test(`supports a non-native ${configuration} with one activation per gesture`, async () => {
          const onValueChange = vi.fn();
          const onValueCommitted = vi.fn();
          const { user } = render(
            <NumberField
              label="Amount"
              defaultValue={5}
              slots={renderButton ? undefined : { incrementButton: 'span' }}
              slotProps={{
                incrementButton: { nativeButton: false, tabIndex: 0, render: renderButton },
              }}
              onValueChange={onValueChange}
              onValueCommitted={onValueCommitted}
            />,
          );
          const button = screen.getByRole('button', { name: 'Increase' });
          const input = screen.getByRole('textbox', { name: 'Amount' });

          expect(button.tagName).to.equal('SPAN');
          expect(button).not.to.have.attribute('nativebutton');

          await user.tab();
          await user.tab();
          await user.keyboard('{Enter}');
          expect(input).to.have.value('6');

          await user.keyboard(' ');
          expect(input).to.have.value('7');

          await user.click(button);
          expect(input).to.have.value('8');

          const expectedValues = [6, 7, 8];
          expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal(expectedValues);
          expect(onValueCommitted.mock.calls.map(([value]) => value)).to.deep.equal(expectedValues);
        });
      });
      // Consumer handlers, cancellation and unset handlers pass through one adapter.
      describe('event composition', () => {
        it('preserves consumer pointer handlers alongside Base UI behavior', async () => {
          const calls: string[] = [];
          const targets: EventTarget[] = [];
          const record = (handler: string) => (event: React.SyntheticEvent<HTMLButtonElement>) => {
            calls.push(handler);
            targets.push(event.currentTarget);
          };
          const onValueCommitted = vi.fn();
          const { user } = render(
            <NumberField
              label="Amount"
              defaultValue={5}
              onValueCommitted={onValueCommitted}
              slotProps={{
                incrementButton: {
                  onPointerDown: record('pointerdown'),
                  onPointerUp: record('pointerup'),
                  onClick: record('click'),
                },
              }}
            />,
          );
          const button = screen.getByRole('button', { name: 'Increase' });
          const input = screen.getByRole('textbox', { name: 'Amount' });

          await user.click(button);
          expect(input).to.have.value('6');
          expect(calls).to.deep.equal(['pointerdown', 'pointerup', 'click']);
          expect(targets).to.deep.equal([button, button, button]);
          expect(onValueCommitted.mock.lastCall![0]).to.equal(6);
        });

        it('composes native Enter and Space clicks before Base UI changes the value', async () => {
          const calls: string[] = [];
          const targets: EventTarget[] = [];
          const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            calls.push('click');
            targets.push(event.currentTarget);
          };
          const { user } = render(
            <NumberField
              label="Amount"
              defaultValue={5}
              onValueChange={() => calls.push('change')}
              slotProps={{ incrementButton: { render: <button />, tabIndex: 0, onClick } }}
            />,
          );
          const button = screen.getByRole('button', { name: 'Increase' });

          await user.tab();
          await user.tab();
          expect(document.activeElement).to.equal(button);
          await user.keyboard('{Enter}');
          await user.keyboard(' ');

          expect(calls).to.deep.equal(['click', 'change', 'click', 'change']);
          expect(targets).to.deep.equal([button, button]);
          expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value('7');
        });

        it('allows the consumer pointer handler to prevent Base UI stepping', async () => {
          const onValueChange = vi.fn();
          const onValueCommitted = vi.fn();
          const onPointerDown = vi.fn((event: BaseUIEvent<React.PointerEvent<HTMLButtonElement>>) =>
            event.preventBaseUIHandler(),
          );
          const { user } = render(
            <NumberField
              label="Amount"
              defaultValue={5}
              onValueChange={onValueChange}
              onValueCommitted={onValueCommitted}
              slotProps={{ incrementButton: { onPointerDown } }}
            />,
          );

          await user.click(screen.getByRole('button', { name: 'Increase' }));

          expect(onPointerDown).toHaveBeenCalledTimes(1);
          expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value('5');
          expect(onValueChange).toHaveBeenCalledTimes(0);
          expect(onValueCommitted).toHaveBeenCalledTimes(0);
        });

        it('allows the consumer click handler to prevent keyboard stepping', async () => {
          const onValueChange = vi.fn();
          const onValueCommitted = vi.fn();
          const onClick = vi.fn((event: BaseUIEvent<React.MouseEvent<HTMLButtonElement>>) =>
            event.preventBaseUIHandler(),
          );
          const { user } = render(
            <NumberField
              label="Amount"
              defaultValue={5}
              onValueChange={onValueChange}
              onValueCommitted={onValueCommitted}
              slotProps={{ incrementButton: { tabIndex: 0, onClick } }}
            />,
          );
          const button = screen.getByRole('button', { name: 'Increase' });

          await user.tab();
          await user.tab();
          expect(document.activeElement).to.equal(button);
          await user.keyboard('{Enter}');

          expect(onClick).toHaveBeenCalledTimes(1);
          expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value('5');
          expect(onValueChange).toHaveBeenCalledTimes(0);
          expect(onValueCommitted).toHaveBeenCalledTimes(0);
        });

        [undefined, null].forEach((unsetValue) => {
          it(`preserves Base UI handlers when consumer handlers are ${unsetValue}`, async () => {
            // JavaScript consumers can pass null handlers, which React's types exclude.
            const buttonProps = {
              tabIndex: 0,
              onPointerDown: unsetValue,
              onPointerUp: unsetValue,
              onClick: unsetValue,
            } as IconButtonProps;
            const onValueChange = vi.fn();
            const onValueCommitted = vi.fn();
            const { user } = render(
              <NumberField
                label="Amount"
                defaultValue={5}
                onValueChange={onValueChange}
                onValueCommitted={onValueCommitted}
                slotProps={{ incrementButton: buttonProps }}
              />,
            );

            const button = screen.getByRole('button', { name: 'Increase' });
            const input = screen.getByRole('textbox', { name: 'Amount' });

            await user.click(button);

            expect(input).to.have.value('6');
            expect(onValueChange).toHaveBeenCalledTimes(1);
            expect(onValueCommitted).toHaveBeenCalledTimes(1);

            await user.tab();
            expect(document.activeElement).to.equal(button);
            await user.keyboard('{Enter}');

            expect(input).to.have.value('7');
            expect(onValueChange).toHaveBeenCalledTimes(2);
            expect(onValueCommitted).toHaveBeenCalledTimes(2);
          });
        });
      });
    });
  });

  // Controls must occupy the requested adornment, with consumer adornments kept
  // beside the input. Stacked controls put increment above decrement; horizontal
  // controls keep decrement first. Check DOM order and grouping independently of CSS.
  describe('controls placement', () => {
    // Stacked buttons fill the input height without increasing it or narrowing the controls.
    // Variants and sizes have different available heights, so exercise each geometry.
    (['outlined', 'filled', 'standard'] as const).forEach((variant) => {
      (['small', 'medium'] as const).forEach((size) => {
        it.skipIf(isJsdom())(`fits stacked controls within the ${size} ${variant} input`, () => {
          render(
            <React.Fragment>
              <NumberField label="End" variant={variant} size={size} defaultValue={5} />
              <NumberField
                label="Stacked"
                variant={variant}
                size={size}
                defaultValue={5}
                controlsPosition="stacked"
              />
            </React.Fragment>,
          );
          const endInput = screen.getByRole('textbox', { name: 'End' });
          const stackedInput = screen.getByRole('textbox', { name: 'Stacked' });
          const wrapper = stackedInput.closest('.MuiInputBase-root')!;
          const group = wrapper.querySelector(`.${classes.controls}`)!;
          const increment = group
            .querySelector(`.${classes.incrementButton}`)!
            .getBoundingClientRect();
          const decrement = group
            .querySelector(`.${classes.decrementButton}`)!
            .getBoundingClientRect();
          const wrapperRect = wrapper.getBoundingClientRect();
          const endButtonRect = endInput
            .closest('.MuiInputBase-root')!
            .querySelector(`.${classes.incrementButton}`)!
            .getBoundingClientRect();

          expect(wrapperRect.height).to.equal(
            endInput.closest('.MuiInputBase-root')!.getBoundingClientRect().height,
          );
          expect(increment.left).to.equal(decrement.left);
          expect(increment.bottom).to.be.closeTo(decrement.top, 0.01);
          expect(increment.top).to.be.closeTo(wrapperRect.top, 0.01);
          expect(decrement.bottom).to.be.closeTo(wrapperRect.bottom, 0.01);
          expect(increment.height).to.be.closeTo(wrapperRect.height / 2, 0.1);
          expect(decrement.height).to.be.closeTo(wrapperRect.height / 2, 0.1);
          expect(increment.width).to.equal(decrement.width);
          expect(increment.width).to.be.at.least(endButtonRect.width);
        });
      });
    });

    it('renders no buttons when controlsPosition is false', () => {
      render(<NumberField label="Amount" controlsPosition={false} />);

      expect(screen.queryByRole('button', { name: 'Increase' })).to.equal(null);
      expect(screen.queryByRole('button', { name: 'Decrease' })).to.equal(null);
    });

    it('falls back to end placement for invalid controlsPosition in theme defaults', () => {
      const theme = createTheme({
        components: {
          MuiNumberField: {
            defaultProps: {
              // @ts-expect-error Test an invalid value from JavaScript configuration.
              controlsPosition: 'invalid',
            },
          },
        },
      });
      render(
        <ThemeProvider theme={theme}>
          <NumberField label="Amount" />
        </ThemeProvider>,
      );

      const input = screen.getByRole('textbox', { name: 'Amount' });
      const [decrease, increase] = screen.getAllByRole('button');
      expect(decrease).to.have.attribute('aria-label', 'Decrease');
      expect(increase).to.have.attribute('aria-label', 'Increase');

      const group = decrease.parentElement;
      expect(increase.parentElement).to.equal(group);
      expect(group).to.have.class('MuiInputAdornment-positionEnd');
      expect(input.compareDocumentPosition(group!)).to.equal(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    const placements = [
      {
        controlsPosition: undefined,
        startButtons: [],
        endButtons: ['Decrease', 'Increase'],
      },
      {
        controlsPosition: 'stacked',
        startButtons: [],
        endButtons: ['Increase', 'Decrease'],
      },
      {
        controlsPosition: 'split',
        startButtons: ['Decrease'],
        endButtons: ['Increase'],
      },
    ] as const;

    placements.forEach(({ controlsPosition, startButtons, endButtons }) => {
      it(`composes consumer adornments with controlsPosition=${controlsPosition ?? 'default'}`, () => {
        render(
          <NumberField
            label="Amount"
            controlsPosition={controlsPosition}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <button type="button">Start action</button>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <button type="button">End action</button>
                  </InputAdornment>
                ),
              },
            }}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });
        const wrapper = input.closest('.MuiInputBase-root')!;
        const buttons = {
          Increase: screen.getByRole('button', { name: 'Increase' }),
          Decrease: screen.getByRole('button', { name: 'Decrease' }),
        };
        const startAction = screen.getByRole('button', { name: 'Start action' });
        const endAction = screen.getByRole('button', { name: 'End action' });
        const expectedStartButtons = startButtons.map((name) => buttons[name]);
        const expectedEndButtons = endButtons.map((name) => buttons[name]);

        expect(
          Array.from(wrapper.querySelectorAll('button, input:not([type="hidden"])')),
        ).to.deep.equal([
          ...expectedStartButtons,
          startAction,
          input,
          endAction,
          ...expectedEndButtons,
        ]);

        // The built-in groups must contain only their own buttons, leaving consumer
        // adornments outside those groups even when they share the same input side.
        const groups = Array.from(wrapper.querySelectorAll(`.${classes.controls}`));
        const expectedGroups = [
          ...(startButtons.length
            ? [{ positionClass: 'MuiInputAdornment-positionStart', buttons: expectedStartButtons }]
            : []),
          ...(endButtons.length
            ? [{ positionClass: 'MuiInputAdornment-positionEnd', buttons: expectedEndButtons }]
            : []),
        ];

        expect(groups).to.have.length(expectedGroups.length);
        expectedGroups.forEach(({ positionClass, buttons: groupButtons }, index) => {
          expect(groups[index]).to.have.class(positionClass);
          expect(Array.from(groups[index].querySelectorAll('button'))).to.deep.equal(groupButtons);
        });
      });
    });

    it('preserves the input and its adornments when controls move or are removed', async () => {
      function Test({ controlsPosition }: Pick<NumberFieldProps, 'controlsPosition'>) {
        return (
          <NumberField
            label="Amount"
            defaultValue={5}
            controlsPosition={controlsPosition}
            slotProps={{
              input: {
                startAdornment: <input aria-label="Prefix" />,
                endAdornment: <input aria-label="Suffix" />,
              },
            }}
          />
        );
      }

      const { user, rerender } = render(<Test controlsPosition="end" />);
      const input = screen.getByRole('textbox', { name: 'Amount' });

      await user.clear(input);
      await user.keyboard('8');
      await user.type(screen.getByRole('textbox', { name: 'Prefix' }), '$');
      await user.type(screen.getByRole('textbox', { name: 'Suffix' }), 'kg');

      const moveAndCheckControls = async (
        position: NonNullable<NumberFieldProps['controlsPosition']>,
      ) => {
        rerender(<Test controlsPosition={position} />);

        expect(screen.getByRole('textbox', { name: 'Amount' })).to.equal(input);
        expect(input).to.have.value('8');
        expect(screen.getByRole('textbox', { name: 'Prefix' })).to.have.value('$');
        expect(screen.getByRole('textbox', { name: 'Suffix' })).to.have.value('kg');
        if (position === false) {
          expect(screen.queryByRole('button', { name: 'Increase' })).to.equal(null);
          expect(screen.queryByRole('button', { name: 'Decrease' })).to.equal(null);
          return;
        }

        const increment = screen.getByRole('button', { name: 'Increase' });
        const decrement = screen.getByRole('button', { name: 'Decrease' });

        expect(increment.closest(`.${classes.controls}`)).to.have.class(
          'MuiInputAdornment-positionEnd',
        );
        expect(decrement.closest(`.${classes.controls}`)).to.have.class(
          position === 'split'
            ? 'MuiInputAdornment-positionStart'
            : 'MuiInputAdornment-positionEnd',
        );
        expect(increment).to.contain(
          screen.getByTestId(position === 'stacked' ? 'KeyboardArrowUpIcon' : 'AddIcon'),
        );
        expect(decrement).to.contain(
          screen.getByTestId(position === 'stacked' ? 'KeyboardArrowDownIcon' : 'RemoveIcon'),
        );

        await user.click(increment);
        expect(input).to.have.value('9');
        await user.click(decrement);
        expect(input).to.have.value('8');
      };

      await moveAndCheckControls('stacked');
      await moveAndCheckControls('split');
      await moveAndCheckControls('end');
      await moveAndCheckControls(false);
    });
  });

  // Compare icon edges with an unadorned input's text inset. The cases cover each
  // variant/size and outer controls, scrub-only sides, and controls sharing a side.
  describe.skipIf(isJsdom())('side padding', () => {
    const cases = [
      {
        variant: 'outlined',
        size: 'medium',
        controlsPosition: 'split',
        scrubAreaPosition: 'start',
      },
      { variant: 'outlined', size: 'small', controlsPosition: 'end', scrubAreaPosition: 'start' },
      {
        variant: 'filled',
        size: 'medium',
        controlsPosition: 'stacked',
        scrubAreaPosition: 'start',
      },
      { variant: 'filled', size: 'small', controlsPosition: false, scrubAreaPosition: 'end' },
      { variant: 'standard', size: 'medium', controlsPosition: 'split', scrubAreaPosition: 'end' },
      { variant: 'standard', size: 'small', controlsPosition: false, scrubAreaPosition: 'start' },
    ] satisfies Pick<
      NumberFieldProps,
      'variant' | 'size' | 'controlsPosition' | 'scrubAreaPosition'
    >[];

    cases.forEach(({ variant, size, controlsPosition, scrubAreaPosition }) => {
      it(`aligns ${size} ${variant}, controls=${controlsPosition}, scrub=${scrubAreaPosition}`, () => {
        render(
          <React.Fragment>
            <NumberField label="Plain" variant={variant} size={size} controlsPosition={false} />
            <NumberField
              label="Adorned"
              variant={variant}
              size={size}
              controlsPosition={controlsPosition}
              scrubAreaPosition={scrubAreaPosition}
            />
          </React.Fragment>,
        );
        const plainInput = screen.getByRole('textbox', { name: 'Plain' });
        const plainRoot = plainInput.closest('.MuiInputBase-root')!.getBoundingClientRect();
        const plainRect = plainInput.getBoundingClientRect();
        const plainStyle = getComputedStyle(plainInput);
        const startInset = plainRect.left - plainRoot.left + parseFloat(plainStyle.paddingLeft);
        const endInset = plainRoot.right - plainRect.right + parseFloat(plainStyle.paddingRight);
        const adornedRoot = screen
          .getByRole('textbox', { name: 'Adorned' })
          .closest('.MuiInputBase-root')!;
        const adornedRect = adornedRoot.getBoundingClientRect();
        let startSlot = scrubAreaPosition === 'start' ? classes.scrubArea : null;
        let endSlot = scrubAreaPosition === 'end' ? classes.scrubArea : null;
        if (controlsPosition === 'split') {
          startSlot = classes.decrementButton;
        }
        if (controlsPosition !== false) {
          endSlot = classes.incrementButton;
        }

        if (startSlot) {
          const icon = adornedRoot.querySelector(`.${startSlot} svg`)!.getBoundingClientRect();
          expect(icon.left - adornedRect.left).to.be.closeTo(startInset, 0.5);
        }
        if (endSlot) {
          const icon = adornedRoot.querySelector(`.${endSlot} svg`)!.getBoundingClientRect();
          expect(adornedRect.right - icon.right).to.be.closeTo(endInset, 0.5);
        }
      });
    });
  });

  // One slot serves both sides. Resolve its props per instance so split controls
  // can use distinct refs/styles while retaining the owned buttons and field state.
  describe('controls slot', () => {
    it('resolves each position independently and preserves styles, refs and live render state', async () => {
      const startRef = React.createRef<HTMLDivElement>();
      const endRef = React.createRef<HTMLDivElement>();
      const { user } = render(
        <NumberField
          label="Amount"
          defaultValue={5}
          controlsPosition="split"
          slotProps={{
            controls: ({ position }) => ({
              title: `${position} controls`,
              ref: position === 'start' ? startRef : endRef,
              sx: { paddingTop: position === 'start' ? '3px' : '5px' },
              render: (props, state) => <section {...props} data-render-value={state.value} />,
            }),
          }}
        />,
      );
      const start = screen.getByTitle('start controls');
      const end = screen.getByTitle('end controls');
      const input = screen.getByRole('textbox', { name: 'Amount' });

      expect(startRef.current).to.equal(start);
      expect(endRef.current).to.equal(end);
      expect(start.tagName).to.equal('SECTION');
      expect(end.tagName).to.equal('SECTION');
      expect(start).to.have.class('MuiInputAdornment-positionStart');
      expect(end).to.have.class('MuiInputAdornment-positionEnd');
      expect(getComputedStyle(start).paddingTop).to.equal('3px');
      expect(getComputedStyle(end).paddingTop).to.equal('5px');

      await user.click(screen.getByRole('button', { name: 'Decrease' }));

      expect(input).to.have.value('4');
      expect(start).to.have.attribute('data-render-value', '4');
      expect(end).to.have.attribute('data-render-value', '4');
    });

    it('lets a replacement slot bypass render while preserving the owned buttons', async () => {
      const renderControls = vi.fn(() => <section />);
      const { user } = render(
        <NumberField
          label="Amount"
          defaultValue={5}
          slots={{ controls: TestAdornment }}
          slotProps={{ controls: { render: renderControls, children: 'Replacement content' } }}
        />,
      );
      const controls = screen.getByTestId('custom');
      const increment = screen.getByRole('button', { name: 'Increase' });

      expect(controls).to.contain(increment);
      expect(screen.queryByText('Replacement content')).to.equal(null);
      expect(renderControls).toHaveBeenCalledTimes(0);

      await user.click(increment);
      expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value('6');
    });
  });

  // Protect the Base-owned visible input and form input from consumer children,
  // which would otherwise break editing, accessibility links, and submission.
  describe('root children ownership', () => {
    [
      { name: 'top-level children', props: { children: 'Replacement' } },
      { name: 'root slot children', props: { slotProps: { root: { children: 'Replacement' } } } },
    ].forEach(({ name, props }) => {
      it(`preserves the owned inputs when passed ${name}`, async () => {
        const { user } = render(
          <form aria-label="Number form">
            <NumberField label="Amount" name="amount" defaultValue={5} {...props} />
          </form>,
        );
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
        const form = screen.getByRole<HTMLFormElement>('form', { name: 'Number form' });

        expect(screen.queryByText('Replacement')).to.equal(null);

        await user.click(input);
        await user.keyboard('{ArrowUp}');

        expect(input).to.have.value('6');
        expect(new FormData(form).getAll('amount')).to.deep.equal(['6']);
      });
    });
  });

  // Resolve Material and native consumer configurations before composing Base UI
  // behavior, so later InputBase spreads preserve the chosen handlers and refs.
  describe('input slot props', () => {
    it('preserves the formatted single-line input with conflicting slot props', async () => {
      const conflictingProps = { value: '99', defaultValue: '42', type: 'number' };
      const slotProps = {
        input: { ...conflictingProps, multiline: true, rows: 3, minRows: 2, maxRows: 4 },
        htmlInput: () => conflictingProps,
      };
      const { user } = render(
        <NumberField
          defaultValue={1000}
          locale="en-US"
          format={{ useGrouping: true }}
          // @ts-expect-error Exercise unsupported props passed from JavaScript.
          slotProps={slotProps}
        />,
      );
      const input = screen.getByRole<HTMLInputElement>('textbox');
      expect(input.tagName).to.equal('INPUT');
      expect(input.type).to.equal('text');
      expect(input).not.to.have.attribute('rows');
      expect(input).to.have.value('1,000');

      await user.type(input, '{ArrowUp}');
      expect(input).to.have.value('1,001');
    });

    // Replacing the Material wrapper or native input must retain the refs and event
    // wiring that connect Base UI editing with Material focus and styling.
    describe('input customization', () => {
      it('ignores component in input slot props and preserves Material rendering', () => {
        const unsupportedComponentProps = { component: 'article' };
        render(
          <NumberField
            label="Amount"
            slotProps={{
              input: {
                ...unsupportedComponentProps,
                render: <section data-testid="material-input" />,
              },
              htmlInput: {
                ...unsupportedComponentProps,
                render: <input />,
              },
            }}
          />,
        );

        expect(screen.getByTestId('material-input')).to.have.class('MuiInputBase-root');
        expect(screen.getByRole('textbox', { name: 'Amount' }).tagName).to.equal('INPUT');
      });

      // Each variant supplies a different styled native input. Rendering another
      // element must keep that layer rather than replace it with an unstyled input.
      (['outlined', 'filled', 'standard'] as const).forEach((variant) => {
        it(`preserves ${variant} input styles through both render adapters`, () => {
          render(
            <React.Fragment>
              <NumberField label="Reference" variant={variant} />
              <NumberField
                label="Amount"
                variant={variant}
                slotProps={{
                  input: { render: <section /> },
                  htmlInput: { render: <input /> },
                }}
              />
            </React.Fragment>,
          );
          const reference = screen.getByRole('textbox', { name: 'Reference' });
          const input = screen.getByRole('textbox', { name: 'Amount' });

          expect(input.closest('.MuiInputBase-root')!.tagName).to.equal('SECTION');
          expect(getComputedStyle(input).padding).to.equal(getComputedStyle(reference).padding);
        });
      });

      it('connects render callbacks to live state and refs even with a themed input root', async () => {
        const wrapperRef = React.createRef<HTMLDivElement>();
        const inputRef = React.createRef<HTMLInputElement>();
        const theme = createTheme({
          components: {
            MuiNumberField: { styleOverrides: { input: { paddingRight: 9 } } },
            MuiOutlinedInput: { defaultProps: { slots: { root: 'article' } } },
          },
        });
        const { user } = render(
          <ThemeProvider theme={theme}>
            <NumberField
              label="Amount"
              defaultValue={5}
              inputRef={inputRef}
              slotProps={{
                input: {
                  ref: wrapperRef,
                  render: (props, state) => <section {...props} data-render-value={state.value} />,
                },
                htmlInput: {
                  render: (props, state) => <input {...props} data-render-value={state.value} />,
                },
              }}
            />
          </ThemeProvider>,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });
        const wrapper = screen.getByRole('group');

        expect(wrapper.tagName).to.equal('SECTION');
        expect(wrapperRef.current).to.equal(wrapper);
        expect(inputRef.current).to.equal(input);
        expect(getComputedStyle(wrapper).position).to.equal('relative');
        expect(getComputedStyle(wrapper).paddingRight).to.equal('9px');

        await user.clear(input);
        await user.keyboard('7');
        await user.click(screen.getByRole('button', { name: 'Increase' }));

        expect(input).to.have.value('8');
        expect(document.activeElement).to.equal(input);
        expect(wrapper).to.have.attribute('data-render-value', '8');
        expect(input).to.have.attribute('data-render-value', '8');
      });

      it('preserves click-to-focus and handlers on the shared input root', async () => {
        const onClick = vi.fn();
        const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLDivElement>) => {
          expect(event.currentTarget).to.equal(screen.getByRole('group'));
        });
        const { user } = render(
          <NumberField
            label="Amount"
            slotProps={{ input: { onClick, slotProps: { root: { onKeyDown } } } }}
          />,
        );

        await user.click(screen.getByRole('group'));

        expect(screen.getByRole('textbox', { name: 'Amount' })).toHaveFocus();
        expect(onClick).toHaveBeenCalledTimes(1);
        await user.keyboard('{F2}');
        expect(onKeyDown).toHaveBeenCalledTimes(1);
      });

      const MaterialInputRoot = React.forwardRef<
        HTMLElement,
        React.ComponentPropsWithoutRef<'section'> & {
          ownerState?: { endAdornment?: React.ReactNode };
        }
      >(function MaterialInputRoot({ ownerState, ...other }, ref) {
        return (
          <section {...other} ref={ref} data-adorned-end={Boolean(ownerState?.endAdornment)} />
        );
      });

      (['slotProps', 'theme'] as const).forEach((source) => {
        it(`preserves a custom Material input root configured through ${source}`, () => {
          const theme = createTheme({
            components:
              source === 'theme'
                ? { MuiOutlinedInput: { defaultProps: { slots: { root: MaterialInputRoot } } } }
                : {},
          });
          render(
            <ThemeProvider theme={theme}>
              <NumberField
                label="Amount"
                slotProps={{
                  input: {
                    ...(source === 'slotProps' && {
                      slots: { root: MaterialInputRoot },
                      render: <article />,
                    }),
                    slotProps: { root: { id: 'amount-root' } },
                  },
                }}
              />
            </ThemeProvider>,
          );
          const group = screen.getByRole('group');

          expect(group.tagName).to.equal('SECTION');
          expect(group).to.have.attribute('id', 'amount-root');
          expect(group).to.have.attribute('data-adorned-end', 'true');
          expect(group).to.equal(screen.getByRole('textbox').closest('.MuiInputBase-root'));
        });
      });

      it('uses the themed root of a replacement input and skips the input render callbacks', () => {
        const renderInput = vi.fn(() => <section />);
        const renderHtmlInput = vi.fn(() => <input />);
        const theme = createTheme({
          components: {
            MuiOutlinedInput: { defaultProps: { slots: { root: 'article' } } },
            MuiFilledInput: { defaultProps: { slots: { root: MaterialInputRoot } } },
          },
        });
        render(
          <ThemeProvider theme={theme}>
            <NumberField
              slots={{ input: FilledInput, htmlInput: TestHtmlInput }}
              slotProps={{
                input: { render: renderInput },
                htmlInput: { render: renderHtmlInput },
              }}
            />
          </ThemeProvider>,
        );

        const group = screen.getByRole('group');
        expect(group.tagName).to.equal('SECTION');
        expect(group).to.have.attribute('data-adorned-end', 'true');
        expect(renderInput).toHaveBeenCalledTimes(0);
        expect(renderHtmlInput).toHaveBeenCalledTimes(0);
      });

      it('preserves editing, handlers and refs with custom Material and native inputs', async () => {
        const wrapperRef = React.createRef<HTMLDivElement>();
        const inputRef = React.createRef<HTMLInputElement>();
        const nativeRef = React.createRef<HTMLInputElement>();
        const onValueChange = vi.fn();
        const onChange = vi.fn();
        const keyEvents: [string, HTMLInputElement][] = [];
        const recordKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
          keyEvents.push([event.type, event.currentTarget]);
        };
        const wrapperProps = { ref: wrapperRef, 'data-testid': 'material-input' };
        const nativeProps = {
          ref: nativeRef,
          onKeyDown: recordKey,
          onKeyUp: recordKey,
          onChange,
          'data-testid': 'native-input',
        };
        const { user } = render(
          <React.Fragment>
            <NumberField
              label="Amount"
              defaultValue={5}
              inputRef={inputRef}
              onValueChange={onValueChange}
              slots={{ input: TestInput, htmlInput: TestHtmlInput }}
              slotProps={{
                input: wrapperProps,
                htmlInput: nativeProps,
              }}
            />
            <button type="button">Outside</button>
          </React.Fragment>,
        );
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });

        const wrapper = screen.getByTestId('material-input');
        expect(screen.getByTestId('native-input')).to.equal(input);
        expect(wrapper).to.contain(input);
        expect(wrapperRef.current).to.equal(wrapper);
        expect(inputRef.current).to.equal(input);
        expect(nativeRef.current).to.equal(input);

        await user.click(input);
        await user.keyboard('{ArrowUp}');
        expect(input).to.have.value('6');
        expect(keyEvents).to.deep.equal([
          ['keydown', input],
          ['keyup', input],
        ]);
        await user.clear(input);
        await user.keyboard('8');
        expect(input).to.have.value('8');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([6, null, 8]);

        // A control press uses Base UI's internal input ref to restore focus.
        await user.click(screen.getByRole('button', { name: 'Outside' }));
        expect(input).not.to.equal(document.activeElement);
        await user.click(screen.getByRole('button', { name: 'Increase' }));
        expect(input).to.equal(document.activeElement);
        expect(input).to.have.value('9');
        expect(inputRef.current).to.equal(input);
        expect(nativeRef.current).to.equal(input);
        expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([6, null, 8, 9]);
      });
    });

    describe('native input props', () => {
      it('ignores native props and keyboard handlers on the Material wrapper and preserves its root props', async () => {
        const ignoredRef = React.createRef<HTMLInputElement>();
        const nativeRef = React.createRef<HTMLInputElement>();
        const ignoredKeyHandler = vi.fn();
        const wrapperProps = {
          onKeyDown: ignoredKeyHandler,
          onKeyUp: ignoredKeyHandler,
          inputProps: { placeholder: 'Ignored placeholder', ref: ignoredRef },
          slotProps: {
            input: { title: 'Ignored title', ref: ignoredRef },
            root: { title: 'Material input' },
          },
        };
        const { user } = render(
          <NumberField
            defaultValue={5}
            slotProps={{
              // @ts-expect-error Exercise unsupported props passed from JavaScript.
              input: () => wrapperProps,
              htmlInput: { ref: nativeRef, 'aria-label': 'Amount' },
            }}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        expect(input).not.to.have.attribute('placeholder');
        expect(input).not.to.have.attribute('title');
        expect(nativeRef.current).to.equal(input);
        expect(ignoredRef.current).to.equal(null);
        expect(screen.getByTitle('Material input')).to.contain(input);

        await user.type(input, '{ArrowUp}');
        expect(input).to.have.value('6');
        expect(ignoredKeyHandler).toHaveBeenCalledTimes(0);
      });

      it('lets the Material input override the public placeholder', () => {
        render(
          <NumberField
            placeholder="Public placeholder"
            slotProps={{ input: { placeholder: 'Material placeholder' } }}
          />,
        );

        expect(screen.getByRole('textbox')).to.have.attribute(
          'placeholder',
          'Material placeholder',
        );
      });

      it('keeps stepping when native keyboard handlers are explicitly undefined', async () => {
        const { user } = render(
          <NumberField
            defaultValue={5}
            slotProps={{ htmlInput: { onKeyDown: undefined, onKeyUp: undefined } }}
          />,
        );
        const input = screen.getByRole('textbox');
        await user.type(input, '{ArrowUp}');
        expect(input).to.have.value('6');
      });

      it('lets the native keydown handler cancel stepping', async () => {
        const onValueChange = vi.fn();
        const { user } = render(
          <NumberField
            defaultValue={5}
            onValueChange={onValueChange}
            slotProps={{
              htmlInput: {
                onKeyDown: (event) => {
                  if (event.key === 'ArrowUp') {
                    event.preventBaseUIHandler();
                  }
                },
              },
            }}
          />,
        );

        const input = screen.getByRole('textbox');
        await user.type(input, '{ArrowUp}');

        expect(input).to.have.value('5');
        expect(onValueChange).toHaveBeenCalledTimes(0);

        await user.keyboard('{ArrowDown}');
        expect(input).to.have.value('4');
      });
    });
  });

  // Keep wrapper events and native input callbacks on their intended elements
  // while preserving Material form state and Base UI value commits.
  describe('input events', () => {
    // The native input, Material wrapper and field root must receive their own
    // handlers rather than duplicating forwarded props on the wrong element.
    describe('wrapper and native events', () => {
      it('preserves handler targets and order from the native input to the field root', async () => {
        const calls: {
          handler: string;
          currentTarget: HTMLElement;
          target: EventTarget;
        }[] = [];
        const record = (handler: string) => (event: React.MouseEvent<HTMLElement>) => {
          calls.push({ handler, currentTarget: event.currentTarget, target: event.target });
        };
        const { user } = render(
          <NumberField
            onClick={record('root')}
            slotProps={{
              input: {
                onClick: record('wrapper'),
                slotProps: { root: { title: 'Material input' } },
              },
              htmlInput: { onClick: record('native') },
            }}
          />,
        );
        const input = screen.getByRole<HTMLInputElement>('textbox');
        const wrapper = screen.getByTitle('Material input');
        const root = input.closest<HTMLElement>(`.${classes.root}`)!;

        await user.click(input);

        expect(calls).to.deep.equal([
          { handler: 'native', currentTarget: input, target: input },
          { handler: 'wrapper', currentTarget: wrapper, target: input },
          { handler: 'root', currentTarget: root, target: input },
        ]);
      });
    });

    // Compose public, Material, and native callbacks in the expected order without
    // losing FormControl focus/filled state or Base UI editing and commit behavior.
    describe('focus, blur and change handlers', () => {
      it('lets Material input focus and blur handlers override the public handlers', async () => {
        const publicHandler = vi.fn();
        const targets: HTMLElement[] = [];
        const slotHandler = (event: React.FocusEvent<HTMLElement>) => {
          targets.push(event.currentTarget);
        };
        const { user } = render(
          <NumberField
            onFocus={publicHandler}
            onBlur={publicHandler}
            slotProps={{ input: { onFocus: slotHandler, onBlur: slotHandler } }}
          />,
        );
        const input = screen.getByRole('textbox');

        await user.click(input);
        await user.tab();

        expect(targets).to.deep.equal([input, input]);
        expect(publicHandler).toHaveBeenCalledTimes(0);
      });

      it('composes native callbacks while preserving Material callback order and state', async () => {
        const calls: string[] = [];
        const targets: HTMLElement[] = [];
        const record = (name: string) => (event: React.SyntheticEvent<HTMLElement>) => {
          calls.push(name);
          targets.push(event.currentTarget);
        };
        const onValueCommitted = vi.fn();
        const { user } = render(
          <NumberField
            label="Amount"
            onFocus={record('public focus')}
            onBlur={record('public blur')}
            onValueCommitted={onValueCommitted}
            slotProps={{
              htmlInput: {
                onFocus: record('native focus'),
                onBlur: record('native blur'),
                onChange: record('native change'),
              },
              input: { onChange: record('Material change') },
            }}
          />,
        );
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
        const label = screen.getByText('Amount', { selector: 'label' });

        await user.click(input);
        expect(label).to.have.class('Mui-focused');
        await user.keyboard('4');
        await user.tab();

        expect(input).to.have.value('4');
        expect(label).not.to.have.class('Mui-focused');
        expect(label).to.have.attribute('data-shrink', 'true');
        expect(calls).to.deep.equal([
          'public focus',
          'native focus',
          'native change',
          'Material change',
          'public blur',
          'native blur',
        ]);
        expect(targets).to.deep.equal(Array(6).fill(input));
        expect(onValueCommitted).toHaveBeenCalledTimes(1);
        expect(onValueCommitted.mock.calls[0][0]).to.equal(4);
      });

      it('preserves editing and commits when native callbacks are explicitly undefined', async () => {
        const materialChange = vi.fn();
        const onValueChange = vi.fn();
        const onValueCommitted = vi.fn();
        const { user } = render(
          <NumberField
            onValueChange={onValueChange}
            onValueCommitted={onValueCommitted}
            slotProps={{
              htmlInput: { onFocus: undefined, onBlur: undefined, onChange: undefined },
              input: { onChange: materialChange },
            }}
          />,
        );
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await user.click(input);
        await user.keyboard('4');
        await user.tab();

        expect(input).to.have.value('4');
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange.mock.calls[0][0]).to.equal(4);
        expect(materialChange).toHaveBeenCalledTimes(1);
        expect(onValueCommitted).toHaveBeenCalledTimes(1);
        expect(onValueCommitted.mock.calls[0][0]).to.equal(4);
      });
    });
  });

  // Base UI supplies the value; NumberField must keep Material's filled state
  // aligned with its text, including zero and an empty controlled value.
  describe('Material filled state', () => {
    it('updates label shrink when the controlled value changes', async () => {
      function Test() {
        const [value, setValue] = React.useState<number | null>(5);
        return (
          <React.Fragment>
            <button type="button" onClick={() => setValue(0)}>
              Set zero
            </button>
            <button type="button" onClick={() => setValue(null)}>
              Set empty
            </button>
            <button type="button" onClick={() => setValue(8)}>
              Set number
            </button>
            <NumberField label="Amount" value={value} />
          </React.Fragment>
        );
      }

      const { user } = render(<Test />);
      const input = screen.getByRole('textbox', { name: 'Amount' });
      const label = screen.getByText('Amount', { selector: 'label' });
      const expectValue = (value: string, shrink: boolean) => {
        expect(input).to.have.value(value);
        expect(label).to.have.attribute('data-shrink', String(shrink));
      };

      expectValue('5', true);
      await user.click(screen.getByRole('button', { name: 'Set zero' }));
      expectValue('0', true);
      await user.click(screen.getByRole('button', { name: 'Set empty' }));
      expectValue('', false);
      await user.click(screen.getByRole('button', { name: 'Set number' }));
      expectValue('8', true);
    });

    it('clears Material filled state when zero is removed', async () => {
      const { user } = render(<NumberField label="Amount" defaultValue={0} />);
      const input = screen.getByRole('textbox', { name: 'Amount' });
      const label = screen.getByText('Amount', { selector: 'label' });

      expect(label).to.have.attribute('data-shrink', 'true');
      await user.clear(input);
      await user.tab();

      expect(input).to.have.value('');
      expect(label).to.have.attribute('data-shrink', 'false');
    });
  });

  // Smoke-test delegated behavior through Material's native input and buttons.
  // Base UI owns the parsing, stepping, validation and commit-timing rules.
  describe('Base UI integration', () => {
    it('forwards stepping and formatting options through the Material input', async () => {
      const onValueChange = vi.fn();
      const { user } = render(
        <NumberField
          label="Amount"
          defaultValue={1.5}
          step={0.5}
          locale="de-DE"
          format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
          onValueChange={onValueChange}
        />,
      );
      const input = screen.getByRole('textbox', { name: 'Amount' });

      expect(input).to.have.value('1,50');
      await user.click(input);
      await user.keyboard('{ArrowUp}');
      expect(input).to.have.value('2,00');

      await user.click(screen.getByRole('button', { name: 'Increase' }));
      expect(input).to.have.value('2,50');
      expect(onValueChange.mock.lastCall![0]).to.equal(2.5);
    });

    // Wheel handling attaches a native listener using Base UI's input ref.
    it('connects wheel scrubbing to the visible Material input', async () => {
      const { user } = render(
        <NumberField label="Amount" defaultValue={5} step={2} allowWheelScrub />,
      );
      const input = screen.getByRole('textbox', { name: 'Amount' });

      await user.click(input);
      // user-event does not expose wheel gestures.
      act(() => {
        input.dispatchEvent(
          new window.WheelEvent('wheel', {
            bubbles: true,
            cancelable: true,
            deltaY: -1,
          }),
        );
      });

      expect(input).to.have.value('7');
    });
  });

  // External forms own the visible input for validation and Enter submission, and
  // Base UI's submission input for contributing one raw numeric value.
  describe('form submission', () => {
    it('submits one raw numeric value to an external form from a formatted field', async () => {
      const submissions: FormData[] = [];
      const { user } = render(
        <React.Fragment>
          <form
            id="number-form"
            onSubmit={(event) => {
              event.preventDefault();
              submissions.push(new FormData(event.currentTarget));
            }}
          >
            <button type="submit">Submit</button>
          </form>
          <NumberField
            label="Amount"
            name="amount"
            form="number-form"
            defaultValue={1234.5}
            locale="en-US"
            format={{ style: 'currency', currency: 'USD', useGrouping: true }}
          />
        </React.Fragment>,
      );

      expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value('$1,234.50');
      await user.click(screen.getByRole('button', { name: 'Submit' }));

      expect(submissions).to.have.length(1);
      expect(Array.from(submissions[0].entries())).to.deep.equal([['amount', '1234.5']]);
    });

    it('uses visible input validation and Enter submission with an external form', async () => {
      const submissions: FormData[] = [];
      const { user } = render(
        <React.Fragment>
          <form
            id="number-form"
            aria-label="Order"
            onSubmit={(event) => {
              event.preventDefault();
              submissions.push(new FormData(event.currentTarget));
            }}
          >
            <button type="submit">Submit</button>
          </form>
          <NumberField
            label="Amount"
            name="amount"
            form="number-form"
            defaultValue={12}
            slotProps={{ htmlInput: { pattern: '[0-9]' } }}
          />
        </React.Fragment>,
      );
      const form = screen.getByRole<HTMLFormElement>('form', { name: 'Order' });
      const input = screen.getByRole('textbox', { name: 'Amount' });

      // The visible input's pattern must participate in the associated form's validation.
      expect(form.checkValidity()).to.equal(false);
      await user.click(input);
      await user.keyboard('{Enter}');
      expect(submissions).to.have.length(0);

      await user.clear(input);
      await user.keyboard('7');
      expect(form.checkValidity()).to.equal(true);
      await user.keyboard('{Enter}');

      expect(submissions).to.have.length(1);
      expect(Array.from(submissions[0].entries())).to.deep.equal([['amount', '7']]);
    });
  });

  // NumberField owns the label/helper relationships and the visible input's focus
  // entry points. Cover that wiring without repeating state styling or SSR checks.
  describe('labels, helper text and focus', () => {
    it('links an explicit input ID to its label and accessible description', async () => {
      const { user } = render(
        <NumberField
          id="amount"
          label="Amount"
          helperText="Enter the quantity"
          defaultValue={5}
          slotProps={{ formHelperText: { id: undefined } }}
        />,
      );
      const input = screen.getByRole('textbox', { name: 'Amount' });
      const label = screen.getByText('Amount', { selector: 'label' });

      expect(input).to.have.attribute('id', 'amount');
      expect(input).toHaveAccessibleDescription('Enter the quantity');
      await user.click(label);
      expect(document.activeElement).to.equal(input);
    });

    it('uses the native input slot ID for the input, label, and steppers when both IDs are set', async () => {
      const { user } = render(
        <NumberField
          id="amount"
          label="Amount"
          defaultValue={5}
          slotProps={{ htmlInput: { id: 'slot-id' } }}
        />,
      );
      const input = screen.getByRole('textbox', { name: 'Amount' });
      expect(input).to.have.attribute('id', 'slot-id');
      for (const button of screen.getAllByRole('button')) {
        expect(button).to.have.attribute('aria-controls', 'slot-id');
      }
      await user.click(screen.getByText('Amount', { selector: 'label' }));
      expect(document.activeElement).to.equal(input);
    });

    (['object', 'callback'] as const).forEach((configuration) => {
      it(`links the input to a custom helper text ID from ${configuration} slot props`, () => {
        render(
          <NumberField
            id="qty"
            label="Quantity"
            helperText="Maximum 10"
            slotProps={{
              formHelperText:
                configuration === 'callback'
                  ? (ownerState) => ({ id: `${ownerState.id}-help` })
                  : { id: 'qty-help' },
            }}
          />,
        );

        expect(screen.getByText('Maximum 10')).to.have.attribute('id', 'qty-help');
        expect(screen.getByRole('textbox', { name: 'Quantity' })).toHaveAccessibleDescription(
          'Maximum 10',
        );
      });
    });

    it('renders zero as label and helper content', () => {
      render(<NumberField label={0} helperText={0} />);

      expect(screen.getByRole('textbox', { name: '0' })).toHaveAccessibleDescription('0');
    });

    it.each(['', null, undefined, false])(
      'omits the helper text and its input association for helperText=%j',
      (helperText) => {
        const { container } = render(
          <NumberField
            label="Amount"
            helperText={helperText}
            slotProps={{ formHelperText: { id: 'help' } }}
          />,
        );

        expect(container.querySelector(`.${classes.formHelperText}`)).to.equal(null);
        expect(screen.getByRole('textbox', { name: 'Amount' })).not.to.have.attribute(
          'aria-describedby',
        );
      },
    );

    it('adds and removes label and helper content without leaving dangling associations', async () => {
      function Test() {
        const [showContent, setShowContent] = React.useState(false);

        return (
          <React.Fragment>
            <button type="button" onClick={() => setShowContent((previous) => !previous)}>
              Toggle label and helper
            </button>
            <NumberField
              label={showContent ? 'Amount' : ''}
              helperText={showContent ? <em>Enter the quantity</em> : ''}
              slotProps={{ htmlInput: { 'aria-label': showContent ? undefined : 'Amount' } }}
            />
          </React.Fragment>
        );
      }

      const { user } = render(<Test />);
      const input = screen.getByRole('textbox', { name: 'Amount' });
      const root = input.closest(`.${classes.root}`)!;
      const toggle = screen.getByRole('button', { name: 'Toggle label and helper' });
      const expectNoContent = () => {
        expect(root.querySelector('label')).to.equal(null);
        expect(root.querySelector('.MuiFormHelperText-root')).to.equal(null);
        expect(input).not.to.have.attribute('aria-describedby');
      };

      expectNoContent();
      await user.click(toggle);

      expect(screen.getByRole('textbox', { name: 'Amount' })).to.equal(input);
      expect(input).not.to.have.attribute('aria-label');
      expect(screen.getByText('Amount', { selector: 'label' })).to.have.attribute('for', input.id);
      expect(input).toHaveAccessibleDescription('Enter the quantity');

      await user.click(toggle);

      expect(screen.getByRole('textbox', { name: 'Amount' })).to.equal(input);
      expectNoContent();
      expect(input).toHaveAccessibleDescription('');
    });

    it('autofocuses the visible input', () => {
      render(<NumberField label="Amount" autoFocus />);
      const input = screen.getByRole('textbox', { name: 'Amount' });
      expect(document.activeElement).to.equal(input);
    });

    it('provides one tab stop and allows consumer inputRef focus', async () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const { user } = render(
        <React.Fragment>
          <button type="button" onClick={() => inputRef.current?.focus()}>
            Focus amount
          </button>
          <NumberField label="Amount" inputRef={inputRef} />
          <button type="button">After</button>
        </React.Fragment>,
      );
      const input = screen.getByRole('textbox', { name: 'Amount' });
      const focusButton = screen.getByRole('button', { name: 'Focus amount' });

      await user.tab();
      expect(document.activeElement).to.equal(focusButton);
      await user.tab();
      expect(document.activeElement).to.equal(input);
      await user.tab();
      expect(document.activeElement).to.equal(screen.getByRole('button', { name: 'After' }));
      await user.tab({ shift: true });
      expect(document.activeElement).to.equal(input);

      await user.click(focusButton);
      expect(document.activeElement).to.equal(input);
    });
  });

  // Scrubbing is optional and shares the input adornments with controls and consumer
  // content. Cover composition, slot plumbing, and drag interactions through the Material wrapper.
  describe('scrub area', () => {
    // Enable the optional adornment for the standard slot API checks.
    describeConformance(<NumberField scrubAreaPosition="start" />, () => ({
      classes,
      inheritComponent: FormControl,
      render,
      muiName: 'MuiNumberField',
      refInstanceof: window.HTMLDivElement,
      only: ['slotsProp', 'slotPropsProp', 'slotPropsCallback'],
      slots: {
        scrubAreaAdornment: {
          expectedClassName: classes.scrubAreaAdornment,
          testWithComponent: TestAdornment,
          testWithElement: 'div',
        },
      },
    }));

    it('resolves scrub slot props only when a scrub area is enabled', () => {
      const slotProps = {
        scrubArea: vi.fn(() => ({})),
        scrubAreaCursor: vi.fn(() => ({})),
      };
      const { container, rerender } = render(<NumberField slotProps={slotProps} />);

      expect(container.querySelector(`.${classes.scrubArea}`)).to.equal(null);
      expect(container.querySelector(`.${classes.scrubAreaAdornment}`)).to.equal(null);
      expect(slotProps.scrubArea).not.toHaveBeenCalled();
      expect(slotProps.scrubAreaCursor).not.toHaveBeenCalled();

      rerender(<NumberField scrubAreaPosition="start" slotProps={slotProps} />);

      expect(slotProps.scrubArea).toHaveBeenCalled();
      expect(slotProps.scrubAreaCursor).toHaveBeenCalled();
    });

    it('customizes the adornment with styles, a ref and live root state', async () => {
      const ref = React.createRef<HTMLDivElement>();
      const theme = createTheme({
        components: {
          MuiNumberField: {
            styleOverrides: { scrubAreaAdornment: { paddingBottom: 9 } },
          },
        },
      });
      const { user } = render(
        <ThemeProvider theme={theme}>
          <NumberField
            label="Amount"
            defaultValue={5}
            scrubAreaPosition="end"
            slotProps={{
              scrubAreaAdornment: ({ position }) => ({
                ref,
                title: `${position} scrub adornment`,
                sx: { paddingTop: '7px' },
                render: (props, state) => <section {...props} data-render-value={state.value} />,
              }),
            }}
          />
        </ThemeProvider>,
      );
      const adornment = screen.getByTitle('end scrub adornment');

      expect(adornment.tagName).to.equal('SECTION');
      expect(adornment).to.have.class('MuiInputAdornment-positionEnd');
      expect(ref.current).to.equal(adornment);
      expect(getComputedStyle(adornment).paddingTop).to.equal('7px');
      expect(getComputedStyle(adornment).paddingBottom).to.equal('9px');

      await user.click(screen.getByRole('button', { name: 'Increase' }));

      expect(adornment).to.have.attribute('data-render-value', '6');
    });

    (['stacked', 'end', 'split'] as const).forEach((controlsPosition) => {
      (['start', 'end'] as const).forEach((scrubAreaPosition) => {
        it(`places the ${scrubAreaPosition} scrub area with ${controlsPosition} controls and consumer adornments`, () => {
          const { container } = render(
            <NumberField
              controlsPosition={controlsPosition}
              scrubAreaPosition={scrubAreaPosition}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                },
              }}
            />,
          );
          const input = screen.getByRole('textbox');
          const increase = screen.getByRole('button', { name: 'Increase' });
          const decrease = screen.getByRole('button', { name: 'Decrease' });
          const scrub = container.querySelector(`.${classes.scrubArea}`)!;
          const prefix = screen.getByText('$');
          const suffix = screen.getByText('kg');
          const wrapper = input.closest('.MuiInputBase-root')!;
          const startButtons = {
            stacked: [],
            end: [],
            split: [decrease],
          }[controlsPosition];
          const endButtons = {
            stacked: [increase, decrease],
            end: [decrease, increase],
            split: [increase],
          }[controlsPosition];
          const expectedOrder = [
            ...startButtons,
            ...(scrubAreaPosition === 'start' ? [scrub] : []),
            prefix,
            input,
            suffix,
            ...(scrubAreaPosition === 'end' ? [scrub] : []),
            ...endButtons,
          ];

          // Compare element order even though the adornments add their own wrappers.
          const elements = Array.from(wrapper.querySelectorAll('*')).filter((element) =>
            expectedOrder.includes(element),
          );
          expect(elements).to.deep.equal(expectedOrder);
          expect(scrub.parentElement).to.have.class(
            `MuiInputAdornment-position${scrubAreaPosition === 'start' ? 'Start' : 'End'}`,
          );
          expect(scrub.closest(`.${classes.controls}`)).to.equal(null);
        });
      });
    });

    it('resolves scrub slot callbacks and preserves custom children and refs', () => {
      const scrubRef = React.createRef<HTMLSpanElement>();
      const { container } = render(
        <NumberField
          scrubAreaPosition="start"
          size="small"
          slotProps={{
            scrubArea: (ownerState) => ({
              ref: scrubRef,
              render: <div data-testid="render-scrub" />,
              direction: ownerState.size === 'small' ? 'vertical' : 'horizontal',
              children: <span>Drag</span>,
            }),
          }}
        />,
      );
      const scrub = container.querySelector(`.${classes.scrubArea}`)!;

      expect(scrubRef.current).to.equal(scrub);
      expect(scrub).to.equal(screen.getByTestId('render-scrub'));
      expect(scrub).to.have.attribute('data-direction', 'vertical');
      expect(scrub).to.contain(screen.getByText('Drag'));
      expect(scrub.querySelector('svg')).to.equal(null);
    });

    // Mount the cursor to check Material slot props, render bridges and styling.
    // Base UI owns the portal, pointer-lock behavior and ref cleanup.
    // Base UI intentionally omits the custom cursor on WebKit.
    describe.skipIf(typeof CSS !== 'undefined' && CSS.supports?.('-webkit-backdrop-filter:none'))(
      'cursor slot',
      () => {
        let originalRequestPointerLock: PropertyDescriptor | undefined;

        const TestCursor = React.forwardRef<
          HTMLSpanElement,
          React.ComponentPropsWithoutRef<'span'> & TestSlotProps
        >(function TestCursor(props, ref) {
          const { ownerState, as, ...other } = props;
          return <span {...other} ref={ref} data-testid="custom-cursor" />;
        });

        beforeEach(() => {
          originalRequestPointerLock = Object.getOwnPropertyDescriptor(
            document.body,
            'requestPointerLock',
          );
          Object.defineProperty(document.body, 'requestPointerLock', {
            configurable: true,
            value: vi.fn().mockResolvedValue(undefined),
          });
        });

        afterEach(() => {
          if (originalRequestPointerLock) {
            Object.defineProperty(document.body, 'requestPointerLock', originalRequestPointerLock);
          } else {
            Reflect.deleteProperty(document.body, 'requestPointerLock');
          }
        });

        it('resolves callback props through a replacement cursor slot', async () => {
          const ref = vi.fn();
          const renderScrub = vi.fn(() => <section />);
          const renderCursor = vi.fn(() => <div />);
          const { container, user, unmount } = render(
            <NumberField
              label="Amount"
              scrubAreaPosition="start"
              slots={{ scrubArea: 'div', scrubAreaCursor: TestCursor }}
              slotProps={{
                scrubArea: { render: renderScrub },
                scrubAreaCursor: (ownerState) => ({
                  ref,
                  render: renderCursor,
                  title: `Cursor ${ownerState.label}`,
                  className: 'custom-cursor',
                }),
              }}
            />,
          );
          const scrub = container.querySelector(`.${classes.scrubArea}`)!;

          await user.pointer({ keys: '[MouseLeft>]', target: scrub });
          const cursor = screen.getByTitle('Cursor Amount');

          expect(cursor).to.equal(screen.getByTestId('custom-cursor'));
          expect(cursor).to.have.class(classes.scrubAreaCursor);
          expect(cursor).to.have.class('custom-cursor');
          expect(ref).toHaveBeenLastCalledWith(cursor);
          expect(renderScrub).toHaveBeenCalledTimes(0);
          expect(renderCursor).toHaveBeenCalledTimes(0);

          unmount();
        });

        it('merges cursor props and refs with theme overrides during scrubbing', async () => {
          const ref = React.createRef<HTMLSpanElement>();
          const theme = createTheme({
            components: {
              MuiNumberField: {
                styleOverrides: { scrubAreaCursor: { color: 'rgb(255, 0, 0)' } },
              },
            },
          });
          const { container, user } = render(
            <ThemeProvider theme={theme}>
              <NumberField
                scrubAreaPosition="start"
                slotProps={{
                  scrubAreaCursor: {
                    ref,
                    render: (props, state) => (
                      <div {...props} data-render-scrubbing={state.scrubbing} />
                    ),
                    title: 'Custom cursor',
                    className: 'custom-cursor',
                    style: { opacity: 0.5 },
                    children: <span>Drag cursor</span>,
                  },
                }}
              />
            </ThemeProvider>,
          );
          const scrub = container.querySelector(`.${classes.scrubArea}`)!;
          await user.pointer({ keys: '[MouseLeft>]', target: scrub });
          const cursor = screen.getByTitle('Custom cursor');

          expect(cursor).to.have.class(classes.scrubAreaCursor);
          expect(cursor).to.have.class('custom-cursor');
          expect(cursor.style.opacity).to.equal('0.5');
          expect(cursor).to.have.attribute('data-render-scrubbing', 'true');
          expect(cursor).to.contain(screen.getByText('Drag cursor'));
          expect(ref.current).to.equal(cursor);
          expect(window.getComputedStyle(cursor).color).to.equal('rgb(255, 0, 0)');

          await user.pointer({ keys: '[/MouseLeft]', target: scrub });
          await waitFor(() => {
            expect(screen.queryByTitle('Custom cursor')).to.equal(null);
          });
        });
      },
    );

    // Keep drag handlers and render state connected through the Material slots.
    // Base UI owns drag arithmetic, sensitivity, availability and commit timing.
    describe('dragging', () => {
      // user-event does not supply the movementX/movementY deltas used for scrubbing.
      function movePointer(movementX: number, movementY: number) {
        const event = new window.MouseEvent('pointermove', { bubbles: true, cancelable: true });
        Object.defineProperties(event, {
          movementX: { value: movementX },
          movementY: { value: movementY },
        });
        act(() => {
          window.dispatchEvent(event);
        });
      }

      // Check Material customization against the same drag lifecycle as Base UI,
      // without repeating its value-calculation behavior here.
      it('exposes live scrubbing state to slots, root attributes, classes and theme overrides', async () => {
        const callbacks = createSlotCallbacks();
        const theme = createTheme({
          components: {
            MuiNumberField: {
              styleOverrides: {
                root: ({ ownerState }) => ({
                  paddingTop: ownerState.scrubbing ? '7px' : '0px',
                }),
                scrubbing: { paddingBottom: 9 },
              },
            },
          },
        });
        const { container, user } = render(
          <ThemeProvider theme={theme}>
            <NumberField
              label="Amount"
              helperText="Helper text"
              defaultValue={5}
              scrubAreaPosition="start"
              classes={{ scrubbing: 'custom-scrubbing' }}
              slotProps={callbacks}
            />
          </ThemeProvider>,
        );
        const root = container.querySelector(`.${classes.root}`)!;
        const scrub = container.querySelector(`.${classes.scrubArea}`)!;
        const expectScrubbing = (scrubbing: boolean) => {
          Object.entries(callbacks).forEach(([slot, callback]) => {
            expect(callback.mock.lastCall![0].scrubbing, `slotProps.${slot}`).to.equal(scrubbing);
          });
          expect(root.hasAttribute(NumberFieldRootDataAttributes.scrubbing)).to.equal(scrubbing);
          expect(root.classList.contains(classes.scrubbing)).to.equal(scrubbing);
          expect(root.classList.contains('custom-scrubbing')).to.equal(scrubbing);
          expect(getComputedStyle(root).paddingTop).to.equal(scrubbing ? '7px' : '0px');
          expect(getComputedStyle(root).paddingBottom).to.equal(scrubbing ? '9px' : '0px');
        };

        expectScrubbing(false);

        await user.pointer({ keys: '[MouseLeft>]', target: scrub });
        expectScrubbing(true);
        movePointer(4, 0);

        await user.pointer({ keys: '[/MouseLeft]', target: scrub });
        await waitFor(() => expectScrubbing(false));
      });

      it('preserves scrubbing through a custom handle and replacement adornment', async () => {
        const renderAdornment = vi.fn(() => <section />);
        const { container, user } = render(
          <NumberField
            label="Amount"
            defaultValue={5}
            scrubAreaPosition="start"
            slots={{ scrubAreaAdornment: TestAdornment }}
            slotProps={{
              scrubAreaAdornment: { render: renderAdornment },
              scrubArea: {
                direction: 'vertical',
                render: (props, state) => <div {...props} data-render-value={state.value} />,
              },
            }}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });
        const scrub = container.querySelector(`.${classes.scrubArea}`)!;

        expect(scrub.parentElement).to.equal(screen.getByTestId('custom'));
        expect(renderAdornment).toHaveBeenCalledTimes(0);

        await user.pointer({ keys: '[MouseLeft>]', target: scrub });
        movePointer(0, -4);
        expect(input).to.have.value('9');
        expect(scrub).to.have.attribute('data-render-value', '9');

        await user.pointer({ keys: '[/MouseLeft]', target: scrub });
      });
    });
  });

  // FormControl needs the initial filled/adorned state in server markup so labels
  // render correctly before effects run and stay stable during hydration.
  describe('server rendering', () => {
    function expectStableHydration(
      hydrate: () => void,
      { displayValue, shrink }: { displayValue: string; shrink: boolean },
    ) {
      const input = screen.getByRole('textbox', { name: 'Amount' });
      const label = screen.getByText('Amount', { selector: 'label' });

      // Check server markup before client effects can initialize FormControl.
      expect(input).to.have.value(displayValue);
      expect(label).to.have.attribute('data-shrink', String(shrink));

      hydrate();

      expect(screen.getByRole('textbox', { name: 'Amount' })).to.equal(input);
      expect(screen.getByText('Amount', { selector: 'label' })).to.equal(label);
      expect(input).to.have.value(displayValue);
      expect(label).to.have.attribute('data-shrink', String(shrink));
    }

    it('preserves initial FormControl label state with render through hydration', () => {
      const { hydrate } = renderToString(
        <NumberField label="Amount" defaultValue={5} render={<section />} />,
      );
      expectStableHydration(hydrate, { displayValue: '5', shrink: true });
    });

    // Initial values, including zero and empty values, must determine label shrink
    // before hydration, without relying on client-side FormControl updates.
    describe('initial value', () => {
      const cases = [
        { name: 'value=0', props: { value: 0 }, displayValue: '0', shrink: true },
        {
          name: 'defaultValue=42',
          props: { defaultValue: 42 },
          displayValue: '42',
          shrink: true,
        },
        {
          name: 'defaultValue=undefined',
          props: { defaultValue: undefined },
          displayValue: '',
          shrink: false,
        },
      ] satisfies {
        name: string;
        props: Pick<NumberFieldProps, 'value' | 'defaultValue'>;
        displayValue: string;
        shrink: boolean;
      }[];

      cases.forEach(({ name, props, displayValue, shrink }) => {
        it(`initializes label shrink before hydration with ${name}`, () => {
          const { hydrate } = renderToString(<NumberField label="Amount" {...props} />);

          expectStableHydration(hydrate, { displayValue, shrink });
        });
      });
    });

    // Formatting must already appear in server markup, and the same formatted value
    // must initialize FormControl's filled state when the client hydrates it.
    describe('formatted initial values', () => {
      it('preserves formatted initial text through hydration', () => {
        const { hydrate } = renderToString(
          <NumberField
            label="Amount"
            defaultValue={1234.5}
            locale="de-DE"
            format={{ useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 }}
          />,
        );

        expectStableHydration(hydrate, { displayValue: '1.234,50', shrink: true });
      });
    });

    // NumberField's composed start adornments must initialize label shrink on the
    // server, including adornments returned by consumer slot callbacks.
    describe('adornments', () => {
      (['start', 'end'] as const).forEach((scrubAreaPosition) => {
        it(`keeps an empty label stable through hydration with a ${scrubAreaPosition} scrub area`, () => {
          const { hydrate } = renderToString(
            <NumberField label="Amount" scrubAreaPosition={scrubAreaPosition} />,
          );

          expectStableHydration(hydrate, {
            displayValue: '',
            shrink: scrubAreaPosition === 'start',
          });
        });
      });

      (['stacked', 'split'] as const).forEach((controlsPosition) => {
        it(`preserves an empty label through hydration with ${controlsPosition} controls`, () => {
          const { hydrate } = renderToString(
            <NumberField label="Amount" controlsPosition={controlsPosition} />,
          );

          expectStableHydration(hydrate, {
            displayValue: '',
            shrink: controlsPosition === 'split',
          });
        });
      });

      it('resolves shared slot callbacks once for server-rendered adornments and helper text', () => {
        const adornment = <InputAdornment position="start">$</InputAdornment>;
        const getInputProps = vi.fn((ownerState: NumberFieldOwnerState) => ({
          startAdornment: ownerState.disabled ? adornment : undefined,
        }));
        const getInputLabelProps = vi.fn((ownerState: NumberFieldOwnerState) => ({
          className: ownerState.disabled ? 'disabled-label' : undefined,
        }));
        const getHelperTextProps = vi.fn(() => ({ id: 'amount-help' }));
        const { hydrate } = renderToString(
          <NumberField
            label="Amount"
            helperText="Enter the quantity"
            disabled
            slotProps={{
              input: getInputProps,
              inputLabel: getInputLabelProps,
              formHelperText: getHelperTextProps,
            }}
          />,
        );
        // Assert server evaluation counts before hydration can trigger additional renders.
        expect(getInputProps).toHaveBeenCalledTimes(1);
        expect(getInputLabelProps).toHaveBeenCalledTimes(1);
        expect(getHelperTextProps).toHaveBeenCalledTimes(1);
        const adornmentNode = screen.getByText('$');
        const input = screen.getByRole('textbox', { name: 'Amount' });
        expect(input.closest('.MuiInputBase-root')).to.contain(adornmentNode);
        expect(screen.getByText('Amount', { selector: 'label' })).to.have.class('disabled-label');
        expect(input).toHaveAccessibleDescription('Enter the quantity');

        expectStableHydration(hydrate, { displayValue: '', shrink: true });
        expect(screen.getByText('$')).to.equal(adornmentNode);
      });

      it('does not shrink an empty server-rendered label with a falsy start and an end adornment', () => {
        const { hydrate } = renderToString(
          <NumberField
            label="Amount"
            slotProps={{
              input: {
                startAdornment: false,
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              },
            }}
          />,
        );
        const adornmentNode = screen.getByText('kg');
        const input = screen.getByRole('textbox', { name: 'Amount' });
        expect(input.closest('.MuiInputBase-root')).to.contain(adornmentNode);

        expectStableHydration(hydrate, { displayValue: '', shrink: false });
        expect(screen.getByText('kg')).to.equal(adornmentNode);
      });
    });

    // Generated IDs must retain their label/helper associations through hydration
    // without depending on React's ID format.
    describe('generated IDs and associations', () => {
      it('preserves input, label and helper IDs through hydration', () => {
        const { hydrate } = renderToString(<NumberField label="Amount" helperText="Helper text" />);
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
        const label = screen.getByText('Amount', { selector: 'label' });
        const helper = screen.getByText('Helper text');
        const inputId = input.id;
        const labelId = label.id;
        const helperId = helper.id;
        expect(inputId).not.to.equal('');
        expect(labelId).not.to.equal('');
        expect(helperId).not.to.equal('');

        const expectAssociations = () => {
          expect(screen.getByRole('textbox', { name: 'Amount' })).to.equal(input);
          expect(screen.getByText('Amount', { selector: 'label' })).to.equal(label);
          expect(screen.getByText('Helper text')).to.equal(helper);
          expect(input).to.have.attribute('id', inputId);
          expect(label).to.have.attribute('id', labelId);
          expect(helper).to.have.attribute('id', helperId);
          expect(label).to.have.attribute('for', inputId);
          expect(input).to.have.attribute('aria-describedby', helperId);
          expect(input).toHaveAccessibleDescription('Helper text');
        };

        expectAssociations();
        hydrate();
        expectAssociations();
      });
    });
  });
});
