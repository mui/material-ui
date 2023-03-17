import * as React from 'react';
import { unstable_useControlled as useControlled, unstable_useId as useId } from '@mui/utils';
import { UseTabsParameters, UseTabsReturnValue } from './useTabs.types';
import { useCompoundParent } from '../utils/useCompound';

export interface TabMetadata {
  disabled: boolean;
  ref: React.RefObject<HTMLElement>;
}

/**
 *
 * Demos:
 *
 * - [Unstyled Tabs](https://mui.com/base/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTabs API](https://mui.com/base/react-tabs/hooks-api/#use-tabs)
 */
function useTabs(parameters: UseTabsParameters): UseTabsReturnValue {
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

  const idPrefix = useId();

  const onSelected = React.useCallback(
    (event: React.SyntheticEvent | null, newValue: string | number | null) => {
      setValue(newValue);
      onChange?.(event, newValue);
    },
    [onChange, setValue],
  );

  const { subitems: tabPanels, contextValue: compoundComponentContextValue } = useCompoundParent<
    string | number,
    string
  >();

  return {
    tabPanels,
    contextValue: {
      idPrefix,
      value,
      onSelected,
      orientation,
      direction,
      selectionFollowsFocus,
      ...compoundComponentContextValue,
    },
  };
}

export default useTabs;
