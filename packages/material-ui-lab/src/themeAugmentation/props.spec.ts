import { createMuiTheme } from '@material-ui/core';

createMuiTheme({
  components: {
    MuiAvatarGroup: {
      defaultProps: {
        spacing: 'small',
        // @ts-expect-error invalid prop
        maximum: 5,
      },
    },
  },
});

// Ensure Autocomplete generics are loose
const trueOrFalse = true as boolean;
const val = '' as string | null | string[];
createMuiTheme({
  components: {
    MuiAutocomplete: {
      defaultProps: {
        multiple: trueOrFalse,
        disableClearable: trueOrFalse,
        freeSolo: trueOrFalse,
        options: [],
        value: val,
        defaultValue: val,
      },
    },
  },
});
