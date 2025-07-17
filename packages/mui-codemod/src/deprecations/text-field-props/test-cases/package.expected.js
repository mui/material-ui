import TextField from '@org/ui/material/TextField';
import { TextField as MyTextField } from '@org/ui/material';

<TextField
  slotProps={{
    input: CustomInputProps,
    htmlInput: CustomHtmlInputProps,
    select: CustomSelectProps,
    inputLabel: CustomInputLabelProps,
    formHelperText: CustomFormHelperProps
  }} />;
<MyTextField
  slotProps={{
    input: CustomInputProps,
    htmlInput: CustomHtmlInputProps,
    select: CustomSelectProps,
    inputLabel: CustomInputLabelProps,
    formHelperText: CustomFormHelperProps
  }} />;
<NonMuiTextField
  InputProps={CustomInputProps}
  inputProps={CustomHtmlInputProps}
  SelectProps={CustomSelectProps}
  InputLabelProps={CustomInputLabelProps}
  FormHelperTextProps={CustomFormHelperProps}
/>;
