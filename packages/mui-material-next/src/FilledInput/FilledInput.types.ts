import { SxProps } from '@mui/system';
// TODO v6: port to material-next
// eslint-disable-next-line no-restricted-imports
import { InternalStandardProps as StandardProps } from '@mui/material';
import { OverrideProps, Simplify } from '@mui/types';
import { Theme } from '../styles/Theme.types';
import { InputBaseProps } from '../InputBase/InputBase.types';
import { FilledInputClasses } from './filledInputClasses';

export interface FilledInputOwnProps
  extends StandardProps<Omit<InputBaseProps, 'children' | 'slots'>> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FilledInputClasses>;
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel?: boolean;
  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline?: boolean;
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: FilledInputSlots;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface FilledInputSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the input.
   * @default 'input'
   */
  input?: React.ElementType;
}

export interface FilledInputTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: FilledInputOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type FilledInputProps<
  RootComponentType extends React.ElementType = FilledInputTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<FilledInputTypeMap<AdditionalProps, RootComponentType>, RootComponentType> & {
  inputComponent?: React.ElementType;
};

export type FilledInputOwnerState = Simplify<
  FilledInputOwnProps & {
    disableUnderline?: boolean;
    fullWidth: boolean;
    inputComponent: React.ElementType;
    multiline: boolean;
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  }
>;
