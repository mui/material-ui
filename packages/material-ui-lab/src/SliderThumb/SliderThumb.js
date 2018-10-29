// @inheritedComponent ButtonBase
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { getTransitionOptions, getValueInPercent, getVisualStateClasses } from '../Slider/shared';

export const styles = theme => {
  const outlineColor = fade(theme.palette.primary.main, 0.16);
  /**
   * radius of the box-shadow when pressed
   * hover should have a diameter equal to the pressed radius
   */
  const pressedOutlineRadius = 9;

  const rootTransition = theme.transitions.create(['transform'], getTransitionOptions(theme));
  const buttonTransition = theme.transitions.create(['box-shadow'], getTransitionOptions(theme));

  return {
    wrapper: {
      position: 'relative',
      zIndex: 2,
      transition: rootTransition,
      '&$activated': {
        transition: 'none',
        willChange: 'transform',
      },
      '&$vertical': {
        bottom: 0,
        height: '100%',
      },
    },
    root: {
      // Opt out of rtl flip as positioning here only is for centering
      flip: false,
      position: 'absolute',
      left: 0,
      transform: 'translate(-50%, -50%)',
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      transition: buttonTransition,
      '$focused &, &:hover': {
        boxShadow: `0px 0px 0px ${pressedOutlineRadius}px ${outlineColor}`,
      },
      '$activated &': {
        boxShadow: `0px 0px 0px ${pressedOutlineRadius * 2}px ${outlineColor}`,
      },
      '$disabled &': {
        cursor: 'no-drop',
        width: 9,
        height: 9,
        backgroundColor: theme.palette.grey[400],
      },
      '$jumped &': {
        boxShadow: `0px 0px 0px ${pressedOutlineRadius * 2}px ${outlineColor}`,
      },
    },
    /* Class applied to the thumb element if custom thumb icon provided. */
    iconWrapper: {
      backgroundColor: 'transparent',
    },
    icon: {
      height: 'inherit',
      width: 'inherit',
    },
    /* Class applied to the track and thumb elements to trigger JSS nested styles if `disabled`. */
    disabled: {},
    /* Class applied to the track and thumb elements to trigger JSS nested styles if `jumped`. */
    jumped: {},
    /* Class applied to the track and thumb elements to trigger JSS nested styles if `focused`. */
    focused: {},
    /* Class applied to the track and thumb elements to trigger JSS nested styles if `activated`. */
    activated: {},
    /* Class applied to the root, track and container to trigger JSS nested styles if `vertical`. */
    vertical: {},
  };
};

function SliderThumb(props) {
  const {
    classes,
    className: classNameProp,
    component: Component,
    icon,
    min,
    max,
    state,
    theme,
    vertical,
    ...other
  } = props;

  const percent = getValueInPercent(props);

  const transformFunction = vertical ? 'translateY' : 'translateX';
  const directionInverted = vertical || theme.direction === 'rtl';
  const inlineStyles = {
    transform: `${transformFunction}(${directionInverted ? 100 - percent : percent}%)`,
  };

  const wrapperClassName = classNames(classes.wrapper, getVisualStateClasses(props));
  const className = classNames(
    classes.root,
    {
      [classes.iconWrapper]: icon,
    },
    classNameProp,
  );

  const ThumbIcon = icon
    ? React.cloneElement(icon, {
        className: classNames(icon.props.className, classes.icon),
      })
    : null;

  return (
    <Component className={wrapperClassName} style={inlineStyles}>
      <ButtonBase className={className} disableRipple {...other}>
        {ThumbIcon}
      </ButtonBase>
    </Component>
  );
}

SliderThumb.propTypes = {
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  icon: PropTypes.object,
  /**
   * max value of the corresponding slider
   */
  max: PropTypes.number.isRequired,
  /**
   * min value of the corresponding slider
   */
  min: PropTypes.number.isRequired,
  /**
   * state of the corresponding slider
   */
  state: PropTypes.oneOf(['activated', 'disabled', 'focused', 'jumped', 'normal']).isRequired,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * value of the corresponding slider
   */
  value: PropTypes.number.isRequired,
  /**
   * If `true`, the slider track will be vertical.
   */
  vertical: PropTypes.bool.isRequired,
};

SliderThumb.defaultProps = {
  component: 'div',
};

export default withStyles(styles, { name: 'MuiSliderThumb', withTheme: true })(SliderThumb);
