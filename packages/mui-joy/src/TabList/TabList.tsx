'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useTabsList, TabsListProvider } from '@mui/base/useTabsList';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { StyledList } from '../List/List';
import ListProvider, { scopedVariables } from '../List/ListProvider';
import SizeTabsContext from '../Tabs/SizeTabsContext';
import { getTabListUtilityClass } from './tabListClasses';
import { TabListProps, TabListOwnerState, TabListTypeMap } from './TabListProps';
import tabClasses from '../Tab/tabClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: TabListOwnerState) => {
  const { orientation, size, variant, color } = ownerState;

  const slots = {
    root: [
      'root',
      orientation,
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getTabListUtilityClass, {});
};

const TabListRoot = styled(StyledList, {
  name: 'JoyTabList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TabListOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    '--List-gap': '0px',
    '--ListDivider-gap': '0px',
    '--ListItem-paddingX': 'var(--Tabs-spacing)',
    '--ListItem-gap': '0.375rem',
    // the `var(--unknown,)` is a workaround because emotion does not support space toggle.
    '--unstable_TabList-hasUnderline': ownerState.disableUnderline ? 'var(--unknown,)' : 'initial',
    ...scopedVariables,
    flexGrow: 'initial',
    flexDirection: ownerState.orientation === 'vertical' ? 'column' : 'row',
    borderRadius: `var(--List-radius, 0px)`,
    padding: `var(--List-padding, 0px)`,
    zIndex: 1,
    ...(ownerState.sticky && {
      // sticky in list item can be found in grouped options
      position: 'sticky',
      top: ownerState.sticky === 'top' ? 'calc(-1 * var(--Tabs-padding, 0px))' : 'initial',
      bottom: ownerState.sticky === 'bottom' ? 'calc(-1 * var(--Tabs-padding, 0px))' : 'initial',
      backgroundColor:
        variantStyle?.backgroundColor ||
        `var(--TabList-stickyBackground, ${theme.vars.palette.background.body})`,
    }),
    ...(!ownerState.disableUnderline && {
      ...(ownerState.underlinePlacement === 'bottom' && {
        '--unstable_TabList-underlineBottom': '1px',
        paddingBottom: 1,
        boxShadow: `inset 0 -1px ${theme.vars.palette.divider}`,
      }),
      ...(ownerState.underlinePlacement === 'top' && {
        '--unstable_TabList-underlineTop': '1px',
        paddingTop: 1,
        boxShadow: `inset 0 1px ${theme.vars.palette.divider}`,
      }),
      ...(ownerState.underlinePlacement === 'right' && {
        '--unstable_TabList-underlineRight': '1px',
        paddingRight: 1,
        boxShadow: `inset -1px 0 ${theme.vars.palette.divider}`,
      }),
      ...(ownerState.underlinePlacement === 'left' && {
        '--unstable_TabList-underlineLeft': '1px',
        paddingLeft: 1,
        boxShadow: `inset 1px 0 ${theme.vars.palette.divider}`,
      }),
    }),
    ...(ownerState.tabFlex && {
      [`& .${tabClasses.root}`]: {
        flex: ownerState.tabFlex,
      },
    }),
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
 * - [TabList API](https://mui.com/joy-ui/api/tab-list/)
 */
const TabList = React.forwardRef(function TabList(inProps, ref) {
  const props = useThemeProps<typeof inProps & TabListProps>({
    props: inProps,
    name: 'JoyTabList',
  });

  const tabsSize = React.useContext(SizeTabsContext);
  const { isRtl, orientation, getRootProps, contextValue } = useTabsList({
    rootRef: ref,
  });

  const {
    component = 'div',
    children,
    variant = 'plain',
    color = 'neutral',
    size: sizeProp,
    disableUnderline = false,
    underlinePlacement = orientation === 'horizontal' ? 'bottom' : 'right',
    tabFlex,
    sticky,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const size = sizeProp ?? tabsSize;

  const ownerState = {
    ...props,
    isRtl,
    orientation,
    variant,
    color,
    size,
    sticky,
    tabFlex,
    nesting: false,
    disableUnderline,
    underlinePlacement,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    elementType: TabListRoot,
    getSlotProps: getRootProps,
    externalForwardedProps,
    ownerState,
    className: classes.root,
  });

  return (
    // @ts-ignore conflicted ref types
    <SlotRoot {...rootProps}>
      <TabsListProvider value={contextValue}>
        <ListProvider row={orientation === 'horizontal'} nested>
          {children}
        </ListProvider>
      </TabsListProvider>
    </SlotRoot>
  );
}) as OverridableComponent<TabListTypeMap>;

TabList.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Used to render icon or text elements inside the TabList if `src` is not set.
   * This can be an element, or just a string.
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
   * If `true`, the TabList's underline will disappear.
   * @default false
   */
  disableUnderline: PropTypes.bool,
  /**
   * The size of the component.
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
   * If provided, the TabList will have postion `sticky`.
   */
  sticky: PropTypes.oneOf(['bottom', 'top']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The flex value of the Tab.
   * @example tabFlex={1} will set flex: '1 1 auto' on each tab (stretch the tab to equally fill the available space).
   */
  tabFlex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The placement of the TabList's underline.
   * @default orientation === 'horizontal' ? 'bottom' : 'right'
   */
  underlinePlacement: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default TabList;
