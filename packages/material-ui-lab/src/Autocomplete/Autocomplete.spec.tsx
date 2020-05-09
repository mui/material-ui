import { Autocomplete, AutocompleteProps, TMultipleConstraint } from '@material-ui/lab';

interface MyAutocomplete<T, TMultiple extends TMultipleConstraint>
  extends AutocompleteProps<T, TMultiple> {
  myProp?: string;
}

function MyAutocomplete<T, TMultiple extends TMultipleConstraint>(
  props: MyAutocomplete<T, TMultiple>,
) {
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
