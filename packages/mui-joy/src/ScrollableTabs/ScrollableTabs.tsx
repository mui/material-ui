import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { TabsProvider, unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import useScrollableTabs from '@mui/base/useScrollableTabs';
import ScrollableTabsProvider from '@mui/base/useScrollableTabs/ScrollableTabsProvider';
import { SheetRoot } from '../Sheet/Sheet';
import { styled, useThemeProps } from '../styles';
import { useColorInversion } from '../styles/ColorInversion';
import SizeTabsContext from './SizeTabsContext';
import { getTabsUtilityClass } from './scrollableTabsClasses';
import { ScrollableTabsOwnerState, ScrollableTabsTypeMap } from './ScrollableTabsProps';
import useSlot from '../utils/useSlot';
import selectClasses from '../Select/selectClasses';
import useTabs from '@mui/base/useTabs';

// const getConditionalElements = () => {
//   const conditionalElements = {};
//
//   conditionalElements.scrollbarSizeListener = scrollable ? (
//     <TabsScrollbarSize
//       onChange={handleScrollbarSizeChange}
//       className={clsx(classes.scrollableX, classes.hideScrollbar)}
//     />
//   ) : null;
//
//   const scrollButtonsActive = displayScroll.start || displayScroll.end;
//   const showScrollButtons =
//     scrollable && ((scrollButtons === 'auto' && scrollButtonsActive) || scrollButtons === true);
//
//   conditionalElements.scrollButtonStart = showScrollButtons ? (
//     <ScrollButtonComponent
//       slots={{ StartScrollButtonIcon: slots.StartScrollButtonIcon }}
//       slotProps={{ startScrollButtonIcon: startScrollButtonIconProps }}
//       orientation={orientation}
//       direction={isRtl ? 'right' : 'left'}
//       onClick={handleStartScrollClick}
//       disabled={!displayScroll.start}
//       {...TabScrollButtonProps}
//       className={clsx(classes.scrollButtons, TabScrollButtonProps.className)}
//     />
//   ) : null;
//
//   conditionalElements.scrollButtonEnd = showScrollButtons ? (
//     <ScrollButtonComponent
//       slots={{ EndScrollButtonIcon: slots.EndScrollButtonIcon }}
//       slotProps={{
//         endScrollButtonIcon: endScrollButtonIconProps,
//       }}
//       orientation={orientation}
//       direction={isRtl ? 'left' : 'right'}
//       onClick={handleEndScrollClick}
//       disabled={!displayScroll.end}
//       {...TabScrollButtonProps}
//       className={clsx(classes.scrollButtons, TabScrollButtonProps.className)}
//     />
//   ) : null;
//
//   return conditionalElements;
// };

const useUtilityClasses = (ownerState: ScrollableTabsOwnerState) => {
  const { orientation, variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      orientation,
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    scroller: ['scroller'],
    scrollButtonStart: ['scrollButtonStart'],
    scrollButtonEnd: ['scrollButtonEnd'],
  };

  return composeClasses(slots, getTabsUtilityClass, {});
};

const TabsRoot = styled(SheetRoot, {
  name: 'JoyTabs',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ScrollableTabsOwnerState }>(({ ownerState }) => ({
  ...(ownerState.size === 'sm' && {
    '--Tabs-gap': '3px',
  }),
  ...(ownerState.size === 'md' && {
    '--Tabs-gap': '4px',
  }),
  ...(ownerState.size === 'lg' && {
    '--Tabs-gap': '0.5rem',
  }),
  display: 'flex',
  flexDirection: 'column',
  ...(ownerState.orientation === 'vertical' && {
    flexDirection: 'row',
    alignItems: 'flex-start',
  }),
}));

const TabsScroller = styled('div', {
  name: 'JoyTabs',
  slot: 'Scroller',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.scroller,
      ownerState.fixed && styles.fixed,
      ownerState.hideScrollbar && styles.hideScrollbar,
      ownerState.scrollableX && styles.scrollableX,
      ownerState.scrollableY && styles.scrollableY,
    ];
  },
})<{ ownerState: ScrollableTabsOwnerState }>(({ ownerState }) => ({
  position: 'relative',
  display: 'inline-block',
  flex: '1 1 auto',
  whiteSpace: 'nowrap',
  overflowX: 'hidden',
  width: '100%',
  ...(ownerState.hideScrollbar && {
    // Hide dimensionless scrollbar on macOS
    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // Safari + Chrome
    },
  }),
  ...(ownerState.scrollableX && {
    overflowX: 'auto',
    overflowY: 'hidden',
  }),
  ...(ownerState.scrollableY && {
    overflowY: 'auto',
    overflowX: 'hidden',
  }),
}));

