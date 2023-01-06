import { TextField as JoyTextField } from "@mui/joy";
import JoyTextField2 from "@mui/joy/TextField";
// the codemod should transform only Joy TextField
import TextField from "@mui/material/TextField"

<div>
  <JoyTextField label="Label" placeholder="Placeholder" size="sm" helperText="Help!" />
  <JoyTextField2 />
  <TextField />
</div>;