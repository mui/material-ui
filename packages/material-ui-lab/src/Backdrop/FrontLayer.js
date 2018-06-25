// @inheritedComponent Paper

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

export const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest,
  };

  return {
    root: {
      position: 'relative',
      transition: theme.transitions.create(['margin'], transition),
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,

      // fill remaining space not taken by back layer content
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 'auto',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.getContrastText(theme.palette.background.paper),

      paddingLeft: 15,
      paddingRight: 15
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
  } = props;
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
    <Paper className={className} elevation={0} square {...other} />
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
