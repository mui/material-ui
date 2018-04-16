import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';

export const styles = theme => ({
  root: {
    height: 1,
    margin: 0, // Reset browser default style.
    border: 'none',
    flexShrink: 0,
    backgroundColor: theme.palette.divider,
  },
  absolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  inset: {
    marginLeft: theme.spacing.unit * 9,
  },
  light: {
    backgroundColor: fade(theme.palette.divider, 0.08),
  },
});

function Divider(props) {
  const {
    absolute,
    classes,
    className: classNameProp,
    component: Component,
    inset,
    light,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    {
      [classes.absolute]: absolute,
      [classes.inset]: inset,
      [classes.light]: light,
    },
    classNameProp,
  );

  return <Component className={className} {...other} />;
}

Divider.propTypes = {
  absolute: PropTypes.bool,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * If `true`, the divider will be indented.
   */
  inset: PropTypes.bool,
  /**
   * If `true`, the divider will have a lighter color.
   */
  light: PropTypes.bool,
};

Divider.defaultProps = {
  absolute: false,
  component: 'hr',
  inset: false,
  light: false,
};

export default withStyles(styles, { name: 'MuiDivider' })(Divider);
