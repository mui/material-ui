// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';
import KeyboardArrowLeft from '../svg-icons/keyboard-arrow-left';
import KeyboardArrowRight from '../svg-icons/keyboard-arrow-right';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiTabScrollButton', () => {
  return {
    root: {
      background: 'none',
      color: 'inherit',
      flex: '0 0 56px',
    },
  };
});

function TabScrollButton(props, context) {
  const {
    className: classNameProp,
    direction,
    onClick,
    visible,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames(
    classes.root,
    classNameProp,
  );

  if (!visible) {
    return <div className={className} />;
  }

  return (
    <ButtonBase
      className={className}
      role="button"
      onClick={onClick}
      tabIndex="-1"
      {...other}
    >
      {direction === 'left' ? <KeyboardArrowLeft /> : <KeyboardArrowRight /> }
    </ButtonBase>
  );
}

/**
 * @ignore - internal component.
 */
TabScrollButton.propTypes = {
  /**
   * @ignore
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * @ignore
   * Which direction should the button indicate?
   */
  direction: PropTypes.oneOf(['left', 'right']),
  /**
   * @ignore
   * Callback to execute for button press
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   * Should the button be present or just consume space
   */
  visible: PropTypes.bool,
};

TabScrollButton.defaultProps = {
  visible: true,
};

TabScrollButton.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default TabScrollButton;
