'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import {
  unstable_capitalize as capitalize,
  unstable_useForkRef as useForkRef,
  unstable_unsupportedProp as unsupportedProp,
} from '@mui/utils';
import ButtonBase from '@mui/material/ButtonBase';
import { OverridableComponent } from '@mui/types';
import CancelIcon from '../internal/svg-icons/Cancel';
import { useThemeProps, styled } from '../styles';
import chipClasses, { getChipUtilityClass } from './chipClasses';
import { ChipOwnerState, ChipProps, ChipTypeMap } from './Chip.types';

const useUtilityClasses = (ownerState: ChipOwnerState) => {
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
})<{ ownerState: ChipOwnerState }>(
  ({ theme, ownerState }) => {
    const { vars: tokens } = theme;

    return {
      maxWidth: '100%',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(13),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      color: tokens.palette.text.primary,
      backgroundColor: tokens.palette.action.selected,
      borderRadius: 32 / 2,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create(['background-color', 'box-shadow']),
      // label will inherit this from root, then `clickable` class overrides this for both
      cursor: 'default',
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      textDecoration: 'none',
      border: 0, // Remove `button` border
      padding: 0, // Remove `button` padding
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      [`&.${chipClasses.disabled}`]: {
        opacity: tokens.palette.action.disabledOpacity,
        pointerEvents: 'none',
      },
      [`& .${chipClasses.avatar}`]: {
        marginLeft: 5,
        marginRight: -6,
        width: 24,
        height: 24,
        color: tokens.palette.Chip.defaultAvatarColor,
        fontSize: theme.typography.pxToRem(12),
      },
      [`& .${chipClasses.avatarColorPrimary}`]: {
        color: tokens.palette.primary.contrastText,
        backgroundColor: tokens.palette.primary.dark,
      },
      [`& .${chipClasses.avatarColorSecondary}`]: {
        color: tokens.palette.secondary.contrastText,
        backgroundColor: tokens.palette.secondary.dark,
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
        ...(ownerState.size === 'small' && {
          fontSize: 18,
          marginLeft: 4,
          marginRight: -4,
        }),
        ...(ownerState.iconColor === ownerState.color && {
          color: tokens.palette.Chip.defaultIconColor,
          ...(ownerState.color !== 'default' && {
            color: 'inherit',
          }),
        }),
      },
      [`& .${chipClasses.deleteIcon}`]: {
        WebkitTapHighlightColor: 'transparent',
        color: `rgba(${tokens.palette.text.primaryChannel} / 0.26)`,
        fontSize: 22,
        cursor: 'pointer',
        margin: '0 5px 0 -6px',
        '&:hover': {
          color: `rgba(${tokens.palette.text.primaryChannel} / 0.4)`,
        },
        ...(ownerState.size === 'small' && {
          fontSize: 16,
          marginRight: 4,
          marginLeft: -4,
        }),
        ...(ownerState.color !== 'default' && {
          color: `rgba(${tokens.palette[ownerState.color].contrastTextChannel} / 0.7)`,
          '&:hover, &:active': {
            color: tokens.palette[ownerState.color].contrastText,
          },
        }),
      },
      ...(ownerState.size === 'small' && {
        height: 24,
      }),
      ...(ownerState.color !== 'default' && {
        backgroundColor: tokens.palette[ownerState.color].main,
        color: tokens.palette[ownerState.color].contrastText,
      }),
      ...(ownerState.onDelete && {
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: `rgba(${tokens.palette.action.selectedChannel} / calc(${tokens.palette.action.selectedOpacity} + ${tokens.palette.action.focusOpacity}))`,
        },
      }),
      ...(ownerState.onDelete &&
        ownerState.color !== 'default' && {
          [`&.${chipClasses.focusVisible}`]: {
            backgroundColor: tokens.palette[ownerState.color].dark,
          },
        }),
    };
  },
  ({ theme, ownerState }) => {
    const { vars: tokens } = theme;

    return {
      ...(ownerState.clickable && {
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: `rgba(${tokens.palette.action.selectedChannel} / calc(${tokens.palette.action.selectedOpacity} + ${tokens.palette.action.hoverOpacity}))`,
        },
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: `rgba(${tokens.palette.action.selectedChannel} / calc(${tokens.palette.action.selectedOpacity} + ${tokens.palette.action.focusOpacity}))`,
        },
        '&:active': {
          boxShadow: tokens.shadows[1],
        },
      }),
      ...(ownerState.clickable &&
        ownerState.color !== 'default' && {
          [`&:hover, &.${chipClasses.focusVisible}`]: {
            backgroundColor: tokens.palette[ownerState.color].dark,
          },
        }),
    };
  },
  ({ theme, ownerState }) => {
    const { vars: tokens } = theme;

    return {
      ...(ownerState.variant === 'outlined' && {
        backgroundColor: 'transparent',
        border: `1px solid ${tokens.palette.Chip.defaultBorder}`,
        [`&.${chipClasses.clickable}:hover`]: {
          backgroundColor: tokens.palette.action.hover,
        },
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: tokens.palette.action.focus,
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
      }),
      ...(ownerState.variant === 'outlined' &&
        ownerState.color !== 'default' && {
          color: tokens.palette[ownerState.color].main,
          border: `1px solid rgba(${tokens.palette[ownerState.color].mainChannel} / 0.7)`,
          [`&.${chipClasses.clickable}:hover`]: {
            backgroundColor: `rgba(${tokens.palette[ownerState.color].mainChannel} / ${
              tokens.palette.action.hoverOpacity
            })`,
          },
          [`&.${chipClasses.focusVisible}`]: {
            backgroundColor: `rgba(${tokens.palette[ownerState.color].mainChannel} / ${
              tokens.palette.action.focusOpacity
            })`,
          },
          [`& .${chipClasses.deleteIcon}`]: {
            color: `rgba(${tokens.palette[ownerState.color].mainChannel} / 0.7)`,
            '&:hover, &:active': {
              color: tokens.palette[ownerState.color].main,
            },
          },
        }),
    };
  },
);

