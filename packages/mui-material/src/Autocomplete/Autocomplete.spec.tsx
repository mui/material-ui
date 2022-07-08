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
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
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

interface Tag {
  color: string;
  label: string;
}
type TagComponentProps = Tag & React.HTMLAttributes<HTMLDivElement>;
const TagComponent = ({ color, label, ...other }: TagComponentProps) => (
  <div {...other}>{label}</div>
);

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
