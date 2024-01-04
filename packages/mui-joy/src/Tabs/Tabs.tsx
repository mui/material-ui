'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useTabs, TabsProvider } from '@mui/base/useTabs';
import { getPath } from '@mui/system';
import { styled, useThemeProps } from '../styles';
import { resolveSxValue } from '../styles/styleUtils';

import SizeTabsContext from './SizeTabsContext';
import { getTabsUtilityClass } from './tabsClasses';
import { TabsOwnerState, TabsTypeMap } from './TabsProps';
import useSlot from '../utils/useSlot';

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

const TabsRoot = styled('div', {
  name: 'JoyTabs',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TabsOwnerState }>(({ ownerState, theme }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  const { bgcolor, backgroundColor, background, p, padding } = resolveSxValue(
    { theme, ownerState },
    ['bgcolor', 'backgroundColor', 'background', 'p', 'padding'],
  );
  const resolvedBg =
    (getPath(theme, `palette.${bgcolor}`) as string) ||
    bgcolor ||
    (getPath(theme, `palette.${backgroundColor}`) as string) ||
    backgroundColor ||
    background ||
    variantStyle?.backgroundColor ||
    variantStyle?.background ||
    theme.vars.palette.background.surface;
  return {
    ...(ownerState.size === 'sm' && {
      '--Tabs-spacing': '0.75rem',
    }),
    ...(ownerState.size === 'md' && {
      '--Tabs-spacing': '1rem',
    }),
    ...(ownerState.size === 'lg' && {
      '--Tabs-spacing': '1.25rem',
    }),
    '--Tab-indicatorThickness': '2px',
    '--Icon-color':
      ownerState.color !== 'neutral' || ownerState.variant === 'solid'
        ? 'currentColor'
        : theme.vars.palette.text.icon,
    '--TabList-stickyBackground': resolvedBg === 'transparent' ? 'initial' : resolvedBg, // for sticky TabList
    display: 'flex',
    flexDirection: 'column',
    ...(ownerState.orientation === 'vertical' && {
      flexDirection: 'row',
    }),
    backgroundColor: theme.vars.palette.background.surface,
    position: 'relative',
    ...theme.typography[`body-${ownerState.size!}`],
    ...theme.variants[ownerState.variant!]?.[ownerState.color!],
    ...(p !== undefined && { '--Tabs-padding': p }),
    ...(padding !== undefined && { '--Tabs-padding': padding }),
  };
});
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/joy-ui/react-tabs/)
 *
 * API:
 *
 * - [Tabs API](https://mui.com/joy-ui/api/tabs/)
 */
const Tabs = React.forwardRef(function Tabs(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyTabs',
  });

  const {
    children,
    value: valueProp,
    defaultValue: defaultValueProp,
    orientation = 'horizontal',
    direction = 'ltr',
    component,
    onChange,
    selectionFollowsFocus,
    variant = 'plain',
    color = 'neutral',
    size = 'md',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const defaultValue = defaultValueProp || (valueProp === undefined ? 0 : undefined);
  const { contextValue } = useTabs({ ...props, orientation, defaultValue });

  const ownerState = {
    ...props,
    orientation,
    direction,
    variant,
    color,
    size,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    elementType: TabsRoot,
    externalForwardedProps,
    additionalProps: {
      ref,
      as: component,
    },
    ownerState,
    className: classes.root,
  });

  return (
    // @ts-ignore `defaultValue` between HTMLDiv and TabsProps is conflicted.
    <SlotRoot {...rootProps}>
      <TabsProvider value={contextValue}>
        <SizeTabsContext.Provider value={size}>{children}</SizeTabsContext.Provider>
      </TabsProvider>
    </SlotRoot>
  );
}) as OverridableComponent<TabsTypeMap>;

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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
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
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
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
   * If you don't want any selected `Tab`, you can set this prop to `null`.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Tabs;
