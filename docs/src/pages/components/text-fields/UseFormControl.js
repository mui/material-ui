import * as React from 'react';
import FormControl, { useFormControl } from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';

function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return 'This field is being focused';
    }

    return 'Helper text';
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

export default function UseFormControl() {
  return (
    <Box component="form" noValidate autoComplete="off">
      <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput placeholder="Please enter text" />
        <MyFormHelperText />
      </FormControl>
    </Box>
  );
}
