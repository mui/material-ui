// @inheritedComponent Typography

import React from 'react';
import PropTypes from 'prop-types';
import { componentPropType } from '@material-ui/utils';
import classNames from 'classnames';
import { capitalize } from '../utils/helpers';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = {
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `underline="none"`. */
  underlineNone: {
    textDecoration: 'none',
  },
  /* Styles applied to the root element if `underline="hover"`. */
  underlineHover: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  /* Styles applied to the root element if `underline="always"`. */
  underlineAlways: {
    textDecoration: 'underline',
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
    block,
    children,
    classes,
    className: classNameProp,
    component,
    TypographyClasses,
    underline,
    ...other
  } = props;

  return (
    <Typography
      className={classNames(
        classes.root,
        {
          [classes.button]: component === 'button',
        },
        classes[`underline${capitalize(underline)}`],
        classNameProp,
      )}
      classes={TypographyClasses}
      component={component}
      inline={!block}
      {...other}
    >
      {children}
    </Typography>
  );
}

Link.propTypes = {
  /**
   *  Controls whether the link is inline or not. When `block` is true the link is not inline
   *  when `block` is false it is.
   */
  block: PropTypes.bool,
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
   *  Controls when the link should have an underline.
   */
  underline: PropTypes.oneOf(['none', 'hover', 'always']),
  /**
   * Applies the theme typography styles.
   */
  variant: PropTypes.string,
};

Link.defaultProps = {
  block: false,
  color: 'primary',
  component: 'a',
  underline: 'hover',
  variant: 'inherit',
};

export default withStyles(styles, { name: 'MuiLink' })(Link);
