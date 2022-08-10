import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import composeClasses from '../composeClasses';
import { getTabUnstyledUtilityClass } from './tabUnstyledClasses';
import {
  TabUnstyledProps,
  TabUnstyledTypeMap,
  TabUnstyledRootSlotProps,
} from './TabUnstyled.types';
import useTab from './useTab';
import { useSlotProps, WithOptionalOwnerState } from '../utils';

const useUtilityClasses = (ownerState: { selected: boolean; disabled: boolean }) => {
  const { selected, disabled } = ownerState;

  const slots = {
    root: ['root', selected && 'selected', disabled && 'disabled'],
  };

  return composeClasses(slots, getTabUnstyledUtilityClass, {});
};
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base/react-tabs/)
 *
 * API:
 *
 * - [TabUnstyled API](https://mui.com/base/api/tab-unstyled/)
 */
const TabUnstyled = React.forwardRef<unknown, TabUnstyledProps>(function TabUnstyled(props, ref) {
  const {
    action,
    children,
    value: valueProp,
    disabled = false,
    onChange,
    onClick,
    onFocus,
    component,
    components = {},
    componentsProps = {},
    ...other
  } = props;

  const tabRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();
  const handleRef = useForkRef(tabRef, ref);

  const { active, focusVisible, setFocusVisible, selected, getRootProps } = useTab({
    ...props,
    ref: handleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        tabRef.current!.focus();
      },
    }),
    [setFocusVisible],
  );

  const ownerState = {
    ...props,
    active,
    focusVisible,
    disabled,
    selected,
  };

  const classes = useUtilityClasses(ownerState);

  const TabRoot: React.ElementType = component ?? components.Root ?? 'button';
  const tabRootProps: WithOptionalOwnerState<TabUnstyledRootSlotProps> = useSlotProps({
    elementType: TabRoot,
    getSlotProps: getRootProps,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref,
    },
    ownerState,
    className: classes.root,
  });

  return <TabRoot {...tabRootProps}>{children}</TabRoot>;
}) as OverridableComponent<TabUnstyledTypeMap>;

TabUnstyled.propTypes /* remove-proptypes */ = {
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
   * The components used for each slot inside the Tab.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Tab.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
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
   * You can provide your own value. Otherwise, we fall back to the child position index.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
} as any;

export default TabUnstyled;
