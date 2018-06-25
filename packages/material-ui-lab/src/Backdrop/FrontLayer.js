// @inheritedComponent Paper

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Collapse from '../Collapse';
import Paper from '../Paper';
import withStyles from '../styles/withStyles';
import { isMuiElement } from '../utils/reactHelpers';

export const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest,
  };

  return {
    root: {
      position: 'relative',
      transition: theme.transitions.create(['margin'], transition),
    },
    disabled: { // scrim
      backgroundColor: theme.palette.action.disabledBackground,
    },
    minimized: { // positioning
      backgroundColor: theme.palette.action.disabledBackground,
    },
  };
};

function BackdropFront(props) {
  const {
    classes,
    className: classNameProp,
    defaultExpanded,
    disabled,
    minimized,
    onChange: onChangeProp,
    ...other
  } = this.props;
  const onChange = onChangeProp ?
    event => onChange(event, !minimized) :
    null;

  const className = classNames(
    classes.root,
    {
      [classes.minimized]: minimized,
      [classes.disabled]: disabled,
    },
    classNameProp,
  );

  return (
    <Paper className={className} elevation={1} square {...other} />
  );
}

BackdropFront.propTypes = {
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
  /**
   * If `true`, the panel will be displayed in a disabled state,
   * with a scrim overlay
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, minimize the panel.
   */
  minimized: PropTypes.bool,
  /**
   * The icon to display as the minimized indicator.
   */
  minimizedIcon: PropTypes.node,
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} minimized The `minimized` state of the panel
   */
  onChange: PropTypes.func,
};

BackdropFront.defaultProps = {
};

export default withStyles(styles, { name: 'MuiBackdropFront' })(BackdropFront);
