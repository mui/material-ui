import * as React from 'react';
import { expectType } from '@mui/types';
import type { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import OTPField from '@mui/material/OTPField';
import type {
  OTPFieldChangeEventDetails,
  OTPFieldCompleteEventDetails,
  OTPFieldInvalidEventDetails,
  OTPFieldProps,
} from '@mui/material/OTPField';

// Base UI's render maps to the group slot. Material supplies a default length.
type SharedFieldOption =
  | Exclude<
      keyof BaseOTPField.Root.Props,
      keyof React.ComponentPropsWithRef<'div'> | 'render' | 'length'
    >
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
        renderSeparator={(afterPosition) => {
          expectType<number, typeof afterPosition>(afterPosition);
          return afterPosition % 2 === 0 ? '–' : null;
        }}
        slotProps={{
          group: {
            className: (state) => {
              expectType<BaseOTPField.Root.State, typeof state>(state);
              return state.complete ? 'complete' : undefined;
            },
          },
          input: ({ index }) => {
            expectType<number, typeof index>(index);
            return {
              render: (props, state) => {
                expectType<BaseOTPField.Input.State, typeof state>(state);
                return <input {...props} data-index={index} />;
              },
            };
          },
          separator: ({ afterPosition }) => {
            expectType<number, typeof afterPosition>(afterPosition);
            return {
              orientation: 'vertical',
              title: `After character ${afterPosition}`,
              style: (state) => {
                expectType<BaseOTPField.Separator.State, typeof state>(state);
                return { opacity: state.orientation === 'vertical' ? 1 : 0.5 };
              },
            };
          },
        }}
      />
      {/* @ts-expect-error A code is a string, including in numeric mode. */}
      <OTPField defaultValue={123456} />
      {/* @ts-expect-error The field generates its character inputs from length. */}
      <OTPField>
        <input />
      </OTPField>
      {/* @ts-expect-error The field owns the count. */}
      <OTPField slotProps={{ group: { length: 4 } }} />
      {/* @ts-expect-error The field owns the name submitted to the form. */}
      <OTPField slotProps={{ input: { name: 'per-character' } }} />
    </React.Fragment>
  );
}
