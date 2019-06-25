import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
  },
  fake: {
    backgroundColor: grey[200],
    height: theme.spacing(1),
    margin: theme.spacing(2),
    // Selects every two elements among any group of siblings.
    '&:nth-child(2n)': {
      marginRight: theme.spacing(3),
    },
  },
}));

export default function ClickAway() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const fake = <div className={classes.fake} />;

  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Button onClick={handleClick}>Open menu</Button>
          {open ? (
            <Paper className={classes.paper}>
              {fake}
              {fake}
              {fake}
              {fake}
              {fake}
            </Paper>
          ) : null}
        </div>
      </ClickAwayListener>
    </div>
  );
}
