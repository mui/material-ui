import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';
import '../Button'; // So we don't have any override priority issue.

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: '0 0 auto',
    margin: '8px 4px',
  },
  /* Styles applied to the children. */
  action: {
    margin: '0 4px',
  },
};

function DialogActions(props) {
  const { disableActionSpacing, children, classes, className, ...other } = props;

  return (
    <div className={clsx(classes.root, className)} {...other}>
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
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
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
