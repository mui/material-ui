import { useAutocomplete, FilterOptionsState } from '@material-ui/lab';
import { expectType } from '@material-ui/types';

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
    expectType<string | null, typeof value>(value);
  },
});

// value type is inferred correctly when multiple is false
useAutocomplete({
  options: ['1', '2', '3'],
  multiple: false,
  onChange(event, value) {
    expectType<string | null, typeof value>(value);
  },
});

// value type is inferred correctly for type unions
useAutocomplete({
  options: ['1', '2', '3', 4, true],
  onChange(event, value) {
    expectType<string | number | boolean | null, typeof value>(value);
  },
});

// value type is inferred correctly for interface
useAutocomplete({
  options: persons,
  onChange(event, value) {
    expectType<Person | null, typeof value>(value);
  },
});

// value type is inferred correctly when value is set
useAutocomplete({
  options: ['1', '2', '3'],
  onChange(event, value) {
    expectType<string | null, typeof value>(value);
    value;
  },
  filterOptions(options, state) {
    expectType<FilterOptionsState<string>, typeof state>(state);
    expectType<string[], typeof options>(options);
    return options;
  },
  getOptionLabel(option) {
    expectType<string, typeof option>(option);
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
    expectType<string[], typeof value>(value);
    value;
  },
});

// value type is inferred correctly for union type
useAutocomplete({
  options: ['1', '2', '3', 4, true],
  multiple: true,
  onChange(event, value) {
    expectType<Array<string | number | boolean>, typeof value>(value);
  },
});

// value type is inferred correctly for interface
useAutocomplete({
  options: persons,
  multiple: true,
  onChange(event, value) {
    expectType<Person[], typeof value>(value);
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
    expectType<string, typeof value>(value);
  },
});

useAutocomplete({
  options: ['1', '2', '3'],
  disableClearable: false,
  onChange(event, value) {
    expectType<string | null, typeof value>(value);
  },
});

useAutocomplete({
  options: ['1', '2', '3'],
  onChange(event, value) {
    expectType<string | null, typeof value>(value);
  },
});

// Free solo
useAutocomplete({
  options: persons,
  onChange(event, value) {
    expectType<string | Person | null, typeof value>(value);
  },
  freeSolo: true,
});

useAutocomplete({
  options: persons,
  disableClearable: true,
  onChange(event, value) {
    expectType<string | Person, typeof value>(value);
  },
  freeSolo: true,
});

useAutocomplete({
  options: persons,
  multiple: true,
  onChange(event, value) {
    expectType<Array<string | Person>, typeof value>(value);
  },
  freeSolo: true,
});
