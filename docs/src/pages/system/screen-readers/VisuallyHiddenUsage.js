import React from 'react';
import Link from '@material-ui/core/Link';
import { visuallyHidden } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  // TODO fix #20379.
  span: visuallyHidden,
});

export default function VisuallyHiddenUsage() {
  const classes = useStyles();

  return (
    <Link href="#foo">
      Read more
      {/* always visually hidden because the parent is focusable element */}
      <span className={classes.span}>about how to visually hide elements</span>
    </Link>
  );
}
