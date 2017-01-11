// @flow weak

import React, { cloneElement, isValidElement, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import keycode from 'keycode';
import DeleteIcon from '../svg-icons/cancel';
import { emphasize, fade } from '../styles/colorManipulator';

export const styleSheet = createStyleSheet('Chip', (theme) => {
  const { palette, shadows, transitions } = theme;
  const height = 32;
  const backgroundColor = emphasize(palette.background.default, 0.12);
  const deleteIconColor = fade(palette.text.primary, 0.26);
  return {
    root: {
      fontFamily: 'inherit', // Override `button` default system font
      fontSize: 13,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height,
      color: palette.getContrastText(backgroundColor),
      backgroundColor,
      borderRadius: height / 2,
      whiteSpace: 'nowrap',
      width: 'fit-content',
      transition: transitions.create(),
      cursor: 'default', // label will inherit this from root, then `clickable` class overrides this for both
      outline: 'none', // No outline on focused element in Chrome (as triggered by tabIndex prop)
      border: 'none', // Remove `button` border
      padding: 0, // Remove `button` padding
    },
    clickable: {
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08),
      },
      '&:active': {
        boxShadow: shadows[1],
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
      margin: '0 4px 0 -8px',
    },
  };
});

/**
 * Chips represent complex entities in small blocks, such as a contact.
 *
 * ```jsx
 * <Chip avatar={<Avatar>} label="Label text" />
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
    onKeyDown(event);
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
    const avatarClassName = classNames(classes.avatar, avatarProp.props.className);
    const avatarChildrenClassName = classNames(classes.avatarChildren, avatarProp.props.childrenClassName);

    avatar = cloneElement(avatarProp, {
      className: avatarClassName,
      childrenClassName: avatarChildrenClassName,
    });
  }

  const tabIndex = (onClick || onRequestDelete) ? tabIndexProp : undefined;

  return (
    <button
      className={className}
      onClick={onClick}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
      ref={(c) => { chipRef = c; }}
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
   * CSS `className` of the root element.
   */
  className: PropTypes.string,
  /**
   * CSS `className` of the delete icon element.
   */
  deleteIconClassName: PropTypes.string,
  /**
   * The label text.
   */
  label: PropTypes.string,
  /**
   * CSS `className` of the label.
   */
  labelClassName: PropTypes.string,
  /**
   * @ignore
   * Callback function fired when the `Chip` element is clicked.
   * If set, the chip will by styled for hover focus and active states.
   * @param {object} event `onClick` event targeting the root element.
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
  styleManager: PropTypes.object.isRequired,
};

Chip.defaultProps = {
  onKeyDown: () => {},
  tabIndex: 0,
};
