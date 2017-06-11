// @flow weak

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { createStyleSheet } from 'jss-theme-reactor';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import Popover from '../internal/Popover';
import withStyles from '../styles/withStyles';
import MenuList from './MenuList';

export const styleSheet = createStyleSheet('MuiMenu', {
  root: {
    maxHeight: 250,
  },
});

class Menu extends Component {
  static defaultProps = {
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
      return this.props.onRequestClose(event);
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

Menu.propTypes = {
  /**
   * The DOM element used to set the position of the menu.
   */
  anchorEl: PropTypes.object,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Properties applied to the `MenuList` element.
   */
  MenuListProps: PropTypes.object,
  /**
   * Callback fired before the Menu enters.
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired when the Menu is entering.
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired when the Menu has entered.
   */
  onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the Menu exits.
   */
  onExit: PropTypes.func,
  /**
   * Callback fired when the Menu is exiting.
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired when the Menu has exited.
   */
  onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
  /**
   * Callback function fired when the menu is requested to be closed.
   *
   * @param {event} event The event that triggered the close request
   */
  onRequestClose: PropTypes.func,
  /**
   * If `true`, the menu is visible.
   */
  open: PropTypes.bool,
  /**
   * The length of the transition in `ms`, or 'auto'
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default withStyles(styleSheet)(Menu);
