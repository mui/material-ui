import * as React from 'react';
import clsx from 'clsx';
import Autocomplete from '@material-ui/core/Autocomplete';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  autocomplete: {
    display: 'inline-block',
  },
  input: {
    width: 200,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
  },
}));

const options = ['Option 1', 'Option 2'];

export default function CustomInputAutocomplete() {
  const classes = useStyles();
  return (
    <label>
      Value:{' '}
      <Autocomplete
        className={classes.autocomplete}
        id="custom-input-demo"
        options={options}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input
              type="text"
              {...params.inputProps}
              className={clsx(classes.input, params.inputProps.className)}
            />
          </div>
        )}
      />
    </label>
  );
}
