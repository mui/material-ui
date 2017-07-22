// @flow weak

import React, { Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import '../Button'; // So we don't have any override priority issue.

export const styleSheet = createStyleSheet('MuiDialogActions', theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: `${theme.spacing.unit}px 4px`,
    flex: '0 0 auto',
  },
  action: {
    margin: '0 4px',
  },
  button: {
    minWidth: 64,
  },
}));

function DialogActions(props) {
  const { children, classes, className, ...other } = props;

  return (
    <div data-mui-test="DialogActions" className={classNames(classes.root, className)} {...other}>
      {Children.map(
        children,
        button =>
          isValidElement(button) &&
          <div className={classes.action}>
            {cloneElement(button, {
              className: classNames(classes.button, button.props.className),
            })}
          </div>,
      )}
    </div>
  );
}

DialogActions.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styleSheet)(DialogActions);
