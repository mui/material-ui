// @flow
// @inheritedComponent Popover

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import withStyles from '../styles/withStyles';
import Popover from '../Popover';
import MenuList from './MenuList';
import type { TransitionCallback } from '../internal/transition';

type ProvidedProps = {
  classes: Object,
  theme: Object,
};

export type Props = {
  /**
   * The DOM element used to set the position of the menu.
   */
  anchorEl?: ?HTMLElement, // match Popover
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children?: Node,
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
  onEntered?: TransitionCallback,
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
  onExited?: TransitionCallback,
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
   * `classes` property applied to the `Popover` element.
   */
  PopoverClasses?: Object,
  /**
   * @ignore
   */
  theme?: Object,
  /**
   * The length of the transition in `ms`, or 'auto'
   */
  transitionDuration?: number | { enter?: number, exit?: number } | 'auto',
};

const rtlOrigin = {
  vertical: 'top',
  horizontal: 'right',
};

const ltrOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

export const styles = {
  root: {
    // specZ: The maximum height of a simple menu should be one or more rows less than the view
    // height. This ensures a tappable area outside of the simple menu with which to dismiss
    // the menu.
    maxHeight: 'calc(100vh - 96px)',
    // Add iOS momentum scrolling.
    WebkitOverflowScrolling: 'touch',
    // So we see the menu when it's empty.
    // It's most likely on issue on userland.
    minWidth: 16,
    minHeight: 16,
  },
};

class Menu extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    open: false,
    transitionDuration: 'auto',
  };

  componentDidMount() {
    if (this.props.open) {
      this.focus();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      // Needs to refocus as when a menu is rendered into another Modal,
      // the first modal might change the focus to prevent any leak.
      this.focus();
    }
  }

  getContentAnchorEl = () => {
    if (!this.menuList || !this.menuList.selectedItem) {
      // $FlowFixMe
      return findDOMNode(this.menuList).firstChild;
    }

    return findDOMNode(this.menuList.selectedItem);
  };

  menuList = undefined;

  focus = () => {
    if (this.menuList && this.menuList.selectedItem) {
      // $FlowFixMe
      findDOMNode(this.menuList.selectedItem).focus();
      return;
    }

    const menuList = findDOMNode(this.menuList);
    if (menuList && menuList.firstChild) {
      // $FlowFixMe
      menuList.firstChild.focus();
    }
  };

  handleEnter = (element: HTMLElement) => {
    const { theme } = this.props;

    const menuList = findDOMNode(this.menuList);

    // Focus so the scroll computation of the Popover works as expected.
    this.focus();

    // Let's ignore that piece of logic if users are already overriding the width
    // of the menu.
    // $FlowFixMe
    if (menuList && element.clientHeight < menuList.clientHeight && !menuList.style.width) {
      const size = `${getScrollbarSize()}px`;
      // $FlowFixMe
      menuList.style[theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = size;
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
        this.props.onRequestClose(event);
      }
    }
  };

  render() {
    const {
      children,
      classes,
      className,
      MenuListProps,
      onEnter,
      PopoverClasses,
      theme,
      ...other
    } = this.props;

    return (
      <Popover
        getContentAnchorEl={this.getContentAnchorEl}
        className={classNames(classes.root, className)}
        classes={PopoverClasses}
        onEnter={this.handleEnter}
        anchorOrigin={theme.direction === 'rtl' ? rtlOrigin : ltrOrigin}
        transformOrigin={theme.direction === 'rtl' ? rtlOrigin : ltrOrigin}
        {...other}
      >
        <MenuList
          data-mui-test="Menu"
          role="menu"
          onKeyDown={this.handleListKeyDown}
          {...MenuListProps}
          ref={node => {
            this.menuList = node;
          }}
        >
          {children}
        </MenuList>
      </Popover>
    );
  }
}

export default withStyles(styles, { withTheme: true, name: 'MuiMenu' })(Menu);
