/* eslint-disable jsx-a11y/aria-role */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';

export const styles = {
  root: {
    width: 40,
    flexShrink: 0,
  },
  vertical: {
    width: '100%',
    height: 40,
    '& svg': {
      transform: 'rotate(90deg)',
    },
  },
};

/**
 * @ignore - internal component.
 */
const TabScrollButton = React.forwardRef(function TabScrollButton(props, ref) {
  const { classes, className: classNameProp, direction, orientation, visible, ...other } = props;

  const className = clsx(
    classes.root,
    {
      [classes.vertical]: orientation === 'vertical',
    },
    classNameProp,
  );

  if (!visible) {
    return <div className={className} />;
  }

  return (
    <ButtonBase
      component="div"
      className={className}
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
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  /**
   * The tabs orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  /**
   * Should the button be present or just consume space.
   */
  visible: PropTypes.bool.isRequired,
};

export default withStyles(styles, { name: 'PrivateTabScrollButton' })(TabScrollButton);
