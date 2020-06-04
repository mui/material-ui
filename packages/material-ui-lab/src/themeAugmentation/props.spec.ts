import { createMuiTheme } from '@material-ui/core';

createMuiTheme({
  props: {
    MuiAvatarGroup: {
      spacing: 'small',
      // @ts-expect-error invalid prop
      maximum: 5,
    },
  },
});

// Ensure Autocomplete generics are loose
const trueOrFalse = true as boolean;
const val = '' as string | null | string[];
createMuiTheme({
  props: {
    MuiAutocomplete: {
      multiple: trueOrFalse,
      disableClearable: trueOrFalse,
      freeSolo: trueOrFalse,
      options: [],
      value: val,
      defaultValue: val,
    },
  },
});
