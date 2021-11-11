import * as React from 'react';
import { unstable_useControlled as useControlled } from '@mui/utils';

export interface UseTabsProps {
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value?: string | number | false;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: string | number | false;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The direction of the text.
   * @default 'ltr'
   */
  direction?: 'ltr' | 'rtl';
  /**
   * Callback invoked when new value is being set.
   */
  onChange?: (event: React.SyntheticEvent, value: number | string) => void;
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus?: boolean;
}

function useUniquePrefix() {
  const [id, setId] = React.useState<string | null>(null);
  React.useEffect(() => {
    setId(`mui-p-${Math.round(Math.random() * 1e5)}`);
  }, []);
  return id;
}

const useTabs = (props: UseTabsProps) => {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    orientation,
    direction,
    selectionFollowsFocus,
  } = props;

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'Tabs',
    state: 'value',
  });

  const idPrefix = useUniquePrefix();

  const onSelected = React.useCallback(
    (e, newValue) => {
      setValue(newValue);
      if (onChange) {
        onChange(e, newValue);
      }
    },
    [onChange, setValue],
  );

  const getRootProps = () => {
    return {};
  };

  const tabsContextValue = React.useMemo(() => {
    return { idPrefix, value, onSelected, orientation, direction, selectionFollowsFocus };
  }, [idPrefix, value, onSelected, orientation, direction, selectionFollowsFocus]);

  return {
    getRootProps,
    tabsContextValue,
  };
};

export default useTabs;