const ScrollButton = styled('span', {
  name: 'JoyScrollableTabs',
  slot: 'ScrollButton',
})<{ ownerState: ScrollableTabsOwnerState }>(({ ownerState }) => ({
  ...(ownerState.size === 'sm' && {
    '--Icon-fontSize': '1.125rem',
  }),
  ...(ownerState.size === 'md' && {
    '--Icon-fontSize': '1.25rem',
  }),
  ...(ownerState.size === 'lg' && {
    '--Icon-fontSize': '1.5rem',
  }),
  color: 'var(--Select-indicatorColor)',
  display: 'inherit',
  alignItems: 'center',
  marginInlineStart: 'var(--Select-gap)',
  marginInlineEnd: 'calc(var(--Select-paddingInline) / -4)',
  [`.${selectClasses.endDecorator} + &`]: {
    marginInlineStart: 'calc(var(--Select-gap) / 2)',
  },
}));

/**
 *
 * Demos:
 *
 * - [ScrollableTabs](https://mui.com/joy-ui/react-tabs/)
 *
 * API:
 *
 * - [ScrollableTabs API](https://mui.com/joy-ui/api/tabs/)
 */
const ScrollableTabs = React.forwardRef(function Tabs(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyScrollableTabs',
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
    color: colorProp = 'neutral',
    size = 'md',
    slots = {},
    slotProps = {},
    visibleScrollbar = false,
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);
  const defaultValue = defaultValueProp || (valueProp === undefined ? 0 : undefined);
  const vertical = orientation === 'vertical';

  const {
    contextValue: scrollableTabsContextValue,
    tabsRef,
    getStartScrollButtonProps,
    getEndScrollButtonProps,
  } = useScrollableTabs({
    ...props,
    orientation,
    defaultValue,
  });
  const { contextValue } = useTabs({ ...props, orientation, defaultValue });

  // const rootRef = React.useRef<HTMLElement | null>(null);
  // const scrollerRef = React.useRef<HTMLElement | null>(null);
  // const scrollButtonStartRef = React.useRef<HTMLElement | null>(null);
  // const scrollButtonEndRef = React.useRef<HTMLElement | null>(null);

  const ownerState = {
    ...props,
    orientation,
    direction,
    variant,
    color,
    size,
    hideScrollbar: !visibleScrollbar,
    scrollableX: !vertical,
    scrollableY: vertical,
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

  const [SlotScroller, scrollerProps] = useSlot('scroller', {
    ref: tabsRef,
    elementType: TabsScroller,
    externalForwardedProps,
    ownerState,
    className: classes.scroller,
  });
  // Scroller Props
  // className={classes.scroller}
  // ownerState={ownerState}
  // style={{
  //   overflow: scrollerStyle.overflow,
  //     [vertical ? `margin${isRtl ? 'Left' : 'Right'}` : 'marginBottom']: visibleScrollbar
  //     ? undefined
  //     : -scrollerStyle.scrollbarWidth,
  // }}
  // ref={tabsRef}
  // onScroll={handleTabsScroll}

  const [SlotScrollButtonStart, scrollButtonStartProps] = useSlot('scrollButtonStart', {
    elementType: ScrollButton,
    externalForwardedProps,
    getSlotProps: getStartScrollButtonProps,
    ownerState,
    className: classes.scrollButtonStart,
  });

  const [SlotScrollButtonEnd, scrollButtonEndProps] = useSlot('scrollButtonEnd', {
    elementType: ScrollButton,
    externalForwardedProps,
    getSlotProps: getEndScrollButtonProps,
    ownerState,
    className: classes.scrollButtonEnd,
  });

  return (
    // @ts-ignore `defaultValue` between HTMLDiv and ScrollableTabsProps is conflicted.
    <SlotRoot {...rootProps}>
      <ScrollableTabsProvider value={scrollableTabsContextValue}>
        <TabsProvider value={contextValue}>
          <SlotScrollButtonStart {...scrollButtonStartProps}>test</SlotScrollButtonStart>
          <SlotScroller {...scrollerProps}>
            {/* {mounted && indicator} */}
            <SizeTabsContext.Provider value={size}>{children}</SizeTabsContext.Provider>
          </SlotScroller>
          <SlotScrollButtonEnd {...scrollButtonEndProps}>test</SlotScrollButtonEnd>
        </TabsProvider>
      </ScrollableTabsProvider>
    </SlotRoot>
  );
}) as OverridableComponent<ScrollableTabsTypeMap>;

ScrollableTabs.propTypes /* remove-proptypes */ = {
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

export default ScrollableTabs;
