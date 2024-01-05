'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { getTabsUtilityClass } from './tabsClasses';
import { TabsOwnerState, TabsProps, TabsRootSlotProps, TabsTypeMap } from './Tabs.types';
import { useTabs } from '../useTabs';
import { TabsProvider } from '../useTabs/TabsProvider';
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
 * - [Tabs](https://mui.com/base-ui/react-tabs/)
 *
 * API:
 *
 * - [Tabs API](https://mui.com/base-ui/react-tabs/components-api/#tabs)
 */
const Tabs = React.forwardRef(function Tabs<RootComponentType extends React.ElementType>(
  props: TabsProps<RootComponentType>,
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

  const ownerState: TabsOwnerState = {
    ...props,
    orientation,
    direction,
  };

  const { contextValue } = useTabs(ownerState);

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

  return (
    <TabsRoot {...tabsRootProps}>
      <TabsProvider value={contextValue}>{children}</TabsProvider>
    </TabsRoot>
  );
}) as PolymorphicComponent<TabsTypeMap>;

Tabs.propTypes /* remove-proptypes */ = {
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
   * The props used for each slot inside the Tabs.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Tabs.
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

export { Tabs };
