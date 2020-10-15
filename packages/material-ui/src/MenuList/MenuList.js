import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import ownerDocument from '../utils/ownerDocument';
import List from '../List';
import getScrollbarSize from '../utils/getScrollbarSize';
import useForkRef from '../utils/useForkRef';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import MenuItem from '../MenuItem';

function nextItem(list, item, disableListWrap, listRef) {
  if (listRef.current === item) {
    return list[0].current;
  }
  const i = list.findIndex((c) => c.current === item);
  if (item && i > -1 && i + 1 < list.length) {
    return list[i + 1].current;
  }
  return disableListWrap ? null : list[0].current;
}

function previousItem(list, item, disableListWrap, listRef) {
  if (listRef.current === item) {
    return disableListWrap ? list[0].current : list[list.length - 1].current;
  }
  const i = list.findIndex((c) => c.current === item);
  if (item && i > -1 && i - 1 >= 0) {
    return list[i - 1].current;
  }
  return disableListWrap ? null : list[list.length - 1].current;
}

function textCriteriaMatches(nextFocus, textCriteria) {
  if (textCriteria === undefined) {
    return true;
  }
  let text = nextFocus.innerText;
  if (text === undefined) {
    // jsdom doesn't support innerText
    text = nextFocus.textContent;
  }
  text = text.trim().toLowerCase();
  if (text.length === 0) {
    return false;
  }
  if (textCriteria.repeating) {
    return text[0] === textCriteria.keys[0];
  }
  return text.indexOf(textCriteria.keys.join('')) === 0;
}

function moveFocus(
  list,
  currentFocus,
  disableListWrap,
  disabledItemsFocusable,
  traversalFunction,
  textCriteria,
  listRef
) {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus, currentFocus ? disableListWrap : false, listRef);

  while (nextFocus) {
    // Prevent infinite loop.
    if (nextFocus === list[0].current) {
      if (wrappedOnce) {
        return;
      }
      wrappedOnce = true;
    }

    // Same logic as useAutocomplete.js
    const nextFocusDisabled = disabledItemsFocusable
      ? false
      : nextFocus.disabled || nextFocus.getAttribute('aria-disabled') === 'true';

    if (
      !nextFocus.hasAttribute('tabindex') ||
      !textCriteriaMatches(nextFocus, textCriteria) ||
      nextFocusDisabled
    ) {
      // Move to the next element.
      nextFocus = traversalFunction(list, nextFocus, disableListWrap, listRef);
    } else {
      nextFocus.focus();
      return;
    }
  }
}

/**
 * A permanently displayed menu following https://www.w3.org/TR/wai-aria-practices/#menubutton.
 * It's exposed to help customization of the [`Menu`](/api/menu/) component. If you
 * use it separately you need to move focus into the component manually. Once
 * the focus is placed inside the component it is fully keyboard accessible.
 */
