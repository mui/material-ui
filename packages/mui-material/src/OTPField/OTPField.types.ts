import type * as React from 'react';
import type { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import type { FormControlProps } from '../FormControl';
import type { FormHelperTextProps } from '../FormHelperText';
import type { FormLabelProps } from '../FormLabel';
import type { CreateSlotsAndSlotProps, SlotComponentProps } from '../utils/types';
import type { OTPFieldClasses } from './otpFieldClasses';

type RootProps = BaseOTPField.Root.Props;

interface OTPFieldBehaviorProps {
  /**
   * The autocomplete hint for the first character input and the form input.
   * @default 'one-time-code'
   */
  autoComplete?: RootProps['autoComplete'] | undefined;
  /**
   * Submit the associated form when the code becomes complete.
   * @default false
   */
  autoSubmit?: RootProps['autoSubmit'] | undefined;
  /**
   * The initial code for an uncontrolled field.
   * @default ''
   */
  defaultValue?: RootProps['defaultValue'] | undefined;
  /** Disable all the character inputs and omit the code from form submission. */
  disabled?: RootProps['disabled'] | undefined;
  /** The ID of the form that owns the field. */
  form?: RootProps['form'] | undefined;
  /** The ID of the first character input. Subsequent input IDs are derived from it. */
  id?: RootProps['id'] | undefined;
  /** The virtual keyboard hint. Defaults to the keyboard for the validation type. */
  inputMode?: RootProps['inputMode'] | undefined;
  /**
   * The number of characters in the code. Must be a positive integer.
   * @default 6
   */
  length?: RootProps['length'] | undefined;
  /**
   * Mask the characters as they are entered.
   * @default false
   */
  mask?: RootProps['mask'] | undefined;
  /** The name used to submit the field value as one string. */
  name?: RootProps['name'] | undefined;
  /** Normalize the filtered code before it is stored. The function should be idempotent. */
  normalizeValue?: RootProps['normalizeValue'] | undefined;
  /** Called with the new code and the change details. The change can be canceled. */
  onValueChange?: RootProps['onValueChange'] | undefined;
  /** Called when the code becomes complete or a complete code is pasted, before optional form submission. */
  onValueComplete?: RootProps['onValueComplete'] | undefined;
  /** Called with the attempted input when filtering or normalization rejects characters. */
  onValueInvalid?: RootProps['onValueInvalid'] | undefined;
  /** Keep the field focusable while preventing edits. */
  readOnly?: RootProps['readOnly'] | undefined;
  /** Require a complete code before form submission. */
  required?: RootProps['required'] | undefined;
  /**
   * The set of characters accepted in the code.
   * @default 'numeric'
   */
  validationType?: RootProps['validationType'] | undefined;
  /** The code when controlling the field. Use an empty string for an empty field. */
  value?: RootProps['value'] | undefined;
}

/**
 * The group, input, and separator slots replace the host element of the corresponding
 * Base UI part. An explicit slot takes precedence over that part's `slotProps.render`.
 */
export interface OTPFieldSlots {
  /**
   * The outer field container.
   * @default FormControl
   */
  root: React.ElementType;
  /**
   * The visible field label.
   * @default FormLabel
   */
  label: React.ElementType;
  /**
   * The host for Base UI OTPField.Root.
   * @default 'div'
   */
  group: React.ElementType;
  /**
   * The host for Base UI OTPField.Input. Replacements must forward props and ref to an input.
   * @default 'input'
   */
  input: React.ElementType;
  /**
   * The host for Base UI OTPField.Separator.
   * @default 'div'
   */
  separator: React.ElementType;
  /**
   * The supporting or error text.
   * @default FormHelperText
   */
  helperText: React.ElementType;
}

export interface OTPFieldOwnerState {
  length: number;
  size: NonNullable<FormControlProps['size']>;
  error: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
}

type OwnedContent = 'children' | 'dangerouslySetInnerHTML';
type PartProps<Props, State = OTPFieldOwnerState> = SlotComponentProps<React.FC<Props>, {}, State>;

export type OTPFieldSlotsAndSlotProps = CreateSlotsAndSlotProps<
  OTPFieldSlots,
  {
    root: PartProps<
      Omit<FormControlProps, OwnedContent | 'disabled' | 'required' | 'error' | 'size'>
    >;
    label: PartProps<Omit<FormLabelProps, OwnedContent | 'htmlFor'>>;
    /** Base UI Root element props, including state-aware render, className and style. */
    group: PartProps<Omit<RootProps, keyof OTPFieldBehaviorProps | OwnedContent>>;
    /** Base UI Input element props. The callback receives the zero-based character index. */
    input: PartProps<
      Omit<
        BaseOTPField.Input.Props,
        | OwnedContent
        | 'id'
        | 'name'
        | 'form'
        | 'value'
        | 'disabled'
        | 'readOnly'
        | 'required'
        | 'tabIndex'
      >,
      OTPFieldOwnerState & { index: number }
    >;
    /** Base UI Separator props. The callback receives the preceding character's one-based position. */
    separator: PartProps<
      Omit<BaseOTPField.Separator.Props, OwnedContent | 'aria-hidden' | 'tabIndex'>,
      OTPFieldOwnerState & { afterPosition: number }
    >;
    helperText: PartProps<Omit<FormHelperTextProps, OwnedContent>>;
  }
>;

export interface OTPFieldProps
  extends
    OTPFieldBehaviorProps,
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      keyof OTPFieldBehaviorProps | OwnedContent | 'onChange'
    > {
  /** Focus the first character input on mount. */
  autoFocus?: boolean | undefined;
  /** Override or extend the styles applied to the component. */
  classes?: Partial<OTPFieldClasses> | undefined;
  /** A CSS class name applied to the outer root element. */
  className?: string | undefined;
  /**
   * Display the field in an error state.
   * @default false
   */
  error?: boolean | undefined;
  /**
   * Accessible name for a character after the first. Positions start at one.
   * @default function defaultGetInputAriaLabel(position: number, length: number) {
   *   return `Character ${position} of ${length}`;
   * }
   */
  getInputAriaLabel?: ((position: number, length: number) => string) | undefined;
  /** The supporting or error text displayed below the inputs. */
  helperText?: React.ReactNode;
  /** A ref to the first visible character input. */
  inputRef?: React.Ref<HTMLInputElement> | undefined;
  /** The label associated with the first character input. */
  label?: React.ReactNode;
  /**
   * Return decorative content between adjacent character inputs, or null to leave the gap empty.
   * Positions range from 1 to `length - 1`.
   */
  renderSeparator?: ((afterPosition: number) => React.ReactNode) | undefined;
  /**
   * The size of the field.
   * @default 'medium'
   */
  size?: FormControlProps['size'] | undefined;
  /** Props for the Material slots and their corresponding Base UI parts. */
  slotProps?: OTPFieldSlotsAndSlotProps['slotProps'] | undefined;
  /** Components used to render the field's slots. */
  slots?: OTPFieldSlotsAndSlotProps['slots'] | undefined;
  /** System styles for the outer root element. */
  sx?: FormControlProps['sx'] | undefined;
}
