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
    padding: '16px 8px',
  },
  /* Styles applied to the children. */
  action: {
    marginLeft: 8,
  },
};

function ExpansionPanelActions(props) {
  const { children, classes, className, ...other } = props;

  return (
    <div className={clsx(classes.root, className)} {...other}>
      {cloneChildrenWithClassName(children, classes.action)}
    </div>
  );
}

ExpansionPanelActions.propTypes = {
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

export default withStyles(styles, { name: 'MuiExpansionPanelActions' })(ExpansionPanelActions);
