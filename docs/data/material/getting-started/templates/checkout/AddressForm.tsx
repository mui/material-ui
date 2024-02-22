import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <FormGrid item xs={12} md={6}>
          <FormLabel required>First name</FormLabel>
          <OutlinedInput
            id="first-name"
            name="first-name"
            type="name"
            placeholder="John"
            autoComplete="first name"
            inputProps={{ required: true }}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel required>Last name</FormLabel>
          <OutlinedInput
            id="last-name"
            name="last-name"
            type="last-name"
            placeholder="Snow"
            autoComplete="last name"
            inputProps={{ required: true }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel required>Address line 1</FormLabel>
          <OutlinedInput
            id="address1"
            name="address1"
            type="address1"
            placeholder="Street name and number"
            autoComplete="shipping address-line1"
            inputProps={{ required: true }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel>Address line 2</FormLabel>
          <OutlinedInput
            id="address2"
            name="address2"
            type="address2"
            placeholder="Apartment, suite, unit, etc. (optional)"
            autoComplete="shipping address-line2"
            inputProps={{ required: true }}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel required>City</FormLabel>
          <OutlinedInput
            id="City"
            name="City"
            type="City"
            placeholder="New York"
            autoComplete="City"
            inputProps={{ required: true }}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel required>State</FormLabel>
          <OutlinedInput
            id="State"
            name="State"
            type="State"
            placeholder="NY"
            autoComplete="State"
            inputProps={{ required: true }}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel required>Zip / Postal code</FormLabel>
          <OutlinedInput
            id="zip"
            name="zip"
            type="zip"
            placeholder="12345"
            autoComplete="shipping postal-code"
            inputProps={{ required: true }}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel required>Country</FormLabel>
          <OutlinedInput
            id="country"
            name="country"
            type="country"
            placeholder="United States"
            autoComplete="shipping country"
            inputProps={{ required: true }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </FormGrid>
      </Grid>
      <Divider sx={{ display: { xs: '', sm: 'none' }, mt: 2 }} />
    </React.Fragment>
  );
}
