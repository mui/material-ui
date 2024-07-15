import * as React from 'react';
import { SxProps } from '@mui/system';
import { SlotComponentProps } from '../utils/types';
import { ButtonBaseProps } from '../ButtonBase';
import { SvgIcon, Theme } from '..';
import { TabScrollButtonClasses } from './tabScrollButtonClasses';

export interface TabScrollButtonStartIconSlotPropsOverrides {}
export interface TabScrollButtonEndIconSlotPropsOverrides {}

export interface TabScrollButtonOwnerState extends TabScrollButtonProps {
  isRtl: boolean;
}

export interface TabScrollButtonProps extends ButtonBaseProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TabScrollButtonClasses>;
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots?: {
    StartScrollButtonIcon?: React.ElementType;
    EndScrollButtonIcon?: React.ElementType;
  };
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   * @default {}
   */
  slotProps?: {
    startScrollButtonIcon?: SlotComponentProps<
      typeof SvgIcon,
      TabScrollButtonStartIconSlotPropsOverrides,
      TabScrollButtonOwnerState
    >;
    endScrollButtonIcon?: SlotComponentProps<
      typeof SvgIcon,
      TabScrollButtonEndIconSlotPropsOverrides,
      TabScrollButtonOwnerState
    >;
  };
  /**
   * The direction the button should indicate.
   */
  direction: 'left' | 'right';
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The component orientation (layout flow direction).
   */
  orientation: 'horizontal' | 'vertical';
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
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
export default function TabScrollButton(props: TabScrollButtonProps): JSX.Element;
