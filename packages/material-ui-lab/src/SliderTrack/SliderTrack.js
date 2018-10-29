import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getTransitionOptions, getValueInPercent, getVisualStateClasses } from '../Slider/shared';

export const styles = theme => {
  const transition = theme.transitions.create(
    ['width', 'height', 'transform'],
    getTransitionOptions(theme),
  );

  return {
    /* Styles applied to the track elements. */
    root: {
      position: 'absolute',
      transform: 'translate(0, -50%)',
      top: '50%',
      width: '100%',
      height: 2,
      backgroundColor: theme.palette.primary.main,
      transition,
      '&$activated': {
        transition: 'none',
      },
      '&$disabled': {
        backgroundColor: theme.palette.grey[400],
        boxShadow: 'none',
      },
      '&$vertical': {
        transform: 'translate(-50%, 0)',
        left: '50%',
        top: 'initial',
        bottom: 0,
        width: 2,
        height: '100%',
      },
    },
    /* Styles applied to the track element that is selected . */
    selected: {
      zIndex: 1,
      left: 0,
      transformOrigin: 'left bottom',
    },
    /* Styles applied to the track element that is unselected. */
    unselected: {
      right: 0,
      opacity: 0.24,
      transformOrigin: 'right top',
      '&$vertical': {
        top: 0,
      },
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

function SliderTrack(props) {
  const {
    classes,
    className: classNameProp,
    component: Component,
    max,
    min,
    state,
    theme,
    value,
    vertical,
    ...other
  } = props;

  function calculateTrackPartStyles(percent) {
    switch (state) {
      case 'disabled':
        return {
          [vertical ? 'height' : 'width']: `calc(${percent}% - 6px)`,
        };
      default:
        return {
          transform: `${
            vertical
              ? `translateX(${theme.direction === 'rtl' ? '' : '-'}50%) scaleY`
              : 'translateY(-50%) scaleX'
          }(${percent / 100})`,
        };
    }
  }

  const percent = getValueInPercent(props);

  const commonClasses = getVisualStateClasses(props);
  const selectedClassName = classNames(
    classes.root,
    classes.selected,
    commonClasses,
    classNameProp,
  );
  const unselectedClassName = classNames(
    classes.root,
    classes.unselected,
    commonClasses,
    classNameProp,
  );

  const inlineTrackSelectedStyles = calculateTrackPartStyles(percent);
  const inlineTrackUnselectedStyles = calculateTrackPartStyles(100 - percent);

  return (
    <React.Fragment>
      <Component className={selectedClassName} style={inlineTrackSelectedStyles} {...other} />
      <Component className={unselectedClassName} style={inlineTrackUnselectedStyles} {...other} />
    </React.Fragment>
  );
}

SliderTrack.propTypes = {
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for each part of the track.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
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

SliderTrack.defaultProps = {
  component: 'div',
};

export default withStyles(styles, { name: 'MuiSliderTrack', withTheme: true })(SliderTrack);
