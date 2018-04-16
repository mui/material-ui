import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';

export const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
  },
  action: {
    marginLeft: theme.spacing.unit,
  },
});

function ExpansionPanelActions(props) {
  const { children, classes, className, ...other } = props;

  return (
    <div className={classNames(classes.root, className)} {...other}>
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
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiExpansionPanelActions' })(ExpansionPanelActions);
