import { expectType } from '@mui/types';
import {
  useAutocomplete,
  FilterOptionsState,
  AutocompleteGroupedOption,
  UseAutocompleteProps,
} from '@mui/material/useAutocomplete';

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

function Component() {
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

  // options accepts const and value has correct type
  useAutocomplete({
    options: ['1', '2', '3'] as const,
    onChange(event, value) {
      expectType<'1' | '2' | '3' | null, typeof value>(value);
    },
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

  useAutocomplete({
    options: persons,
    getOptionLabel(option) {
      expectType<string | Person, typeof option>(option);
      return '';
    },
    freeSolo: true,
  });

  useAutocomplete({
    options: persons,
    getOptionKey(option) {
      expectType<string | Person, typeof option>(option);
      return '';
    },
    freeSolo: true,
  });

  // getOptionValue separates the option type from the selected value type
  const mappedAutocomplete = useAutocomplete({
    options: persons,
    getOptionValue(option) {
      expectType<Person, typeof option>(option);
      return option.id;
    },
    getOptionLabel(option) {
      expectType<Person, typeof option>(option);
      return option.name;
    },
    isOptionEqualToValue(option, value) {
      expectType<Person, typeof option>(option);
      expectType<string, typeof value>(value);
      return option.id === value;
    },
    onChange(event, value, reason, details) {
      expectType<string | null, typeof value>(value);
      if (details) {
        expectType<Person, typeof details.option>(details.option);
      }
    },
    onHighlightChange(event, option) {
      expectType<Person | null, typeof option>(option);
    },
    value: persons[0].id,
  });
  expectType<string | null, typeof mappedAutocomplete.value>(mappedAutocomplete.value);
  const mappedOption = mappedAutocomplete.getOptionFromValue(persons[0].id);
  expectType<Person | null, typeof mappedOption>(mappedOption);
  expectType<Person[], typeof mappedAutocomplete.groupedOptions>(mappedAutocomplete.groupedOptions);

  const mappedGroupedAutocomplete = useAutocomplete({
    options: persons,
    getOptionValue: (option) => option.id,
    groupBy: (option) => option.name[0],
  });
  expectType<string | null, typeof mappedGroupedAutocomplete.value>(
    mappedGroupedAutocomplete.value,
  );
  expectType<AutocompleteGroupedOption<Person>[], typeof mappedGroupedAutocomplete.groupedOptions>(
    mappedGroupedAutocomplete.groupedOptions,
  );

  // mapped multiple values use the getOptionValue return type
  useAutocomplete({
    options: persons,
    getOptionValue: (option) => Number(option.id),
    multiple: true,
    defaultValue: [1, 2],
    onChange(event, value) {
      expectType<number[], typeof value>(value);
    },
  });

  // disableClearable removes null from a mapped single value
  useAutocomplete({
    options: persons,
    getOptionValue: (option) => Number(option.id),
    disableClearable: true,
    onChange(event, value) {
      expectType<number, typeof value>(value);
    },
  });

  // freeSolo adds strings to a non-string mapped value
  useAutocomplete({
    options: persons,
    getOptionValue: (option) => Number(option.id),
    freeSolo: true,
    onChange(event, value) {
      expectType<string | number | null, typeof value>(value);
    },
    isOptionEqualToValue(option, value) {
      expectType<Person, typeof option>(option);
      expectType<string | number, typeof value>(value);
      return typeof value === 'number' && Number(option.id) === value;
    },
  });

  useAutocomplete({
    options: persons,
    // @ts-expect-error String option values are indistinguishable from freeSolo values.
    getOptionValue: (option) => option.id,
    freeSolo: true,
  });

  // Existing explicit generic arguments retain their meaning and raw-option value type
  const existingProps: UseAutocompleteProps<Person, false, false, false> = {
    options: persons,
    value: persons[0],
  };
  expectType<Person | null | undefined, typeof existingProps.value>(existingProps.value);

  const inferredFromRawValue = useAutocomplete({ options: [], value: persons[0] });
  expectType<Person | null, typeof inferredFromRawValue.value>(inferredFromRawValue.value);

  useAutocomplete<Person, true>({
    options: persons,
    multiple: true,
    onChange(event, value) {
      expectType<Person[], typeof value>(value);
    },
  });

  // Appending OptionValue allows explicitly typed mapped wrappers
  const mappedProps: UseAutocompleteProps<Person, false, false, false, string> = {
    options: persons,
    getOptionValue: (option) => option.id,
    value: persons[0].id,
  };
  expectType<string | null | undefined, typeof mappedProps.value>(mappedProps.value);

  // `value` alone must not opt an object-option Autocomplete into mapped-value mode
  useAutocomplete({
    options: persons,
    // @ts-expect-error Without getOptionValue, value must have the same type as an option.
    value: persons[0].id,
  });

  useAutocomplete({
    options: persons,
    // @ts-expect-error getOptionValue must return a primitive value.
    getOptionValue: (option) => ({ id: option.id }),
  });

  useAutocomplete<Person, false, false, false, string>({
    options: persons,
    getOptionValue: (option) => option.id,
    // @ts-expect-error value must match the getOptionValue return type.
    value: 1,
  });

  const ungroupedAutocomplete = useAutocomplete({ options: persons });
  expectType<Person[], typeof ungroupedAutocomplete.groupedOptions>(
    ungroupedAutocomplete.groupedOptions,
  );

  const groupedAutocomplete = useAutocomplete({
    options: persons,
    groupBy: ({ id }) => id,
  });
  expectType<AutocompleteGroupedOption<Person>[], typeof groupedAutocomplete.groupedOptions>(
    groupedAutocomplete.groupedOptions,
  );
}
