import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = theme => ({
  root: {
    flex: '1 1 auto',
    minWidth: 0,
    padding: `0 ${theme.spacing.unit * 2}px`,
    '&:first-child': {
      paddingLeft: 0,
    },
  },
  inset: {
    '&:first-child': {
      paddingLeft: theme.spacing.unit * 7,
    },
  },
  dense: {
    fontSize: theme.typography.pxToRem(13),
  },
  primary: {
    '&$textDense': {
      fontSize: 'inherit',
    },
  },
  secondary: {
    '&$textDense': {
      fontSize: 'inherit',
    },
  },
  textDense: {},
});

function ListItemText(props, context) {
  const {
    children,
    classes,
    className: classNameProp,
    disableTypography,
    inset,
    primary: primaryProp,
    secondary: secondaryProp,
    ...other
  } = props;
  const { dense } = context;

  let primary = primaryProp != null ? primaryProp : children;
  if (primary != null && primary.type !== Typography && !disableTypography) {
    primary = (
      <Typography
        variant="subheading"
        className={classNames(classes.primary, { [classes.textDense]: dense })}
        component="span"
      >
        {primary}
      </Typography>
    );
  }

  let secondary = secondaryProp;
  if (secondary != null && secondary.type !== Typography && !disableTypography) {
    secondary = (
      <Typography
        variant="body1"
        className={classNames(classes.secondary, {
          [classes.textDense]: dense,
        })}
        color="textSecondary"
      >
        {secondary}
      </Typography>
    );
  }

  return (
    <div
      className={classNames(
        classes.root,
        {
          [classes.dense]: dense,
          [classes.inset]: inset,
        },
        classNameProp,
      )}
      {...other}
    >
      {primary}
      {secondary}
    </div>
  );
}

ListItemText.propTypes = {
  /**
   * Alias for the `primary` property.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   */
  disableTypography: PropTypes.bool,
  /**
   * If `true`, the children will be indented.
   * This should be used if there is no left avatar or left icon.
   */
  inset: PropTypes.bool,
  /**
   * The main content element.
   */
  primary: PropTypes.node,
  /**
   * The secondary content element.
   */
  secondary: PropTypes.node,
};

ListItemText.defaultProps = {
  disableTypography: false,
  inset: false,
};

ListItemText.contextTypes = {
  dense: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiListItemText' })(ListItemText);
