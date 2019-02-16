import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
    theme,
    ...other
  } = props;

  return (
    <ListContext.Consumer>
      {({ dense }) => {
        let primary = primaryProp != null ? primaryProp : children;
        if (primary != null && primary.type !== Typography && !disableTypography) {
          primary = (
            <Typography
              variant={theme.typography.useNextVariants ? 'body1' : 'subheading'}
              className={clsx(classes.primary, { [classes.textDense]: dense })}
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
              className={clsx(classes.secondary, {
                [classes.textDense]: dense,
              })}
              color="textSecondary"
              {...secondaryTypographyProps}
            >
              {secondary}
            </Typography>
          );
        }

        return (
          <div
            className={clsx(
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
   * See [CSS API](#css) below for more details.
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
   * @ignore
   */
  theme: PropTypes.object.isRequired,
};

ListItemText.defaultProps = {
  disableTypography: false,
  inset: false,
};

export default withStyles(styles, { name: 'MuiListItemText', withTheme: true })(ListItemText);
