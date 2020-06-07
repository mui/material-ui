import * as React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    width: 2,
    backgroundColor: theme.palette.grey[300],
    flexGrow: 1,
  },
});

const TimelineConnector = React.forwardRef(function TimelineConnector(props, ref) {
  const { classes, className, component: Component = 'span', ...other } = props;

  return <Component className={clsx(classes.root, className)} ref={ref} {...other} />;
});

export default withStyles(styles, { name: 'MuiTimelineConnector' })(TimelineConnector);
