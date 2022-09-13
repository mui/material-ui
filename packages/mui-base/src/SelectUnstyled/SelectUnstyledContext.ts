import * as React from 'react';
import { OptionState } from '@mui/base/useListbox';
import { SelectOption, UseSelectOptionSlotProps } from '@mui/base/useSelect';

export interface SelectUnstyledContextType {
  getOptionState: (value: SelectOption<any>) => OptionState;
  getOptionProps: (option: SelectOption<any>) => UseSelectOptionSlotProps;
  listboxRef: React.RefObject<HTMLElement>;
}

export const SelectUnstyledContext = React.createContext<SelectUnstyledContextType | undefined>(
  undefined,
);
