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
    boxSizing: 'border-box',
    padding: '8px 4px',
  },
  /* Styles applied to the root element if `disableActionSpacing={true}`. */
  disableActionSpacing: {
    padding: 8,
  },
  /* Styles applied to the children. */
  action: {
    margin: '0 4px',
  },
};

const CardActions = React.forwardRef(function CardActions(props, ref) {
  const { disableActionSpacing, children, classes, className, ...other } = props;

  return (
    <div
      className={clsx(
        classes.root,
        { [classes.disableActionSpacing]: disableActionSpacing },
        className,
      )}
      ref={ref}
      {...other}
    >
      {disableActionSpacing ? children : cloneChildrenWithClassName(children, classes.action)}
    </div>
  );
});

CardActions.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
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
