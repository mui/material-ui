import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { capitalize } from '@material-ui/core/utils';
import { withStyles } from '@material-ui/core/styles';
import TimelineContext from '../Timeline/TimelineContext';

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

const TimelineItemContent = React.forwardRef(function TimelineItemContent(props, ref) {
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

TimelineItemContent.propTypes = {
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

export default withStyles(styles, { name: 'MuiTimelineItemContent' })(TimelineItemContent);
