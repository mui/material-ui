import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import keycode from 'keycode';
import CancelIcon from '../internal/svg-icons/Cancel';
import withStyles from '../styles/withStyles';
import { emphasize, fade, darken } from '../styles/colorManipulator';
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
    /**
     * Styles applied to the root element if
     * `onClick` and `color="primary"` is defined or `clickable={true}`.
     */
    clickableColorPrimary: {
      '&:hover, &:focus': {
        backgroundColor: emphasize(theme.palette.primary.main, 0.08),
      },
      '&:active': {
        backgroundColor: emphasize(theme.palette.primary.main, 0.12),
      },
    },
    /**
     * Styles applied to the root element if
     * `onClick` and `color="secondary"` is defined or `clickable={true}`.
     */
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
    /* Styles applied to the `avatar` element. */
    avatar: {
      marginRight: -4,
      width: height,
      height,
      color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
      fontSize: theme.typography.pxToRem(16),
    },
    /* Styles applied to the `avatar` element if `checked={true}` and `color="primary"` */
    avatarColorPrimary: {
      color: darken(theme.palette.primary.contrastText, 0.1),
      backgroundColor: theme.palette.primary.dark,
    },
    /* Styles applied to the `avatar` element if `checked={true}` and `color="secondary"` */
    avatarColorSecondary: {
      color: darken(theme.palette.secondary.contrastText, 0.1),
      backgroundColor: theme.palette.secondary.dark,
    },
    /* Styles applied to the `avatar` elements children. */
    avatarChildren: {
      width: 19,
      height: 19,
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
    /* Styles applied to the deleteIcon element if `color="primary"`. */
    deleteIconColorPrimary: {
      color: fade(theme.palette.primary.contrastText, 0.65),
      '&:hover, &:active': {
        color: theme.palette.primary.contrastText,
      },
    },
    /* Styles applied to the deleteIcon element if `color="secondary"`. */
    deleteIconColorSecondary: {
      color: fade(theme.palette.primary.contrastText, 0.65),
      '&:hover, &:active': {
        color: theme.palette.primary.contrastText,
      },
    },
  };
};

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
class Chip extends React.Component {
  chipRef = null;

  handleDeleteIconClick = event => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    const { onDelete } = this.props;
    if (onDelete) {
      onDelete(event);
    }
  };

  handleKeyDown = event => {
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(event);
    }

    // Ignore events from children of `Chip`.
    if (event.currentTarget !== event.target) {
      return;
    }

    const key = keycode(event);
    if (key === 'space' || key === 'enter' || key === 'backspace' || key === 'esc') {
      event.preventDefault();
    }
  };

  handleKeyUp = event => {
    const { onClick, onDelete, onKeyUp } = this.props;

    if (onKeyUp) {
      onKeyUp(event);
    }

    // Ignore events from children of `Chip`.
    if (event.currentTarget !== event.target) {
      return;
    }

    const key = keycode(event);

    if (onClick && (key === 'space' || key === 'enter')) {
      onClick(event);
    } else if (onDelete && key === 'backspace') {
      onDelete(event);
    } else if (key === 'esc' && this.chipRef) {
      this.chipRef.blur();
    }
  };

  render() {
    const {
      avatar: avatarProp,
      classes,
      className: classNameProp,
      clickable,
      color,
      component: Component,
      deleteIcon: deleteIconProp,
      label,
      onClick,
      onDelete,
      onKeyDown,
      onKeyUp,
      tabIndex: tabIndexProp,
      ...other
    } = this.props;

    const className = classNames(
      classes.root,
      { [classes[`color${capitalize(color)}`]]: color !== 'default' },
      { [classes.clickable]: onClick || clickable },
      {
        [classes[`clickableColor${capitalize(color)}`]]:
          (onClick || clickable) && color !== 'default',
      },
      { [classes.deletable]: onDelete },
      { [classes[`deletableColor${capitalize(color)}`]]: onDelete && color !== 'default' },
      classNameProp,
    );

    let deleteIcon = null;
    if (onDelete) {
      deleteIcon =
        deleteIconProp && React.isValidElement(deleteIconProp) ? (
          React.cloneElement(deleteIconProp, {
            className: classNames(deleteIconProp.props.className, classes.deleteIcon, {
              [classes[`deleteIconColor${capitalize(color)}`]]: color !== 'default',
            }),
            onClick: this.handleDeleteIconClick,
          })
        ) : (
          <CancelIcon
            className={classNames(classes.deleteIcon, {
              [classes[`deleteIconColor${capitalize(color)}`]]: color !== 'default',
            })}
            onClick={this.handleDeleteIconClick}
          />
        );
    }

    let avatar = null;
    if (avatarProp && React.isValidElement(avatarProp)) {
      avatar = React.cloneElement(avatarProp, {
        className: classNames(classes.avatar, avatarProp.props.className, {
          [classes[`avatarColor${capitalize(color)}`]]: color !== 'default',
        }),
        childrenClassName: classNames(classes.avatarChildren, avatarProp.props.childrenClassName),
      });
    }

    let tabIndex = tabIndexProp;

    if (!tabIndex) {
      tabIndex = onClick || onDelete || clickable ? 0 : -1;
    }

    return (
      <Component
        role="button"
        className={className}
        tabIndex={tabIndex}
        onClick={onClick}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        ref={ref => {
          this.chipRef = ref;
        }}
        {...other}
      >
        {avatar}
        <span className={classes.label}>{label}</span>
        {deleteIcon}
      </Component>
    );
  }
}

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
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If true, the chip will appear clickable, and will raise when pressed,
   * even if the onClick property is not defined. This can be used, for example,
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
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: PropTypes.element,
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
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Chip.defaultProps = {
  clickable: false,
  component: 'div',
  color: 'default',
};

export default withStyles(styles, { name: 'MuiChip' })(Chip);
