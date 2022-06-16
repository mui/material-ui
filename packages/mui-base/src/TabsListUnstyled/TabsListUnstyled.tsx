import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '../composeClasses';
import { appendOwnerState, WithOptionalOwnerState } from '../utils';
import { getTabsListUnstyledUtilityClass } from './tabsListUnstyledClasses';
import {
  TabsListUnstyledProps,
  TabsListUnstyledRootSlotProps,
  TabsListUnstyledTypeMap,
} from './TabsListUnstyled.types';
import useTabsList from './useTabsList';

const useUtilityClasses = (ownerState: { orientation: 'horizontal' | 'vertical' }) => {
  const { orientation } = ownerState;

  const slots = {
    root: ['root', orientation],
  };

  return composeClasses(slots, getTabsListUnstyledUtilityClass, {});
};

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base/react-tabs/)
 *
 * API:
 *
 * - [TabsListUnstyled API](https://mui.com/base/api/tabs-list-unstyled/)
 */
const TabsListUnstyled = React.forwardRef<unknown, TabsListUnstyledProps>((props, ref) => {
  const { className, children, component, components = {}, componentsProps = {}, ...other } = props;

  const { isRtl, orientation, getRootProps, processChildren } = useTabsList({ ...props, ref });

  const ownerState = {
    ...props,
    isRtl,
    orientation,
  };

  const classes = useUtilityClasses(ownerState);

  const TabsListRoot: React.ElementType = component ?? components.Root ?? 'div';
  const tabsListRootProps: WithOptionalOwnerState<TabsListUnstyledRootSlotProps> = appendOwnerState(
    TabsListRoot,
    {
      ...getRootProps(),
      ...other,
      ...componentsProps.root,
      className: clsx(className, componentsProps.root?.className, classes.root),
    },
    ownerState,
  );

  const processedChildren = processChildren();

  return <TabsListRoot {...tabsListRootProps}>{processedChildren}</TabsListRoot>;
}) as OverridableComponent<TabsListUnstyledTypeMap>;

TabsListUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the TabsList.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the TabsList.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object,
  }),
} as any;

export default TabsListUnstyled;
