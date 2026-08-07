import type * as React from 'react';
import { type SxProps } from '@mui/system';
import { type SlotComponentProps } from '../utils/types';
import { type ButtonBaseProps } from '../ButtonBase';
import { type Theme } from '../styles';
import type SvgIcon from '../SvgIcon';
import { type TabScrollButtonClasses } from './tabScrollButtonClasses';

export interface TabScrollButtonStartIconSlotPropsOverrides {}
export interface TabScrollButtonEndIconSlotPropsOverrides {}

export interface TabScrollButtonOwnerState extends TabScrollButtonProps {
  isRtl: boolean;
}

export interface TabScrollButtonProps extends Omit<ButtonBaseProps, 'nativeButton'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TabScrollButtonClasses> | undefined;
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots?:
    | {
        StartScrollButtonIcon?: React.ElementType | undefined;
        EndScrollButtonIcon?: React.ElementType | undefined;
      }
    | undefined;
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   * @default {}
   */
  slotProps?:
    | {
        startScrollButtonIcon?:
          | SlotComponentProps<
              typeof SvgIcon,
              TabScrollButtonStartIconSlotPropsOverrides,
              TabScrollButtonOwnerState
            >
          | undefined;
        endScrollButtonIcon?:
          | SlotComponentProps<
              typeof SvgIcon,
              TabScrollButtonEndIconSlotPropsOverrides,
              TabScrollButtonOwnerState
            >
          | undefined;
      }
    | undefined;
  /**
   * The direction the button should indicate.
   */
  direction: 'left' | 'right';
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * The component orientation (layout flow direction).
   */
  orientation: 'horizontal' | 'vertical';
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/material-ui/react-tabs/)
 *
 * API:
 *
 * - [TabScrollButton API](https://mui.com/material-ui/api/tab-scroll-button/)
 */
export default function TabScrollButton(props: TabScrollButtonProps): React.JSX.Element;
