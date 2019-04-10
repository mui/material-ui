// @inheritedComponent List

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import warning from 'warning';
import ownerDocument from '../utils/ownerDocument';
import List from '../List';
import getScrollbarSize from '../utils/getScrollbarSize';
import { useForkRef } from '../utils/reactHelpers';

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

const MenuList = React.forwardRef(function MenuList(props, ref) {
  const { actions, children, className, onBlur, onKeyDown, disableListWrap, ...other } = props;
  const [currentTabIndex, setCurrentTabIndex] = React.useState(null);
  const blurTimeoutIDRef = React.useRef();
  const listRef = React.useRef();
  const selectedItemRef = React.useRef();

  React.useImperativeHandle(actions, () => ({
    focus: () => {
      if (selectedItemRef.current) {
        selectedItemRef.current.focus();
        return;
      }

      if (listRef.current && listRef.current.firstChild) {
        listRef.current.firstChild.focus();
      }
    },
    getContentAnchorEl: () => {
      if (selectedItemRef.current) {
        return selectedItemRef.current;
      }
      return listRef.current.firstChild;
    },
    adjustStyleForScrollbar: (containerElement, theme) => {
      // Let's ignore that piece of logic if users are already overriding the width
      // of the menu.
      const noExplicitWidth = !listRef.current.style.width;
      if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
        const scrollbarSize = `${getScrollbarSize(true)}px`;
        listRef.current.style[
          theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'
        ] = scrollbarSize;
        listRef.current.style.width = `calc(100% + ${scrollbarSize})`;
      }
      return listRef.current;
    },
  }));

  React.useEffect(() => {
    resetTabIndex(listRef.current, selectedItemRef.current, setCurrentTabIndex);
    return () => {
      clearTimeout(blurTimeoutIDRef.current);
    };
  }, []);

  const handleBlur = event => {
    blurTimeoutIDRef.current = setTimeout(() => {
      if (listRef.current) {
        const list = listRef.current;
        const currentFocus = ownerDocument(list).activeElement;
        if (!list.contains(currentFocus)) {
          resetTabIndex(list, selectedItemRef.current, setCurrentTabIndex);
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

  const handleOwnRef = React.useCallback(refArg => {
    // StrictMode ready
    listRef.current = ReactDOM.findDOMNode(refArg);
  }, []);
  const handleRef = useForkRef(handleOwnRef, ref);

  return (
    <List
      role="menu"
      ref={handleRef}
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
            ? refArg => {
                // not StrictMode ready
                selectedItemRef.current = ReactDOM.findDOMNode(refArg);
              }
            : undefined,
          onFocus: handleItemFocus,
        });
      })}
    </List>
  );
});

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
