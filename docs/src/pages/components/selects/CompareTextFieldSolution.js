import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState(10);

  return (
    <form autoComplete="off">
      <FormControl className={classes.field}>
        <InputLabel htmlFor="age-select">Age</InputLabel>
        <Select
          value={age}
          onChange={event => setAge(event.target.value)}
          inputProps={{
            name: 'age-select',
            id: 'age-select',
          }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Select implementation</FormHelperText>
      </FormControl>

      <TextField
        value={age}
        onChange={event => setAge(event.target.value)}
        select
        className={classes.field}
        id="age-text-field"
        label="Age"
        helperText="TextField implementation"
        SelectProps={
          {
            /* additional props supplied to Select component */
          }
        }
        InputLabelProps={
          {
            /* additional props supplied to InputLabel component */
          }
        }
        FormHelperTextProps={
          {
            /* additional props supplied to FormHelperText component */
          }
        }
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </TextField>
    </form>
  );
}
