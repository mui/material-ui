import * as React from 'react';
import { unstable_useControlled as useControlled } from '@mui/utils';
import { TabPanelMetadata } from '@mui/base';
import {
  UseScrollableTabsParameters,
  UseScrollableTabsReturnValue,
} from './useScrollableTabs.types';
import { useCompoundParent } from '../utils/useCompound';

export interface TabMetadata {
  disabled: boolean;
  id: string | undefined;
  ref: React.RefObject<HTMLElement>;
}

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
  const {
    value: valueProp,
    defaultValue,
    onChange,
    orientation,
    direction,
    selectionFollowsFocus,
  } = parameters;

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

  // const createHandleClick =
  //   (otherProps: React.InputHTMLAttributes<HTMLInputElement>) =>
  //   (event: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (event.code === 'Space' && inputRef.current) {
  //       event.preventDefault();
  //       setCheckedState(!checked);
  //       otherProps.onKeyDown?.(event);
  //
  //       const nativeEvent = event.nativeEvent || event;
  //       // @ts-ignore
  //       const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
  //
  //       Object.defineProperty(clonedEvent, 'target', {
  //         writable: true,
  //         value: { type: 'checkbox', checked: !checked },
  //       });
  //       onChange?.(clonedEvent);
  //       otherProps.onChange?.(clonedEvent);
  //     }
  //   };

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
