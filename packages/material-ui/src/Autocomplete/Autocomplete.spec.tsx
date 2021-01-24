import * as React from 'react';
import { Autocomplete, AutocompleteProps, InputLabelProps } from '@material-ui/core';
import { expectType } from '@material-ui/types';

interface MyAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  myProp?: string;
}

function MyAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(props: MyAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  return <Autocomplete {...props} />;
}

// multiple prop can be assigned for components that extend AutocompleteProps
<MyAutocomplete
  options={['1', '2', '3']}
  onChange={(event, value) => {
    expectType<string[], typeof value>(value);
  }}
  renderInput={() => null}
  multiple
/>;
