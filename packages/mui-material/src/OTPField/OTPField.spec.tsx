import * as React from 'react';
import { expectType } from '@mui/types';
import type { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import OTPField, { OTPFieldInput, OTPFieldSeparator } from '@mui/material/OTPField';
import type {
  OTPFieldChangeEventDetails,
  OTPFieldCompleteEventDetails,
  OTPFieldInvalidEventDetails,
  OTPFieldProps,
} from '@mui/material/OTPField';

// Material supplies a default length.
type SharedFieldOption =
  | Exclude<keyof BaseOTPField.Root.Props, keyof React.ComponentPropsWithRef<'div'> | 'length'>
  // These field options also exist on a native div.
  | 'defaultValue'
  | 'id'
  | 'inputMode';

declare const materialFieldOptions: Pick<OTPFieldProps, SharedFieldOption>;
expectType<Pick<BaseOTPField.Root.Props, SharedFieldOption>, typeof materialFieldOptions>(
  materialFieldOptions,
);
const defaultLength: Pick<OTPFieldProps, 'length'> = {};
expectType<number | undefined, typeof defaultLength.length>(defaultLength.length);

function Test() {
  return (
    <React.Fragment>
      <OTPField
        label="Recovery code"
        length={4}
        name="code"
        form="verify"
        ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)}
        inputRef={(node) => expectType<HTMLInputElement | null, typeof node>(node)}
        value="0012"
        validationType="alphanumeric"
        onValueChange={(code, details) => {
          expectType<string, typeof code>(code);
          expectType<OTPFieldChangeEventDetails, typeof details>(details);
          details.cancel();
        }}
        onValueComplete={(code, details) => {
          expectType<string, typeof code>(code);
          expectType<OTPFieldCompleteEventDetails, typeof details>(details);
        }}
        onValueInvalid={(attempt, details) => {
          expectType<string, typeof attempt>(attempt);
          expectType<OTPFieldInvalidEventDetails, typeof details>(details);
        }}
        slotProps={{
          root: { fullWidth: true, sx: { mt: 1 } },
          group: {
            className: (state) => {
              expectType<BaseOTPField.Root.State, typeof state>(state);
              return state.complete ? 'complete' : undefined;
            },
          },
          label: ({ required }) => ({ required }),
          formHelperText: { id: 'recovery-hint' },
        }}
      >
        <OTPFieldInput ref={(node) => expectType<HTMLInputElement | null, typeof node>(node)} />
        <OTPFieldInput
          type="password"
          className={(state) => {
            expectType<BaseOTPField.Input.State, typeof state>(state);
            return state.filled ? 'filled' : undefined;
          }}
        />
        <OTPFieldSeparator
          orientation="vertical"
          style={(state) => {
            expectType<BaseOTPField.Separator.State, typeof state>(state);
            return { opacity: state.orientation === 'vertical' ? 1 : 0.5 };
          }}
        >
          –
        </OTPFieldSeparator>
        <OTPFieldInput />
        <OTPFieldInput />
      </OTPField>
      <OTPField defaultValue="0012" />
      {/* @ts-expect-error Use render to change the outer element. */}
      <OTPField component="section" />
      {/* @ts-expect-error The outer element is customized with the field's render prop. */}
      <OTPField slotProps={{ root: { component: 'section' } }} />
      {/* @ts-expect-error Use render to change the group element. */}
      <OTPField slotProps={{ group: { component: 'section' } }} />
      {/* @ts-expect-error Use render to change the label element. */}
      <OTPField slotProps={{ label: { component: 'label' } }} />
      {/* @ts-expect-error Use render to change the helper text element. */}
      <OTPField slotProps={{ formHelperText: { component: 'small' } }} />
      {/* @ts-expect-error Slot callbacks use the same render API as slot objects. */}
      <OTPField slotProps={{ root: () => ({ fullWidth: true, component: 'section' }) }} />
      {/* @ts-expect-error Set the label content with the field's label prop. */}
      <OTPField slotProps={{ label: { children: 'PIN' } }} />
      {/* @ts-expect-error A code is a string, including in numeric mode. */}
      <OTPField defaultValue={123456} />
      {/* @ts-expect-error The field has no checked state. */}
      <OTPField defaultChecked />
      {/* @ts-expect-error The field does not accept the legacy HTML color attribute. */}
      <OTPField color="red" />
      {/* @ts-expect-error Character inputs are composed as children. */}
      <OTPField slots={{ input: 'input' }} />
      {/* @ts-expect-error Separators are composed as children. */}
      <OTPField slotProps={{ separator: { children: '–' } }} />
      {/* @ts-expect-error The field owns the count. */}
      <OTPField slotProps={{ group: { length: 4 } }} />
      {/* @ts-expect-error The group always uses the group role. */}
      <OTPField slotProps={{ group: { role: 'switch' } }} />
      {/* @ts-expect-error The field initializes all character inputs. */}
      <OTPFieldInput defaultValue="1" />
      {/* @ts-expect-error A separator has no initial value. */}
      <OTPFieldSeparator defaultValue="-" />
    </React.Fragment>
  );
}
