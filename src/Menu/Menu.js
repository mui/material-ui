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
