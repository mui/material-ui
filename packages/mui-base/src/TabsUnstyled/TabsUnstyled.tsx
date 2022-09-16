import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import { getTabsUnstyledUtilityClass } from './tabsUnstyledClasses';
import {
  TabsUnstyledProps,
  TabsUnstyledRootSlotProps,
  TabsUnstyledTypeMap,
} from './TabsUnstyled.types';
import useTabs from './useTabs';
import Context from './TabsContext';

const useUtilityClasses = (ownerState: { orientation: 'horizontal' | 'vertical' }) => {
  const { orientation } = ownerState;

  const slots = {
    root: ['root', orientation],
  };

  return composeClasses(slots, getTabsUnstyledUtilityClass, {});
};

/**
 *
 * Demos:
 *
 * - [Unstyled tabs](https://mui.com/base/react-tabs/)
 *
 * API:
 *
 * - [TabsUnstyled API](https://mui.com/base/api/tabs-unstyled/)
 */
const TabsUnstyled = React.forwardRef<unknown, TabsUnstyledProps>((props, ref) => {
  const {
    children,
    value: valueProp,
    defaultValue,
    orientation = 'horizontal',
    direction = 'ltr',
    component,
    components = {},
    componentsProps = {},
    onChange,
    selectionFollowsFocus,
    ...other
  } = props;

  const { tabsContextValue } = useTabs(props);

  const ownerState = {
    ...props,
    orientation,
    direction,
  };

  const classes = useUtilityClasses(ownerState);

  const TabsRoot: React.ElementType = component ?? components.Root ?? 'div';
  const tabsRootProps: WithOptionalOwnerState<TabsUnstyledRootSlotProps> = useSlotProps({
    elementType: TabsRoot,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref,
    },
    ownerState,
    className: classes.root,
  });

  return (
    <TabsRoot {...tabsRootProps}>
      <Context.Provider value={tabsContextValue}>{children}</Context.Provider>
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
  componentsProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
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
   * Callback invoked when new value is being set.
   */
  onChange: PropTypes.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: PropTypes.bool,
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.number, PropTypes.string]),
} as any;

export default TabsUnstyled;
