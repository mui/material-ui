import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useTabs, TabsContext } from '@mui/base/TabsUnstyled';
import { useSlotProps } from '@mui/base/utils';
import { SheetRoot } from '../Sheet/Sheet';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getTabsUtilityClass } from './tabsClasses';
import { TabsOwnerState, TabsTypeMap } from './TabsProps';

const useUtilityClasses = (ownerState: TabsOwnerState) => {
  const { orientation } = ownerState;

  const slots = {
    root: ['root', orientation],
  };

  return composeClasses(slots, getTabsUtilityClass, {});
};

const TabsRoot = styled(SheetRoot, {
  name: 'JoyTabs',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TabsOwnerState }>({});

const Tabs = React.forwardRef(function Tabs(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyTabs',
  });

  const {
    children,
    value: valueProp,
    defaultValue,
    orientation = 'horizontal',
    direction = 'ltr',
    component,
    onChange,
    selectionFollowsFocus,
    variant = 'plain',
    color = 'neutral',
    ...other
  } = props;

  const { tabsContextValue } = useTabs(props);

  const ownerState = {
    ...props,
    orientation,
    direction,
    variant,
    color,
  };

  const classes = useUtilityClasses(ownerState);

  const tabsRootProps = useSlotProps({
    elementType: TabsRoot,
    externalSlotProps: {},
    externalForwardedProps: other,
    additionalProps: {
      ref,
      as: component,
    },
    ownerState,
    className: classes.root,
  });

  return (
    // @ts-ignore `defaultValue` between HTMLDiv and TabsProps is conflicted.
    <TabsRoot {...tabsRootProps}>
      <TabsContext.Provider value={tabsContextValue}>{children}</TabsContext.Provider>
    </TabsRoot>
  );
}) as OverridableComponent<TabsTypeMap>;

Tabs.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the Tabs if `src` is not set.
   * This can be an element, or just a string.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Tabs;
