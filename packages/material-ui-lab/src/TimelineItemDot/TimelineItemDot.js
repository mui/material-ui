import * as React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    backgroundColor: theme.palette.primary.main,
    height: 10,
    width: 10,
    borderRadius: 999,
    top: theme.spacing(2),
    position: 'absolute',
    left: -4,
    top: 10,
  },
});

const TimelineItemDot = React.forwardRef(function TimelineItemDot(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = 'span',
    variant = 'standard',
    ...other
  } = props;

  return (
    <Component className={clsx(classes.root, classes[variant], className)} ref={ref} {...other}>
      {children}
    </Component>
  );
});

export default withStyles(styles, { name: 'MuiTimelineItemDot' })(TimelineItemDot);
