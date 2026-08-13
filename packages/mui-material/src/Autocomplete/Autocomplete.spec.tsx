import * as React from 'react';
import { expectType } from '@mui/types';
import Autocomplete, {
  AutocompleteOwnerState,
  AutocompleteProps,
  AutocompleteRenderGetTagProps,
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ChipTypeMap } from '@mui/material/Chip';
import { AutocompleteValueOrFreeSoloValueMapping } from '../useAutocomplete';

interface MyAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent> {
  myProp?: string;
}

function MyAutocomplete<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
>(props: MyAutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>) {
  return <Autocomplete {...props} />;
}

// Test for ChipComponent generic type
<MyAutocomplete<string, false, false, false, 'span'>
  options={['1', '2', '3']}
  renderValue={(value, getItemProps, ownerState) => {
    expectType<AutocompleteOwnerState<string, false, false, false, 'span'>, typeof ownerState>(
      ownerState,
    );

    return '';
  }}
  renderInput={() => null}
/>;

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
  slotProps={{ listbox: { sx: { height: '10px' } } }}
  renderInput={() => null}
/>;

// Tests presence of onMouseDown prop in InputProps
<Autocomplete
  options={['1', '2', '3']}
  renderInput={(params) => {
    expectType<React.MouseEventHandler, typeof params.slotProps.input.onMouseDown>(
      params.slotProps.input.onMouseDown,
    );
    return <TextField {...params} />;
  }}
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
  renderInput={(params) => <TextField {...params} value={params.slotProps.htmlInput.value} />}
/>;

// Test for focusVisible class
<Autocomplete
  classes={{ focusVisible: 'test' }}
  options={[{ label: '1' }, { label: '2' }]}
  renderInput={(params) => <TextField {...params} />}
/>;

interface Option {
  label: string;
  value: string;
}
const options: Option[] = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
];
const mappedProps: AutocompleteProps<
  Option,
  false,
  false,
  false,
  ChipTypeMap['defaultComponent'],
  string
> = {
  options,
  getOptionValue: (option) => option.value,
  value: '1',
  renderInput: () => null,
};
expectType<string | null | undefined, typeof mappedProps.value>(mappedProps.value);

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
    const { key, onDelete, ...tagProps } = getTagProps({ index });

    return <TagComponent key={key} {...tagProps} {...tag} />;
  });
}

function AutocompleteComponentsProps() {
  return (
    <Autocomplete
      options={['one', 'two', 'three']}
      renderInput={(params) => <TextField {...params} />}
      slotProps={{
        clearIndicator: { size: 'large' },
        paper: { elevation: 2 },
        popper: { placement: 'bottom-end' },
        popupIndicator: { size: 'large' },
        status: { 'aria-label': 'current autocomplete message' },
      }}
    />
  );
}

function CustomListboxRef() {
  const ref = React.useRef(null);
  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} />}
      options={['one', 'two', 'three']}
      slotProps={{ listbox: { ref } }}
    />
  );
}

function CustomStatusSlot() {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} />}
      options={['one', 'two', 'three']}
      slots={{ status: 'div' }}
      slotProps={{ status: { ref } }}
    />
  );
}

// Tests presence of defaultMuiPrevented in event
<Autocomplete
  renderInput={(params) => <TextField {...params} />}
  options={['one', 'two', 'three']}
  onKeyDown={(event) => {
    expectType<
      React.KeyboardEvent<HTMLDivElement> & {
        defaultMuiPrevented?: boolean;
      },
      typeof event
    >(event);
  }}
/>;

// freeSolo prop adds string to the getOptionLabel and isOptionEqualToValue value argument type
<MyAutocomplete
  options={[{ label: '1' }, { label: '2' }]}
  renderInput={() => null}
  freeSolo
  getOptionLabel={(option) => {
    expectType<AutocompleteValueOrFreeSoloValueMapping<{ label: string }, true>, typeof option>(
      option,
    );

    return typeof option === 'string' ? option : option.label;
  }}
  isOptionEqualToValue={(option, value) => {
    expectType<AutocompleteValueOrFreeSoloValueMapping<{ label: string }, true>, typeof value>(
      value,
    );
    expectType<{ label: string }, typeof option>(option);

    return typeof value === 'string' ? option.label === value : option.label === value.label;
  }}
