// @inheritedComponent Typography

import React from 'react';
import PropTypes from 'prop-types';
import { componentPropType } from '@material-ui/utils';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'inline-block',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  // Same reset as ButtonBase.root
  /* Styles applied to the root element if `component="button"`. */
  button: {
    position: 'relative',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 'none',
    border: 0,
    margin: 0, // Remove the margin in Safari
    borderRadius: 0,
    padding: 0, // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    '-moz-appearance': 'none', // Reset
    '-webkit-appearance': 'none', // Reset
    '&::-moz-focus-inner': {
      borderStyle: 'none', // Remove Firefox dotted outline.
    },
  },
};

function Link(props) {
  const {
    children,
    classes,
    className: classNameProp,
    color,
    component,
    TypographyClasses,
    ...other
  } = props;

  return (
    <Typography
      className={classNames(
        classes.root,
        {
          [classes.button]: component === 'button',
        },
        classNameProp,
      )}
      classes={TypographyClasses}
      component={component}
      color={color}
      {...other}
    >
      {children}
    </Typography>
  );
}

Link.propTypes = {
  /**
   * The content of the link.
   */
  children: PropTypes.node.isRequired,
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
   * The color of the link.
   */
  color: PropTypes.oneOf([
    'error',
    'inherit',
    'primary',
    'secondary',
    'textPrimary',
    'textSecondary',
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: componentPropType,
  /**
   * `classes` property applied to the [`Typography`](/api/typography/) element.
   */
  TypographyClasses: PropTypes.object,
  /**
   * Applies the theme typography styles.
   */
  variant: PropTypes.string,
};

Link.defaultProps = {
  color: 'primary',
  component: 'a',
  variant: 'inherit',
};

export default withStyles(styles, { name: 'MuiLink' })(Link);
