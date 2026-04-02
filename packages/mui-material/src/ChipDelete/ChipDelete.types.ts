import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { ChipDeleteClasses } from './chipDeleteClasses';
import { OverrideProps } from '../OverridableComponent';

export interface ChipDeleteOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ChipDeleteClasses> | undefined;
  /**
   * @ignore
   */
  className?: string | undefined;
  /**
   * If `true`, the component is disabled.
   * When inside a `Chip`, inherits the chip's `disabled` state.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, the disabled delete button can receive focus.
   * @default true
   */
  focusableWhenDisabled?: boolean | undefined;
  /**
   * Override the default delete icon element.
   */
  icon?: React.ReactElement<unknown> | undefined;
  /**
   * The accessible label for the delete button.
   * @default 'Remove'
   */
  label?: string | undefined;
  /**
   * Callback fired when the delete action is triggered.
   * This fires on click, keyboard activation (Enter/Space), and when
   * Backspace or Delete is pressed while the component has focus.
   */
  onDelete?: React.EventHandler<React.SyntheticEvent<HTMLElement>> | undefined;
  /**
   * @ignore
   */
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  /**
   * @ignore
   */
  onFocus?: React.FocusEventHandler<HTMLElement> | undefined;
  /**
   * @ignore
   */
  onBlur?: React.FocusEventHandler<HTMLElement> | undefined;
  /**
   * @ignore
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement> | undefined;
  /**
   * @ignore
   */
  onKeyUp?: React.KeyboardEventHandler<HTMLElement> | undefined;
  /**
   * If `true`, the component is expected to resolve to a native `<button>` element.
   * When omitted, native button semantics are inferred when `component` is
   * `'button'` or absent.
   * Set explicitly when using a custom `component` that resolves to a native `<button>`.
   */
  nativeButton?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface ChipDeleteTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'button',
> {
  props: AdditionalProps & ChipDeleteOwnProps;
  defaultComponent: RootComponent;
}

export type ChipDeleteProps<
  RootComponent extends React.ElementType = ChipDeleteTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ChipDeleteTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType | undefined;
};

export interface ChipDeleteOwnerState extends Omit<ChipDeleteProps, 'color'> {
  color: string;
  size: string;
  variant: string;
  disabled: boolean;
  component?: React.ElementType | undefined;
}
