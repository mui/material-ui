// @inheritedComponent List

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import warning from 'warning';
import ownerDocument from '../utils/ownerDocument';
import List from '../List';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';

function resetTabIndex(list, selectedItem, setCurrentTabIndex) {
  const currentFocus = ownerDocument(list).activeElement;

  const items = [];
  for (let i = 0; i < list.children.length; i += 1) {
    items.push(list.children[i]);
  }

  const currentFocusIndex = items.indexOf(currentFocus);

  if (currentFocusIndex !== -1) {
    return setCurrentTabIndex(currentFocusIndex);
  }

  if (selectedItem) {
    return setCurrentTabIndex(items.indexOf(selectedItem));
  }

  return setCurrentTabIndex(0);
}

function MenuList({ actions, children, className, onBlur, onKeyDown, disableListWrap, ...other }) {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(null);
  const blurTimerRef = React.useRef();
  const listRef = React.useRef();
  const selectedItemRef = React.useRef();

  React.useImperativeHandle(actions, () => ({
    focus: () => {
      if (selectedItemRef.current) {
        ReactDOM.findDOMNode(selectedItemRef.current).focus();
        return;
      }

      if (listRef.current && listRef.current.firstChild) {
        listRef.current.firstChild.focus();
      }
    },
    getContentAnchorEl: () => {
      if (selectedItemRef.current) {
        return ReactDOM.findDOMNode(selectedItemRef.current);
      }
      return listRef.current.firstChild;
    },
    adjustStyleForScrollbar: (containerElement, theme) => {
      // Let's ignore that piece of logic if users are already overriding the width
      // of the menu.
      if (
        containerElement.clientHeight < listRef.current.clientHeight &&
        !listRef.current.style.width
      ) {
        const size = `${getScrollbarSize(true)}px`;
        listRef.current.style[theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = size;
        listRef.current.style.width = `calc(100% + ${size})`;
      }
      return listRef.current;
    },
  }));

  React.useLayoutEffect(() => {
    resetTabIndex(listRef.current, selectedItemRef.current, setCurrentTabIndex);
    return () => {
      clearTimeout(blurTimerRef.current);
    };
  }, []);

  const handleBlur = event => {
    blurTimerRef.current = setTimeout(() => {
      if (listRef.current) {
        const list = listRef.current;
        const currentFocus = ownerDocument(list).activeElement;
        if (!list.contains(currentFocus)) {
          resetTabIndex(listRef.current, selectedItemRef.current, setCurrentTabIndex);
        }
      }
    }, 30);

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleKeyDown = event => {
    const list = listRef.current;
    const key = event.key;
    const currentFocus = ownerDocument(list).activeElement;

    if (
      (key === 'ArrowUp' || key === 'ArrowDown') &&
      (!currentFocus || (currentFocus && !list.contains(currentFocus)))
    ) {
      if (selectedItemRef.current) {
        selectedItemRef.current.focus();
      } else {
        list.firstChild.focus();
      }
    } else if (key === 'ArrowDown') {
      event.preventDefault();
      if (currentFocus.nextElementSibling) {
        currentFocus.nextElementSibling.focus();
      } else if (!disableListWrap) {
        list.firstChild.focus();
      }
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      if (currentFocus.previousElementSibling) {
        currentFocus.previousElementSibling.focus();
      } else if (!disableListWrap) {
        list.lastChild.focus();
      }
    } else if (key === 'Home') {
      event.preventDefault();
      list.firstChild.focus();
    } else if (key === 'End') {
      event.preventDefault();
      list.lastChild.focus();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handleItemFocus = event => {
    const list = listRef.current;
    if (list) {
      for (let i = 0; i < list.children.length; i += 1) {
        if (list.children[i] === event.currentTarget) {
          setCurrentTabIndex(i);
          break;
        }
      }
    }
  };

  return (
    <List
      role="menu"
      ref={ref => {
        listRef.current = ReactDOM.findDOMNode(ref);
      }}
      className={className}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
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
          tabIndex: index === currentTabIndex ? 0 : -1,
          ref: child.props.selected
            ? ref => {
                selectedItemRef.current = ReactDOM.findDOMNode(ref);
              }
            : undefined,
          onFocus: handleItemFocus,
        });
      })}
    </List>
  );
}

MenuList.propTypes = {
  /**
   * @ignore
   */
  actions: PropTypes.shape({ current: PropTypes.object }),
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the menu items will not wrap focus.
   */
  disableListWrap: PropTypes.bool,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
};

MenuList.defaultProps = {
  disableListWrap: false,
};

export default MenuList;
