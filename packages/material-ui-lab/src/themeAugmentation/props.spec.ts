import { createMuiTheme } from '@material-ui/core';

createMuiTheme({
  components: {
    MuiAvatarGroup: {
      props: {
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
      props: {
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
