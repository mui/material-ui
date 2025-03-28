import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme, InternalStandardProps as StandardProps } from '..';
import Typography, { TypographyProps } from '../Typography';
import { FormControlLabelClasses } from './formControlLabelClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface FormControlLabelSlots {
  /**
   * The component that renders the label.
   * This is unused if `disableTypography` is true.
   * @default Typography
   */
  typography: React.ElementType;
}

export type FormControlLabelSlotsAndSlotProps = CreateSlotsAndSlotProps<
  FormControlLabelSlots,
  {
    typography: SlotProps<typeof Typography, {}, FormControlLabelProps>;
  }
>;

export interface FormControlLabelProps
  extends StandardProps<React.LabelHTMLAttributes<HTMLLabelElement>, 'children' | 'onChange'>,
    FormControlLabelSlotsAndSlotProps {
  /**
   * If `true`, the component appears selected.
   */
  checked?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormControlLabelClasses>;
  /**
   * The props used for each slot inside.
   * @default {}
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  componentsProps?: {
    /**
     * Props applied to the Typography wrapper of the passed label.
     * This is unused if disableTypography is true.
     * @default {}
     */
    typography?: TypographyProps;
  };
  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: React.ReactElement<unknown, any>;
  /**
   * If `true`, the control is disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the label is rendered as it is passed without an additional typography node.
   */
  disableTypography?: boolean;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<any>;
  /**
   * A text or an element to be used in an enclosing label element.
   */
  label: React.ReactNode;
  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  name?: string;
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: (event: React.SyntheticEvent, checked: boolean) => void;
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The value of the component.
   */
  value?: unknown;
}

/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 *
 * Demos:
 *
 * - [Checkbox](https://v6.mui.com/material-ui/react-checkbox/)
 * - [Radio Group](https://v6.mui.com/material-ui/react-radio-button/)
 * - [Switch](https://v6.mui.com/material-ui/react-switch/)
 *
 * API:
 *
 * - [FormControlLabel API](https://v6.mui.com/material-ui/api/form-control-label/)
 */
export default function FormControlLabel(props: FormControlLabelProps): React.JSX.Element;
