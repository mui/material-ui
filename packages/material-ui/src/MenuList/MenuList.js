// @inheritedComponent List

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ownerDocument from '../utils/ownerDocument';
import List from '../List';
import getScrollbarSize from '../utils/getScrollbarSize';
import { useForkRef } from '../utils/reactHelpers';

function nextItem(list, item, disableListWrap) {
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return disableListWrap ? null : list.firstChild;
}

function previousItem(list, item, disableListWrap) {
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return disableListWrap ? null : list.lastChild;
}

function moveFocus(list, currentFocus, disableListWrap, traversalFunction) {
  let startingPoint = currentFocus;
  let nextFocus = traversalFunction(list, currentFocus, currentFocus ? disableListWrap : false);

  while (nextFocus) {
    if (nextFocus === startingPoint) {
      return;
    }
    if (startingPoint === null) {
      startingPoint = nextFocus;
    }
    if (
      !nextFocus.hasAttribute('tabindex') ||
      nextFocus.disabled ||
      nextFocus.getAttribute('aria-disabled') === 'true'
    ) {
      nextFocus = traversalFunction(list, nextFocus, disableListWrap);
    } else {
      break;
    }
  }
  if (nextFocus) {
    nextFocus.focus();
  }
}

const MenuList = React.forwardRef(function MenuList(props, ref) {
  const { actions, autoFocus, className, onKeyDown, disableListWrap, ...other } = props;
  const listRef = React.useRef();

  React.useLayoutEffect(() => {
    if (autoFocus) {
      listRef.current.focus();
    }
  }, [autoFocus]);

  React.useImperativeHandle(
    actions,
    () => ({
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
    }),
    [],
  );

  const handleKeyDown = event => {
    const list = listRef.current;
    const key = event.key;
    const currentFocus = ownerDocument(list).activeElement;

    if (
      (key === 'ArrowUp' || key === 'ArrowDown') &&
      (!currentFocus || (currentFocus && !list.contains(currentFocus)))
    ) {
      moveFocus(list, null, disableListWrap, nextItem);
    } else if (key === 'ArrowDown') {
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, nextItem);
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, previousItem);
    } else if (key === 'Home') {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, nextItem);
    } else if (key === 'End') {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, previousItem);
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handleOwnRef = React.useCallback(instance => {
    // #StrictMode ready
    listRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  const handleRef = useForkRef(handleOwnRef, ref);

  return (
    <List
      role="menu"
      ref={handleRef}
      className={className}
      onKeyDown={handleKeyDown}
      tabIndex={autoFocus ? 0 : -1}
      {...other}
    />
  );
});

MenuList.propTypes = {
  /**
   * @ignore
   */
  actions: PropTypes.shape({ current: PropTypes.object }),
  /**
   * If `true`, the list will be focused during the first mount.
   */
  autoFocus: PropTypes.bool,
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
  onKeyDown: PropTypes.func,
};

MenuList.defaultProps = {
  disableListWrap: false,
};

export default MenuList;