const MenuList = React.forwardRef(function MenuList(props, ref) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions,
    autoFocus = false,
    autoFocusItem = false,
    children,
    className,
    disabledItemsFocusable = false,
    disableListWrap = false,
    onKeyDown,
    variant = 'selectedMenu',
    ...other
  } = props;
  const listRef = React.useRef(null);
  const textCriteriaRef = React.useRef({
    keys: [],
    repeating: true,
    previousKeyMatched: true,
    lastTime: null,
  });

  const [menuItems, setMenuItems] = React.useState([]);
  const [items, setItems] = React.useState(null);
  const [activeItemIndex, setActiveItemIndex] = React.useState(-1);

  useEnhancedEffect(() => {
    // if (items) {
    //   return;
    // }
    /**
     * the index of the item should receive focus
     * in a `variant="selectedMenu"` it's the first `selected` item
     * otherwise it's the very first item.
     */
    let activeItem = -1; 
    const menuItemRefs = [];

    const setup = (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (isFragment(child)) {
          console.error(
            [
              "Material-UI: The Menu component doesn't accept a Fragment as a child.",
              'Consider providing an array instead.',
            ].join('\n'),
          );
        }
      }

      if (child.type === MenuItem || (child.props.role && child.props.role === 'menuitem')) {
        const itemRef = React.createRef();
        const newProps = {
          ref: itemRef
        };

        if (!child.props.disabled) {
          if (variant === 'selectedMenu' && child.props.selected) {
            activeItem = menuItemRefs.length;
            if (autoFocusItem) {
              newProps.autoFocus = true;
            }
          } else if (child.props.autoFocus) {
            activeItem = menuItemRefs.length;
          } else if (activeItem === -1) {
            activeItem = menuItemRefs.length;
            if (autoFocusItem) {
              newProps.autoFocus = true;
            }
          }
        }

        const newChild = React.cloneElement(child, newProps);
        menuItemRefs.push(itemRef);
        return newChild;
      } 
      
      if (child.props.children) {
        const newChildren = React.Children.map(child.props.children, setup);
        return React.cloneElement(child, { children: newChildren });
      }

      return child;
    };

    // since we inject focus related props into children we have to do a lookahead
    // to check if there is a `selected` item. We're looking for the last `selected`
    // item and use the first valid item as a fallback
    const listChildren = React.Children.map(children, setup);

    setItems(listChildren);
    setMenuItems(menuItemRefs);
    setActiveItemIndex(activeItem);
  }, [children, variant, autoFocusItem]);

  useEnhancedEffect(() => {
    if (autoFocusItem && activeItemIndex >= 0) {
      menuItems[activeItemIndex].current.focus();
      // if (menuItems[activeItemIndex].current.tabIndex === undefined) {
      //   menuItems[activeItemIndex].current.tabIndex = 0;
      // }
    } else if (autoFocus) {
      listRef.current.focus();
    }

    if (variant === 'selectedMenu' && 
      activeItemIndex >= 0 && 
      menuItems[activeItemIndex].current && 
      (menuItems[activeItemIndex].current.tabIndex === undefined || menuItems[activeItemIndex].current.tabIndex === -1)
    ) {
      menuItems[activeItemIndex].current.tabIndex = 0;
    }
    
  }, [autoFocus, activeItemIndex, autoFocusItem, menuItems, variant]);

  React.useImperativeHandle(
    actions,
    () => ({
      adjustStyleForScrollbar: (containerElement, theme) => {
        // Let's ignore that piece of logic if users are already overriding the width
        // of the menu.
        const noExplicitWidth = !listRef.current.style.width;
        if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
          const scrollbarSize = `${getScrollbarSize(ownerDocument(containerElement))}px`;
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

  const handleKeyDown = (event) => {
    const list = menuItems;
    const key = event.key;
    /**
     * @type {Element} - will always be defined since we are in a keydown handler
     * attached to an element. A keydown event is either dispatched to the activeElement
     * or document.body or document.documentElement. Only the first case will
     * trigger this specific handler.
     */
    const currentFocus = ownerDocument(listRef.current).activeElement;

    if (key === 'ArrowDown') {
      // Prevent scroll of the page
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, nextItem, undefined, listRef);
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, previousItem, undefined, listRef);
    } else if (key === 'Home') {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, disabledItemsFocusable, nextItem, undefined, listRef);
    } else if (key === 'End') {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, disabledItemsFocusable, previousItem, undefined, listRef);
    } else if (key.length === 1) {
      const criteria = textCriteriaRef.current;
      const lowerKey = key.toLowerCase();
      const currTime = performance.now();
      if (criteria.keys.length > 0) {
        // Reset
        if (currTime - criteria.lastTime > 500) {
          criteria.keys = [];
          criteria.repeating = true;
          criteria.previousKeyMatched = true;
        } else if (criteria.repeating && lowerKey !== criteria.keys[0]) {
          criteria.repeating = false;
        }
      }
      criteria.lastTime = currTime;
      criteria.keys.push(lowerKey);
      const keepFocusOnCurrent =
        currentFocus && !criteria.repeating && textCriteriaMatches(currentFocus, criteria);
      if (
        criteria.previousKeyMatched &&
        (keepFocusOnCurrent ||
          moveFocus(list, currentFocus, false, disabledItemsFocusable, nextItem, criteria, listRef))
      ) {
        event.preventDefault();
      } else {
        criteria.previousKeyMatched = false;
      }
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handleRef = useForkRef(listRef, ref);

  return (
    <List
      role="menu"
      ref={handleRef}
      className={className}
      onKeyDown={handleKeyDown}
      tabIndex={autoFocus ? 0 : -1}
      {...other}
    >
      {items}
    </List>
  );
});

MenuList.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: PropTypes.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: PropTypes.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: PropTypes.bool,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: PropTypes.oneOf(['menu', 'selectedMenu']),
};

export default MenuList;
