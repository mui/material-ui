'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import { getTabsListUtilityClass } from './tabsListClasses';
import {
  TabsListOwnerState,
  TabsListProps,
  TabsListRootSlotProps,
  TabsListTypeMap,
} from './TabsList.types';
import { useTabsList } from '../useTabsList';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { TabsListProvider } from '../useTabsList/TabsListProvider';

const useUtilityClasses = (ownerState: { orientation: 'horizontal' | 'vertical' }) => {
  const { orientation } = ownerState;

  const slots = {
    root: ['root', orientation],
  };

  return composeClasses(slots, useClassNamesOverride(getTabsListUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/)
 *
 * API:
 *
 * - [TabsList API](https://mui.com/base-ui/react-tabs/components-api/#tabs-list)
 */
const TabsList = React.forwardRef(function TabsList<RootComponentType extends React.ElementType>(
  props: TabsListProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const { children, slotProps = {}, slots = {}, ...other } = props;

  const { isRtl, orientation, getRootProps, contextValue } = useTabsList({
    rootRef: forwardedRef,
  });

  const ownerState: TabsListOwnerState = {
    ...props,
    isRtl,
    orientation,
  };

  const classes = useUtilityClasses(ownerState);

  const TabsListRoot: React.ElementType = slots.root ?? 'div';
  const tabsListRootProps: WithOptionalOwnerState<TabsListRootSlotProps> = useSlotProps({
    elementType: TabsListRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root,
  });

  return (
    <TabsListProvider value={contextValue}>
      <TabsListRoot {...tabsListRootProps}>{children}</TabsListRoot>
    </TabsListProvider>
  );
}) as PolymorphicComponent<TabsListTypeMap>;

TabsList.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The props used for each slot inside the TabsList.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the TabsList.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
} as any;

export { TabsList };
