import * as React from 'react';
import Autocomplete, {
  AutocompleteProps,
  AutocompleteRenderGetTagProps,
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { expectType } from '@mui/types';

interface MyAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  myProp?: string;
}

function MyAutocomplete<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
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

<MyAutocomplete
  options={['1', '2', '3']}
  onChange={(event, value) => {
    expectType<string | null, typeof value>(value);
  }}
  renderInput={() => null}
/>;

// Tests presence of sx prop in ListboxProps
<Autocomplete
  options={['1', '2', '3']}
  ListboxProps={{ sx: { height: '10px' } }}
  renderInput={() => null}
/>;

<MyAutocomplete
  options={['1', '2', '3']}
  onChange={(event, value) => {
    expectType<string, typeof value>(value);
  }}
  renderInput={() => null}
  disableClearable
/>;

<MyAutocomplete
  options={[{ label: '1' }, { label: '2' }]}
  onChange={(event, value) => {
    expectType<string | { label: string } | null, typeof value>(value);
  }}
  renderInput={() => null}
  freeSolo
/>;

// Test for getInputProps return type
<MyAutocomplete
  options={[{ label: '1' }, { label: '2' }]}
  renderInput={(params) => <TextField {...params} value={params.inputProps.value} />}
/>;

interface Option {
  label: string;
  value: string;
}
const options: Option[] = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
];
const defaultOptions = [options[0], options[1]];
<MyAutocomplete
  multiple
  options={options}
  defaultValue={defaultOptions}
  isOptionEqualToValue={(o, v) => o.label === v.label}
  getOptionLabel={(o) => o.label}
  renderInput={() => null}
/>;

interface Tag {
  color: string;
  label: string;
}
type TagComponentProps = Tag & React.HTMLAttributes<HTMLDivElement>;
function TagComponent({ color, label, ...other }: TagComponentProps) {
  return <div {...other}>{label}</div>;
}

function renderTags(value: Tag[], getTagProps: AutocompleteRenderGetTagProps) {
  return value.map((tag: Tag, index) => {
    const { onDelete, ...tagProps } = getTagProps({ index });

    return <TagComponent {...tagProps} {...tag} />;
  });
}

function AutocompleteComponentsProps() {
  return (
    <Autocomplete
      options={['one', 'two', 'three']}
      renderInput={(params) => <TextField {...params} />}
      componentsProps={{
        clearIndicator: { size: 'large' },
        paper: { elevation: 2 },
        popper: { placement: 'bottom-end' },
        popupIndicator: { size: 'large' },
      }}
    />
  );
}
