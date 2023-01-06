import { Input as JoyInput } from "@mui/joy";
import JoyInput2 from "@mui/joy/Input";
// the codemod should transform only Joy TextField
import TextField from "@mui/material/TextField"

<div>
  <FormControl size="sm">
    <FormLabel>Label</FormLabel>
    <JoyInput placeholder="Placeholder" />
    <FormHelperText>Help!</FormHelperText>
  </FormControl>
  <JoyInput2 />
  <TextField />
</div>;