import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { appendOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import { getTabPanelUnstyledUtilityClass } from './tabPanelUnstyledClasses';
import useTabPanel from './useTabPanel';
import TabPanelUnstyledProps, { TabPanelUnstyledTypeMap } from './TabPanelUnstyledProps';

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
 * - [Tabs](https://mui.com/components/tabs/)
 *
 * API:
 *
 * - [TabPanelUnstyled API](https://mui.com/api/tab-panel-unstyled/)
 */
const TabPanelUnstyled = React.forwardRef<unknown, TabPanelUnstyledProps>(function TabPanelUnstyled(
  props,
  ref,
) {
  const {
    children,
    className,
    value,
    components = {},
    componentsProps = {},
    component,
    ...other
  } = props;

  const { hidden, getRootProps } = useTabPanel(props);

  const ownerState = {
    ...props,
    hidden,
  };

  const classes = useUtilityClasses(ownerState);

  const TabPanelRoot: React.ElementType = component ?? components.Root ?? 'div';
  const tabPanelRootProps = appendOwnerState(
    TabPanelRoot,
    { ...other, ...componentsProps.root },
    ownerState,
  );

  return (
    <TabPanelRoot
      {...getRootProps()}
      ref={ref}
      role="tabpanel"
      {...tabPanelRootProps}
      className={clsx(classes.root, componentsProps.root?.className, className)}
    >
      {!hidden && children}
    </TabPanelRoot>
  );
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
   * @ignore
   */
  className: PropTypes.string,
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
    root: PropTypes.object,
  }),
  /**
   * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
} as any;

export default TabPanelUnstyled;
