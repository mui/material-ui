import * as React from 'react';
import { unstable_useControlled as useControlled, unstable_useId as useId } from '@mui/utils';
import { UseTabsParameters, UseTabsReturnValue } from './useTabs.types';

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
    (e: React.SyntheticEvent, newValue: string | number | false) => {
      setValue(newValue);
      if (onChange) {
        onChange(e, newValue);
      }
    },
    [onChange, setValue],
  );

  const tabsContextValue = React.useMemo(() => {
    return { idPrefix, value, onSelected, orientation, direction, selectionFollowsFocus };
  }, [idPrefix, value, onSelected, orientation, direction, selectionFollowsFocus]);

  return {
    tabsContextValue,
  };
}

export default useTabs;
