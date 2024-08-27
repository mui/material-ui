'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '@mui/system/colorManipulator';
import CancelIcon from '../internal/svg-icons/Cancel';
import useForkRef from '../utils/useForkRef';
import unsupportedProp from '../utils/unsupportedProp';
import capitalize from '../utils/capitalize';
import ButtonBase from '../ButtonBase';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import chipClasses, { getChipUtilityClass } from './chipClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, disabled, size, color, iconColor, onDelete, clickable, variant } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      disabled && 'disabled',
      `size${capitalize(size)}`,
      `color${capitalize(color)}`,
      clickable && 'clickable',
      clickable && `clickableColor${capitalize(color)}`,
      onDelete && 'deletable',
      onDelete && `deletableColor${capitalize(color)}`,
      `${variant}${capitalize(color)}`,
    ],
    label: ['label', `label${capitalize(size)}`],
    avatar: ['avatar', `avatar${capitalize(size)}`, `avatarColor${capitalize(color)}`],
    icon: ['icon', `icon${capitalize(size)}`, `iconColor${capitalize(iconColor)}`],
    deleteIcon: [
      'deleteIcon',
      `deleteIcon${capitalize(size)}`,
      `deleteIconColor${capitalize(color)}`,
      `deleteIcon${capitalize(variant)}Color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getChipUtilityClass, classes);
};

const ChipRoot = styled('div', {
  name: 'MuiChip',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    const { color, iconColor, clickable, onDelete, size, variant } = ownerState;

    return [
      { [`& .${chipClasses.avatar}`]: styles.avatar },
      { [`& .${chipClasses.avatar}`]: styles[`avatar${capitalize(size)}`] },
      { [`& .${chipClasses.avatar}`]: styles[`avatarColor${capitalize(color)}`] },
      { [`& .${chipClasses.icon}`]: styles.icon },
      { [`& .${chipClasses.icon}`]: styles[`icon${capitalize(size)}`] },
      { [`& .${chipClasses.icon}`]: styles[`iconColor${capitalize(iconColor)}`] },
      { [`& .${chipClasses.deleteIcon}`]: styles.deleteIcon },
      { [`& .${chipClasses.deleteIcon}`]: styles[`deleteIcon${capitalize(size)}`] },
      { [`& .${chipClasses.deleteIcon}`]: styles[`deleteIconColor${capitalize(color)}`] },
      {
        [`& .${chipClasses.deleteIcon}`]:
          styles[`deleteIcon${capitalize(variant)}Color${capitalize(color)}`],
      },
      styles.root,
      styles[`size${capitalize(size)}`],
      styles[`color${capitalize(color)}`],
      clickable && styles.clickable,
      clickable && color !== 'default' && styles[`clickableColor${capitalize(color)})`],
      onDelete && styles.deletable,
      onDelete && color !== 'default' && styles[`deletableColor${capitalize(color)}`],
      styles[variant],
      styles[`${variant}${capitalize(color)}`],
    ];
  },
})(
  memoTheme(({ theme }) => {
    const textColor =
      theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300];
    return {
      maxWidth: '100%',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(13),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      color: (theme.vars || theme).palette.text.primary,
      backgroundColor: (theme.vars || theme).palette.action.selected,
      borderRadius: 32 / 2,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create(['background-color', 'box-shadow']),
      // reset cursor explicitly in case ButtonBase is used
      cursor: 'unset',
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      textDecoration: 'none',
      border: 0, // Remove `button` border
      padding: 0, // Remove `button` padding
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      [`&.${chipClasses.disabled}`]: {
        opacity: (theme.vars || theme).palette.action.disabledOpacity,
        pointerEvents: 'none',
      },
      [`& .${chipClasses.avatar}`]: {
        marginLeft: 5,
        marginRight: -6,
        width: 24,
        height: 24,
        color: theme.vars ? theme.vars.palette.Chip.defaultAvatarColor : textColor,
        fontSize: theme.typography.pxToRem(12),
      },
      [`& .${chipClasses.avatarColorPrimary}`]: {
        color: (theme.vars || theme).palette.primary.contrastText,
        backgroundColor: (theme.vars || theme).palette.primary.dark,
      },
      [`& .${chipClasses.avatarColorSecondary}`]: {
        color: (theme.vars || theme).palette.secondary.contrastText,
        backgroundColor: (theme.vars || theme).palette.secondary.dark,
      },
      [`& .${chipClasses.avatarSmall}`]: {
        marginLeft: 4,
        marginRight: -4,
        width: 18,
        height: 18,
        fontSize: theme.typography.pxToRem(10),
      },
      [`& .${chipClasses.icon}`]: {
        marginLeft: 5,
        marginRight: -6,
      },
      [`& .${chipClasses.deleteIcon}`]: {
        WebkitTapHighlightColor: 'transparent',
        color: theme.vars
          ? `rgba(${theme.vars.palette.text.primaryChannel} / 0.26)`
          : alpha(theme.palette.text.primary, 0.26),
        fontSize: 22,
        cursor: 'pointer',
        margin: '0 5px 0 -6px',
        '&:hover': {
          color: theme.vars
            ? `rgba(${theme.vars.palette.text.primaryChannel} / 0.4)`
            : alpha(theme.palette.text.primary, 0.4),
        },
      },
      variants: [
        {
          props: { size: 'small' },
          style: {
            height: 24,
            [`& .${chipClasses.icon}`]: {
              fontSize: 18,
              marginLeft: 4,
              marginRight: -4,
            },
            [`& .${chipClasses.deleteIcon}`]: {
              fontSize: 16,
              marginRight: 4,
              marginLeft: -4,
            },
          },
        },
        ...Object.entries(theme.palette)
          .filter(([, value]) => value && value.main && value.contrastText)
          .map(([color]) => {
            return {
              props: { color },
              style: {
                backgroundColor: (theme.vars || theme).palette[color].main,
                color: (theme.vars || theme).palette[color].contrastText,
                [`& .${chipClasses.deleteIcon}`]: {
                  color: theme.vars
                    ? `rgba(${theme.vars.palette[color].contrastTextChannel} / 0.7)`
                    : alpha(theme.palette[color].contrastText, 0.7),
                  '&:hover, &:active': {
                    color: (theme.vars || theme).palette[color].contrastText,
                  },
                },
              },
            };
          }),
        {
          props: (props) => props.iconColor === props.color,
          style: {
            [`& .${chipClasses.icon}`]: {
              color: theme.vars ? theme.vars.palette.Chip.defaultIconColor : textColor,
            },
          },
        },
        {
          props: (props) => props.iconColor === props.color && props.color !== 'default',
          style: {
            [`& .${chipClasses.icon}`]: {
              color: 'inherit',
            },
          },
        },
        {
          props: { onDelete: true },
          style: {
            [`&.${chipClasses.focusVisible}`]: {
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
                : alpha(
                    theme.palette.action.selected,
                    theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
                  ),
            },
          },
        },
        ...Object.entries(theme.palette)
          .filter(([, value]) => value && value.dark)
          .map(([color]) => {
            return {
              props: { color, onDelete: true },
              style: {
                [`&.${chipClasses.focusVisible}`]: {
                  background: (theme.vars || theme).palette[color].dark,
                },
              },
            };
          }),
        {
          props: { clickable: true },
          style: {
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
                : alpha(
                    theme.palette.action.selected,
                    theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
                  ),
            },
            [`&.${chipClasses.focusVisible}`]: {
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
                : alpha(
                    theme.palette.action.selected,
                    theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
                  ),
            },
            '&:active': {
              boxShadow: (theme.vars || theme).shadows[1],
            },
          },
        },
        ...Object.entries(theme.palette)
          .filter(([, value]) => value && value.dark)
          .map(([color]) => ({
            props: { color, clickable: true },
            style: {
              [`&:hover, &.${chipClasses.focusVisible}`]: {
                backgroundColor: (theme.vars || theme).palette[color].dark,
              },
            },
          })),
        {
          props: { variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            border: theme.vars
              ? `1px solid ${theme.vars.palette.Chip.defaultBorder}`
              : `1px solid ${
                  theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700]
                }`,
            [`&.${chipClasses.clickable}:hover`]: {
              backgroundColor: (theme.vars || theme).palette.action.hover,
            },
            [`&.${chipClasses.focusVisible}`]: {
              backgroundColor: (theme.vars || theme).palette.action.focus,
            },
            [`& .${chipClasses.avatar}`]: {
              marginLeft: 4,
            },
            [`& .${chipClasses.avatarSmall}`]: {
              marginLeft: 2,
            },
            [`& .${chipClasses.icon}`]: {
              marginLeft: 4,
            },
            [`& .${chipClasses.iconSmall}`]: {
              marginLeft: 2,
            },
            [`& .${chipClasses.deleteIcon}`]: {
              marginRight: 5,
            },
            [`& .${chipClasses.deleteIconSmall}`]: {
              marginRight: 3,
            },
          },
        },
        ...Object.entries(theme.palette)
          .filter(([, value]) => value && value.main) // no need to check for mainChannel as it's calculated from main
          .map(([color]) => ({
            props: { variant: 'outlined', color },
            style: {
              color: (theme.vars || theme).palette[color].main,
              border: `1px solid ${
                theme.vars
                  ? `rgba(${theme.vars.palette[color].mainChannel} / 0.7)`
                  : alpha(theme.palette[color].main, 0.7)
              }`,
              [`&.${chipClasses.clickable}:hover`]: {
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                  : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
              },
              [`&.${chipClasses.focusVisible}`]: {
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.focusOpacity})`
                  : alpha(theme.palette[color].main, theme.palette.action.focusOpacity),
              },
              [`& .${chipClasses.deleteIcon}`]: {
                color: theme.vars
                  ? `rgba(${theme.vars.palette[color].mainChannel} / 0.7)`
                  : alpha(theme.palette[color].main, 0.7),
                '&:hover, &:active': {
                  color: (theme.vars || theme).palette[color].main,
                },
              },
            },
          })),
      ],
    };
  }),
);

