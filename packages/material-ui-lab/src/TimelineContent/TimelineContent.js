import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { capitalize } from '@material-ui/core/utils';
import { withStyles } from '@material-ui/core/styles';
import TimelineContext from '../Timeline/TimelineContext';
import TimelineItemContext from '../TimelineItem/TimelineItemContext';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {
    flex: 1,
    padding: '6px 16px',
  },
  /* Styles applied to the root element if `align="right"`. */
  alignRight: {
    textAlign: 'right',
  },
});

const TimelineContent = React.forwardRef(function TimelineContent(props, ref) {
  const { classes, className, ...other } = props;

  const { align = 'left' } = React.useContext(TimelineContext);
  const { classes: contextClasses = {} } = React.useContext(TimelineItemContext);

  return (
    <div
      className={clsx(
        classes.root,
        contextClasses.content,
        classes[`align${capitalize(align)}`],
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

TimelineContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiTimelineContent' })(TimelineContent);
