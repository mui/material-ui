import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { ChipButtonClasses } from './chipButtonClasses';
import { OverrideProps } from '../OverridableComponent';

export interface ChipButtonOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ChipButtonClasses> | undefined;
  /**
   * If `true`, the component is disabled.
   * When nested inside a `Chip`, inherits from the parent's `disabled` prop.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple?: boolean | undefined;
  /**
   * If `true`, the disabled button can receive focus.
   * @default true
   */
  focusableWhenDisabled?: boolean | undefined;
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * If `true`, the component is expected to resolve to a native `<button>` element.
   * When omitted, native button semantics are inferred when `component` is
   * `'button'` or absent.
   * Set explicitly when using a custom `component` that resolves to a native `<button>`.
   */
  nativeButton?: boolean | undefined;
  /**
   * @ignore
   */
  tabIndex?: number | undefined;
}

export interface ChipButtonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'button',
> {
  props: AdditionalProps & ChipButtonOwnProps;
  defaultComponent: RootComponent;
}

export type ChipButtonProps<
  RootComponent extends React.ElementType = ChipButtonTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ChipButtonTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType | undefined;
};

export interface ChipButtonOwnerState extends ChipButtonProps {
  component?: React.ElementType | undefined;
}
