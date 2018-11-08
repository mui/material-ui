import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import ListContext from '../List/ListContext';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    flex: '1 1 auto',
    minWidth: 0,
    padding: '0 16px',
    '&:first-child': {
      paddingLeft: 0,
    },
  },
  /* Styles applied to the root element if `inset={true}`. */
  inset: {
    '&:first-child': {
      paddingLeft: 56,
    },
  },
  /* Styles applied to the root element if `context.dense` is `true`. */
  dense: {
    fontSize: theme.typography.pxToRem(13),
  },
  /* Styles applied to the primary `Typography` component. */
  primary: {
    '&$textDense': {
      fontSize: 'inherit',
    },
  },
  /* Styles applied to the secondary `Typography` component. */
  secondary: {
    '&$textDense': {
      fontSize: 'inherit',
    },
  },
  /* Styles applied to the tertiary `Typography` component. */
  tertiary: {
    '&$textDense': {
      fontSize: 'inherit',
    },
  },
  /* Styles applied to the `Typography` components if `context.dense` is `true`. */
  textDense: {},
});

function ListItemText(props) {
  const {
    children,
    classes,
    className: classNameProp,
    disableTypography,
    inset,
    primary: primaryProp,
    primaryTypographyProps,
    secondary: secondaryProp,
    secondaryTypographyProps,
    tertiary: tertiaryProp,
    tertiaryTypographyProps,
    ...other
  } = props;

  return (
    <ListContext.Consumer>
      {({ dense }) => {
        let primary = primaryProp != null ? primaryProp : children;
        if (primary != null && primary.type !== Typography && !disableTypography) {
          primary = (
            <Typography
              variant="subheading"
              internalDeprecatedVariant
              className={classNames(classes.primary, { [classes.textDense]: dense })}
              component="span"
              {...primaryTypographyProps}
            >
              {primary}
            </Typography>
          );
        }

        let secondary = secondaryProp;
        if (secondary != null && secondary.type !== Typography && !disableTypography) {
          secondary = (
            <Typography
              className={classNames(classes.secondary, {
                [classes.textDense]: dense,
              })}
              color="textSecondary"
              {...secondaryTypographyProps}
            >
              {secondary}
            </Typography>
          );
        }

        let tertiary = tertiaryProp;
        if (tertiary != null && tertiary.type !== Typography && !disableTypography) {
          tertiary = (
            <Typography
              className={classNames(classes.tertiary, {
                [classes.textDense]: dense,
              })}
              color="textSecondary"
              {...tertiaryTypographyProps}
            >
              {tertiary}
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
            {tertiary}
          </div>
        );
      }}
    </ListContext.Consumer>
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
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   */
  primaryTypographyProps: PropTypes.object,
  /**
   * The secondary content element.
   */
  secondary: PropTypes.node,
  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   */
  secondaryTypographyProps: PropTypes.object,
  /**
   * The tertiary content element.
   */
  tertiary: PropTypes.node,
  /**
   * These props will be forwarded to the tertiary typography component
   * (as long as disableTypography is not `true`).
   */
  tertiaryTypographyProps: PropTypes.object,
};

ListItemText.defaultProps = {
  disableTypography: false,
  inset: false,
};

export default withStyles(styles, { name: 'MuiListItemText' })(ListItemText);
