import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import SwitchBase from '../internal/SwitchBase';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    width: 62,
    position: 'relative',
    flexShrink: 0,
    zIndex: 0, // Reset the stacking context.
    // For correct alignment with the text.
    verticalAlign: 'middle',
  },
  /* Styles used to create the `icon` passed to the internal `SwitchBase` component `icon` prop. */
  icon: {
    boxShadow: theme.shadows[1],
    backgroundColor: 'currentColor',
    width: 20,
    height: 20,
    borderRadius: '50%',
  },
  /* Styles applied the icon element component if `checked={true}`. */
  iconChecked: {
    boxShadow: theme.shadows[2],
  },
  /* Styles applied to the internal `SwitchBase` component's `root` class. */
  switchBase: {
    padding: 0,
    height: 48,
    width: 48,
    color: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[400],
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  /* Styles applied to the internal `SwitchBase` component's `checked` class. */
  checked: {
    transform: 'translateX(14px)',
    '& + $bar': {
      opacity: 0.5,
    },
  },
  /* Styles applied to the internal SwitchBase component's root element if `color="primary"`. */
  colorPrimary: {
    '&$checked': {
      color: theme.palette.primary.main,
      '& + $bar': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  /* Styles applied to the internal SwitchBase component's root element if `color="secondary"`. */
  colorSecondary: {
    '&$checked': {
      color: theme.palette.secondary.main,
      '& + $bar': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  },
  /* Styles applied to the internal SwitchBase component's disabled class. */
  disabled: {
    '& + $bar': {
      opacity: theme.palette.type === 'light' ? 0.12 : 0.1,
    },
    '& $icon': {
      boxShadow: theme.shadows[1],
    },
    '&$switchBase': {
      color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
      '& + $bar': {
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
      },
    },
  },
  /* Styles applied to the bar element. */
  bar: {
    borderRadius: 14 / 2,
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    width: 34,
    height: 14,
    top: '50%',
    left: '50%',
    marginTop: -7,
    marginLeft: -17,
    transition: theme.transitions.create(['opacity', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
    opacity: theme.palette.type === 'light' ? 0.38 : 0.3,
  },
});

const Switch = React.forwardRef(function Switch(props, ref) {
  const { classes, className, color, ...other } = props;

  return (
    <span className={clsx(classes.root, className)}>
      <SwitchBase
        type="checkbox"
        icon={<span className={classes.icon} />}
        classes={{
          root: clsx(classes.switchBase, classes[`color${capitalize(color)}`]),
          checked: classes.checked,
          disabled: classes.disabled,
        }}
        checkedIcon={<span className={clsx(classes.icon, classes.iconChecked)} />}
        ref={ref}
        {...other}
      />
      <span className={classes.bar} />
    </span>
  );
});

Switch.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
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
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Attributes applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
};

Switch.defaultProps = {
  color: 'secondary',
};

export default withStyles(styles, { name: 'MuiSwitch' })(Switch);
