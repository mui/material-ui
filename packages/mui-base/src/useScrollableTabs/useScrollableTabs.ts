import * as React from 'react';
import { unstable_useControlled as useControlled } from '@mui/utils';
import { TabPanelMetadata } from '@mui/base';
import { detectScrollType } from '@mui/material/utils/scrollLeft';
import animate from '@mui/material/internal/animate';
import {
  UseScrollableTabsParameters,
  UseScrollableTabsReturnValue,
} from './useScrollableTabs.types';
import { useCompoundParent } from '../utils/useCompound';

type IdLookupFunction = (id: string | number) => string | undefined;

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base/react-tabs/#hooks)
 *
 * API:
 *
 * - [useScrollableTabs API](https://mui.com/base/react-tabs/hooks-api/#use-tabs)
 */
function useScrollableTabs(parameters: UseScrollableTabsParameters): UseScrollableTabsReturnValue {
  // const theme = useTheme();
  // const isRtl = theme.direction === 'rtl';
  const theme = {};
  // TODO -> remove useTheme
  const isRtl = true;
  const {
    value: valueProp,
    defaultValue,
    onChange,
    orientation,
    direction,
    selectionFollowsFocus,
  } = parameters;

  const tabsRef = React.useRef<HTMLDivElement>(null);
  const tabListRef = React.useRef<HTMLDivElement>(null);

  const vertical = orientation === 'vertical';
  const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
  const start = vertical ? 'top' : 'left';
  const end = vertical ? 'bottom' : 'right';
  const clientSize = vertical ? 'clientHeight' : 'clientWidth';

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'Tabs',
    state: 'value',
  });

  const onSelected = React.useCallback(
    (event: React.SyntheticEvent | null, newValue: string | number | null) => {
      setValue(newValue);
      onChange?.(event, newValue);
    },
    [onChange, setValue],
  );

  const { subitems: tabPanels, contextValue: compoundComponentContextValue } = useCompoundParent<
    string | number,
    TabPanelMetadata
  >();

  const tabIdLookup = React.useRef<IdLookupFunction>(() => undefined);

  const getTabPanelId = React.useCallback(
    (tabValue: string | number) => {
      return tabPanels.get(tabValue)?.id;
    },
    [tabPanels],
  );

  const getTabId = React.useCallback((tabPanelId: string | number) => {
    return tabIdLookup.current(tabPanelId);
  }, []);

  const registerTabIdLookup = React.useCallback((lookupFunction: IdLookupFunction) => {
    tabIdLookup.current = lookupFunction;
  }, []);

  // const handleStartScrollClick = () => {
  //   moveTabsScroll(-1 * getScrollSize());
  // };
  //
  // const handleEndScrollClick = () => {
  //   moveTabsScroll(getScrollSize());
  // };

  const scroll = (scrollValue, { animation = true } = {}) => {
    if (animation) {
      animate(scrollStart, tabsRef.current, scrollValue, {
        duration: theme.transitions.duration.standard,
      });
    } else {
      tabsRef.current[scrollStart] = scrollValue;
    }
  };

  const moveTabsScroll = (delta) => {
    let scrollValue = tabsRef.current[scrollStart];

    if (vertical) {
      scrollValue += delta;
    } else {
      scrollValue += delta * (isRtl ? -1 : 1);
      // Fix for Edge
      scrollValue *= isRtl && detectScrollType() === 'reverse' ? -1 : 1;
    }

    scroll(scrollValue);
  };

  const getScrollSize = () => {
    const containerSize = tabsRef.current[clientSize];
    let totalSize = 0;
    const children = Array.from(tabListRef.current.children);

    for (let i = 0; i < children.length; i += 1) {
      const tab = children[i];
      if (totalSize + tab[clientSize] > containerSize) {
        // If the first item is longer than the container size, then only scroll
        // by the container size.
        if (i === 0) {
          totalSize = containerSize;
        }
        break;
      }
      totalSize += tab[clientSize];
    }

    return totalSize;
  };

  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize());
  };

  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize());
  };

  const createHandleClick =
    (otherProps: React.InputHTMLAttributes<HTMLInputElement>) =>
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      console.log('scrollableTabs clicked');
      // if (event.code === 'Space' && inputRef.current) {
      //   event.preventDefault();
      //   setCheckedState(!checked);
      //   otherProps.onKeyDown?.(event);
      //
      //   const nativeEvent = event.nativeEvent || event;
      //   // @ts-ignore
      //   const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
      //
      //   Object.defineProperty(clonedEvent, 'target', {
      //     writable: true,
      //     value: { type: 'checkbox', checked: !checked },
      //   });
      //   onChange?.(clonedEvent);
      //   otherProps.onChange?.(clonedEvent);
      // }
    };

  const getScrollButtonProps: any = (otherProps = {}) => ({
    // ref: handleInputRef,
    // 'aria-readonly': readOnly,
    // 'aria-disabled': disabled,
    // 'aria-required': required,
    ...otherProps,
    // onFocus: createHandleFocus(otherProps),
    // onBlur: createHandleBlur(otherProps),
    onClick: createHandleClick(otherProps),
    // onKeyDown: createHandleKeyDown(otherProps),
  });

  const contextVaue = {
    direction,
    getTabId,
    getTabPanelId,
    onSelected,
    orientation,
    registerTabIdLookup,
    selectionFollowsFocus,
    value,
    getScrollButtonProps,
    ...compoundComponentContextValue,
  };

  return {
    contextValue: {
      direction,
      getTabId,
      getTabPanelId,
      onSelected,
      orientation,
      registerTabIdLookup,
      selectionFollowsFocus,
      value,
      getScrollButtonProps,
      ...compoundComponentContextValue,
    },
  };
}

export default useScrollableTabs;
