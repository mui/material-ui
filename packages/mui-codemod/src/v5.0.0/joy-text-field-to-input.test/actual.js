import { TextField as JoyTextField } from "@mui/joy";
import JoyTextField2 from "@mui/joy/TextField";
// the codemod should transform only Joy TextField
import TextField from "@mui/material/TextField"

<div>
  <JoyTextField
    slotProps={{
      root: { ['aria-hidden']: false },
      label: { ['aria-hidden']: false },
      input: { ['aria-hidden']: false },
      helperText: { ['aria-hidden']: false },
    }}
    slots={{
      root: 'span',
      label: 'span',
      input: 'span',
      helperText: 'span',
    }}
    id="Id"
    label="Label"
    placeholder="Placeholder"
    helperText="Help!"
    name="Name"
    type="button"
    autoComplete="on"
    autoFocus={true}
    error={true}
    required={true}
    fullWidth={true}
    defaultValue="DefaultValue"
    size="sm"
    color="primary"
    variant="outlined"
  />
  <JoyTextField2 />
  <TextField />
</div>;
