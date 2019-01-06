// @inheritedComponent Typography

import React from 'react';
import PropTypes from 'prop-types';
import { componentPropType } from '@material-ui/utils';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-block',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
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
});

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
          [classes[`color${capitalize(color)}`]]: color !== 'inherit',
          [classes.button]: component === 'button',
        },
        classNameProp,
      )}
      classes={TypographyClasses}
      component={component}
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
  color: PropTypes.oneOf(['inherit', 'primary']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: componentPropType,
  /**
   * `classes` property applied to the [`Typography`](/api/typography/) element.
   */
  TypographyClasses: PropTypes.object,
};

Link.defaultProps = {
  color: 'primary',
  component: 'a',
};

export default withStyles(styles, { name: 'MuiLink' })(Link);