const ChipLabel = styled('span', {
  name: 'MuiChip',
  slot: 'Label',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    const { size } = ownerState;

    return [styles.label, styles[`label${capitalize(size)}`]];
  },
})({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingLeft: 12,
  paddingRight: 12,
  whiteSpace: 'nowrap',
  variants: [
    {
      props: { variant: 'outlined' },
      style: {
        paddingLeft: 11,
        paddingRight: 11,
      },
    },
    {
      props: { size: 'small' },
      style: {
        paddingLeft: 8,
        paddingRight: 8,
      },
    },
    {
      props: { size: 'small', variant: 'outlined' },
      style: {
        paddingLeft: 7,
        paddingRight: 7,
      },
    },
  ],
});

function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete';
}

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
const Chip = React.forwardRef(function Chip(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiChip' });
  const {
    avatar: avatarProp,
    className,
    clickable: clickableProp,
    color = 'default',
    component: ComponentProp,
    deleteIcon: deleteIconProp,
    disabled = false,
    icon: iconProp,
    label,
    onClick,
    onDelete,
    onKeyDown,
    onKeyUp,
    size = 'medium',
    variant = 'filled',
    tabIndex,
    skipFocusWhenDisabled = false, // TODO v6: Rename to `focusableWhenDisabled`.
    ...other
  } = props;

  const chipRef = React.useRef(null);
  const handleRef = useForkRef(chipRef, ref);

  const handleDeleteIconClick = (event) => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };

  const handleKeyDown = (event) => {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) {
      // Will be handled in keyUp, otherwise some browsers
      // might init navigation
      event.preventDefault();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handleKeyUp = (event) => {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target) {
      if (onDelete && isDeleteKeyboardEvent(event)) {
        onDelete(event);
      }
    }

    if (onKeyUp) {
      onKeyUp(event);
    }
  };

  const clickable = clickableProp !== false && onClick ? true : clickableProp;

  const component = clickable || onDelete ? ButtonBase : ComponentProp || 'div';

  const ownerState = {
    ...props,
    component,
    disabled,
    size,
    color,
    iconColor: React.isValidElement(iconProp) ? iconProp.props.color || color : color,
    onDelete: !!onDelete,
    clickable,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const moreProps =
    component === ButtonBase
      ? {
          component: ComponentProp || 'div',
          focusVisibleClassName: classes.focusVisible,
          ...(onDelete && { disableRipple: true }),
        }
      : {};

  let deleteIcon = null;
  if (onDelete) {
    deleteIcon =
      deleteIconProp && React.isValidElement(deleteIconProp) ? (
        React.cloneElement(deleteIconProp, {
          className: clsx(deleteIconProp.props.className, classes.deleteIcon),
          onClick: handleDeleteIconClick,
        })
      ) : (
        <CancelIcon className={clsx(classes.deleteIcon)} onClick={handleDeleteIconClick} />
      );
  }

  let avatar = null;
  if (avatarProp && React.isValidElement(avatarProp)) {
    avatar = React.cloneElement(avatarProp, {
      className: clsx(classes.avatar, avatarProp.props.className),
    });
  }

  let icon = null;
  if (iconProp && React.isValidElement(iconProp)) {
    icon = React.cloneElement(iconProp, {
      className: clsx(classes.icon, iconProp.props.className),
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    if (avatar && icon) {
      console.error(
        'MUI: The Chip component can not handle the avatar ' +
          'and the icon prop at the same time. Pick one.',
      );
    }
  }

  return (
    <ChipRoot
      as={component}
      className={clsx(classes.root, className)}
      disabled={clickable && disabled ? true : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      ref={handleRef}
      tabIndex={skipFocusWhenDisabled && disabled ? -1 : tabIndex}
      ownerState={ownerState}
      {...moreProps}
      {...other}
    >
      {avatar || icon}
      <ChipLabel className={clsx(classes.label)} ownerState={ownerState}>
        {label}
      </ChipLabel>
      {deleteIcon}
    </ChipRoot>
  );
});

Chip.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The Avatar element to display.
   */
  avatar: PropTypes.element,
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
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable: PropTypes.bool,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: PropTypes.element,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Icon element.
   */
  icon: PropTypes.element,
  /**
   * The content of the component.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * If `true`, allows the disabled chip to escape focus.
   * If `false`, allows the disabled chip to receive focus.
   * @default false
   */
  skipFocusWhenDisabled: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['filled', 'outlined']),
    PropTypes.string,
  ]),
};

export default Chip;
