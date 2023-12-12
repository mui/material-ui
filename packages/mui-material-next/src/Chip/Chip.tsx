'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { EventHandlers, unstable_composeClasses as composeClasses, useSlotProps } from '@mui/base';
import {
  unstable_capitalize as capitalize,
  unstable_useForkRef as useForkRef,
  unstable_unsupportedProp as unsupportedProp,
} from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import ClearIcon from '../internal/svg-icons/Clear';
import { useThemeProps, styled, MD3ColorSchemeTokens } from '../styles';
import ButtonBase from '../ButtonBase';
import chipClasses, { getChipUtilityClass } from './chipClasses';
import { ChipOwnerState, ChipProps, ChipTypeMap } from './Chip.types';

const useUtilityClasses = (ownerState: ChipOwnerState) => {
  const { classes, disabled, size, color, hasDeleteIcon, clickable, variant } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      disabled && 'disabled',
      `size${capitalize(size)}`,
      color && `color${capitalize(color)}`,
      clickable && 'clickable',
      hasDeleteIcon && 'deletable',
    ],
    label: ['label'],
    avatar: ['avatar'],
    icon: ['icon'],
    deleteIcon: ['deleteIcon'],
  };

  const composedClasses = composeClasses(slots, getChipUtilityClass, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the ButtonBase
    ...composedClasses,
  };
};

