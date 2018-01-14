import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = theme => ({
  root: {
    flex: '1 1 auto',
    minWidth: 0,
    padding: '0 16px',
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
    classes,
    className: classNameProp,
    disableTypography,
    inset,
    primary,
    secondary,
    ...other
  } = props;
  const { dense } = context;
  const className = classNames(
    classes.root,
    {
      [classes.dense]: dense,
      [classes.inset]: inset,
    },
    classNameProp,
  );

  return (
    <div className={className} {...other}>
      {primary &&
        (disableTypography ? (
          primary
        ) : (
          <Typography
            type="subheading"
            className={classNames(classes.primary, { [classes.textDense]: dense })}
          >
            {primary}
          </Typography>
        ))}
      {secondary &&
        (disableTypography ? (
          secondary
        ) : (
          <Typography
            type="body1"
            className={classNames(classes.secondary, {
              [classes.textDense]: dense,
            })}
            color="textSecondary"
          >
            {secondary}
          </Typography>
        ))}
    </div>
  );
}

ListItemText.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, that can be useful to can render an h4 instead of a
   */
  disableTypography: PropTypes.bool,
  /**
   * If `true`, the children will be indented.
   * This should be used if there is no left avatar or left icon.
   */
  inset: PropTypes.bool,
  primary: PropTypes.node,
  secondary: PropTypes.node,
};

ListItemText.defaultProps = {
  disableTypography: false,
  inset: false,
  primary: false,
  secondary: false,
};

ListItemText.contextTypes = {
  dense: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiListItemText' })(ListItemText);
