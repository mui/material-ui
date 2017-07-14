// @flow

import React, { Component } from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import Popover from '../internal/Popover';
import MenuList from './MenuList';
import type { TransitionCallback } from '../internal/Transition';

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
  onEnter?: TransitionCallback,
  /**
   * Callback fired when the Menu is entering.
   */
  onEntering?: TransitionCallback,
  /**
   * Callback fired when the Menu has entered.
   */
  onEntered?: TransitionCallback, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the Menu exits.
   */
  onExit?: TransitionCallback,
  /**
   * Callback fired when the Menu is exiting.
   */
  onExiting?: TransitionCallback,
  /**
   * Callback fired when the Menu has exited.
   */
  onExited?: TransitionCallback, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
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
    /**
     * specZ: The maximum height of a simple menu should be one or more rows less than the view
     * height. This ensures a tappable area outside of the simple menu with which to dismiss
     * the menu.
     */
    maxHeight: 'calc(100vh - 96px)',
  },
});

class Menu extends Component<DefaultProps, Props, void> {
  static defaultProps: DefaultProps = {
    open: false,
    transitionDuration: 'auto',
  };

  menuList = undefined;

  handleEnter = (element: HTMLElement) => {
    const menuList = findDOMNode(this.menuList);

    if (this.menuList && this.menuList.selectedItem) {
      // $FlowFixMe
      findDOMNode(this.menuList.selectedItem).focus();
    } else if (menuList) {
      // $FlowFixMe
      menuList.firstChild.focus();
    }

    // Let's ignore that piece of logic if users are already overriding the width
    // of the menu.
    // $FlowFixMe
    if (menuList && element.clientHeight < menuList.clientHeight && !menuList.style.width) {
      const size = `${getScrollbarSize()}px`;
      // $FlowFixMe
      menuList.style.paddingRight = size;
      // $FlowFixMe
      menuList.style.width = `calc(100% + ${size})`;
    }

    if (this.props.onEnter) {
      this.props.onEnter(element);
    }
  };

  handleListKeyDown = (event: SyntheticUIEvent, key: string) => {
    if (key === 'tab') {
      event.preventDefault();
      const { onRequestClose } = this.props;
      if (onRequestClose) {
        return onRequestClose(event);
      }
    }

    return false;
  };

  getContentAnchorEl = () => {
    if (!this.menuList || !this.menuList.selectedItem) {
      // $FlowFixMe
      return findDOMNode(this.menuList).firstChild;
    }

    return findDOMNode(this.menuList.selectedItem);
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
        getContentAnchorEl={this.getContentAnchorEl}
        className={classNames(classes.root, className)}
        open={open}
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
