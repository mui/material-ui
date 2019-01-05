// @inheritedComponent Typography

import React from 'react';
import PropTypes from 'prop-types';
import { componentPropType } from '@material-ui/utils';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    textDecoration: 'none',
    display: 'inline-block',
    '&:hover': {
      opacity: 0.7,
    },
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      opacity: 1,
    },
  },
};

function Link(props) {
  const { children, classes, className: classNameProp, TypographyClasses, ...other } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <Typography className={className} classes={TypographyClasses} {...other}>
      {children}
    </Typography>
  );
}

Link.propTypes = {
  /**
   * The content of the link.
   */
  children: PropTypes.string.isRequired,
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
    'default',
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
};

Link.defaultProps = {
  color: 'primary',
  component: 'a',
};

export default withStyles(styles, { name: 'MuiLink' })(Link);
