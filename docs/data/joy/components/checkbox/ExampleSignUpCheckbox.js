import * as React from 'react';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function BasicCheckbox() {
  return (
    <FormControl size="sm" sx={{ width: 400 }}>
      <Checkbox
        label={
          <React.Fragment>
            I have read and agree to the{' '}
            <Typography fontWeight="md">terms and conditions</Typography>.
          </React.Fragment>
        }
      />
      <FormHelperText>
        <Typography level="body2">
          Read our <Link href="#link">terms and conditions</Link>.
        </Typography>
      </FormHelperText>
    </FormControl>
  );
}