const ChipRoot = styled('div', {
  name: 'MuiChip',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    const { color, clickable, hasDeleteIcon, size, variant } = ownerState;

    return [
      { [`& .${chipClasses.avatar}`]: styles.avatar },
      { [`& .${chipClasses.icon}`]: styles.icon },
      { [`& .${chipClasses.deleteIcon}`]: styles.deleteIcon },
      styles.root,
      styles[`size${capitalize(size)}`],
      color && styles[`color${capitalize(color)}`],
      clickable && styles.clickable,
      hasDeleteIcon && styles.deletable,
      styles[variant],
    ];
  },
})<{ ownerState: ChipOwnerState }>(({ theme, ownerState }) => {
  const { vars: tokens } = theme;

  const containerColor = {
    filled:
      tokens.sys.color[`${ownerState.color ?? 'secondary'}Container` as keyof MD3ColorSchemeTokens],
    outlined: 'transparent',
    elevated:
      tokens.sys.color[
        (ownerState.color
          ? `${ownerState.color}Container`
          : 'surfaceContainerLow') as keyof MD3ColorSchemeTokens
      ],
  };

  const labelTextColor = {
    filled:
      tokens.sys.color[
        `on${capitalize(ownerState.color ?? 'secondary')}Container` as keyof MD3ColorSchemeTokens
      ],
    outlined: tokens.sys.color.onSurface,
    elevated:
      tokens.sys.color[
        (ownerState.color
          ? `on${capitalize(ownerState.color)}Container`
          : 'onSurface') as keyof MD3ColorSchemeTokens
      ],
  };

  const containerElevation = {
    filled: tokens.sys.elevation[0],
    outlined: tokens.sys.elevation[0],
    elevated: tokens.sys.elevation[1],
  };

  const disabledContainerColor = {
    filled: `rgba(${tokens.sys.color.onSurfaceChannel} / 0.12)`,
    outlined: 'transparent',
    elevated: `rgba(${tokens.sys.color.onSurfaceChannel} / 0.12)`,
  };

  const disabledContainerBorder = {
    filled: null,
    outlined: `1px solid rgba(${tokens.sys.color.onSurfaceChannel} / 0.12)`,
    elevated: null,
  };

  const disabledElevation = {
    filled: tokens.sys.elevation[0],
    outlined: tokens.sys.elevation[0],
    elevated: tokens.sys.elevation[0],
  };

  const stateLayerBackgroundColor = {
    filled: tokens.sys.color.onSecondaryContainer,
    outlined: tokens.sys.color.onSurfaceVariant,
    elevated: tokens.sys.color.onSurfaceVariant,
  };

  const hoveredContainerElevation = {
    filled: tokens.sys.elevation[1],
    outlined: tokens.sys.elevation[0],
    elevated: tokens.sys.elevation[2],
  };

  const focusedContainerElevation = {
    filled: tokens.sys.elevation[0],
    outlined: tokens.sys.elevation[0],
    elevated: tokens.sys.elevation[1],
  };

  const pressedContainerElevation = {
    filled: tokens.sys.elevation[1],
    outlined: tokens.sys.elevation[0],
    elevated: tokens.sys.elevation[1],
  };

  const letterSpacing = `${
    theme.sys.typescale.label.large.tracking / theme.sys.typescale.label.large.size
  }rem`;

  return {
    '--md-comp-chip-container-color': containerColor[ownerState.variant],
    '--md-comp-chip-label-padding-y': '16px',
    '--md-comp-chip-label-padding-left': 'var(--md-comp-chip-label-padding-y)',
    '--md-comp-chip-label-padding-right': 'var(--md-comp-chip-label-padding-y)',
    '--md-comp-chip-icon-size': '18px',
    position: 'relative',
    maxWidth: '100%',
    fontFamily: tokens.sys.typescale.label.large.family,
    fontSize: theme.typography.pxToRem(theme.sys.typescale.label.large.size), // the pxToRem should be moved to typescale in the future
    fontWeight: tokens.sys.typescale.label.large.weight,
    lineHeight: `calc(${tokens.sys.typescale.label.large.lineHeight} / ${theme.sys.typescale.label.large.size})`,
    letterSpacing,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    color: labelTextColor[ownerState.variant],
    backgroundColor: 'var(--md-comp-chip-container-color)',
    borderRadius: tokens.sys.shape.corner.small,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    transition: theme.transitions.create(['background-color', 'box-shadow']),
    boxSizing: 'border-box',
    boxShadow: containerElevation[ownerState.variant],
    ...(ownerState.size === 'small' && {
      '--md-comp-chip-label-padding-y': '10px',
      '--md-comp-chip-icon-size': '16px',
      height: 24,
    }),
    ...(ownerState.variant === 'outlined' && {
      border: `1px solid ${tokens.sys.color[ownerState.color ?? 'outline']}`,
      '--md-comp-chip-label-padding-left': 'calc(var(--md-comp-chip-label-padding-y) - 1px)',
      '--md-comp-chip-label-padding-right': 'calc(var(--md-comp-chip-label-padding-y) - 1px)',
    }),
    ...((ownerState.hasIcon || ownerState.hasAvatar) && {
      '--md-comp-chip-label-padding-left': ownerState.size === 'small' ? '6px' : '8px',
    }),
    ...(ownerState.hasDeleteIcon && {
      '--md-comp-chip-label-padding-right': '5px',
      cursor: 'auto',
    }),
    [`&.${chipClasses.disabled}`]: {
      backgroundColor: disabledContainerColor[ownerState.variant],
      border: disabledContainerBorder[ownerState.variant],
      color: `rgba(${tokens.sys.color.onSurfaceChannel} / 0.38)`,
      boxShadow: disabledElevation[ownerState.variant],
      pointerEvents: 'none',
    },
    ...((ownerState.clickable || ownerState.hasDeleteIcon) && {
      [`&.${chipClasses.focusVisible}`]: {
        boxShadow: focusedContainerElevation[ownerState.variant],
        '--md-comp-chip-container-color': `color-mix(in srgb, ${
          stateLayerBackgroundColor[ownerState.variant]
        } calc(${tokens.sys.state.focus.stateLayerOpacity} * 100%), ${
          containerColor[ownerState.variant]
        })`,
      },
    }),
    ...(ownerState.clickable && {
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
      '&:hover': {
        boxShadow: hoveredContainerElevation[ownerState.variant],
        backgroundColor: `color-mix(in srgb, ${
          stateLayerBackgroundColor[ownerState.variant]
        } calc(${
          tokens.sys.state.hover.stateLayerOpacity
        } * 100%), var(--md-comp-chip-container-color))`,
      },
      '&:active': {
        boxShadow: pressedContainerElevation[ownerState.variant],
      },
    }),
    [`& .${chipClasses.avatar}`]: {
      width: 24,
      height: 24,
      marginLeft: 4,
      color:
        tokens.sys.color[
          `on${capitalize(ownerState.color ?? 'secondary')}` as keyof MD3ColorSchemeTokens
        ],
      backgroundColor: tokens.sys.color[ownerState.color ?? 'secondary'],
      fontSize: theme.typography.pxToRem(theme.sys.typescale.label.large.size), // the pxToRem should be moved to typescale in the future
      ...(ownerState.size === 'small' && {
        height: 18,
        width: 18,
        fontSize: theme.typography.pxToRem(theme.sys.typescale.label.small.size), // the pxToRem should be moved to typescale in the future
      }),
    },
    [`& .${chipClasses.icon}`]: {
      height: 'var(--md-comp-chip-icon-size)',
      width: 'var(--md-comp-chip-icon-size)',
      marginLeft: 8,
    },
    [`& .${chipClasses.deleteIcon}`]: {
      boxSizing: 'content-box',
      zIndex: 1,
      height: 'var(--md-comp-chip-icon-size)',
      width: 'var(--md-comp-chip-icon-size)',
      padding: 3,
      marginRight: 5,
      ...(ownerState.size === 'small' && {
        padding: 1,
      }),
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
      borderRadius: tokens.sys.shape.corner.full,
      '&:hover': {
        backgroundColor: `color-mix(in srgb, ${
          stateLayerBackgroundColor[ownerState.variant]
        } calc(${
          tokens.sys.state.hover.stateLayerOpacity
        } * 100%), var(--md-comp-chip-container-color))`,
      },
    },
  };
});

