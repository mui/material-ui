import TextField from '@org/ui/material/TextField';
import Autocomplete from '@org/ui/material/Autocomplete';

<Autocomplete
  renderInput={(params) => (
    <TextField
      {...params}
      inputProps={{
        ...params.inputProps,
        autoComplete: 'new-password',
      }}
    />
  )}
/>;
