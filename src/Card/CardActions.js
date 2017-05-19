// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';

export const styleSheet = createStyleSheet('MuiCardActions', {
  cardActions: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
    padding: '2px 4px',
  },
  actionSpacing: {
    margin: '0 4px',
  },
});

function CardActions(props) {
  const {
    disableActionSpacing,
    children,
    classes,
    className: classNameProp,
    ...other
  } = props;

  const className = classNames(classes.cardActions, classNameProp);

  return (
    <div className={className} {...other}>
      {disableActionSpacing ?
        children : cloneChildrenWithClassName(children, classes.actionSpacing)}
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

export default withStyles(styleSheet)(CardActions);