const ChipLabel = styled('span', {
  name: 'MuiChip',
  slot: 'Label',
})<{ ownerState: ChipOwnerState }>({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  paddingLeft: 'var(--md-comp-chip-label-padding-left)',
  paddingRight: 'var(--md-comp-chip-label-padding-right)',
});

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
    color,
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
  const isButton = clickable || !!onDelete;

  const component = isButton ? ButtonBase : ComponentProp || 'div';

  const hasIcon = !!iconProp && React.isValidElement(iconProp);
  const hasDeleteIcon = !!onDelete;
  const hasAvatar = !!avatarProp && React.isValidElement(avatarProp);

  const ownerState: ChipOwnerState = {
    ...props,
    component,
    disabled,
    size,
    color,
    clickable,
    variant,
    hasIcon,
    hasDeleteIcon,
    hasAvatar,
  };

  const classes = useUtilityClasses(ownerState);

  const buttonProps = {
    disabled: clickable && disabled,
    component: ComponentProp,
    focusVisibleClassName: chipClasses.focusVisible,
    ...(onDelete && { disableRipple: true }),
  };

  let deleteIcon = null;
  if (onDelete) {
    deleteIcon =
      deleteIconProp && React.isValidElement(deleteIconProp) ? (
        React.cloneElement(deleteIconProp as React.ReactElement, {
          className: clsx((deleteIconProp.props as any)?.className, classes.deleteIcon),
          onClick: handleDeleteIconClick,
        })
      ) : (
        <ClearIcon className={clsx(classes.deleteIcon)} onClick={handleDeleteIconClick} />
      );
  }

  let avatar = null;
  if (hasAvatar) {
    avatar = React.cloneElement(avatarProp as React.ReactElement, {
      className: clsx(classes.avatar, (avatarProp.props as any)?.className),
    });
  }

  let icon = null;
  if (hasIcon) {
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

  const rootProps = useSlotProps({
    elementType: ChipRoot,
    getSlotProps: (otherHandlers: EventHandlers) => ({
      ...otherHandlers,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
    }),
    externalForwardedProps: {
      onClick,
      ...other,
    },
    externalSlotProps: {},
    additionalProps: {
      as: component,
      ref: handleRef,
      ...(isButton && buttonProps),
    },
    ownerState,
    className: [classes.root, className],
  });

  return (
    <ChipRoot {...rootProps}>
      {avatar || icon}
      <ChipLabel className={clsx(classes.label)} ownerState={ownerState}>
        {label}
      </ChipLabel>
      {deleteIcon}
    </ChipRoot>
  );
}) as OverridableComponent<ChipTypeMap>;

Chip.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
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
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'error', 'info', 'success', 'warning']),
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
    PropTypes.oneOf(['filled', 'outlined', 'elevated']),
    PropTypes.string,
  ]),
} as any;

export default Chip;
