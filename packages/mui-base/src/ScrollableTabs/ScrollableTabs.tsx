import * as React from 'react';
import PropTypes from 'prop-types';
import { TabsRootSlotProps } from '@mui/base';
import useScrollableTabs from '@mui/base/useScrollableTabs';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import { getTabsUtilityClass } from './scrollableTabsClasses';
import {
  ScrollableTabsProps,
  ScrollableTabsOwnerState,
  ScrollableTabsTypeMap,
  TabsScrollerSlotProps,
} from './ScrollableTabs.types';
import TabsProvider from '../useTabs/TabsProvider';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

const useUtilityClasses = (ownerState: { orientation: 'horizontal' | 'vertical' }) => {
  const { orientation } = ownerState;

  const slots = {
    root: ['root', orientation],
  };

  return composeClasses(slots, useClassNamesOverride(getTabsUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [ScrollableTabs](https://mui.com/base/react-tabs/)
 *
 * API:
 *
 * - [ScrollableTabs API](https://mui.com/base/react-tabs/components-api/#tabs)
 */
const ScrollableTabs = React.forwardRef(function Tabs<RootComponentType extends React.ElementType>(
  props: ScrollableTabsProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const {
    children,
    value: valueProp,
    defaultValue,
    orientation = 'horizontal',
    direction = 'ltr',
    onChange,
    selectionFollowsFocus,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const { contextValue } = useScrollableTabs(props);

  const ownerState: ScrollableTabsOwnerState = {
    ...props,
    orientation,
    direction,
  };

  const classes = useUtilityClasses(ownerState);

  const TabsRoot: React.ElementType = slots.root ?? 'div';
  const tabsRootProps: WithOptionalOwnerState<TabsRootSlotProps> = useSlotProps({
    elementType: TabsRoot,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
    },
    ownerState,
    className: classes.root,
  });

  const TabsScroller: React.ElementType = slots.root ?? 'div';
  const tabsScrollerProps: WithOptionalOwnerState<TabsScrollerSlotProps> = useSlotProps({
    elementType: TabsScroller,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
    },
    ownerState,
    className: classes.root,
  });

  return (
    <TabsRoot {...tabsRootProps}>
      <TabsScroller {...tabsScrollerProps}>
        <TabsProvider value={contextValue}>{children}</TabsProvider>
      </TabsScroller>
    </TabsRoot>
  );
}) as PolymorphicComponent<ScrollableTabsTypeMap>;

ScrollableTabs.propTypes /* remove-proptypes */ = {
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
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
   * The props used for each slot inside the ScrollableTabs.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the ScrollableTabs.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `null`.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
} as any;

export default ScrollableTabs;
