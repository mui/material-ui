import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }),
);

export default function TextFieldHiddenLabel() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="filled-hidden-label-small">Hidden label</label>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          defaultValue="Small"
          variant="filled"
          size="small"
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="filled-hidden-label-normal">Hidden label</label>
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
        />
      </Box>
    </form>
  );
}
