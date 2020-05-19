import { useAutocomplete } from '@material-ui/lab';

interface Person {
  id: string;
  name: string;
}

const persons: Person[] = [
  { id: '1', name: 'Chris' },
  { id: '2', name: 'Kim' },
  { id: '3', name: 'Ben' },
  { id: '4', name: 'Matt' },
];

// Single selection mode

// value type is inferred correctly when multiple is undefined
useAutocomplete({
  options: ['1', '2', '3'],
  onChange(event, value) {
    // $ExpectType string | null
    value;
  },
});

// value type is inferred correctly when multiple is false
useAutocomplete({
  options: ['1', '2', '3'],
  multiple: false,
  onChange(event, value) {
    // $ExpectType string | null
    value;
  },
});

// value type is inferred correctly for type unions
useAutocomplete({
  options: ['1', '2', '3', 4, true],
  onChange(event, value) {
    // $ExpectType string | number | boolean | null
    value;
  },
});

// value type is inferred correctly for interface
useAutocomplete({
  options: persons,
  onChange(event, value) {
    // $ExpectType Person | null
    value;
  },
});

// value type is inferred correctly when value is set
useAutocomplete({
  options: ['1', '2', '3'],
  onChange(event, value) {
    // $ExpectType string | null
    value;
  },
  filterOptions(options, state) {
    // $ExpectType FilterOptionsState<string>
    state;
    // $ExpectType string[]
    options;
    return options;
  },
  getOptionLabel(option) {
    // $ExpectType string
    option;
    return option;
  },
  value: null,
});

// Multiple selection mode

// value type is inferred correctly for simple type
useAutocomplete({
  options: ['1', '2', '3'],
  multiple: true,
  onChange(event, value) {
    // $ExpectType string[]
    value;
  },
});

// value type is inferred correctly for union type
useAutocomplete({
  options: ['1', '2', '3', 4, true],
  multiple: true,
  onChange(event, value) {
    // $ExpectType (string | number | boolean)[]
    value;
  },
});

// value type is inferred correctly for interface
useAutocomplete({
  options: persons,
  multiple: true,
  onChange(event, value) {
    // $ExpectType Person[]
    value;
  },
});

// no type inference conflict when value type is set explicitly
useAutocomplete({
  options: persons,
  multiple: true,
  onChange(event, value: Person[]) {},
});

// Disable clearable

useAutocomplete({
  options: ['1', '2', '3'],
  disableClearable: true,
  onChange(event, value) {
    // $ExpectType string
    value;
  },
});

useAutocomplete({
  options: ['1', '2', '3'],
  disableClearable: false,
  onChange(event, value) {
    // $ExpectType string | null
    value;
  },
});

useAutocomplete({
  options: ['1', '2', '3'],
  onChange(event, value) {
    // $ExpectType string | null
    value;
  },
});

// Free solo
useAutocomplete({
  options: persons,
  onChange(event, value) {
    // $ExpectType string | Person | null
    value;
  },
  freeSolo: true,
});

useAutocomplete({
  options: persons,
  disableClearable: true,
  onChange(event, value) {
    // $ExpectType string | Person
    value;
  },
  freeSolo: true,
});

useAutocomplete({
  options: persons,
  multiple: true,
  onChange(event, value) {
    // $ExpectType (string | Person)[]
    value;
  },
  freeSolo: true,
});
