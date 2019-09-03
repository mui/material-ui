import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function IconButtons() {
  const classes = useStyles();

  return (
    <div>
      <IconButton className={classes.button} aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <IconButton className={classes.button} aria-label="delete" disabled color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton color="secondary" className={classes.button} aria-label="add an alarm">
        <AlarmIcon />
      </IconButton>
      <IconButton color="primary" className={classes.button} aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          className={classes.button}
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
}
