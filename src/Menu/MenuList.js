// @flow weak

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import keycode from 'keycode';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';
import ownerDocument from 'dom-helpers/ownerDocument';
import { List } from '../List';

export default class MenuList extends Component {
  static propTypes = {
    /**
     * MenuList contents, should be menu items.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * @ignore
     */
    onBlur: PropTypes.func,
    /**
     * @ignore
     */
    onKeyDown: PropTypes.func,
  };

  state = {
    currentTabIndex: undefined,
  };

  componentDidMount() {
    this.resetTabIndex();
  }

  componentWillUnmount() {
    clearTimeout(this.blurTimer);
  }

  list = undefined;
  selectedItem = undefined;
  blurTimer = undefined;

  handleBlur = (event) => {
    this.blurTimer = setTimeout(() => {
      if (this.list) {
        const list = findDOMNode(this.list);
        const currentFocus = activeElement(ownerDocument(list));
        if (!contains(list, currentFocus)) {
          this.resetTabIndex();
        }
      }
    }, 30);

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleKeyDown = (event) => {
    const list = findDOMNode(this.list);
    const key = keycode(event);
    const currentFocus = activeElement(ownerDocument(list));

    if (
      (key === 'up' || key === 'down') &&
      (!currentFocus || (currentFocus && !contains(list, currentFocus)))
    ) {
      if (this.selectedItem) {
        findDOMNode(this.selectedItem).focus(); // eslint-disable-line react/no-find-dom-node
      } else {
        list.firstChild.focus();
      }
    } else if (key === 'down') {
      event.preventDefault();
      if (currentFocus.nextElementSibling) {
        currentFocus.nextElementSibling.focus();
      }
    } else if (key === 'up') {
      event.preventDefault();
      if (currentFocus.previousElementSibling) {
        currentFocus.previousElementSibling.focus();
      }
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event, key);
    }
  };

  handleItemFocus = (event) => {
    const list = findDOMNode(this.list);
    if (list) {
      for (let i = 0; i < list.children.length; i += 1) {
        if (list.children[i] === event.currentTarget) {
          this.setTabIndex(i);
          break;
        }
      }
    }
  };

  focus() {
    const { currentTabIndex } = this.state;
    const list = findDOMNode(this.list);
    if (!list || !list.children) {
      return;
    }

    if (currentTabIndex && currentTabIndex >= 0) {
      list.children[currentTabIndex].focus();
    } else {
      list.firstChild.focus();
    }
  }

  resetTabIndex() {
    const list = findDOMNode(this.list);
    const currentFocus = activeElement(ownerDocument(list));
    const items = [...list.children];
    const currentFocusIndex = items.indexOf(currentFocus);

    if (currentFocusIndex !== -1) {
      return this.setTabIndex(currentFocusIndex);
    }

    if (this.selectedItem) {
      return this.setTabIndex(items.indexOf(findDOMNode(this.selectedItem)));
    }

    return this.setTabIndex(0);
  }

  setTabIndex(n) {
    this.setState({ currentTabIndex: n });
  }

  render() {
    const {
      children,
      className,
      onBlur, // eslint-disable-line no-unused-vars
      onKeyDown, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    return (
      <List
        data-mui-test="MenuList"
        role="menu"
        rootRef={(c) => { this.list = c; }}
        className={className}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        {...other}
      >
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            tabIndex: index === this.state.currentTabIndex ? '0' : '-1',
            ref: child.props.selected ? ((c) => { this.selectedItem = c; }) : undefined,
            onFocus: this.handleItemFocus,
          }),
        )}
      </List>
    );
  }
}

