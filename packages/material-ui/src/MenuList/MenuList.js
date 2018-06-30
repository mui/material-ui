// @inheritedComponent List

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import keycode from 'keycode';
import warning from 'warning';
import ownerDocument from '../utils/ownerDocument';
import List from '../List';

class MenuList extends React.Component {
  list = null;

  selectedItem = null;

  blurTimer = null;

  state = {
    currentTabIndex: null,
  };

  componentDidMount() {
    this.resetTabIndex();
  }

  componentWillUnmount() {
    clearTimeout(this.blurTimer);
  }

  setTabIndex(index) {
    this.setState({ currentTabIndex: index });
  }

  handleBlur = event => {
    this.blurTimer = setTimeout(() => {
      if (this.list) {
        const list = ReactDOM.findDOMNode(this.list);
        const currentFocus = ownerDocument(list).activeElement;
        if (!list.contains(currentFocus)) {
          this.resetTabIndex();
        }
      }
    }, 30);

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleKeyDown = event => {
    const list = ReactDOM.findDOMNode(this.list);
    const key = keycode(event);
    const currentFocus = ownerDocument(list).activeElement;

    if (
      (key === 'up' || key === 'down') &&
      (!currentFocus || (currentFocus && !list.contains(currentFocus)))
    ) {
      if (this.selectedItem) {
        ReactDOM.findDOMNode(this.selectedItem).focus();
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

  handleItemFocus = event => {
    const list = ReactDOM.findDOMNode(this.list);
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
    const list = ReactDOM.findDOMNode(this.list);
    if (!list || !list.children || !list.firstChild) {
      return;
    }

    if (currentTabIndex && currentTabIndex >= 0) {
      list.children[currentTabIndex].focus();
    } else {
      list.firstChild.focus();
    }
  }

  resetTabIndex() {
    const list = ReactDOM.findDOMNode(this.list);
    const currentFocus = ownerDocument(list).activeElement;

    const items = [];
    for (let i = 0; i < list.children.length; i += 1) {
      items.push(list.children[i]);
    }

    const currentFocusIndex = items.indexOf(currentFocus);

    if (currentFocusIndex !== -1) {
      return this.setTabIndex(currentFocusIndex);
    }

    if (this.selectedItem) {
      return this.setTabIndex(items.indexOf(ReactDOM.findDOMNode(this.selectedItem)));
    }

    return this.setTabIndex(0);
  }

  render() {
    const { children, className, onBlur, onKeyDown, ...other } = this.props;

    return (
      <List
        role="menu"
        ref={node => {
          this.list = node;
        }}
        className={className}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        {...other}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          warning(
            child.type !== React.Fragment,
            [
              "Material-UI: the MenuList component doesn't accept a Fragment as a child.",
              'Consider providing an array instead.',
            ].join('\n'),
          );

          return React.cloneElement(child, {
            tabIndex: index === this.state.currentTabIndex ? 0 : -1,
            ref: child.props.selected
              ? node => {
                  this.selectedItem = node;
                }
              : undefined,
            onFocus: this.handleItemFocus,
          });
        })}
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
