import * as React from 'react';

import { StandardProps } from '@material-ui/core';

interface ToggleButtonGroupProps<T>
  extends StandardProps<
      React.HTMLAttributes<HTMLDivElement>,
      ToggleButtonGroupClassKey,
      'onChange'
    > {
  exclusive?: boolean;
  /**
   * Triggered when a child triggers an onChange event.
   * The value argument contains all value(s) that are still selected or is null
   * if no values are selected.
   */
  onChange?: (value: T | null) => void;
  selected?: boolean;
  /**
   * the selected values
   */
  value?: T;
}

export type ToggleButtonGroupClassKey = 'root' | 'selected';

export default class ToggleButtonGroup<T> extends React.Component<ToggleButtonGroupProps<T>> {}
