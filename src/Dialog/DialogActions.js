import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';
import '../Button'; // So we don't have any override priority issue.

export const styles = theme => ({
  root: {
    flex: '0 0 auto',
    margin: `${theme.spacing.unit}px ${theme.spacing.unit / 2}px`,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  action: {
    margin: `0 ${theme.spacing.unit / 2}px`,
    minWidth: 64,
  },
});

function DialogActions(props) {
  const { disableActionSpacing, children, classes, className, ...other } = props;

  return (
    <div className={classNames(classes.root, className)} {...other}>
      {disableActionSpacing ? children : cloneChildrenWithClassName(children, classes.action)}
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
  /**
   * If `true`, the dialog actions do not have additional margin.
   */
  disableActionSpacing: PropTypes.bool,
};

DialogActions.defaultProps = {
  disableActionSpacing: false,
};

export default withStyles(styles, { name: 'MuiDialogActions' })(DialogActions);
