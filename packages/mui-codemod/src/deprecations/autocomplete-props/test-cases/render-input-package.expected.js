import TextField from '@org/ui/material/TextField';
import Autocomplete from '@org/ui/material/Autocomplete';

<Autocomplete
  renderInput={(params) => (
    <TextField
      {...params}
      slotProps={{
        ...params.slotProps,
        htmlInput: {
          ...params.slotProps.htmlInput,
          autoComplete: 'new-password',
        },
      }}
    />
  )}
/>;
