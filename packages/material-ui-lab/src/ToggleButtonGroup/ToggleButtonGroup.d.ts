import * as React from 'react';

import { StandardProps } from '@material-ui/core';

export interface ToggleButtonGroupProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    ToggleButtonGroupClassKey,
    'onChange' | 'children'
  > {
  /**
   * The content of the button.
   */
  children?: React.ReactNode;
  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   */
  exclusive?: boolean;
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange?: (event: React.MouseEvent<HTMLElement>, value: any) => void;
  /**
   * The size of the buttons.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   */
  value?: any;
}

export type ToggleButtonGroupClassKey =
  | 'root'
  | 'grouped'
  | 'groupedSizeSmall'
  | 'groupedSizeLarge';

export default function ToggleButtonGroup(props: ToggleButtonGroupProps): JSX.Element;
