import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    backgroundColor: theme.palette.primary.main,
    height: 10,
    width: 10,
    borderRadius: 999,
    position: 'absolute',
    transform: 'translateX(-50%) translateX(1px)', // TODO: try to fix the 1px
    top: 10,
  },
});

const TimelineItemDot = React.forwardRef(function TimelineItemDot(props, ref) {
  const { children, classes, className, component: Component = 'span', ...other } = props;

  return (
    <Component className={clsx(classes.root, className)} ref={ref} {...other}>
      {children}
    </Component>
  );
});

TimelineItemDot.propTypes = {
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

export default withStyles(styles, { name: 'MuiTimelineItemDot' })(TimelineItemDot);
