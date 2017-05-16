// @flow weak

import React, { cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import keycode from 'keycode';
import customPropTypes from '../utils/customPropTypes';
import DeleteIcon from '../svg-icons/cancel';
import { emphasize, fade } from '../styles/colorManipulator';

export const styleSheet = createStyleSheet('MuiChip', (theme) => {
  const height = 32;
  const backgroundColor = emphasize(theme.palette.background.default, 0.12);
  const deleteIconColor = fade(theme.palette.text.primary, 0.26);
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: 13,
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
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
      cursor: 'pointer',
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
      fontSize: 16,
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
      color: deleteIconColor,
      '&:hover': {
        color: fade(deleteIconColor, 0.4),
      },
      cursor: 'pointer',
      height: 'auto',
      margin: '0 4px 0 -8px',
    },
  };
});

/**
 * Chips represent complex entities in small blocks, such as a contact.
 *
 * ```jsx
 * <Chip avatar={<Avatar />} label="Label text" />
 * ```
 */
export default function Chip(props, context) {
  const {
    avatar: avatarProp,
    className: classNameProp,
    deleteIconClassName: deleteIconClassNameProp,
    label,
    labelClassName: labelClassNameProp,
    onClick,
    onKeyDown,
    onRequestDelete,
    tabIndex: tabIndexProp,
    ...other
  } = props;

  let chipRef;

  const handleDeleteIconClick = (event) => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    onRequestDelete(event);
  };

  const handleKeyDown = (event) => {
    const key = keycode(event);

    if (onClick && (key === 'space' || key === 'enter')) {
      event.preventDefault();
      onClick(event);
    } else if (onRequestDelete && key === 'backspace') {
      event.preventDefault();
      onRequestDelete(event);
    } else if (key === 'esc') {
      event.preventDefault();
      chipRef.blur();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const classes = context.styleManager.render(styleSheet);
  const className = classNames(
    classes.root,
    { [classes.clickable]: onClick },
    { [classes.deletable]: onRequestDelete },
    classNameProp,
  );
  const labelClassName = classNames(classes.label, labelClassNameProp);

  let deleteIcon = null;
  if (onRequestDelete) {
    const deleteIconClassName = classNames(classes.deleteIcon, deleteIconClassNameProp);
    deleteIcon = <DeleteIcon className={deleteIconClassName} onClick={handleDeleteIconClick} />;
  }

  let avatar = null;
  if (avatarProp && isValidElement(avatarProp)) {
    avatar = cloneElement(avatarProp, {
      className: classNames(classes.avatar, avatarProp.props.className),
      childrenClassName: classNames(classes.avatarChildren, avatarProp.props.childrenClassName),
    });
  }

  const tabIndex = (onClick || onRequestDelete) ? tabIndexProp : -1;

  return (
    <button
      className={className}
      onClick={onClick}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
      ref={(node) => { chipRef = node; }}
      {...other}
    >
      {avatar}
      <span className={labelClassName}>{label}</span>
      {deleteIcon}
    </button>
  );
}

Chip.propTypes = {
  /**
   * Avatar element.
   */
  avatar: PropTypes.node,
  /**
   * The CSS `className` of the root element.
   */
  className: PropTypes.string,
  /**
   * The CSS class name of the delete icon element.
   */
  deleteIconClassName: PropTypes.string,
  /**
   * The content of the label.
   */
  label: PropTypes.node,
  /**
   * The CSS `className` of the label.
   */
  labelClassName: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * Callback function fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   * @param {object} event `onClick` event targeting the delete icon element.
   */
  onRequestDelete: PropTypes.func,
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
};

Chip.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
