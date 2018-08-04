import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';

const styles = {
  checkbox: {
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

function AddressForm(props) {
  const { classes } = props;
  return (
    <Grid container spacing="24">
      <Grid item xs={12} sm={6}>
        <TextField required id="firstName" label="First name" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField required id="lastName" label="Last name" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField required id="address1" label="Address line 1" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField id="addiress2" label="Address line 2" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField required id="city" label="City" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField id="state" label="State/Province/Region" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField required id="zip" label="Zip / Postal code" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField required id="country" label="Country" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              value="checkedG"
              checked
              classes={{
                root: classes.checkbox,
                checked: classes.checked,
              }}
            />
          }
          label="Use this address for payment details"
        />
      </Grid>
    </Grid>
  );
}

AddressForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressForm);
