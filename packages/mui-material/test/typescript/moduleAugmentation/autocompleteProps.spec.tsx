import * as React from 'react';
import { expectType } from '@mui/types';
import Autocomplete from '@mui/material/Autocomplete';
import { AutocompleteMappedValue } from '@mui/material/useAutocomplete';

declare module '@mui/material/useAutocomplete' {
  interface UseAutocompleteProps<
    Option,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
  > {
    hookLabel?: string;
  }

  interface UseAutocompleteMappedProps<
    Option,
    Value extends AutocompleteMappedValue<FreeSolo>,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false,
  > {
    mappedHookLabel?: string;
  }
}

const options = [{ id: 1, label: 'One' }];

// Hook prop augmentations also reach the component props and owner state.
<Autocomplete
  options={options}
  hookLabel="Custom"
  renderInput={() => null}
  renderValue={(value, getItemProps, ownerState) => {
    expectType<string | undefined, typeof ownerState.hookLabel>(ownerState.hookLabel);
    return value.label;
  }}
/>;

<Autocomplete
  options={options}
  getOptionValue={(option) => option.id}
  mappedHookLabel="Custom"
  renderInput={() => null}
  renderValue={(value, getItemProps, ownerState) => {
    expectType<number, typeof value>(value);
    expectType<string | undefined, typeof ownerState.mappedHookLabel>(ownerState.mappedHookLabel);
    return value;
  }}
/>;
