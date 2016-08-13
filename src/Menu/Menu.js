// @flow weak

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { createStyleSheet } from 'stylishly';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import Popover from '../internal/Popover';
import MenuList from './MenuList';

export const styleSheet = createStyleSheet('Menu', () => {
  return {
    popover: {
      maxHeight: 250,
    },
  };
});

export default class Menu extends Component {
  static propTypes = {
    /**
     * This is the DOM element that will be
     * used to set the position of the menu.
     */
    anchorEl: PropTypes.object,
    /**
     * Menu contents, should be menu items
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the list element.
     */
    className: PropTypes.string,
    /**
     * Callback fired before the Menu is entering
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired when the Menu is entering
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired when the Menu has entered
     */
    onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired before the Menu is exiting
     */
    onExit: PropTypes.func,
    /**
     * Callback fired when the Menu is exiting
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired when the Menu has exited
     */
    onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback function fired when the menu is requested to be closed.
     *
     * @param {event} event The event that triggered the close request
     */
    onRequestClose: PropTypes.func,
    /**
     * If true, the menu is visible.
     */
    open: PropTypes.bool,
    /**
     * The length of the transition in `ms`, or 'auto'
     */
    transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    transitionDuration: 'auto',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  menuList = undefined;

  handleEnter = (element) => {
    const list = findDOMNode(this.menuList);

    if (this.menuList && this.menuList.selectedItem) {
      findDOMNode(this.menuList.selectedItem).focus(); // eslint-disable-line react/no-find-dom-node
    } else if (list) {
      list.firstChild.focus();
    }

    if (list && element.clientHeight < list.clientHeight) {
      const size = `${getScrollbarSize()}px`;
      list.style.paddingRight = size;
      list.style.width = `calc(100% + ${size})`;
    }

    if (this.props.onEnter) {
      this.props.onEnter(element);
    }
  };

  handleListKeyDown = (event, key) => {
    if (key === 'tab') {
      event.preventDefault();
      return this.props.onRequestClose();
    }

    return false;
  };

  getContentAnchorEl = () => {
    if (!this.menuList || !this.menuList.selectedItem) {
      return findDOMNode(this.menuList).firstChild;
    }

    return findDOMNode(this.menuList.selectedItem);
  };

  render() {
    const {
      anchorEl,
      children,
      className,
      open,
      onEnter, // eslint-disable-line no-unused-vars
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      onRequestClose,
      transitionDuration,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });

    return (
      <Popover
        anchorEl={anchorEl}
        getContentAnchorEl={this.getContentAnchorEl}
        className={classes.popover}
        open={open}
        enteredClassName={classes.entered}
        onEnter={this.handleEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExit={onExit}
        onExited={onExited}
        onRequestClose={onRequestClose}
        transitionDuration={transitionDuration}
      >
        <MenuList
          data-mui-test="Menu"
          role="menu"
          ref={(c) => this.menuList = c}
          className={className}
          onKeyDown={this.handleListKeyDown}
          {...other}
        >
          {children}
        </MenuList>
      </Popover>
    );
  }
}

