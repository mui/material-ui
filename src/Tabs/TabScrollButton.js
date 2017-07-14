// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import ButtonBase from '../internal/ButtonBase';
import KeyboardArrowLeft from '../svg-icons/keyboard-arrow-left';
import KeyboardArrowRight from '../svg-icons/keyboard-arrow-right';

export const styleSheet = createStyleSheet('MuiTabScrollButton', theme => ({
  root: {
    background: 'none',
    color: 'inherit',
    flex: `0 0 ${theme.spacing.unit * 7}px`,
  },
}));

/**
 * @ignore - internal component.
 */
function TabScrollButton(props) {
  const { classes, className: classNameProp, direction, onClick, visible, ...other } = props;

  const className = classNames(classes.root, classNameProp);

  if (!visible) {
    return <div className={className} />;
  }

  return (
    <ButtonBase className={className} onClick={onClick} tabIndex="-1" {...other}>
      {direction === 'left' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    </ButtonBase>
  );
}

TabScrollButton.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Which direction should the button indicate?
   */
  direction: PropTypes.oneOf(['left', 'right']),
  /**
   * Callback to execute for button press.
   */
  onClick: PropTypes.func,
  /**
   * Should the button be present or just consume space.
   */
  visible: PropTypes.bool,
};

TabScrollButton.defaultProps = {
  visible: true,
};

export default withStyles(styleSheet)(TabScrollButton);
