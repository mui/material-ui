import React from 'react';
import { visuallyHidden } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  // TODO fix #20379.
  span: visuallyHidden,
}));

export default function VisuallyHiddenUsage() {
  const classes = useStyles();

  return (
    <a href="#foo">
      Read more
      {/* always visually hiden because the parent is focusable element */}
      <span className={classes.span}>
        about how to visually hide elements
      </span>
    </a>
  );
}
