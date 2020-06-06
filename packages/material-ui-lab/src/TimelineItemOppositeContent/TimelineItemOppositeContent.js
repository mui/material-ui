import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { capitalize } from '@material-ui/core/utils';
import { withStyles } from '@material-ui/core/styles';
import TimelineContext from '../Timeline/TimelineContext';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {
    padding: '6px 16px',
    marginRight: 'auto',
    textAlign: 'right',
    flex: 1,
  },
  /* Styles applied to the root element if `align="right"`. */
  alignRight: {
    textAlign: 'left',
  },
});

const TimelineItemOppositeContent = React.forwardRef(function TimelineItemOppositeContent(props, ref) {
  const { classes, className, component: Component = 'div', ...other } = props;

  const { align = 'left' } = React.useContext(TimelineContext);

  return (
    <Component
      className={clsx(classes.root, classes[`align${capitalize(align)}`], className)}
      ref={ref}
      {...other}
    />
  );
});

export default withStyles(styles, { name: 'MuiTimelineItemOppositeContent' })(TimelineItemOppositeContent);
