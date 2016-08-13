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
     * MenuList contents, should be menu items
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the list element.
     */
    className: PropTypes.string,
    /**
     * @ignore
     */
    onKeyDown: PropTypes.func,
  };

  list = undefined;
  selectedItem = undefined;

  handleKeyDown = (event) => {
    const list = findDOMNode(this.list);
    const currentFocus = activeElement(ownerDocument(list));
    const key = keycode(event);

    if (
      (key === 'up' || key === 'down') &&
      (
        !currentFocus ||
        (currentFocus && !contains(list, currentFocus))
      )
    ) {
      if (this.selectedItem) {
        return findDOMNode(this.selectedItem).focus(); // eslint-disable-line react/no-find-dom-node
      }
      return list.firstChild.focus();
    }

    if (key === 'down') {
      event.preventDefault();
      return currentFocus.nextElementSibling && currentFocus.nextElementSibling.focus();
    } else if (key === 'up') {
      event.preventDefault();
      return currentFocus.previousElementSibling && currentFocus.previousElementSibling.focus();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event, key);
    }

    return true;
  };

  getContentAnchorEl = () => {
    if (!this.selectedItem) {
      return findDOMNode(this.list).firstChild;
    }

    return findDOMNode(this.selectedItem);
  };

  render() {
    const {
      children,
      className,
      onKeyDown, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    return (
      <List
        data-mui-test="MenuList"
        role="menu"
        ref={(c) => this.list = c}
        className={className}
        onKeyDown={this.handleKeyDown}
        {...other}
      >
        {React.Children.map(children, (child) => {
          if (child.props.selected) {
            return React.cloneElement(child, { ref: (c) => this.selectedItem = c });
          }
          return child;
        })}
      </List>
    );
  }
}

