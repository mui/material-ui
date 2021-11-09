import * as React from 'react';
import PropTypes from 'prop-types';
import { isFragment } from 'react-is';
import clsx from 'clsx';
import {
  unstable_ownerDocument as ownerDocument,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '../composeClasses';
import { appendOwnerState } from '../utils';
import { getTabsListUnstyledUtilityClass } from './tabsListUnstyledClasses';
import TabsListUnstyledProps, { TabsListUnstyledTypeMap } from './TabListUnstyledProps';
import { useTabContext } from '../TabsUnstyled';

const nextItem = (list: Element | null, item: Element | null): Element | null => {
  if (!list) return null;

  if (list === item) {
    return list.firstChild as Element | null;
  }
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return list.firstChild as Element | null;
};

const previousItem = (list: Element | null, item: Element | null): Element | null => {
  if (!list) return null;

  if (list === item) {
    return list.lastChild as Element | null;
  }
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return list.lastChild as Element | null;
};

const moveFocus = (
  list: Element | null,
  currentFocus: Element | null,
  traversalFunction: (list: Element | null, currentFocus: Element | null) => Element | null,
) => {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus);

  while (list && nextFocus) {
    // Prevent infinite loop.
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return;
      }
      wrappedOnce = true;
    }

    // Same logic as useAutocomplete.js
    const nextFocusDisabled =
      (nextFocus as any).disabled || nextFocus.getAttribute('aria-disabled') === 'true';

    if (!nextFocus.hasAttribute('tabindex') || nextFocusDisabled) {
      // Move to the next element.
      nextFocus = traversalFunction(list, nextFocus);
    } else {
      (nextFocus as any).focus();
      return;
    }
  }
};

const useUtilityClasses = (ownerState: { orientation: 'horizontal' | 'vertical' }) => {
  const { orientation } = ownerState;

  const slots = {
    root: ['root', orientation ],
  };

  return composeClasses(slots, getTabsListUnstyledUtilityClass, {});
};

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/components/tabs/)
 *
 * API:
 *
 * - [TabsListUnstyled API](https://mui.com/api/tabs-list-unstyled/)
 */
const TabsListUnstyled = React.forwardRef<unknown, TabsListUnstyledProps>((props, ref) => {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className,
    children,
    component,
    components = {},
    componentsProps = {},
    ...other
  } = props;
  let childIndex = 0;

  const context = useTabContext();
  if (context === null) {
    throw new TypeError('No TabContext provided');
  }
  
  const {
    value,
    orientation = 'horizontal',
    direction = 'ltr',
  } = context;
  
  const tabListRef = React.useRef<Element | null>(null);
  const handleRef = useForkRef(tabListRef, ref);
  
  const isRtl = direction === 'rtl';
  
  const ownerState = {
    ...props,
    isRtl,
    orientation,
  };
  
  const classes = useUtilityClasses(ownerState);

  const TabsListRoot: React.ElementType = component ?? components.Root ?? 'div';
  const tabsListRootProps = appendOwnerState(
    TabsListRoot,
    { ...other, ...componentsProps.root },
    ownerState,
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const list = tabListRef.current;
    const currentFocus = ownerDocument(list).activeElement;
    // Keyboard navigation assumes that [role="tab"] are siblings
    // though we might warn in the future about nested, interactive elements
    // as a a11y violation
    const role = currentFocus?.getAttribute('role');
    if (role !== 'tab') {
      return;
    }

    let previousItemKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    let nextItemKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    if (orientation === 'horizontal' && isRtl) {
      // swap previousItemKey with nextItemKey
      previousItemKey = 'ArrowRight';
      nextItemKey = 'ArrowLeft';
    }

    switch (event.key) {
      case previousItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, previousItem);
        break;
      case nextItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, nextItem);
        break;
      case 'Home':
        event.preventDefault();
        moveFocus(list, null, nextItem);
        break;
      case 'End':
        event.preventDefault();
        moveFocus(list, null, previousItem);
        break;
      default:
        break;
    }
  };

  const valueToIndex = new Map();

  const processedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          [
            "MUI: The Tabs component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );
      }
    }

    const childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex)

    childIndex++;

    return React.cloneElement(child, {
      value: childValue,
      ...(childIndex === 1 && value === false && !child.props.tabIndex ? { tabIndex: 0 } : value === childValue ? { tabIndex: 0 } : { tabIndex: -1 })
    });
  })
  
  return (
    <TabsListRoot
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-orientation={orientation === 'vertical' ? 'vertical' : null}
      ref={handleRef}
      role="tablist"
      {...tabsListRootProps}
      onKeyDown={handleKeyDown}
      className={clsx(className, classes.root)}
    >
      {processedChildren}
    </TabsListRoot>
  );
}) as OverridableComponent<TabsListUnstyledTypeMap>;

TabsListUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  'aria-label': PropTypes.string,
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the TabsList.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the TabsList.
   * @default {}
   */
  componentsProps: PropTypes.object,
} as any;

export default TabsListUnstyled;
