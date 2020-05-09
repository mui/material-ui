import { Autocomplete, AutocompleteProps, TBooleanConstraint } from '@material-ui/lab';

interface MyAutocomplete<
  T,
  TMultiple extends TBooleanConstraint,
  TDisableClearable extends TBooleanConstraint,
  TFreeSolo extends TBooleanConstraint
> extends AutocompleteProps<T, TMultiple, TDisableClearable, TFreeSolo> {
  myProp?: string;
}

function MyAutocomplete<
  T,
  TMultiple extends TBooleanConstraint,
  TDisableClearable extends TBooleanConstraint,
  TFreeSolo extends TBooleanConstraint
>(props: MyAutocomplete<T, TMultiple, TDisableClearable, TFreeSolo>) {
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
