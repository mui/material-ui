import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { Field } from '@base-ui/react/field';
import { createRenderer, isJsdom, screen, within } from '@mui/internal-test-utils';
import { formHelperTextClasses } from '@mui/material/FormHelperText';
import { formLabelClasses } from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { OTPFieldOwnerState } from '@mui/material/OTPField';
import OTPField, {
  OTPFieldInput,
  OTPFieldSeparator,
  otpFieldClasses as classes,
} from '@mui/material/OTPField';
import describeConformance from '../../test/describeConformance';

describe('<OTPField />', () => {
  const { render } = createRenderer();

  describeConformance(<OTPField label="PIN" length={2} />, () => ({
    classes,
    render,
    muiName: 'MuiOTPField',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { mask: true },
    skip: ['componentProp'],
  }));

  describe('structure', () => {
    it.each([
      [6, undefined],
      [4, 4],
    ])('renders %i character inputs when length is %s', (count, length) => {
      render(<OTPField label="Verification code" length={length} />);

      const group = screen.getByRole('group', { name: 'Verification code' });
      expect(within(group).getAllByRole('textbox')).to.have.lengthOf(count);
    });

    it('applies the OTPField group and input classes to the Base UI render elements', () => {
      render(
        <OTPField
          label="Verification code"
          classes={{ group: 'custom-group', input: 'custom-input' }}
        />,
      );

      const group = screen.getByRole('group', { name: 'Verification code' });
      expect(group).to.have.class(classes.group).and.have.class('custom-group');
      within(group)
        .getAllByRole('textbox')
        .forEach((input) => {
          expect(input).to.have.class(classes.input).and.have.class('custom-input');
        });
    });
  });

  describe('composition', () => {
    it('preserves the Material root and label when JavaScript passes component', () => {
      const componentProp = { component: 'aside' };
      render(
        <OTPField
          {...componentProp}
          label="PIN"
          error
          render={<section />}
          slotProps={{
            // @ts-expect-error Simulate a JavaScript slot callback.
            label: () => ({ id: 'pin-label', ...componentProp }),
          }}
        />,
      );

      const group = screen.getByRole('group', { name: 'PIN' });
      expect(group.parentElement?.tagName).to.equal('SECTION');
      const label = screen.getByText('PIN');
      expect(label.tagName).to.equal('LABEL');
      expect(label).to.have.class(formLabelClasses.error);
    });

    it('shares the generated input ID with slot callbacks and the custom group', () => {
      const Group = React.forwardRef(function Group(
        {
          ownerState,
          ...props
        }: React.ComponentPropsWithoutRef<'div'> & { ownerState: OTPFieldOwnerState },
        ref: React.Ref<HTMLDivElement>,
      ) {
        return <div {...props} ref={ref} id={`${ownerState.id}-group`} />;
      });
      render(
        <OTPField
          label="PIN"
          helperText="Two digits"
          length={2}
          slots={{ group: Group }}
          slotProps={{ formHelperText: ({ id }) => ({ id: `${id}-hint` }) }}
        />,
      );

      const group = screen.getByRole('group', { name: 'PIN' });
      const first = within(group).getByRole('textbox', { name: 'PIN' });
      expect(group).to.have.attribute('id', `${first.id}-group`);
      expect(first).to.have.attribute('aria-describedby', `${first.id}-hint`);
      expect(first).toHaveAccessibleDescription('Two digits');
      expect(screen.getByText('Two digits')).to.have.class(classes.formHelperText);
    });

    it('preserves field state, label focus, and descriptions through custom render elements', async () => {
      const rootRef = React.createRef<HTMLDivElement>();
      const inputRef = React.createRef<HTMLInputElement>();
      const { user } = render(
        <OTPField
          id="pin"
          ref={rootRef}
          inputRef={inputRef}
          label="PIN"
          helperText="Two digits"
          length={2}
          error
          render={(props, state) => <section {...props} data-complete={state.complete} />}
          slotProps={{
            group: { render: <fieldset /> },
            label: { render: <label /> },
            formHelperText: {
              render: (props, state) => <small {...props} data-length={state.length} />,
            },
          }}
        />,
      );

      const group = screen.getByRole('group', { name: 'PIN' });
      const label = screen.getByText('PIN');
      const first = within(group).getByRole('textbox', { name: 'PIN' });
      expect(rootRef.current?.tagName).to.equal('SECTION');
      expect(rootRef.current).to.contain(group);
      expect(first).to.equal(inputRef.current);
      expect(first).to.have.attribute('id', 'pin');
      expect(group.tagName).to.equal('FIELDSET');
      expect(label).to.have.class(formLabelClasses.error);
      expect(screen.getByText('Two digits')).to.have.attribute('data-length', '2');
      expect(first).toHaveAccessibleDescription('Two digits');
      await user.click(label);
      expect(first).toHaveFocus();
      await user.keyboard('12');
      expect(rootRef.current).to.have.attribute('data-complete', 'true');
    });

    it('preserves group semantics and the composed inputs when replacing the group host', async () => {
      const groupRef = React.createRef<HTMLDivElement>();
      const { user } = render(
        <OTPField
          label="PIN"
          length={2}
          slots={{ group: 'section' }}
          slotProps={{
            group: {
              ref: groupRef,
              render: <aside />,
              className: (state) => (state.complete ? 'complete' : undefined),
            },
          }}
        >
          <OTPFieldInput />
          <OTPFieldInput />
        </OTPField>,
      );

      const group = screen.getByRole('group', { name: 'PIN' });
      expect(group.tagName).to.equal('SECTION');
      expect(groupRef.current).to.equal(group);
      await user.click(within(group).getByRole('textbox', { name: 'PIN' }));
      await user.paste('07');
      expect(group).to.have.class('complete');
      expect(within(group).getByRole('textbox', { name: 'Character 2 of 2' })).to.have.value('7');
    });

    it('keeps label and helper slot IDs linked to every composed input and the group', async () => {
      const { user } = render(
        <OTPField
          id="pin"
          length={2}
          label="PIN"
          helperText="Two digits"
          required
          slots={{ label: 'label', formHelperText: 'small' }}
          slotProps={{
            label: ({ required }) => ({ id: required ? 'required-label' : 'label' }),
            formHelperText: { id: 'hint' },
          }}
        >
          <OTPFieldInput />
          <OTPFieldInput />
        </OTPField>,
      );
      const group = screen.getByRole('group', { name: 'PIN' });
      expect(group).to.have.attribute('aria-labelledby', 'required-label');
      expect(group).toHaveAccessibleDescription('Two digits');
      expect(screen.getByText('Two digits').tagName).to.equal('SMALL');
      for (const input of within(group).getAllByRole('textbox')) {
        expect(input).to.have.attribute('aria-describedby', 'hint');
        expect(input).toHaveAccessibleDescription('Two digits');
      }
      await user.click(screen.getByText('PIN'));
      expect(within(group).getByRole('textbox', { name: 'PIN' })).toHaveFocus();
    });

    it('links the group and inputs to the IDs on the rendered label and helper text', () => {
      render(
        <OTPField
          label="PIN"
          helperText="Two digits"
          length={2}
          slotProps={{
            label: { render: <label id="pin-label" /> },
            formHelperText: { render: <small id="pin-hint" /> },
          }}
        />,
      );

      const group = screen.getByRole('group', { name: 'PIN' });
      expect(group).to.have.attribute('aria-labelledby', 'pin-label');
      expect(group).toHaveAccessibleDescription('Two digits');
      for (const input of within(group).getAllByRole('textbox')) {
        expect(input).toHaveAccessibleDescription('Two digits');
      }
    });
  });

  describe('accessibility', () => {
    it.each([
      ['Verification code', 'Verification code'],
      [undefined, 'PIN'],
    ])(
      'names the first character from the field when its aria-label is %s',
      (fieldLabel, groupName) => {
        render(
          <OTPField label="PIN" aria-label={fieldLabel} length={2}>
            <OTPFieldInput aria-label="First digit" />
            <OTPFieldInput />
          </OTPField>,
        );
        const group = screen.getByRole('group', { name: groupName });
        const [first] = within(group).getAllByRole('textbox');
        expect(first).toHaveAccessibleName(groupName);
      },
    );

    it('moves focus in the visual direction of the arrow keys in an RTL theme', async () => {
      const { user } = render(
        <ThemeProvider theme={createTheme({ direction: 'rtl' })}>
          <div dir="rtl">
            <OTPField label="PIN" length={2} defaultValue="12" />
          </div>
        </ThemeProvider>,
      );
      const [first, second] = screen.getAllByRole('textbox');
      await user.click(first);
      await user.keyboard('{ArrowLeft}');
      expect(second).toHaveFocus();
    });

    it('uses the name, description, and direction of the rendered group for its inputs', async () => {
      const { user } = render(
        <React.Fragment>
          <p id="pin-hint">Check your messages.</p>
          <OTPField
            length={2}
            defaultValue="12"
            helperText="Two digits."
            slotProps={{
              group: {
                render: <fieldset aria-label="PIN" aria-describedby="pin-hint" dir="rtl" />,
              },
            }}
          />
        </React.Fragment>,
      );
      const group = screen.getByRole('group', { name: 'PIN' });
      const first = within(group).getByRole('textbox', { name: 'PIN' });
      expect(group).toHaveAccessibleDescription('Check your messages. Two digits.');
      expect(first).toHaveAccessibleDescription('Check your messages. Two digits.');
      await user.click(first);
      await user.keyboard('{ArrowLeft}');
      expect(within(group).getByRole('textbox', { name: 'Character 2 of 2' })).toHaveFocus();
    });

    it('uses getInputAriaLabel for subsequent inputs with one-based positions and the field length', () => {
      render(
        <OTPField
          aria-label="Verification code"
          length={3}
          getInputAriaLabel={(position, length) => `Digit ${position} out of ${length}`}
        />,
      );

      const group = screen.getByRole('group', { name: 'Verification code' });
      expect(within(group).getByRole('textbox', { name: 'Verification code' })).toBeVisible();
      expect(within(group).getByRole('textbox', { name: 'Digit 2 out of 3' })).toBeVisible();
      expect(within(group).getByRole('textbox', { name: 'Digit 3 out of 3' })).toBeVisible();
    });

    it('uses the external aria-labelledby on the first input in place of the Material label', () => {
      render(
        <React.Fragment>
          <h2 id="code-label">Recovery code</h2>
          <OTPField label="Code" aria-label="PIN" aria-labelledby="code-label" />
        </React.Fragment>,
      );

      const group = screen.getByRole('group', { name: 'Recovery code' });
      const [first] = within(group).getAllByRole('textbox');
      expect(first).toHaveAccessibleName('Recovery code');
    });

    it('combines field and per-input descriptions', () => {
      render(
        <React.Fragment>
          <span id="code-hint">Use the most recent code.</span>
          <span id="digit-label">Check digit</span>
          <span id="digit-hint">Printed in bold.</span>
          <OTPField
            label="PIN"
            length={2}
            aria-describedby="code-hint"
            helperText="Enter both digits."
          >
            <OTPFieldInput />
            <OTPFieldInput aria-labelledby="digit-label" aria-describedby="digit-hint" />
          </OTPField>
        </React.Fragment>,
      );

      const fieldHint = 'Use the most recent code. Enter both digits.';
      expect(screen.getByRole('group', { name: 'PIN' })).toHaveAccessibleDescription(fieldHint);
      expect(screen.getByRole('textbox', { name: 'PIN' })).toHaveAccessibleDescription(fieldHint);
      expect(screen.getByRole('textbox', { name: 'Check digit' })).toHaveAccessibleDescription(
        `${fieldHint} Printed in bold.`,
      );
    });
  });

  describe('form control state', () => {
    it('reflects inherited disabled state and the OTP required flag on the Material label', () => {
      render(
        <Field.Root disabled>
          <OTPField label="Verification code" required />
        </Field.Root>,
      );

      const label = screen.getByText('Verification code');
      expect(label)
        .to.have.class(formLabelClasses.disabled)
        .and.have.class(formLabelClasses.required);
    });

    it('reflects inherited invalid state on the Material label', () => {
      render(
        <Field.Root invalid>
          <OTPField label="Verification code" />
        </Field.Root>,
      );

      expect(screen.getByText('Verification code')).to.have.class(formLabelClasses.error);
    });

    it('uses the field error state and size when root slot props conflict', () => {
      render(
        <OTPField
          label="Verification code"
          helperText="Try again"
          error
          size="small"
          // @ts-expect-error JavaScript callers can still supply conflicting field state.
          slotProps={{ root: { error: false, size: 'medium' } }}
        />,
      );

      expect(screen.getByText('Verification code')).to.have.class(formLabelClasses.error);
      expect(screen.getByText('Try again'))
        .to.have.class(formHelperTextClasses.error)
        .and.have.class(formHelperTextClasses.sizeSmall);
      screen.getAllByRole('textbox').forEach((input) => {
        expect(input).to.have.attribute('aria-invalid', 'true');
      });
    });
  });

  describe.skipIf(isJsdom())('styling', () => {
    it('applies named slot overrides using the field props', () => {
      const theme = createTheme({
        components: {
          MuiOTPField: {
            styleOverrides: {
              group: ({ ownerState }) => ({ columnGap: ownerState.mask ? '11px' : '0px' }),
              separator: ({ ownerState }) => ({ marginRight: ownerState.mask ? '7px' : '0px' }),
            },
          },
        },
      });
      render(
        <ThemeProvider theme={theme}>
          <OTPField label="PIN" length={2} mask>
            <OTPFieldInput />
            <OTPFieldSeparator />
            <OTPFieldInput />
          </OTPField>
        </ThemeProvider>,
      );
      expect(screen.getByRole('group', { name: 'PIN' })).toHaveComputedStyle({ columnGap: '11px' });
      expect(screen.getByText('-')).toHaveComputedStyle({ marginRight: '7px' });
    });

    it('outlines the focused character input and keeps the label neutral', async () => {
      const { user } = render(<OTPField label="Verification code" defaultValue="12" length={2} />);

      const input = screen.getByRole('textbox', { name: 'Character 2 of 2' });
      await user.click(input);

      expect(input).toHaveFocus();
      expect(input).toHaveComputedStyle({ outlineStyle: 'solid' });
      expect(screen.getByText('Verification code')).not.to.have.class(formLabelClasses.focused);
    });

    it('lays out the character inputs in a row between the label and helper text', () => {
      render(<OTPField label="PIN" helperText="Four digits" length={4} />);

      const [first, second] = screen.getAllByRole('textbox');
      const firstBounds = first.getBoundingClientRect();
      const secondBounds = second.getBoundingClientRect();
      expect(firstBounds.top).to.be.at.least(
        screen.getByText('PIN').getBoundingClientRect().bottom,
      );
      expect(secondBounds.top).to.equal(firstBounds.top);
      expect(secondBounds.left).to.be.greaterThan(firstBounds.right);
      expect(screen.getByText('Four digits').getBoundingClientRect().top).to.be.at.least(
        firstBounds.bottom,
      );
    });

    it('renders smaller character inputs when size is small', () => {
      render(
        <React.Fragment>
          <OTPField label="Medium code" />
          <OTPField label="Small code" size="small" />
        </React.Fragment>,
      );

      const medium = screen.getByRole('textbox', { name: 'Medium code' }).getBoundingClientRect();
      const small = screen.getByRole('textbox', { name: 'Small code' }).getBoundingClientRect();
      expect(small.width).to.be.lessThan(medium.width);
      expect(small.height).to.be.lessThan(medium.height);
    });
  });
});
