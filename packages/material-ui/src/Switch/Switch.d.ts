import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { SwitchBaseProps } from '../internal/SwitchBase';

export interface SwitchProps
  extends StandardProps<SwitchBaseProps, 'checkedIcon' | 'color' | 'icon'> {
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    edgeStart?: string;
    edgeEnd?: string;
    switchBase?: string;
    colorPrimary?: string;
    colorSecondary?: string;
    sizeSmall?: string;
    checked?: string;
    disabled?: string;
    input?: string;
    thumb?: string;
    track?: string;
  };
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'secondary'
   */
  color?: 'primary' | 'secondary' | 'default';
  /**
   * If `true`, the switch will be disabled.
   */
  disabled?: boolean;
  /**
   * The icon to display when the component is unchecked.
   */
  icon?: React.ReactNode;
  /**
   * The size of the switch.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size?: 'small' | 'medium';
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: unknown;
}

export type SwitchClassKey = keyof NonNullable<SwitchProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Switches](https://material-ui.com/components/switches/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 *
 * - [Switch API](https://material-ui.com/api/switch/)
 * - inherits [IconButton API](https://material-ui.com/api/icon-button/)
 */
export default function Switch(props: SwitchProps): JSX.Element;
