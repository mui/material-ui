/* eslint-disable jsx-a11y/aria-role */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    color: 'inherit',
    width: 40,
    flexShrink: 0,
  },
};

/**
 * @ignore - internal component.
 */
const TabScrollButton = React.forwardRef(function TabScrollButton(props, ref) {
  const { classes, className: classNameProp, direction, onClick, visible = true, ...other } = props;

  const className = clsx(classes.root, classNameProp);

  if (!visible) {
    return <div className={className} />;
  }

  return (
    <ButtonBase
      component="div"
      className={className}
      onClick={onClick}
      ref={ref}
      role={null}
      tabIndex={null}
      {...other}
    >
      {direction === 'left' ? (
        <KeyboardArrowLeft fontSize="small" />
      ) : (
        <KeyboardArrowRight fontSize="small" />
      )}
    </ButtonBase>
  );
});

TabScrollButton.propTypes = {
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

export default withStyles(styles, { name: 'PrivateTabScrollButton' })(TabScrollButton);
