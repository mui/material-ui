import * as React from 'react';
import { StandardProps } from '..';

export interface ToggleButtonGroupProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ToggleButtonGroupClassKey> {
  selected?: boolean;
  exclusive?: boolean;
  value?: any;
}

export type ToggleButtonGroupClassKey = 'root' | 'selected';

declare const ToggleButtonGroup: React.ComponentType<ToggleButtonGroupProps>;

export default ToggleButtonGroup;
