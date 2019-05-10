import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function ButtonSizes() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <ToggleButton size="small" value="small" className={classes.margin}>
          Small
        </ToggleButton>
        <ToggleButton size="medium" value="medium" className={classes.margin}>
          Medium
        </ToggleButton>
        <ToggleButton size="large" value="large" className={classes.margin}>
          Large
        </ToggleButton>
      </div>
    </div>
  );
}

export default ButtonSizes;
