import * as React from 'react';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function BasicCheckbox() {
  return (
    <FormControl size="sm">
      <Checkbox
        label={
          <React.Fragment>
            I have read and agree to the{' '}
            <Typography fontWeight="md">privacy policy</Typography>,{' '}
            <Typography fontWeight="md">terms of service</Typography>, and{' '}
            <Typography fontWeight="md">community guidelines</Typography>.
          </React.Fragment>
        }
      />
      <FormHelperText sx={{ ml: 'var(--Checkbox-labelInset)' }}>
        <Typography level="body3">
          Read our <Link href="#link">privacy policy</Link>,{' '}
          <Link href="#link">terms of service</Link>, and{' '}
          <Link href="#link">community guidelines</Link>.
        </Typography>
      </FormHelperText>
    </FormControl>
  );
}
