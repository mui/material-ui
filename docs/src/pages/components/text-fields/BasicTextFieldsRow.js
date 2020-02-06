import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function BasicTextFieldsRow() {
  const classes = useStyles();
  const [message, setMessage] = React.useState('');

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        fullWidth
        multiline
        rows={3}
        rowsMax={8}
        value={message}
        onChange={event => setMessage(event.target.value)}
      />
    </form>
  );
}
