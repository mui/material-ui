import * as React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  },
});

const VisuallyHidden = React.forwardRef(function VisuallyHidden(props, ref) {
  const { classes, className, ...other } = props;

  return (
    <span
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    />
  );
});

export default withStyles(styles, { name: 'MuiVisuallyHidden' })(VisuallyHidden);
