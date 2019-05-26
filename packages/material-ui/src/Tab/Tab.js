import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { capitalize } from '../utils/helpers';
import unsupportedProp from '../utils/unsupportedProp';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.button,
    maxWidth: 264,
    minWidth: 72,
    position: 'relative',
    boxSizing: 'border-box',
    minHeight: 48,
    flexShrink: 0,
    padding: '6px 12px',
    [theme.breakpoints.up('md')]: {
      padding: '6px 24px',
    },
    overflow: 'hidden',
    whiteSpace: 'normal',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(13),
      minWidth: 160,
    },
  },
  /* Styles applied to the root element if both `icon` and `label` are provided. */
  labelIcon: {
    minHeight: 72,
    paddingTop: 9,
    '& $wrapper > *:first-child': {
      marginBottom: 6,
    },
  },
  /* Styles applied to the root element if `textColor="inherit"`. */
  textColorInherit: {
    color: 'inherit',
    opacity: 0.7,
    '&$selected': {
      opacity: 1,
    },
    '&$disabled': {
      opacity: 0.4,
    },
  },
  /* Styles applied to the root element if `textColor="primary"`. */
  textColorPrimary: {
    color: theme.palette.text.secondary,
    '&$selected': {
      color: theme.palette.primary.main,
    },
    '&$disabled': {
      color: theme.palette.text.disabled,
    },
  },
  /* Styles applied to the root element if `textColor="secondary"`. */
  textColorSecondary: {
    color: theme.palette.text.secondary,
    '&$selected': {
      color: theme.palette.secondary.main,
    },
    '&$disabled': {
      color: theme.palette.text.disabled,
    },
  },
  /* Styles applied to the root element if `selected={true}` (controlled by the Tabs component). */
  selected: {},
  /* Styles applied to the root element if `disabled={true}` (controlled by the Tabs component). */
  disabled: {},
  /* Styles applied to the root element if `fullWidth={true}` (controlled by the Tabs component). */
  fullWidth: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: 'none',
  },
  /* Styles applied to the root element if `wrapped={true}`. */
  wrapped: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1.5,
  },
  /* Styles applied to the `icon` and `label`'s wrapper element. */
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },
});

const Tab = React.forwardRef(function Tab(props, ref) {
  const {
    classes,
    className,
    disabled = false,
    disableFocusRipple = false,
    fullWidth,
    icon,
    indicator,
    label,
    onChange,
    onClick,
    selected,
    textColor = 'inherit',
    value,
    wrapped = false,
    ...other
  } = props;

  const handleChange = event => {
    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <ButtonBase
      focusRipple={!disableFocusRipple}
      className={clsx(
        classes.root,
        classes[`textColor${capitalize(textColor)}`],
        {
          [classes.disabled]: disabled,
          [classes.selected]: selected,
          [classes.labelIcon]: label && icon,
          [classes.fullWidth]: fullWidth,
          [classes.wrapped]: wrapped,
        },
        className,
      )}
      ref={ref}
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      onClick={handleChange}
      {...other}
    >
      <span className={classes.wrapper}>
        {icon}
        {label}
      </span>
      {indicator}
    </ButtonBase>
  );
});

Tab.propTypes = {
  /**
   * This property isn't supported.
   * Use the `component` property if you need to change the children structure.
   */
  children: unsupportedProp,
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
   * If `true`, the tab will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   * `disableRipple` must also be true.
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * @ignore
   */
  fullWidth: PropTypes.bool,
  /**
   * The icon element.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   * For server-side rendering consideration, we let the selected tab
   * render the indicator.
   */
  indicator: PropTypes.node,
  /**
   * The label element.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  selected: PropTypes.bool,
  /**
   * @ignore
   */
  textColor: PropTypes.oneOf(['secondary', 'primary', 'inherit']),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any,
  /**
   * Tab labels appear in a single row.
   * They can use a second line if needed.
   */
  wrapped: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiTab' })(Tab);
