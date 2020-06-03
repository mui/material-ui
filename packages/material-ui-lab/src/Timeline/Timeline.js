import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { capitalize } from '@material-ui/core/utils';
import { withStyles } from '@material-ui/core/styles';
import TimelineContext from './TimelineContext';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    padding: '6px 16px',
  },
  /* Styles applied to the root element if `align="left"`. */
  alignLeft: {},
  /* Styles applied to the root element if `align="right"`. */
  alignRight: {
    textAlign: 'right',
  },
  /* Styles applied to the root element if `align="alternate"`. */
  alignAlternate: {},
});

const Timeline = React.forwardRef(function Timeline(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = 'ul',
    align = 'left',
    ...other
  } = props;

  return (
    <TimelineContext.Provider value={{ align }}>
      <Component
        className={clsx(classes.root, classes[`align${capitalize(align)}`], className)}
        ref={ref}
        {...other}
      >
        {children}
      </Component>
    </TimelineContext.Provider>
  );
});

Timeline.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The position where the timeline should appear.
   */
  align: PropTypes.oneOf(['alternate', 'left', 'right']),
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

export default withStyles(styles, { name: 'MuiTimeline' })(Timeline);
