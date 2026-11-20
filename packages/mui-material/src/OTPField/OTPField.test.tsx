import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { Field } from '@base-ui/react/field';
import { createRenderer, isJsdom, screen, within } from '@mui/internal-test-utils';
import { formLabelClasses } from '@mui/material/FormLabel';
import OTPField, { OTPFieldInput, otpFieldClasses as classes } from '@mui/material/OTPField';

describe('<OTPField />', () => {
  const { render } = createRenderer();

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
          slots={{ label: 'label', helperText: 'small' }}
          slotProps={{
            label: ({ required }) => ({ id: required ? 'required-label' : 'label' }),
            helperText: { id: 'hint' },
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
  });

  describe('accessibility', () => {
    it('forwards ref to the field root and inputRef to the input targeted by the label', async () => {
      const rootRef = React.createRef<HTMLDivElement>();
      const inputRef = React.createRef<HTMLInputElement>();
      const { user } = render(
        <OTPField id="verification" ref={rootRef} inputRef={inputRef} label="Verification code" />,
      );

      const group = screen.getByRole('group', { name: 'Verification code' });
      expect(rootRef.current).to.have.class(classes.root);
      expect(rootRef.current).to.contain(group);
      const first = within(group).getByRole('textbox', { name: 'Verification code' });
      expect(first).to.equal(inputRef.current);
      expect(first).to.have.attribute('id', 'verification');
      await user.click(screen.getByText('Verification code'));
      expect(first).toHaveFocus();
      expect(screen.getByRole('textbox', { name: 'Character 6 of 6' })).toBeVisible();
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
          <OTPField label="Code" aria-labelledby="code-label" />
        </React.Fragment>,
      );

      const [first] = screen.getAllByRole('textbox');
      expect(first).toHaveAccessibleName('Recovery code');
    });

    it('combines helper text and an external description on the group and character inputs', () => {
      render(
        <React.Fragment>
          <p id="code-hint">Use the most recent code.</p>
          <OTPField
            label="Verification code"
            helperText="Check your messages."
            aria-describedby="code-hint"
          />
        </React.Fragment>,
      );

      const group = screen.getByRole('group', { name: 'Verification code' });
      const description = 'Use the most recent code. Check your messages.';
      expect(group).toHaveAccessibleDescription(description);
      within(group)
        .getAllByRole('textbox')
        .forEach((input) => expect(input).toHaveAccessibleDescription(description));
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

    it('marks each character input invalid when the Material error prop is set', () => {
      render(<OTPField label="Verification code" error />);

      screen.getAllByRole('textbox').forEach((input) => {
        expect(input).to.have.attribute('aria-invalid', 'true');
      });
    });
  });

  describe.skipIf(isJsdom())('styling', () => {
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
