import * as React from 'react';
import FormControl, { useFormControl } from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useCustomChildStyles = makeStyles({
  root: {
    paddingTop: 16,
  },
});

const FormControlCustomChild = () => {
  const formControlContext = useFormControl();
  const { root } = useCustomChildStyles();

  if (!formControlContext) {
    return null;
  }

  const { focused, filled, disabled, required } = formControlContext;

  const displayBooleanValue = (booleanValue) => (booleanValue ? 'Yes' : 'No');

  return (
    <div className={root}>
      <div>{`Is focused: ${displayBooleanValue(focused)}`}</div>
      <div>{`Is filled: ${displayBooleanValue(filled)}`}</div>
      <div>{`Is disabled: ${displayBooleanValue(disabled)}`}</div>
      <div>{`Is required: ${displayBooleanValue(required)}`}</div>
    </div>
  );
};

export default function SimpleUseFormControl() {
  return (
    <Grid spacing={2} container>
      <Grid item sm={4}>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Simple</InputLabel>
          <Input id="component-simple" />
          <FormControlCustomChild />
        </FormControl>
      </Grid>
      <Grid item sm={4}>
        <FormControl disabled variant="standard">
          <InputLabel htmlFor="component-simple">Disabled</InputLabel>
          <Input id="component-simple" />
          <FormControlCustomChild />
        </FormControl>
      </Grid>
      <Grid item sm={4}>
        <FormControl required variant="standard">
          <InputLabel htmlFor="component-simple">Required</InputLabel>
          <Input id="component-simple" />
          <FormControlCustomChild />
        </FormControl>
      </Grid>
    </Grid>
  );
}
