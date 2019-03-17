import * as React from 'react';

export interface SelectableGroupProps {
  name?: string;
  exclusive?: boolean;
  onChange?: (event: React.ChangeEvent<{}>, selected: any) => void;
  value?: Array<string | number | boolean | object> | string | number | boolean | object;
}

declare const SelectableGroup: React.ComponentType<SelectableGroupProps>;

export default SelectableGroup;
