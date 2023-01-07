import { Input as JoyInput } from "@mui/joy";
import JoyInput2 from "@mui/joy/Input";
// the codemod should transform only Joy TextField
import TextField from "@mui/material/TextField"

<div>
  <FormControl aria-hidden={false} size="sm" color="primary" variant="outlined">
    <FormLabel aria-hidden={false} id="Id-label" htmlFor="Id" required={true}>Label</FormLabel>
    <JoyInput
      aria-hidden={false}
      id="Id"
      placeholder="Placeholder"
      name="Name"
      type="button"
      autoComplete="on"
      autoFocus={true}
      error={true}
      required={true}
      fullWidth={true}
      defaultValue="DefaultValue" />
    <FormHelperText aria-hidden={false} id="Id-helper-text">Help!</FormHelperText>
  </FormControl>
  <JoyInput2 />
  <TextField />
</div>;
