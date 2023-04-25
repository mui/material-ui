import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import composeClasses from '../composeClasses';
import { getTabUtilityClass } from './tabClasses';
import { TabProps, TabTypeMap, TabRootSlotProps, TabOwnerState } from './Tab.types';
import useTab from '../useTab';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

const useUtilityClasses = (ownerState: TabOwnerState) => {
  const { selected, disabled } = ownerState;

  const slots = {
    root: ['root', selected && 'selected', disabled && 'disabled'],
  };

  return composeClasses(slots, useClassNamesOverride(getTabUtilityClass));
};
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base/react-tabs/)
 *
 * API:
 *
 * - [Tab API](https://mui.com/base/react-tabs/components-api/#tab)
 */
const Tab = React.forwardRef<unknown, TabProps>(function Tab(props, ref) {
  const {
    action,
    children,
    value: valueProp,
    disabled = false,
    onChange,
    onClick,
    onFocus,
    component,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const tabRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();
  const handleRef = useForkRef(tabRef, ref);

  const { active, highlighted, selected, getRootProps } = useTab({
    ...props,
    ref: handleRef,
  });

  const ownerState = {
    ...props,
    active,
    disabled,
    highlighted,
    selected,
  };

  const classes = useUtilityClasses(ownerState);

  const TabRoot: React.ElementType = component ?? slots.root ?? 'button';
  const tabRootProps: WithOptionalOwnerState<TabRootSlotProps> = useSlotProps({
    elementType: TabRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref,
    },
    ownerState,
    className: classes.root,
  });

  return <TabRoot {...tabRootProps}>{children}</TabRoot>;
}) as OverridableComponent<TabTypeMap>;

Tab.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Callback invoked when new value is being set.
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * The props used for each slot inside the Tab.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Tab.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * You can provide your own value. Otherwise, it falls back to the child position index.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
} as any;

export default Tab;
