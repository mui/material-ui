// @flow

import React from 'react';
import type { Element, Node } from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import withStyles from '../styles/withStyles';
import CancelIcon from '../svg-icons/Cancel';
import { emphasize, fade } from '../styles/colorManipulator';
import Avatar from '../Avatar/Avatar';

export const styles = (theme: Object) => {
  const height = 32;
  const backgroundColor = emphasize(theme.palette.background.default, 0.12);
  const deleteIconColor = fade(theme.palette.text.primary, 0.26);

  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(13),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height,
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor,
      borderRadius: height / 2,
      whiteSpace: 'nowrap',
      width: 'fit-content',
      transition: theme.transitions.create(),
      // label will inherit this from root, then `clickable` class overrides this for both
      cursor: 'default',
      outline: 'none', // No outline on focused element in Chrome (as triggered by tabIndex prop)
      border: 'none', // Remove `button` border
      padding: 0, // Remove `button` padding
    },
    clickable: {
      // Remove grey highlight
      WebkitTapHighlightColor: theme.palette.common.transparent,
      cursor: 'pointer',
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    },
    deletable: {
      '&:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08),
      },
    },
    avatar: {
      marginRight: -4,
      width: 32,
      height: 32,
      fontSize: theme.typography.pxToRem(16),
    },
    avatarChildren: {
      width: 19,
      height: 19,
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 12,
      userSelect: 'none',
      whiteSpace: 'nowrap',
      cursor: 'inherit',
    },
    deleteIcon: {
      // Remove grey highlight
      WebkitTapHighlightColor: theme.palette.common.transparent,
      color: deleteIconColor,
      cursor: 'pointer',
      height: 'auto',
      margin: '0 4px 0 -8px',
      '&:hover': {
        color: fade(deleteIconColor, 0.4),
      },
    },
  };
};

type ProvidedProps = {
  classes: Object,
  /**
   * @ignore
   */
  theme?: Object,
};

export type Props = {
  /**
   * Other base element props.
   */
  [otherProp: string]: any,
  /**
   * Avatar element.
   */
  avatar?: Element<typeof Avatar>,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * Custom delete icon. Will be shown only if `onDelete` is set.
   */
  deleteIcon?: Element<any>,
  /**
   * The content of the label.
   */
  label?: Node,
  /**
   * @ignore
   */
  onClick?: Function,
  /**
   * Callback function fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete?: (event: SyntheticEvent<>) => void,
  /**
   * @ignore
   */
  onKeyDown?: Function,
  /**
   * @ignore
   */
  tabIndex?: number | string,
};

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
class Chip extends React.Component<ProvidedProps & Props> {
  static defaultProps = {};

  chipRef: ?HTMLElement = null;

  handleDeleteIconClick = event => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    const { onDelete } = this.props;
    if (onDelete) {
      onDelete(event);
    }
  };

  handleKeyDown = event => {
    const { onClick, onDelete, onKeyDown } = this.props;
    const key = keycode(event);

    if (onClick && (key === 'space' || key === 'enter')) {
      event.preventDefault();
      onClick(event);
    } else if (onDelete && key === 'backspace') {
      event.preventDefault();
      onDelete(event);
    } else if (key === 'esc') {
      event.preventDefault();
      if (this.chipRef) {
        this.chipRef.blur();
      }
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  render() {
    const {
      avatar: avatarProp,
      classes,
      className: classNameProp,
      label,
      onClick,
      onKeyDown,
      onDelete,
      deleteIcon: deleteIconProp,
      tabIndex: tabIndexProp,
      ...other
    } = this.props;

    const className = classNames(
      classes.root,
      { [classes.clickable]: onClick },
      { [classes.deletable]: onDelete },
      classNameProp,
    );

    let deleteIcon = null;
    if (onDelete && deleteIconProp && React.isValidElement(deleteIconProp)) {
      deleteIcon = React.cloneElement(deleteIconProp, {
        onClick: this.handleDeleteIconClick,
        className: classNames(classes.deleteIcon, deleteIconProp.props.className),
      });
    } else if (onDelete) {
      deleteIcon = (
        <CancelIcon className={classes.deleteIcon} onClick={this.handleDeleteIconClick} />
      );
    }

    let avatar = null;
    if (avatarProp && React.isValidElement(avatarProp)) {
      avatar = React.cloneElement(avatarProp, {
        className: classNames(classes.avatar, avatarProp.props.className),
        childrenClassName: classNames(classes.avatarChildren, avatarProp.props.childrenClassName),
      });
    }

    let tabIndex = tabIndexProp;

    if (!tabIndex) {
      tabIndex = onClick || onDelete ? 0 : -1;
    }

    return (
      <div
        role="button"
        className={className}
        tabIndex={tabIndex}
        onClick={onClick}
        onKeyDown={this.handleKeyDown}
        {...other}
        ref={node => {
          this.chipRef = node;
        }}
      >
        {avatar}
        <span className={classes.label}>{label}</span>
        {deleteIcon}
      </div>
    );
  }
}

export default withStyles(styles, { name: 'MuiChip' })(Chip);
