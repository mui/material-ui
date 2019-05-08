import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import warning from 'warning';
import CancelIcon from '../internal/svg-icons/Cancel';
import withStyles from '../styles/withStyles';
import { emphasize, fade } from '../styles/colorManipulator';
import { useForkRef } from '../utils/reactHelpers';
import unsupportedProp from '../utils/unsupportedProp';
import { capitalize } from '../utils/helpers';
import '../Avatar/Avatar'; // So we don't have any override priority issue.

export const styles = theme => {
  const height = 32;
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
      height,
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor,
      borderRadius: height / 2,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create(['background-color', 'box-shadow']),
      // label will inherit this from root, then `clickable` class overrides this for both
      cursor: 'default',
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 'none',
      textDecoration: 'none',
      border: 'none', // Remove `button` border
      padding: 0, // Remove `button` padding
      verticalAlign: 'middle',
      boxSizing: 'border-box',
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
    /* Styles applied to the root element if `onClick` is defined or `clickable={true}`. */
    clickable: {
      WebkitTapHighlightColor: 'transparent', // Remove grey highlight
      cursor: 'pointer',
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    },
    /* Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`. */
    clickableColorPrimary: {
      '&:hover, &:focus': {
        backgroundColor: emphasize(theme.palette.primary.main, 0.08),
      },
      '&:active': {
        backgroundColor: emphasize(theme.palette.primary.main, 0.12),
      },
    },
    /* Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`. */
    clickableColorSecondary: {
      '&:hover, &:focus': {
        backgroundColor: emphasize(theme.palette.secondary.main, 0.08),
      },
      '&:active': {
        backgroundColor: emphasize(theme.palette.secondary.main, 0.12),
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
        marginLeft: -1,
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
    /* Styles applied to the `avatar` element. */
    avatar: {
      marginRight: -4,
      width: height,
      height,
      color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
      fontSize: theme.typography.pxToRem(16),
    },
    /* Styles applied to the `avatar` element if `color="primary"`. */
    avatarColorPrimary: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.dark,
    },
    /* Styles applied to the `avatar` element if `color="secondary"`. */
    avatarColorSecondary: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.dark,
    },
    /* Styles applied to the `avatar` elements children. */
    avatarChildren: {
      width: 19,
      height: 19,
    },
    /* Styles applied to the `icon` element. */
    icon: {
      color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
      marginLeft: 4,
      marginRight: -8,
    },
    /* Styles applied to the `icon` element if `color="primary"`. */
    iconColorPrimary: {
      color: 'inherit',
    },
    /* Styles applied to the `icon` element if `color="secondary"`. */
    iconColorSecondary: {
      color: 'inherit',
    },
    /* Styles applied to the label `span` element`. */
    label: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 12,
      userSelect: 'none',
      whiteSpace: 'nowrap',
      cursor: 'inherit',
    },
    /* Styles applied to the `deleteIcon` element. */
    deleteIcon: {
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      color: deleteIconColor,
      cursor: 'pointer',
      height: 'auto',
      margin: '0 4px 0 -8px',
      '&:hover': {
        color: fade(deleteIconColor, 0.4),
      },
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

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
const Chip = React.forwardRef(function Chip(props, ref) {
  const {
    avatar: avatarProp,
    classes,
    className: classNameProp,
    clickable: clickableProp,
    color = 'default',
    component: Component = 'div',
    deleteIcon: deleteIconProp,
    icon: iconProp,
    label,
    onClick,
    onDelete,
    onKeyDown,
    onKeyUp,
    variant = 'default',
    ...other
  } = props;

  const chipRef = React.useRef(null);

  const handleDeleteIconClick = event => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };

  const handleKeyDown = event => {
    if (onKeyDown) {
      onKeyDown(event);
    }

    // Ignore events from children of `Chip`.
    if (event.currentTarget !== event.target) {
      return;
    }

    const key = event.key;
    if (
      key === ' ' ||
      key === 'Enter' ||
      key === 'Backspace' ||
      key === 'Delete' ||
      key === 'Escape'
    ) {
      event.preventDefault();
    }
  };

  const handleKeyUp = event => {
    if (onKeyUp) {
      onKeyUp(event);
    }

    // Ignore events from children of `Chip`.
    if (event.currentTarget !== event.target) {
      return;
    }

    const key = event.key;
    if (onClick && (key === ' ' || key === 'Enter')) {
      onClick(event);
    } else if (onDelete && (key === 'Backspace' || key === 'Delete')) {
      onDelete(event);
    } else if (key === 'Escape' && chipRef.current) {
      chipRef.current.blur();
    }
  };

  const clickable = clickableProp !== false && onClick ? true : clickableProp;

  const className = clsx(
    classes.root,
    {
      [classes[`color${capitalize(color)}`]]: color !== 'default',
      [classes.clickable]: clickable,
      [classes[`clickableColor${capitalize(color)}`]]: clickable && color !== 'default',
      [classes.deletable]: onDelete,
      [classes[`deletableColor${capitalize(color)}`]]: onDelete && color !== 'default',
      [classes.outlined]: variant === 'outlined',
      [classes.outlinedPrimary]: variant === 'outlined' && color === 'primary',
      [classes.outlinedSecondary]: variant === 'outlined' && color === 'secondary',
    },
    classNameProp,
  );

  let deleteIcon = null;
  if (onDelete) {
    const customClasses = clsx({
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
        [classes[`avatarColor${capitalize(color)}`]]: color !== 'default',
      }),
      childrenClassName: clsx(classes.avatarChildren, avatarProp.props.childrenClassName),
    });
  }

  let icon = null;
  if (iconProp && React.isValidElement(iconProp)) {
    icon = React.cloneElement(iconProp, {
      className: clsx(classes.icon, iconProp.props.className, {
        [classes[`iconColor${capitalize(color)}`]]: color !== 'default',
      }),
    });
  }

  warning(
    !avatar || !icon,
    'Material-UI: the Chip component can not handle the avatar ' +
      'and the icon property at the same time. Pick one.',
  );

  const handleRef = useForkRef(chipRef, ref);

  return (
    <Component
      role={clickable || onDelete ? 'button' : undefined}
      className={className}
      tabIndex={clickable || onDelete ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      ref={handleRef}
      {...other}
    >
      {avatar || icon}
      <span className={classes.label}>{label}</span>
      {deleteIcon}
    </Component>
  );
});

Chip.propTypes = {
  /**
   * Avatar element.
   */
  avatar: PropTypes.element,
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
   * If true, the chip will appear clickable, and will raise when pressed,
   * even if the onClick property is not defined.
   * If false, the chip will not be clickable, even if onClick property is defined.
   * This can be used, for example,
   * along with the component property to indicate an anchor Chip is clickable.
   */
  clickable: PropTypes.bool,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: PropTypes.element,
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
   * The variant to use.
   */
  variant: PropTypes.oneOf(['default', 'outlined']),
};

export default withStyles(styles, { name: 'MuiChip' })(Chip);
