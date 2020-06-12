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
    padding: 4,
    borderRadius: '50%',
    boxShadow: theme.shadows[2],
    marginTop: 8,
    marginBottom: 8,
  },
  /* Styles applied to the root element if `color="grey"` and `variant="default"`. */
  defaultGrey: {
    borderColor: 'transparent',
    color: theme.palette.grey[50],
    backgroundColor: theme.palette.grey[400],
  },
  /* Styles applied to the root element if `color="grey"` and `variant="outlined"`. */
  outlinedGrey: {
    boxShadow: 'none',
    color: theme.palette.grey.contrastText,
    borderColor: theme.palette.grey[400],
    backgroundColor: 'transparent',
  },
  /* Styles applied to the root element if `color="primary"` and `variant="default"`. */
  defaultPrimary: {
    borderColor: 'transparent',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  /* Styles applied to the root element if `color="primary"` and `variant="outlined"`. */
  outlinedPrimary: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    borderColor: theme.palette.primary.main,
  },
  /* Styles applied to the root element if `color="secondary"` and `variant="default"`. */
  defaultSecondary: {
    borderColor: 'transparent',
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },
  /* Styles applied to the root element if `color="secondary"` and `variant="outlined"`. */
  outlinedSecondary: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    borderColor: theme.palette.secondary.main,
  },
});

const TimelineDot = React.forwardRef(function TimelineDot(props, ref) {
  const { classes, className, color = 'grey', variant = 'default', ...other } = props;

  return (
    <span
      className={clsx(
        classes.root,
        {
          [classes[`${variant}${capitalize(color)}`]]: color !== 'inherit',
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

TimelineDot.propTypes = {
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
  color: PropTypes.oneOf(['grey', 'inherit', 'primary', 'secondary']),
  /**
   * The dot can appear filled or outlined.
   */
  variant: PropTypes.oneOf(['default', 'outlined']),
};

export default withStyles(styles, { name: 'MuiTimelineDot' })(TimelineDot);
