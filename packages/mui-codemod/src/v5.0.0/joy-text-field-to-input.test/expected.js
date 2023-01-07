import { Input as JoyInput } from "@mui/joy";
import JoyInput2 from "@mui/joy/Input";
// the codemod should transform only Joy TextField
import TextField from "@mui/material/TextField"

<div>
  <FormControl aria-hidden={false} id="Id" required={true} size="sm" color="primary">
    <FormLabel aria-hidden={false} id="Id-label">Label</FormLabel>
    <JoyInput
      aria-hidden={false}
      placeholder="Placeholder"
      name="Name"
      type="button"
      autoComplete="on"
      autoFocus={true}
      error={true}
      fullWidth={true}
      defaultValue="DefaultValue"
      variant="outlined" />
    <FormHelperText aria-hidden={false} id="Id-helper-text">Help!</FormHelperText>
  </FormControl>
  <JoyInput2 />
  <TextField />
</div>;
