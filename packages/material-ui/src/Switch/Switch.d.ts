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
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `edge="start"`. */
    edgeStart?: string;
    /** Styles applied to the root element if `edge="end"`. */
    edgeEnd?: string;
    /** Styles applied to the internal `SwitchBase` component's `root` class. */
    switchBase?: string;
    /** Styles applied to the internal SwitchBase component's root element if `color="primary"`. */
    colorPrimary?: string;
    /** Styles applied to the internal SwitchBase component's root element if `color="secondary"`. */
    colorSecondary?: string;
    /** Styles applied to the root element if `size="small"`. */
    sizeSmall?: string;
    /** Pseudo-class applied to the internal `SwitchBase` component's `checked` class. */
    checked?: string;
    /** Pseudo-class applied to the internal SwitchBase component's disabled class. */
    disabled?: string;
    /** Styles applied to the internal SwitchBase component's input element. */
    input?: string;
    /** Styles used to create the thumb passed to the internal `SwitchBase` component `icon` prop. */
    thumb?: string;
    /** Styles applied to the track element. */
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
