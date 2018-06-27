import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

export const styles = {
  root: {
    flex: 1,
    overflow: 'scroll',
  },
};

function BackdropFrontContent(props) {
  const { classes, className: classNameProp, ...other } = props;

  const className = classNames(classes.root, classNameProp);

  return <div className={className} {...other} />;
}

BackdropFrontContent.propTypes = {
  /**
   * The content of the front panel.
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

export default withStyles(styles, { name: 'MuiBackdropFrontContent' })(BackdropFrontContent);
