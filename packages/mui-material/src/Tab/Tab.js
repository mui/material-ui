import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import unsupportedProp from '../utils/unsupportedProp';
import tabClasses, { getTabUtilityClass } from './tabClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, textColor, fullWidth, wrapped, icon, label, selected, disabled } = ownerState;

  const slots = {
    root: [
      'root',
      icon && label && 'labelIcon',
      `textColor${capitalize(textColor)}`,
      fullWidth && 'fullWidth',
      wrapped && 'wrapped',
      selected && 'selected',
      disabled && 'disabled',
    ],
    iconWrapper: ['iconWrapper'],
  };

  return composeClasses(slots, getTabUtilityClass, classes);
};

const TabRoot = styled(ButtonBase, {
  name: 'MuiTab',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.label && ownerState.icon && styles.labelIcon,
      styles[`textColor${capitalize(ownerState.textColor)}`],
      ownerState.fullWidth && styles.fullWidth,
      ownerState.wrapped && styles.wrapped,
    ];
  },
})(({ theme, ownerState }) => ({
  ...theme.typography.button,
  maxWidth: 360,
  minWidth: 90,
  position: 'relative',
  minHeight: 48,
  flexShrink: 0,
  padding: '12px 16px',
  overflow: 'hidden',
  whiteSpace: 'normal',
  textAlign: 'center',
  ...(ownerState.label && {
    flexDirection:
      ownerState.iconPosition === 'top' || ownerState.iconPosition === 'bottom' ? 'column' : 'row',
  }),
  lineHeight: 1.25,
  ...(ownerState.icon &&
    ownerState.label && {
      minHeight: 72,
      paddingTop: 9,
      paddingBottom: 9,
      [`& > .${tabClasses.iconWrapper}`]: {
        ...(ownerState.iconPosition === 'top' && {
          marginBottom: 6,
        }),
        ...(ownerState.iconPosition === 'bottom' && {
          marginTop: 6,
        }),
        ...(ownerState.iconPosition === 'start' && {
          marginRight: theme.spacing(1),
        }),
        ...(ownerState.iconPosition === 'end' && {
          marginLeft: theme.spacing(1),
        }),
      },
    }),
  ...(ownerState.textColor === 'inherit' && {
    color: 'inherit',
    opacity: 0.6, // same opacity as theme.palette.text.secondary
    [`&.${tabClasses.selected}`]: {
      opacity: 1,
    },
    [`&.${tabClasses.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
    },
  }),
  ...(ownerState.textColor === 'primary' && {
    color: (theme.vars || theme).palette.text.secondary,
    [`&.${tabClasses.selected}`]: {
      color: (theme.vars || theme).palette.primary.main,
    },
    [`&.${tabClasses.disabled}`]: {
      color: (theme.vars || theme).palette.text.disabled,
    },
  }),
  ...(ownerState.textColor === 'secondary' && {
    color: (theme.vars || theme).palette.text.secondary,
    [`&.${tabClasses.selected}`]: {
      color: (theme.vars || theme).palette.secondary.main,
    },
    [`&.${tabClasses.disabled}`]: {
      color: (theme.vars || theme).palette.text.disabled,
    },
  }),
  ...(ownerState.fullWidth && {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: 'none',
  }),
  ...(ownerState.wrapped && {
    fontSize: theme.typography.pxToRem(12),
  }),
}));

const Tab = React.forwardRef(function Tab(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTab' });
  const {
    className,
    disabled = false,
    disableFocusRipple = false,
    // eslint-disable-next-line react/prop-types
    fullWidth,
    icon: iconProp,
    iconPosition = 'top',
    // eslint-disable-next-line react/prop-types
    indicator,
    label,
    onChange,
    onClick,
    onFocus,
    // eslint-disable-next-line react/prop-types
    selected,
    // eslint-disable-next-line react/prop-types
    selectionFollowsFocus,
    // eslint-disable-next-line react/prop-types
    textColor = 'inherit',
    value,
    wrapped = false,
    ...other
  } = props;

  const ownerState = {
    ...props,
    disabled,
    disableFocusRipple,
    selected,
    icon: !!iconProp,
    iconPosition,
    label: !!label,
    fullWidth,
    textColor,
    wrapped,
  };

  const classes = useUtilityClasses(ownerState);
  const icon =
    iconProp && label && React.isValidElement(iconProp)
      ? React.cloneElement(iconProp, {
          className: clsx(classes.iconWrapper, iconProp.props.className),
        })
      : iconProp;
  const handleClick = (event) => {
    if (!selected && onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const handleFocus = (event) => {
    if (selectionFollowsFocus && !selected && onChange) {
      onChange(event, value);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  return (
    <TabRoot
      focusRipple={!disableFocusRipple}
      className={clsx(classes.root, className)}
      ref={ref}
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      onClick={handleClick}
      onFocus={handleFocus}
      ownerState={ownerState}
      tabIndex={selected ? 0 : -1}
      {...other}
    >
      {iconPosition === 'top' || iconPosition === 'start' ? (
        <React.Fragment>
          {icon}
          {label}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {label}
          {icon}
        </React.Fragment>
      )}

      {indicator}
    </TabRoot>
  );
});

Tab.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display.
   */
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /**
   * The position of the icon relative to the label.
   * @default 'top'
   */
  iconPosition: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),
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
  onFocus: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any,
  /**
   * Tab labels appear in a single row.
   * They can use a second line if needed.
   * @default false
   */
  wrapped: PropTypes.bool,
};

export default Tab;
