// @flow

import * as React from 'react';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import withStyles from '../styles/withStyles';
import Popover from '../internal/Popover';
import MenuList from './MenuList';
import type { TransitionCallback } from '../internal/Transition';

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * The DOM element used to set the position of the menu.
   */
  anchorEl?: Object,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children?: React.Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
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

type AllProps = DefaultProps & Props;

export const styles = {
  root: {
    /**
     * specZ: The maximum height of a simple menu should be one or more rows less than the view
     * height. This ensures a tappable area outside of the simple menu with which to dismiss
     * the menu.
     */
    maxHeight: 'calc(100vh - 96px)',
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    // So we see the menu when it's empty.
    minWidth: 16,
    minHeight: 16,
  },
};

class Menu extends React.Component<AllProps, void> {
  props: AllProps;
  static defaultProps = {
    classes: {},
    open: false,
    transitionDuration: 'auto',
  };

  menuList = undefined;

  handleEnter = (element: HTMLElement) => {
    const menuList = findDOMNode(this.menuList);

    if (this.menuList && this.menuList.selectedItem) {
      // $FlowFixMe
      findDOMNode(this.menuList.selectedItem).focus();
    } else if (menuList && menuList.firstChild) {
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

  handleListKeyDown = (event: SyntheticUIEvent<>, key: string) => {
    if (key === 'tab') {
      event.preventDefault();
      if (this.props.onRequestClose) {
        return this.props.onRequestClose(event);
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
    const { children, classes, className, MenuListProps, onEnter, ...other } = this.props;
    return (
      <Popover
        getContentAnchorEl={this.getContentAnchorEl}
        className={classNames(classes.root, className)}
        onEnter={this.handleEnter}
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

export default withStyles(styles, { name: 'MuiMenu' })(Menu);