const ChipLabel = styled('span', {
  name: 'MuiChip',
  slot: 'Label',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    const { size } = ownerState;

    return [styles.label, styles[`label${capitalize(size)}`]];
  },
})<{ ownerState: ChipOwnerState }>(({ ownerState }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingLeft: 12,
  paddingRight: 12,
  whiteSpace: 'nowrap',
  ...(ownerState.size === 'small' && {
    paddingLeft: 8,
    paddingRight: 8,
  }),
}));

function isDeleteKeyboardEvent(keyboardEvent: React.KeyboardEvent<HTMLDivElement>) {
  return keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete';
}

/**
 * Chips represent complex entities in small blocks, such as a contact.
 *
 * Demos:
 *
 * - [Chip](https://mui.com/material-ui/react-chip/)
 *
 * API:
 *
 * - [Chip API](https://mui.com/material-ui/api/chip/)
 */
const Chip = React.forwardRef(function Chip<
  BaseComponentType extends React.ElementType = ChipTypeMap['defaultComponent'],
>(inProps: ChipProps<BaseComponentType>, ref: React.ForwardedRef<Element>) {
  const props = useThemeProps<typeof inProps & ChipProps>({ props: inProps, name: 'MuiChip' });
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

  const chipRef = React.useRef<HTMLDivElement | null>(null);
  const handleRef = useForkRef(chipRef, ref);

  const handleDeleteIconClick = (event: React.MouseEvent<SVGSVGElement>) => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target) {
      if (onDelete && isDeleteKeyboardEvent(event)) {
        onDelete(event);
      } else if (event.key === 'Escape' && chipRef.current) {
        chipRef.current.blur();
      }
    }

    if (onKeyUp) {
      onKeyUp(event);
    }
  };

  const clickable = clickableProp !== false && onClick ? true : clickableProp;

  const component = clickable || onDelete ? ButtonBase : ComponentProp || 'div';

  const ownerState: ChipOwnerState = {
    ...props,
    component,
    disabled,
    size,
    color,
    iconColor: React.isValidElement(iconProp) ? (iconProp.props as any)?.color || color : color,
    onDelete: !!onDelete,
    clickable,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const moreProps =
    component === ButtonBase
      ? {
          component: ComponentProp || 'div',
          focusVisibleClassName: chipClasses.focusVisible,
          ...(onDelete && { disableRipple: true }),
        }
      : {};

  let deleteIcon = null;
  if (onDelete) {
    deleteIcon =
      deleteIconProp && React.isValidElement(deleteIconProp) ? (
        React.cloneElement(deleteIconProp as React.ReactElement, {
          className: clsx((deleteIconProp.props as any)?.className, classes.deleteIcon),
          onClick: handleDeleteIconClick,
        })
      ) : (
        <CancelIcon className={clsx(classes.deleteIcon)} onClick={handleDeleteIconClick} />
      );
  }

  let avatar = null;
  if (avatarProp && React.isValidElement(avatarProp)) {
    avatar = React.cloneElement(avatarProp as React.ReactElement, {
      className: clsx(classes.avatar, (avatarProp.props as any)?.className),
    });
  }

  let icon = null;
  if (iconProp && React.isValidElement(iconProp)) {
    icon = React.cloneElement(iconProp as React.ReactElement, {
      className: clsx(classes.icon, (iconProp.props as any)?.className),
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
}) as OverridableComponent<ChipTypeMap>;

Chip.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
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
