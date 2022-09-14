import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import { getTabPanelUnstyledUtilityClass } from './tabPanelUnstyledClasses';
import useTabPanel from '@mui/base/useTabPanel';
import {
  TabPanelUnstyledProps,
  TabPanelUnstyledRootSlotProps,
  TabPanelUnstyledTypeMap,
} from './TabPanelUnstyled.types';

const useUtilityClasses = (ownerState: { hidden: boolean }) => {
  const { hidden } = ownerState;

  const slots = {
    root: ['root', hidden && 'hidden'],
  };

  return composeClasses(slots, getTabPanelUnstyledUtilityClass, {});
};
/**
 *
 * Demos:
 *
 * - [Unstyled Tabs](https://mui.com/base/react-tabs/)
 *
 * API:
 *
 * - [TabPanelUnstyled API](https://mui.com/base/api/tab-panel-unstyled/)
 */
const TabPanelUnstyled = React.forwardRef<unknown, TabPanelUnstyledProps>(function TabPanelUnstyled(
  props,
  ref,
) {
  const { children, value, components = {}, componentsProps = {}, component, ...other } = props;

  const { hidden, getRootProps } = useTabPanel(props);

  const ownerState = {
    ...props,
    hidden,
  };

  const classes = useUtilityClasses(ownerState);

  const TabPanelRoot: React.ElementType = component ?? components.Root ?? 'div';
  const tabPanelRootProps: WithOptionalOwnerState<TabPanelUnstyledRootSlotProps> = useSlotProps({
    elementType: TabPanelRoot,
    getSlotProps: getRootProps,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      role: 'tabpanel',
      ref,
    },
    ownerState,
    className: classes.root,
  });

  return <TabPanelRoot {...tabPanelRootProps}>{!hidden && children}</TabPanelRoot>;
}) as OverridableComponent<TabPanelUnstyledTypeMap>;

TabPanelUnstyled.propTypes /* remove-proptypes */ = {
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
   * The components used for each slot inside the TabPanel.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the TabPanel.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
} as any;

export default TabPanelUnstyled;
