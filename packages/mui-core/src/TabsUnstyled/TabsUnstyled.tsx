import * as React from 'react';
import PropTypes from 'prop-types';
import { useControlled } from '@mui/material/utils';
import TabsUnstyledProps from './TabsUnstyledProps';
import Context from './TabsContext';

function useUniquePrefix() {
  const [id, setId] = React.useState<string | null>(null);
  React.useEffect(() => {
    setId(`mui-p-${Math.round(Math.random() * 1e5)}`);
  }, []);
  return id;
}
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/components/tabs/)
 *
 * API:
 *
 * - [TabsUnstyled API](https://mui.com/api/tabs-unstyled/)
 */
function TabsUnstyled(props: TabsUnstyledProps) {
  const { children, value: valueProp, defaultValue } = props;
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'TabsUnstyled',
    state: 'value',
  });

  const idPrefix = useUniquePrefix();

  const context = React.useMemo(() => {
    return { idPrefix, value, onSelected: setValue };
  }, [idPrefix, value, setValue]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

TabsUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.number, PropTypes.string]),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.number, PropTypes.string]),
} as any;

export default TabsUnstyled;
