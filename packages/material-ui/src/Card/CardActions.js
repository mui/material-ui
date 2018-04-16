import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';

export const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit / 2}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 1.5}px`,
    },
  },
  action: {
    margin: `0 ${theme.spacing.unit / 2}px`,
  },
});

function CardActions(props) {
  const { disableActionSpacing, children, classes, className, ...other } = props;

  return (
    <div className={classNames(classes.root, className)} {...other}>
      {disableActionSpacing ? children : cloneChildrenWithClassName(children, classes.action)}
    </div>
  );
}

CardActions.propTypes = {
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
   * If `true`, the card actions do not have additional margin.
   */
  disableActionSpacing: PropTypes.bool,
};

CardActions.defaultProps = {
  disableActionSpacing: false,
};

export default withStyles(styles, { name: 'MuiCardActions' })(CardActions);
