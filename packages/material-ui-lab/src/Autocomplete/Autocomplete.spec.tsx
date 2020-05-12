import { Autocomplete, AutocompleteProps, TBooleanConstraint } from '@material-ui/lab';

interface MyAutocomplete<
  T,
  Multiple extends TBooleanConstraint,
  DisableClearable extends TBooleanConstraint,
  FreeSolo extends TBooleanConstraint
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  myProp?: string;
}

function MyAutocomplete<
  T,
  Multiple extends TBooleanConstraint,
  DisableClearable extends TBooleanConstraint,
  FreeSolo extends TBooleanConstraint
>(props: MyAutocomplete<T, Multiple, DisableClearable, FreeSolo>) {
  return <Autocomplete {...props} />;
}

// multiple prop can be assigned for components that extend AutocompleteProps
<MyAutocomplete
  options={['1', '2', '3']}
  onChange={(event, value) => {
    // $ExpectType string[]
    value;
  }}
  renderInput={() => null}
  multiple
/>;
