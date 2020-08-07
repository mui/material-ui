/* eslint-disable jsx-a11y/aria-role */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    width: 40,
    flexShrink: 0,
    opacity: 0.8,
    '&$disabled': {
      opacity: 0,
    },
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    width: '100%',
    height: 40,
    '& svg': {
      transform: 'rotate(90deg)',
    },
  },
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
};

const TabScrollButton = React.forwardRef(function TabScrollButton(props, ref) {
  const { classes, className: classNameProp, direction, orientation, disabled, ...other } = props;

  return (
    <ButtonBase
      component="div"
      className={clsx(
        classes.root,
        {
          [classes.vertical]: orientation === 'vertical',
          [classes.disabled]: disabled,
        },
        classNameProp,
      )}
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
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Which direction should the button indicate?
   */
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  /**
   * If `true`, the element will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The tabs orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
};

export default withStyles(styles, { name: 'MuiTabScrollButton' })(TabScrollButton);
