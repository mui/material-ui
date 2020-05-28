import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function TextButtons() {
  const classes = useStyles();
  const [{ open, displayText }, setOpen] = React.useState({
    open: false,
    displayText: '',
  });

  const handleOnClick = (event) =>
    setOpen({ open: true, displayText: event.target.textContent || '' });

  const handlePassedValue = (value) => setOpen({ open: true, displayText: value });

  const handleOnClose = () => setOpen({ open: false, displayText: '' });

  return (
    <div className={classes.root}>
      <Button onClick={handleOnClick}>Use Button Text</Button>
      <Button onClick={() => handlePassedValue('I am a passed Value')}>Pass My Own Value</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleOnClose}>
        <Alert onClose={handleOnClose} severity="success">
          {displayText}
        </Alert>
      </Snackbar>
    </div>
  );
}
