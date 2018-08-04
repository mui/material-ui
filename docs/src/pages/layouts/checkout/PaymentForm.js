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

function PaymentForm(props) {
  const { classes } = props;
  return (
    <Grid container spacing="24">
      <Grid item xs={12} md={6}>
        <TextField required id="cardName" label="Name on card" fullWidth />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField required id="cardNumber" label="Card number" fullWidth />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField required id="expDate" label="Expiry date" fullWidth />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cvv"
          label="CVV"
          helperText="Last three digits on signature strip"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              value="checkedG"
              classes={{
                root: classes.checkbox,
                checked: classes.checked,
              }}
            />
          }
          label="Remeber credit card details for next time"
        />
      </Grid>
    </Grid>
  );
}

PaymentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentForm);
