// @inheritedComponent Paper

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Fade from '@material-ui/core/Fade';
import { isMuiElement } from '@material-ui/core/utils/reactHelpers';

export const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest,
    delay: theme.transitions.duration.shortest,
  };

  return {
    root: {
      position: 'relative',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,

      // fill remaining space not taken by back layer content
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 'auto',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.getContrastText(theme.palette.background.paper),

      paddingLeft: 15,
      paddingRight: 15,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',

      transition: theme.transitions.create(['flex-grow'], transition),
    },
    scrim: {
      zIndex: -1,
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.5)',
    },
    scrimActive: {
      zIndex: theme.zIndex.appBar - 1,
    },
    minimized: {
      flexGrow: 0.0001,
    },
  };
};

function BackdropFront(props) {
  const {
    classes,
    className: classNameProp,
    disabled,
    expanded,
    onExpand,
    children: childrenProp,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    {
      [classes.minimized]: !expanded,
    },
    classNameProp,
  );

  const onClick = !expanded && !disabled ? onExpand : null;

  const children = React.Children.map(
    childrenProp,
    child =>
      isMuiElement(child, ['BackdropFrontSubheader', 'BackdropFrontContent'])
        ? React.cloneElement(child, { expanded })
        : child,
  );

  return (
    <Paper className={className} onClick={onClick} elevation={0} square {...other}>
      <Fade in={disabled}>
        <div className={classNames(classes.scrim, { [classes.scrimActive]: disabled })} />
      </Fade>
      {children}
    </Paper>
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
   * If `true`, expands the panel, otherwise collapse it to a minimized view.
   */
  expanded: PropTypes.bool,
  /**
   * Callback fired when minimized, non-disabled panel is clicked.
   *
   * @param {object} event The event source of the callback
   */
  onExpand: PropTypes.func,
};

BackdropFront.defaultProps = {
  expanded: true,
};

export default withStyles(styles, { name: 'MuiBackdropFront' })(BackdropFront);
