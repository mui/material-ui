import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import { getTabPanelUtilityClass } from './tabPanelClasses';
import useTabPanel from '../useTabPanel/useTabPanel';
import { TabPanelProps, TabPanelRootSlotProps, TabPanelTypeMap } from './TabPanel.types';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

const useUtilityClasses = (ownerState: { hidden: boolean }) => {
  const { hidden } = ownerState;

  const slots = {
    root: ['root', hidden && 'hidden'],
  };

  return composeClasses(slots, useClassNamesOverride(getTabPanelUtilityClass));
};
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base/react-tabs/)
 *
 * API:
 *
 * - [TabPanel API](https://mui.com/base/react-tabs/components-api/#tab-panel)
 */
const TabPanel = React.forwardRef<unknown, TabPanelProps>(function TabPanel(props, ref) {
  const { children, component, value, slotProps = {}, slots = {}, ...other } = props;

  const { hidden, getRootProps } = useTabPanel(props);

  const ownerState = {
    ...props,
    hidden,
  };

  const classes = useUtilityClasses(ownerState);

  const TabPanelRoot: React.ElementType = component ?? slots.root ?? 'div';
  const tabPanelRootProps: WithOptionalOwnerState<TabPanelRootSlotProps> = useSlotProps({
    elementType: TabPanelRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      role: 'tabpanel',
      ref,
    },
    ownerState,
    className: classes.root,
  });

  return <TabPanelRoot {...tabPanelRootProps}>{!hidden && children}</TabPanelRoot>;
}) as OverridableComponent<TabPanelTypeMap>;

TabPanel.propTypes /* remove-proptypes */ = {
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
   * The props used for each slot inside the TabPanel.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the TabPanel.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
   * If not provided, it will fall back to the index of the panel.
   * It is recommended to explicitly provide it, as it's required for the tab panel to be rendered on the server.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
} as any;

export default TabPanel;
