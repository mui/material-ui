import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CancelIcon from '../internal/svg-icons/Cancel';
import withStyles from '../styles/withStyles';
import { emphasize, fade } from '../styles/colorManipulator';
import useForkRef from '../utils/useForkRef';
import unsupportedProp from '../utils/unsupportedProp';
import capitalize from '../utils/capitalize';
import ButtonBase from '../ButtonBase';

export const styles = (theme) => {
  const backgroundColor =
    theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700];
  const deleteIconColor = fade(theme.palette.text.primary, 0.26);

  return {
    /* Styles applied to the root element. */
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(13),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor,
      borderRadius: 32 / 2,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create(['background-color', 'box-shadow']),
      // label will inherit this from root, then `clickable` class overrides this for both
      cursor: 'default',
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      textDecoration: 'none',
      border: 'none', // Remove `button` border
      padding: 0, // Remove `button` padding
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      '&$disabled': {
        opacity: 0.5,
        pointerEvents: 'none',
      },
      '& $avatar': {
        marginLeft: 5,
        marginRight: -6,
        width: 24,
        height: 24,
        color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
        fontSize: theme.typography.pxToRem(12),
      },
      '& $avatarColorPrimary': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark,
      },
      '& $avatarColorSecondary': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.dark,
      },
      '& $avatarSmall': {
        marginLeft: 4,
        marginRight: -4,
        width: 18,
        height: 18,
        fontSize: theme.typography.pxToRem(10),
      },
    },
    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      height: 24,
    },
    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if `onClick` is defined or `clickable={true}`. */
    clickable: {
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
      },
    },
    /* Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`. */
    clickableColorPrimary: {
      '&:hover, &:focus': {
        backgroundColor: emphasize(theme.palette.primary.main, 0.08),
      },
    },
    /* Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`. */
    clickableColorSecondary: {
      '&:hover, &:focus': {
        backgroundColor: emphasize(theme.palette.secondary.main, 0.08),
      },
    },
    /* Styles applied to the root element if `onDelete` is defined. */
    deletable: {
      '&:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08),
      },
    },
    /* Styles applied to the root element if `onDelete` and `color="primary"` is defined. */
    deletableColorPrimary: {
      '&:focus': {
        backgroundColor: emphasize(theme.palette.primary.main, 0.2),
      },
    },
    /* Styles applied to the root element if `onDelete` and `color="secondary"` is defined. */
    deletableColorSecondary: {
      '&:focus': {
        backgroundColor: emphasize(theme.palette.secondary.main, 0.2),
      },
    },
    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {
      backgroundColor: 'transparent',
      border: `1px solid ${
        theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
      }`,
      '$clickable&:hover, $clickable&:focus, $deletable&:focus': {
        backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      },
      '& $avatar': {
        marginLeft: 4,
      },
      '& $avatarSmall': {
        marginLeft: 2,
      },
      '& $icon': {
        marginLeft: 4,
      },
      '& $iconSmall': {
        marginLeft: 2,
      },
      '& $deleteIcon': {
        marginRight: 5,
      },
      '& $deleteIconSmall': {
        marginRight: 3,
      },
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
    outlinedPrimary: {
      color: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
      '$clickable&:hover, $clickable&:focus, $deletable&:focus': {
        backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      },
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
    outlinedSecondary: {
      color: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.secondary.main}`,
      '$clickable&:hover, $clickable&:focus, $deletable&:focus': {
        backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
      },
    },
    // TODO v5: remove
    /* Styles applied to the `avatar` element. */
    avatar: {},
    /* Styles applied to the `avatar` element if `size="small"`. */
    avatarSmall: {},
    /* Styles applied to the `avatar` element if `color="primary"`. */
    avatarColorPrimary: {},
    /* Styles applied to the `avatar` element if `color="secondary"`. */
    avatarColorSecondary: {},
    /* Styles applied to the `icon` element. */
    icon: {
      color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
      marginLeft: 5,
      marginRight: -6,
    },
    /* Styles applied to the `icon` element if `size="small"`. */
    iconSmall: {
      width: 18,
      height: 18,
      marginLeft: 4,
      marginRight: -4,
    },
    /* Styles applied to the `icon` element if `color="primary"`. */
    iconColorPrimary: {
      color: 'inherit',
    },
    /* Styles applied to the `icon` element if `color="secondary"`. */
    iconColorSecondary: {
      color: 'inherit',
    },
    /* Styles applied to the label `span` element. */
    label: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingLeft: 12,
      paddingRight: 12,
      whiteSpace: 'nowrap',
    },
    /* Styles applied to the label `span` element if `size="small"`. */
    labelSmall: {
      paddingLeft: 8,
      paddingRight: 8,
    },
    /* Styles applied to the `deleteIcon` element. */
    deleteIcon: {
      WebkitTapHighlightColor: 'transparent',
      color: deleteIconColor,
      height: 22,
      width: 22,
      cursor: 'pointer',
      margin: '0 5px 0 -6px',
      '&:hover': {
        color: fade(deleteIconColor, 0.4),
      },
    },
    /* Styles applied to the `deleteIcon` element if `size="small"`. */
    deleteIconSmall: {
      height: 16,
      width: 16,
      marginRight: 4,
      marginLeft: -4,
    },
    /* Styles applied to the deleteIcon element if `color="primary"` and `variant="default"`. */
    deleteIconColorPrimary: {
      color: fade(theme.palette.primary.contrastText, 0.7),
      '&:hover, &:active': {
        color: theme.palette.primary.contrastText,
      },
    },
    /* Styles applied to the deleteIcon element if `color="secondary"` and `variant="default"`. */
    deleteIconColorSecondary: {
      color: fade(theme.palette.secondary.contrastText, 0.7),
      '&:hover, &:active': {
        color: theme.palette.secondary.contrastText,
      },
    },
    /* Styles applied to the deleteIcon element if `color="primary"` and `variant="outlined"`. */
    deleteIconOutlinedColorPrimary: {
      color: fade(theme.palette.primary.main, 0.7),
      '&:hover, &:active': {
        color: theme.palette.primary.main,
      },
    },
    /* Styles applied to the deleteIcon element if `color="secondary"` and `variant="outlined"`. */
    deleteIconOutlinedColorSecondary: {
      color: fade(theme.palette.secondary.main, 0.7),
      '&:hover, &:active': {
        color: theme.palette.secondary.main,
      },
    },
  };
};

function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete';
}

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
const Chip = React.forwardRef(function Chip(props, ref) {
  const {
    avatar: avatarProp,
    classes,
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
    variant = 'default',
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
      // will be handled in keyUp, otherwise some browsers
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
      } else if (event.key === 'Escape' && chipRef.current) {
        chipRef.current.blur();
      }
    }

    if (onKeyUp) {
      onKeyUp(event);
    }
  };

  const clickable = clickableProp !== false && onClick ? true : clickableProp;
  const small = size === 'small';

  const Component = ComponentProp || (clickable ? ButtonBase : 'div');
  const moreProps = Component === ButtonBase ? { component: 'div' } : {};

  let deleteIcon = null;
  if (onDelete) {
    const customClasses = clsx({
      [classes.deleteIconSmall]: small,
      [classes[`deleteIconColor${capitalize(color)}`]]:
        color !== 'default' && variant !== 'outlined',
      [classes[`deleteIconOutlinedColor${capitalize(color)}`]]:
        color !== 'default' && variant === 'outlined',
    });

    deleteIcon =
      deleteIconProp && React.isValidElement(deleteIconProp) ? (
        React.cloneElement(deleteIconProp, {
          className: clsx(deleteIconProp.props.className, classes.deleteIcon, customClasses),
          onClick: handleDeleteIconClick,
        })
      ) : (
        <CancelIcon
          className={clsx(classes.deleteIcon, customClasses)}
          onClick={handleDeleteIconClick}
        />
      );
  }

  let avatar = null;
  if (avatarProp && React.isValidElement(avatarProp)) {
    avatar = React.cloneElement(avatarProp, {
      className: clsx(classes.avatar, avatarProp.props.className, {
        [classes.avatarSmall]: small,
        [classes[`avatarColor${capitalize(color)}`]]: color !== 'default',
      }),
    });
  }

  let icon = null;
  if (iconProp && React.isValidElement(iconProp)) {
    icon = React.cloneElement(iconProp, {
      className: clsx(classes.icon, iconProp.props.className, {
        [classes.iconSmall]: small,
        [classes[`iconColor${capitalize(color)}`]]: color !== 'default',
      }),
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    if (avatar && icon) {
      console.error(
        'Material-UI: The Chip component can not handle the avatar ' +
          'and the icon prop at the same time. Pick one.',
      );
    }
  }

  return (
    <Component
      role={clickable || onDelete ? 'button' : undefined}
      className={clsx(
        classes.root,
        {
          [classes.disabled]: disabled,
          [classes.sizeSmall]: small,
          [classes[`color${capitalize(color)}`]]: color !== 'default',
          [classes.clickable]: clickable,
          [classes[`clickableColor${capitalize(color)}`]]: clickable && color !== 'default',
          [classes.deletable]: onDelete,
          [classes[`deletableColor${capitalize(color)}`]]: onDelete && color !== 'default',
          [classes.outlined]: variant === 'outlined',
          [classes.outlinedPrimary]: variant === 'outlined' && color === 'primary',
          [classes.outlinedSecondary]: variant === 'outlined' && color === 'secondary',
        },
        className,
      )}
      aria-disabled={disabled ? true : undefined}
      tabIndex={clickable || onDelete ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      ref={handleRef}
      {...moreProps}
      {...other}
    >
      {avatar || icon}
      <span
        className={clsx(classes.label, {
          [classes.labelSmall]: small,
        })}
      >
        {label}
      </span>
      {deleteIcon}
    </Component>
  );
});

Chip.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Avatar element.
   */
  avatar: PropTypes.element,
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,
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
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If false, the chip will not be clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   */
  clickable: PropTypes.bool,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: PropTypes.element,
  /**
   * If `true`, the chip should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * Icon element.
   */
  icon: PropTypes.element,
  /**
   * The content of the label.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * Callback function fired when the delete icon is clicked.
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
   * The size of the chip.
   */
  size: PropTypes.oneOf(['medium', 'small']),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['default', 'outlined']),
};

export default withStyles(styles, { name: 'MuiChip' })(Chip);
