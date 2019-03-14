import * as React from 'react';

export interface SelectableGroupProps {
  additional?: object;
  exclusive?: boolean;
  onChange?: (event: React.ChangeEvent<{}>, selected: any) => void;
  value?: unknown;
}

declare const SelectableGroup: React.ComponentType<SelectableGroupProps>;

export default SelectableGroup;
