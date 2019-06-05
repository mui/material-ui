// @inheritedComponent IconButton

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';
import { capitalize } from '../utils/helpers';
import SwitchBase from '../internal/SwitchBase';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    width: 34 + 12 * 2,
    height: 14 + 12 * 2,
    overflow: 'hidden',
    padding: 12,
    boxSizing: 'border-box',
    position: 'relative',
    flexShrink: 0,
    zIndex: 0, // Reset the stacking context.
    verticalAlign: 'middle', // For correct alignment with the text.
  },
  /* Styles applied to the root element if `edge="start"`. */
  edgeStart: {
    marginLeft: -8,
  },
  /* Styles applied to the root element if `edge="end"`. */
  edgeEnd: {
    marginRight: -8,
  },
  /* Styles applied to the internal `SwitchBase` component's `root` class. */
  switchBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1, // Render above the focus ripple.
    color: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[400],
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    '&$checked': {
      transform: 'translateX(50%)',
    },
    '&$disabled': {
      color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
    },
    '&$checked + $track': {
      opacity: 0.5,
    },
    '&$disabled + $track': {
      opacity: theme.palette.type === 'light' ? 0.12 : 0.1,
    },
  },
  /* Styles applied to the internal SwitchBase component's root element if `color="primary"`. */
  colorPrimary: {
    '&$checked': {
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      },
    },
    '&$disabled': {
      color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.primary.main,
    },
    '&$disabled + $track': {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
    },
  },
  /* Styles applied to the internal SwitchBase component's root element if `color="secondary"`. */
  colorSecondary: {
    '&$checked': {
      color: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
      },
    },
    '&$disabled': {
      color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.secondary.main,
    },
    '&$disabled + $track': {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
    },
  },
  /* Styles applied to the internal `SwitchBase` component's `checked` class. */
  checked: {},
  /* Styles applied to the internal SwitchBase component's disabled class. */
  disabled: {},
  /* Styles applied to the internal SwitchBase component's input element. */
  input: {
    left: '-100%',
    width: '300%',
  },
  /* Styles used to create the thumb passed to the internal `SwitchBase` component `icon` prop. */
  thumb: {
    boxShadow: theme.shadows[1],
    backgroundColor: 'currentColor',
    width: 20,
    height: 20,
    borderRadius: '50%',
  },
  /* Styles applied to the track element. */
  track: {
    height: '100%',
    width: '100%',
    borderRadius: 14 / 2,
    zIndex: -1,
    transition: theme.transitions.create(['opacity', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
    opacity: theme.palette.type === 'light' ? 0.38 : 0.3,
  },
});

const Switch = React.forwardRef(function Switch(props, ref) {
  const { classes, className, color = 'secondary', edge = false, ...other } = props;
  const icon = <span className={classes.thumb} />;

  return (
    <span
      className={clsx(
        classes.root,
        {
          [classes.edgeStart]: edge === 'start',
          [classes.edgeEnd]: edge === 'end',
        },
        className,
      )}
    >
      <SwitchBase
        type="checkbox"
        icon={icon}
        checkedIcon={icon}
        classes={{
          root: clsx(classes.switchBase, classes[`color${capitalize(color)}`]),
          input: classes.input,
          checked: classes.checked,
          disabled: classes.disabled,
        }}
        ref={ref}
        {...other}
      />
      <span className={classes.track} />
    </span>
  );
});

Switch.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
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
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
  /**
   * @ignore
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   */
  edge: PropTypes.oneOf(['start', 'end', false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * This property can be used to pass a ref callback to the `input` element.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.checked`.
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: PropTypes.func,
  /**
   * The input component property `type`.
   */
  type: PropTypes.string,
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};

export default withStyles(styles, { name: 'MuiSwitch' })(Switch);
