import * as React from 'react';
import FormControl, { useFormControl } from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';

const MyFormHelperText = () => {
  const formControlContext = useFormControl();

  const { focused, filled, disabled, required } = formControlContext || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return 'This field is being focused';
    }

    if (filled) {
      return 'This field is filled';
    }

    if (disabled) {
      return 'This field is disabled';
    }

    if (required) {
      return 'This field is required';
    }

    return '';
  }, [focused, filled, disabled, required]);

  return <FormHelperText>{helperText}</FormHelperText>;
};

export default function UseFormControl() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl required>
        <Input placeholder="Please enter text" />
        <MyFormHelperText />
      </FormControl>

      <FormControl disabled>
        <Input placeholder="Disabled field" />
        <MyFormHelperText />
      </FormControl>
    </Box>
  );
}
