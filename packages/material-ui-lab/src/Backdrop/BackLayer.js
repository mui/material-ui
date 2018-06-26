import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

export const styles = {
  root: {
    // fit to content
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
};

function BackdropBack(props) {
  const { children, classes, className: classNameProp, ...other } = props;

  const className = classNames(classes.root, classNameProp);

  return <div className={className}>{children}</div>;
}

BackdropBack.propTypes = {
  /**
   * The content of the component.
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
};

export default withStyles(styles, { name: 'MuiBackdropBack' })(BackdropBack);
