import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useControlled as useControlled } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { appendOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import { getTabsUnstyledUtilityClass } from './tabsUnstyledClasses';
import TabsUnstyledProps, { TabsUnstyledTypeMap } from './TabsUnstyledProps';
import Context from './TabsContext';

const useUtilityClasses = (ownerState: { orientation: 'horizontal' | 'vertical' }) => {
  const { orientation } = ownerState;

  const slots = {
    root: ['root', orientation ],
  };

  return composeClasses(slots, getTabsUnstyledUtilityClass, {});
};

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
const TabsUnstyled = React.forwardRef<unknown, TabsUnstyledProps>((props, ref) => {
  const {
    children,
    className,
    value: valueProp,
    defaultValue,
    orientation = 'horizontal',
    direction = 'ltr',
    component,
    components = {},
    componentsProps = {},
    ...other
  } = props;
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'TabsUnstyled',
    state: 'value',
  });

  const idPrefix = useUniquePrefix();

  const context = React.useMemo(() => {
    return { idPrefix, value, onSelected: setValue, orientation, direction };
  }, [idPrefix, value, setValue, orientation, direction]);

  const ownerState = {
    ...props,
    orientation,
    direction,
  };

  const classes = useUtilityClasses(ownerState);

  const TabsRoot: React.ElementType = component ?? components.Root ?? 'div';
  const tabsRootProps = appendOwnerState(
    TabsRoot,
    { ...other, ...componentsProps.root },
    ownerState,
  );

  return (
    <TabsRoot {...tabsRootProps} ref={ref} className={clsx(classes.root, componentsProps.root?.className, className)}>
      <Context.Provider value={context}>{children}</Context.Provider>
    </TabsRoot>
  );
}) as OverridableComponent<TabsUnstyledTypeMap>;

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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Tabs.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Tabs.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.number, PropTypes.string]),
  /**
   * The direction of the text.
   * @default 'ltr'
   */
  direction: PropTypes.oneOf(['ltr', 'rtl']),
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.number, PropTypes.string]),
} as any;

export default TabsUnstyled;
