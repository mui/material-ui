'use client';
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import useRovingTabIndex from '../utils/useRovingTabIndex';
import ownerDocument from '../utils/ownerDocument';
import List from '../List';
import getActiveElement from '../utils/getActiveElement';
import getScrollbarSize from '../utils/getScrollbarSize';
import useForkRef from '../utils/useForkRef';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import { ownerWindow } from '../utils';

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
  return text.startsWith(textCriteria.keys.join(''));
}

function shouldFocusWithTextCriteria(element, criteria, disabledItemsFocusable) {
  if (!textCriteriaMatches(element, criteria)) {
    return false;
  }

  return shouldFocus(element, disabledItemsFocusable);
}

function shouldFocus(element, disabledItemsFocusable) {
  if (!element || !element.hasAttribute('tabindex')) {
    return false;
  }

  if (disabledItemsFocusable) {
    return true;
  }

  return !element.disabled && element.getAttribute('aria-disabled') !== 'true';
}

/**
 * A permanently displayed menu following https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/.
 * It's exposed to help customization of the [`Menu`](/material-ui/api/menu/) component if you
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

  useEnhancedEffect(() => {
    if (autoFocus) {
      listRef.current.focus();
    }
  }, [autoFocus]);

  React.useImperativeHandle(
    actions,
    () => ({
      adjustStyleForScrollbar: (containerElement, { direction }) => {
        // Let's ignore that piece of logic if users are already overriding the width
        // of the menu.
        const noExplicitWidth = !listRef.current.style.width;
        if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
          const scrollbarSize = `${getScrollbarSize(ownerWindow(containerElement))}px`;
          listRef.current.style[direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] =
            scrollbarSize;
          listRef.current.style.width = `calc(100% + ${scrollbarSize})`;
        }
        return listRef.current;
      },
    }),
    [],
  );

  /**
   * the index of the item should receive focus
   * in a `variant="selectedMenu"` it's the first `selected` item
   * otherwise it's the very first item.
   */
  let activeItemIndex = -1;
  // since we inject focus related props into children we have to do a lookahead
  // to check if there is a `selected` item. We're looking for the last `selected`
  // item and use the first valid item as a fallback
  React.Children.forEach(children, (child, index) => {
    if (!React.isValidElement(child)) {
      if (activeItemIndex === index) {
        activeItemIndex += 1;
        if (activeItemIndex >= children.length) {
          // there are no focusable items within the list.
          activeItemIndex = -1;
        }
      }
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          [
            "MUI: The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );
      }
    }

    if (!child.props.disabled) {
      if (variant === 'selectedMenu' && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }

    if (
      activeItemIndex === index &&
      (child.props.disabled || child.props.muiSkipListHighlight || child.type.muiSkipListHighlight)
    ) {
      activeItemIndex += 1;
      if (activeItemIndex >= children.length) {
        // there are no focusable items within the list.
        activeItemIndex = -1;
      }
    }
  });

  const { focusNext, getContainerProps, getItemProps } = useRovingTabIndex({
    focusableIndex: activeItemIndex,
    orientation: 'vertical',
    shouldWrap: !disableListWrap,
    shouldFocus: (element) => shouldFocus(element, disabledItemsFocusable),
  });
  const rovingTabIndexContainerProps = getContainerProps();
  const handleRef = useForkRef(listRef, rovingTabIndexContainerProps.ref, ref);

  let focusableIndex = 0;
  const items = React.Children.map(children, (child, index) => {
    if (
      !React.isValidElement(child) ||
      child.props.muiSkipListHighlight ||
      child.type.muiSkipListHighlight
    ) {
      return child;
    }

    const rovingTabIndexItemProps = getItemProps(focusableIndex, child.ref);
    const newChildProps = { ref: rovingTabIndexItemProps.ref };

    if (child.props.tabIndex === undefined && variant === 'selectedMenu') {
      newChildProps.tabIndex = rovingTabIndexItemProps.tabIndex;
    }

    if (index === activeItemIndex) {
      if (autoFocusItem) {
        newChildProps.autoFocus = true;
      }
    }

    focusableIndex += 1;

    return React.cloneElement(child, newChildProps);
  });

  const handleKeyDown = (event) => {
    const isModifierKeyPressed = event.ctrlKey || event.metaKey || event.altKey;

    if (isModifierKeyPressed && onKeyDown) {
      onKeyDown(event);

      return;
    }

    rovingTabIndexContainerProps.onKeyDown(event);

    if (event.key.length === 1) {
      const criteria = textCriteriaRef.current;
      const lowerKey = event.key.toLowerCase();
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

      const currentFocus = getActiveElement(ownerDocument(listRef.current));
      const keepFocusOnCurrent =
        currentFocus && !criteria.repeating && textCriteriaMatches(currentFocus, criteria);

      if (
        criteria.previousKeyMatched &&
        (keepFocusOnCurrent ||
          focusNext((element) =>
            shouldFocusWithTextCriteria(element, criteria, disabledItemsFocusable),
          ) !== -1)
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

  return (
    <List
      role="menu"
      ref={handleRef}
      className={className}
      onKeyDown={handleKeyDown}
      onFocus={rovingTabIndexContainerProps.onFocus}
      tabIndex={-1}
      {...other}
    >
      {items}
    </List>
  );
});

MenuList.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
