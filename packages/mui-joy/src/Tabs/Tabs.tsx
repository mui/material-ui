import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useTabs, TabsContext } from '@mui/base/TabsUnstyled';
import { useSlotProps } from '@mui/base/utils';
import { SheetRoot } from '../Sheet/Sheet';
import { styled, useThemeProps } from '../styles';
import SizeTabsContext from './SizeTabsContext';
import { getTabsUtilityClass } from './tabsClasses';
import { TabsOwnerState, TabsTypeMap } from './TabsProps';

const useUtilityClasses = (ownerState: TabsOwnerState) => {
  const { orientation, variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      orientation,
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getTabsUtilityClass, {});
};

const TabsRoot = styled(SheetRoot, {
  name: 'JoyTabs',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TabsOwnerState }>(({ ownerState, theme }) => ({
  ...(ownerState.size === 'sm' && {
    '--Tabs-gap': '3px',
  }),
  ...(ownerState.size === 'md' && {
    '--Tabs-gap': '4px',
  }),
  ...(ownerState.size === 'lg' && {
    '--Tabs-gap': '0.5rem',
  }),
  '--List-radius': theme.vars.radius.md, // targets TabList which reuses styles from List.
  display: 'flex',
  flexDirection: 'column',
  ...(ownerState.orientation === 'vertical' && {
    flexDirection: 'row',
  }),
}));

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
    size = 'md',
    ...other
  } = props;

  const { tabsContextValue } = useTabs({ ...props, orientation });

  const ownerState = {
    ...props,
    orientation,
    direction,
    variant,
    color,
    size,
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
      <TabsContext.Provider value={tabsContextValue}>
        <SizeTabsContext.Provider value={size}>{children}</SizeTabsContext.Provider>
      </TabsContext.Provider>
    </TabsRoot>
  );
}) as OverridableComponent<TabsTypeMap>;

Tabs.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.number, PropTypes.string]),
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
   * The size of the component.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.number, PropTypes.string]),
  /**
   * The variant to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Tabs;
