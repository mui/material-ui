import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const ranges = [
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    flexBasis: 200,
  },
}));

export default function OutlinedInputAdornments() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-simple-start-adornment"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="With outlined TextField"
        InputProps={{
          startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
        }}
      />
      <TextField
        select
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="With Select"
        value={values.weightRange}
        onChange={handleChange('weightRange')}
        InputProps={{
          startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
        }}
      >
        {ranges.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-adornment-amount"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Amount"
        value={values.amount}
        onChange={handleChange('amount')}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <TextField
        id="outlined-adornment-weight"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Weight"
        value={values.weight}
        onChange={handleChange('weight')}
        helperText="Weight"
        InputProps={{
          endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
        }}
      />
      <TextField
        id="outlined-adornment-password"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        type={values.showPassword ? 'text' : 'password'}
        label="Password"
        value={values.password}
        onChange={handleChange('password')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="Toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
