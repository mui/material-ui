import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { capitalize } from '@material-ui/core/utils';
import { withStyles } from '@material-ui/core/styles';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    alignSelf: 'baseline',
    borderStyle: 'solid',
    borderWidth: 2,
    flex: 0,
    padding: 4,
    borderRadius: 999,
    // marginRight: 'auto',
    // marginLeft: 'auto',
    top: 8,
    position: 'relative',
    boxShadow: theme.shadows[2],
  },
  /* Styles applied to the root element if `color="default"` and `variant="default"`. */
  defaultDefault: {
    borderColor: theme.palette.grey[300],
    backgroundColor: theme.palette.grey[300],
  },
  /* Styles applied to the root element if `color="default"` and `variant="outlined"`. */
  outlinedDefalut: {
    borderColor: theme.palette.grey[300],
    backgroundColor: 'white', // TODO: fix color white
  },
  /* Styles applied when the component is passed children. */
  withChildren: {
    marginTop: -8,
  },
  /* Styles applied to the root element if `color="primary"` and `variant="default"`. */
  defaultPrimary: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
  /* Styles applied to the root element if `color="primary"` and `variant="outlined"`. */
  outlinedPrimary: {
    backgroundColor: 'white',
    borderColor: theme.palette.primary.main,
  },
  /* Styles applied to the root element if `color="secondary"` and `variant="default"`. */
  defaultSecondary: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
  },
  /* Styles applied to the root element if `color="secondary"` and `variant="outlined"`. */
  outlinedSecondary: {
    backgroundColor: 'white',
    borderColor: theme.palette.secondary.main,
  },
});

const TimelineItemDot = React.forwardRef(function TimelineItemDot(props, ref) {
  const {
    classes,
    className,
    component: Component = 'span',
    color = 'default',
    variant = 'default',
    ...other
  } = props;
  const hasChildren = Boolean(props.children);

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes.withChildren]: hasChildren,
          [classes[`${variant}${capitalize(color)}`]]: color !== 'inherit',
        },
        className,
      )}
      ref={ref}
      {...other}
    />
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
   * The dot can have a different colors.
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The dot can appear filled or outlined.
   */
  variant: PropTypes.oneOf(['default', 'outlined']),
};

export default withStyles(styles, { name: 'MuiTimelineItemDot' })(TimelineItemDot);
