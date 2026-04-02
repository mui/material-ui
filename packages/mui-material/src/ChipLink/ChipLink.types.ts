import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { ChipLinkClasses } from './chipLinkClasses';

export interface ChipLinkOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ChipLinkClasses> | undefined;
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple?: boolean | undefined;
  /**
   * The URL to link to.
   */
  href: string;
  /**
   * @ignore
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  /**
   * @ignore
   */
  onFocus?: React.FocusEventHandler<HTMLAnchorElement> | undefined;
  /**
   * @ignore
   */
  onBlur?: React.FocusEventHandler<HTMLAnchorElement> | undefined;
  /**
   * @ignore
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement> | undefined;
  /**
   * @ignore
   */
  onKeyUp?: React.KeyboardEventHandler<HTMLAnchorElement> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface ChipLinkOwnerState extends ChipLinkProps {}

export interface ChipLinkProps
  extends
    ChipLinkOwnProps,
    Omit<
      React.ComponentPropsWithoutRef<'a'>,
      'children' | 'color' | 'href' | 'onClick' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'onKeyUp'
    > {}
