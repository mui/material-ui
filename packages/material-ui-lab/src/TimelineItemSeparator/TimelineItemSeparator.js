import * as React from 'react';
import PropTypes from 'prop-types';
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

TimelineItemSeparator.propTypes = {
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

export default withStyles(styles, { name: 'MuiTimelineItemSeparator' })(TimelineItemSeparator);
