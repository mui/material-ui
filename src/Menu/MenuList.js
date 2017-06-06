// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import keycode from 'keycode';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';
import ownerDocument from 'dom-helpers/ownerDocument';
import List from '../List';

class MenuList extends Component {
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

  handleBlur = event => {
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

  handleKeyDown = event => {
    const list = findDOMNode(this.list);
    const key = keycode(event);
    const currentFocus = activeElement(ownerDocument(list));

    if (
      (key === 'up' || key === 'down') &&
      (!currentFocus || (currentFocus && !contains(list, currentFocus)))
    ) {
      if (this.selectedItem) {
        // $FlowFixMe
        findDOMNode(this.selectedItem).focus();
      } else {
        // $FlowFixMe
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

  handleItemFocus = event => {
    const list = findDOMNode(this.list);
    if (list) {
      // $FlowFixMe
      for (let i = 0; i < list.children.length; i += 1) {
        // $FlowFixMe
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
      // $FlowFixMe
      list.children[currentTabIndex].focus();
    } else {
      // $FlowFixMe
      list.firstChild.focus();
    }
  }

  resetTabIndex() {
    const list = findDOMNode(this.list);
    const currentFocus = activeElement(ownerDocument(list));
    // $FlowFixMe
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

  setTabIndex(index) {
    this.setState({ currentTabIndex: index });
  }

  render() {
    const { children, className, onBlur, onKeyDown, ...other } = this.props;

    return (
      <List
        data-mui-test="MenuList"
        role="menu"
        rootRef={node => {
          this.list = node;
        }}
        className={className}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        {...other}
      >
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            tabIndex: index === this.state.currentTabIndex ? '0' : '-1',
            ref: child.props.selected
              ? node => {
                  this.selectedItem = node;
                }
              : undefined,
            onFocus: this.handleItemFocus,
          }),
        )}
      </List>
    );
  }
}

MenuList.propTypes = {
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: PropTypes.node,
  /**
   * @ignore
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

export default MenuList;
