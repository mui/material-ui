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

const TimelineOppositeContent = React.forwardRef(function TimelineOppositeContent(
  props,
  ref,
) {
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

TimelineOppositeContent.propTypes = {
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
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
};

TimelineOppositeContent.muiName = 'TimelineOppositeContent';

export default withStyles(styles, { name: 'MuiTimelineOppositeContent' })(
  TimelineOppositeContent,
);