/>;

// getOptionValue separates option-facing callbacks from the selected value
<Autocomplete
  options={options}
  getOptionValue={(option) => {
    expectType<Option, typeof option>(option);
    return option.value;
  }}
  getOptionLabel={(option) => {
    expectType<Option, typeof option>(option);
    return option.label;
  }}
  value="1"
  onChange={(event, value, reason, details) => {
    expectType<string | null, typeof value>(value);
    if (details) {
      expectType<Option, typeof details.option>(details.option);
    }
  }}
  isOptionEqualToValue={(option, value) => {
    expectType<Option, typeof option>(option);
    expectType<string, typeof value>(value);
    return option.value === value;
  }}
  onHighlightChange={(event, option) => {
    expectType<Option | null, typeof option>(option);
  }}
  renderOption={(props, option) => {
    expectType<Option, typeof option>(option);
    return <li {...props}>{option.label}</li>;
  }}
  renderValue={(value) => {
    expectType<string, typeof value>(value);
    return value;
  }}
  renderInput={() => null}
/>;

// multiple mapped values are inferred as arrays of the getOptionValue return type
<Autocomplete
  multiple
  options={options}
  getOptionValue={(option) => Number(option.value)}
  value={[1, 2]}
  defaultValue={[1]}
  onChange={(event, value) => {
    expectType<number[], typeof value>(value);
  }}
  renderValue={(value) => {
    expectType<number[], typeof value>(value);
    return value.join(', ');
  }}
  renderInput={() => null}
/>;

// disableClearable removes null from a mapped single value
<Autocomplete
  disableClearable
  options={options}
  getOptionValue={(option) => Number(option.value)}
  onChange={(event, value) => {
    expectType<number, typeof value>(value);
  }}
  renderInput={() => null}
/>;

// freeSolo adds strings to a non-string mapped value
<Autocomplete
  freeSolo
  options={options}
  getOptionValue={(option) => Number(option.value)}
  onChange={(event, value) => {
    expectType<string | number | null, typeof value>(value);
  }}
  isOptionEqualToValue={(option, value) => {
    expectType<Option, typeof option>(option);
    expectType<string | number, typeof value>(value);
    return typeof value === 'number' && Number(option.value) === value;
  }}
  renderInput={() => null}
/>;

// Existing explicit generic arguments retain their meaning: the second argument is Multiple.
<Autocomplete<Option, true>
  multiple
  options={options}
  onChange={(event, value) => {
    expectType<Option[], typeof value>(value);
  }}
  renderInput={() => null}
/>;

// value cannot change the selected value type without getOptionValue
<Autocomplete
  options={options}
  // @ts-expect-error Without getOptionValue, value must have the same type as an option.
  value="1"
  renderInput={() => null}
/>;

<Autocomplete
  options={options}
  // @ts-expect-error getOptionValue must return a primitive value.
  getOptionValue={(option) => ({ value: option.value })}
  renderInput={() => null}
/>;

<Autocomplete<Option, false, false, false, ChipTypeMap['defaultComponent'], string>
  options={options}
  getOptionValue={(option) => option.value}
  // @ts-expect-error value must match the getOptionValue return type.
  value={1}
  renderInput={() => null}
/>;

// getOptionLabel and isOptionEqualToValue value argument type should not include string when freeSolo is false
<MyAutocomplete
  options={[{ label: '1' }, { label: '2' }]}
  renderInput={() => null}
  getOptionLabel={(option) => {
    expectType<{ label: string }, typeof option>(option);

    return option.label;
  }}
  isOptionEqualToValue={(option, value) => {
    expectType<{ label: string }, typeof value>(value);
    expectType<{ label: string }, typeof option>(option);

    return option.label === value.label;
  }}
/>;
