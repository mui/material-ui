import * as React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0,
    alignItems: 'center',
  },
});

const TimelineItemSeparator = React.forwardRef(function TimelineItemSeparator(props, ref) {
  const { classes, className, component: Component = 'div', ...other } = props;

  return <Component className={clsx(classes.root, className)} ref={ref} {...other} />;
});

export default withStyles(styles, { name: 'MuiTimelineItemSeparator' })(TimelineItemSeparator);
