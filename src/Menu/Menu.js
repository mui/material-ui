// @flow

import React, { Component } from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { createStyleSheet } from 'jss-theme-reactor';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import Popover from '../internal/Popover';
import withStyles from '../styles/withStyles';
import MenuList from './MenuList';

type DefaultProps = {
  open: boolean,
  transitionDuration: 'auto',
};

type Props = DefaultProps & {
  /**
   * The DOM element used to set the position of the menu.
   */
  anchorEl?: Object,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Properties applied to the `MenuList` element.
   */
  MenuListProps?: Object,
  /**
   * Callback fired before the Menu enters.
   */
  onEnter?: Function,
  /**
   * Callback fired when the Menu is entering.
   */
  onEntering?: Function,
  /**
   * Callback fired when the Menu has entered.
   */
  onEntered?: Function, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the Menu exits.
   */
  onExit?: Function,
  /**
   * Callback fired when the Menu is exiting.
   */
  onExiting?: Function,
  /**
   * Callback fired when the Menu has exited.
   */
  onExited?: Function, // eslint-disable-line react/sort-prop-types
  /**
   * Callback function fired when the menu is requested to be closed.
   *
   * @param {event} event The event that triggered the close request
   */
  onRequestClose?: Function,
  /**
   * If `true`, the menu is visible.
   */
  open?: boolean,
  /**
   * The length of the transition in `ms`, or 'auto'
   */
  transitionDuration?: number | 'auto',
};

export const styleSheet = createStyleSheet('MuiMenu', {
  root: {
    maxHeight: 250,
  },
});

class Menu extends Component<DefaultProps, Props, void> {
  static defaultProps: DefaultProps = {
    open: false,
    transitionDuration: 'auto',
  };

  menuList = undefined;

  handleEnter = element => {
    const list = findDOMNode(this.menuList);

    if (this.menuList && this.menuList.selectedItem) {
      // $FlowFixMe
      findDOMNode(this.menuList.selectedItem).focus();
    } else if (list) {
      // $FlowFixMe
      list.firstChild.focus();
    }

    // $FlowFixMe
    if (list && element.clientHeight < list.clientHeight) {
      const size = `${getScrollbarSize()}px`;
      // $FlowFixMe
      list.style.paddingRight = size;
      // $FlowFixMe
      list.style.width = `calc(100% + ${size})`;
    }

    if (this.props.onEnter) {
      this.props.onEnter(element);
    }
  };

  handleListKeyDown = (event, key) => {
    if (key === 'tab') {
      event.preventDefault();
      const { onRequestClose } = this.props;
      if (onRequestClose) {
        return onRequestClose(event);
      }
    }

    return false;
  };

  getContentAnchorOffset = (element, anchor) => {
    const list = findDOMNode(this.menuList);
    let topOffset = 0;
    let selectedItem;

    if (list) {
      selectedItem =
        this.menuList && this.menuList.selectedItem
          ? findDOMNode(this.menuList.selectedItem)
          : list.firstChild;
    }

    if (list && selectedItem && anchor) {
      // $FlowFixMe
      const itemHeight = selectedItem.clientHeight;
      // $FlowFixMe
      const numItems = Math.floor(list.clientHeight / itemHeight);
      const numVisibleItems = Math.floor(element.clientHeight / itemHeight);
      const itemsOffLimits = Math.floor(numVisibleItems / 2);
      // $FlowFixMe
      const selectedIdx = Math.floor((selectedItem.offsetTop + itemHeight) / itemHeight) - 1;
      // $FlowFixMe
      const listPadding = (list.clientHeight - numItems * itemHeight) / 2;

      // Calculate scroll to vertically center the selected list item within the
      // popover and calculate the popover's top offset based on the position of
      // the selected item so that it aligns with the anchor element.
      if (selectedIdx < itemsOffLimits || numItems <= numVisibleItems) {
        // No scroll necessary
        topOffset = selectedIdx * itemHeight + itemHeight / 2 + listPadding;
      } else {
        if (selectedIdx >= numItems - itemsOffLimits) { // eslint-disable-line
          // Items at the end of the popover
          element.scrollTop = (numItems - numVisibleItems) * itemHeight + listPadding / 2;
          topOffset = selectedIdx + 1 - (numItems - itemsOffLimits);
          topOffset = element.clientHeight / 2 + topOffset * itemHeight;
        } else {
          // Selected item will be scrolled to the middle of the popover
          element.scrollTop = (selectedIdx - itemsOffLimits) * itemHeight + listPadding / 2;
          topOffset = element.clientHeight / 2;
        }
      }
      topOffset = anchor - topOffset;
    }
    return topOffset;
  };

  render() {
    const {
      anchorEl,
      children,
      classes,
      className,
      open,
      MenuListProps,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      onRequestClose,
      transitionDuration,
      ...other
    } = this.props;

    return (
      <Popover
        anchorEl={anchorEl}
        getContentAnchorOffset={this.getContentAnchorOffset}
        className={classNames(classes.root, className)}
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
        {...other}
      >
        <MenuList
          data-mui-test="Menu"
          role="menu"
          ref={node => {
            this.menuList = node;
          }}
          onKeyDown={this.handleListKeyDown}
          {...MenuListProps}
        >
          {children}
        </MenuList>
      </Popover>
    );
  }
}

export default withStyles(styleSheet)(Menu);
