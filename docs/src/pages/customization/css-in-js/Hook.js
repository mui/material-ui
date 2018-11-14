import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    color: props => props.color,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    borderRadius: 3,
    height: 48,
    padding: '0 30px',
  },
});

function Hook() {
  const classes = useStyles({
    color: 'white',
  });
  return <Button className={classes.root}>{'Hook'}</Button>;
}

export default Hook;
