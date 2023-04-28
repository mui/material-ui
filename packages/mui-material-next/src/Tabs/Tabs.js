import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  refType,
  unstable_debounce as debounce,
  unstable_getNormalizedScrollLeft as getNormalizedScrollLeft,
  unstable_detectScrollType as detectScrollType,
  unstable_useEventCallback as useEventCallback,
  unstable_ownerWindow as ownerWindow,
} from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import useTabs, { TabsProvider } from '@mui/base/useTabs';
import { styled, useThemeProps, useTheme } from '@mui/material/styles';
import animate from '@mui/material/internal/animate';
import TabScrollButton from '../TabScrollButton';
import ScrollbarSize from './ScrollbarSize';
import tabsClasses, { getTabsUtilityClass } from './tabsClasses';
import TabsList from './TabsList';

const useUtilityClasses = (ownerState) => {
  const {
    vertical,
    fixed,
    hideScrollbar,
    scrollableX,
    scrollableY,
    centered,
    scrollButtonsHideMobile,
    classes,
  } = ownerState;

  const slots = {
    root: ['root', vertical && 'vertical'],
    scroller: [
      'scroller',
      fixed && 'fixed',
      hideScrollbar && 'hideScrollbar',
      scrollableX && 'scrollableX',
      scrollableY && 'scrollableY',
    ],
    flexContainer: ['flexContainer', vertical && 'flexContainerVertical', centered && 'centered'],
    indicator: ['indicator'],
    scrollButtons: ['scrollButtons', scrollButtonsHideMobile && 'scrollButtonsHideMobile'],
    scrollableX: [scrollableX && 'scrollableX'],
    hideScrollbar: [hideScrollbar && 'hideScrollbar'],
  };

  return composeClasses(slots, getTabsUtilityClass, classes);
};

const TabsRoot = styled('div', {
  name: 'MuiTabs',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${tabsClasses.scrollButtons}`]: styles.scrollButtons },
      {
        [`& .${tabsClasses.scrollButtons}`]:
          ownerState.scrollButtonsHideMobile && styles.scrollButtonsHideMobile,
      },
      styles.root,
      ownerState.vertical && styles.vertical,
    ];
  },
})(({ ownerState, theme }) => ({
  overflow: 'hidden',
  minHeight: 48,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  display: 'flex',
  ...(ownerState.vertical && {
    flexDirection: 'column',
  }),
  ...(ownerState.scrollButtonsHideMobile && {
    [`& .${tabsClasses.scrollButtons}`]: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  }),
}));

const TabsScroller = styled('div', {
  name: 'MuiTabs',
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
})(({ ownerState }) => ({
  position: 'relative',
  display: 'inline-block',
  flex: '1 1 auto',
  whiteSpace: 'nowrap',
  ...(ownerState.fixed && {
    overflowX: 'hidden',
    width: '100%',
  }),
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

const TabsIndicator = styled('span', {
  name: 'MuiTabs',
  slot: 'Indicator',
  overridesResolver: (props, styles) => styles.indicator,
})(({ ownerState, theme }) => ({
  position: 'absolute',
  height: 2,
  bottom: 0,
  width: '100%',
  transition: theme.transitions.create(),
  ...(ownerState.indicatorColor === 'primary' && {
    backgroundColor: theme.palette.primary.main,
  }),
  ...(ownerState.indicatorColor === 'secondary' && {
    backgroundColor: theme.palette.secondary.main,
  }),
  ...(ownerState.vertical && {
    height: '100%',
    width: 2,
    right: 0,
  }),
}));

const TabsScrollbarSize = styled(ScrollbarSize, {
  name: 'MuiTabs',
  slot: 'ScrollbarSize',
})({
  overflowX: 'auto',
  overflowY: 'hidden',
  // Hide dimensionless scrollbar on macOS
  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    display: 'none', // Safari + Chrome
  },
});

const defaultIndicatorStyle = {};

let warnedOnceTabPresent = false;

const Tabs = React.forwardRef(function Tabs(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTabs' });
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    action,
    centered = false,
    children,
    className,
    component = 'div',
    allowScrollButtonsMobile = false,
    indicatorColor = 'primary',
    onChange,
    orientation = 'horizontal',
    ScrollButtonComponent = TabScrollButton,
    scrollButtons = 'auto',
    selectionFollowsFocus,
    TabIndicatorProps = {},
    TabScrollButtonProps = {},
    textColor = 'primary',
    value,
    variant = 'standard',
    visibleScrollbar = false,
    ...other
  } = props;
  const scrollable = variant === 'scrollable';
  const vertical = orientation === 'vertical';

  const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
  const start = vertical ? 'top' : 'left';
  const end = vertical ? 'bottom' : 'right';
  const clientSize = vertical ? 'clientHeight' : 'clientWidth';
  const size = vertical ? 'height' : 'width';

  const { contextValue: tabsContextValue } = useTabs({
    ...props,
    direction: theme.direction ?? 'ltr',
  });

  const ownerState = {
    ...props,
    component,
    allowScrollButtonsMobile,
    indicatorColor,
    orientation,
    vertical,
    scrollButtons,
    textColor,
    variant,
    visibleScrollbar,
    fixed: !scrollable,
    hideScrollbar: scrollable && !visibleScrollbar,
    scrollableX: scrollable && !vertical,
    scrollableY: scrollable && vertical,
    centered: centered && !scrollable,
    scrollButtonsHideMobile: !allowScrollButtonsMobile,
  };

  const classes = useUtilityClasses(ownerState);

  if (process.env.NODE_ENV !== 'production') {
    if (centered && scrollable) {
      console.error(
        'MUI: You can not use the `centered={true}` and `variant="scrollable"` properties ' +
          'at the same time on a `Tabs` component.',
      );
    }
  }

  const [mounted, setMounted] = React.useState(false);
  const [indicatorStyle, setIndicatorStyle] = React.useState(defaultIndicatorStyle);
  const [displayScroll, setDisplayScroll] = React.useState({
    start: false,
    end: false,
  });

  const [scrollerStyle, setScrollerStyle] = React.useState({
    overflow: 'hidden',
    scrollbarWidth: 0,
  });

  const tabsRef = React.useRef(null);
  const tabListRef = React.useRef(null);

  const valueToIndex = new Map();
  let childIndex = 0;
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }
    const childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    childIndex += 1;
    return null;
  });

  const getTabsMeta = () => {
    const tabsNode = tabsRef.current;
    let tabsMeta;
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();
      // create a new object with ClientRect class props + scrollLeft
      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollLeftNormalized: getNormalizedScrollLeft(tabsNode, theme.direction),
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
      };
    }

    let tabMeta;
    if (tabsNode && value !== null) {
      const currentChildren = tabListRef.current.children;

      if (currentChildren.length > 0) {
        const tab = currentChildren[valueToIndex.get(value)];
        if (process.env.NODE_ENV !== 'production') {
          if (!tab) {
            console.error(
              [
                `MUI: The \`value\` provided to the Tabs component is invalid.`,
                `None of the Tabs' children match with "${value}".`,
                valueToIndex.keys
                  ? `You can provide one of the following values: ${Array.from(
                      valueToIndex.keys(),
                    ).join(', ')}.`
                  : null,
              ].join('\n'),
            );
          }
        }
        tabMeta = tab ? tab.getBoundingClientRect() : null;

        if (process.env.NODE_ENV !== 'production') {
          if (
            process.env.NODE_ENV !== 'test' &&
            !warnedOnceTabPresent &&
            tabMeta &&
            tabMeta.width === 0 &&
            tabMeta.height === 0
          ) {
            tabsMeta = null;
            console.error(
              [
                'MUI: The `value` provided to the Tabs component is invalid.',
                `The Tab with this \`value\` ("${value}") is not part of the document layout.`,
                "Make sure the tab item is present in the document or that it's not `display: none`.",
              ].join('\n'),
            );

            warnedOnceTabPresent = true;
          }
        }
      }
    }
    return { tabsMeta, tabMeta };
  };

  const updateIndicatorState = useEventCallback(() => {
    const { tabsMeta, tabMeta } = getTabsMeta();
    let startValue = 0;
    let startIndicator;

    if (vertical) {
      startIndicator = 'top';
      if (tabMeta && tabsMeta) {
        startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
      }
    } else {
      startIndicator = isRtl ? 'right' : 'left';
      if (tabMeta && tabsMeta) {
        const correction = isRtl
          ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth
          : tabsMeta.scrollLeft;
        startValue =
          (isRtl ? -1 : 1) * (tabMeta[startIndicator] - tabsMeta[startIndicator] + correction);
      }
    }

    const newIndicatorStyle = {
      [startIndicator]: startValue,
      // May be wrong until the font is loaded.
      [size]: tabMeta ? tabMeta[size] : 0,
    };

    // IE11 support, replace with Number.isNaN
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(indicatorStyle[startIndicator]) || isNaN(indicatorStyle[size])) {
      setIndicatorStyle(newIndicatorStyle);
    } else {
      const dStart = Math.abs(indicatorStyle[startIndicator] - newIndicatorStyle[startIndicator]);
      const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);

      if (dStart >= 1 || dSize >= 1) {
        setIndicatorStyle(newIndicatorStyle);
      }
    }
  });

  const scroll = (scrollValue, { animation = true } = {}) => {
    if (animation) {
      animate(scrollStart, tabsRef.current, scrollValue, {
        duration: theme.transitions.duration.standard,
      });
    } else {
      tabsRef.current[scrollStart] = scrollValue;
    }
  };

  const moveTabsScroll = (delta) => {
    let scrollValue = tabsRef.current[scrollStart];

    if (vertical) {
      scrollValue += delta;
    } else {
      scrollValue += delta * (isRtl ? -1 : 1);
      // Fix for Edge
      scrollValue *= isRtl && detectScrollType() === 'reverse' ? -1 : 1;
    }

    scroll(scrollValue);
  };

  const getScrollSize = () => {
    const containerSize = tabsRef.current[clientSize];
    let totalSize = 0;
    const currentChildren = Array.from(tabListRef.current.children);

    for (let i = 0; i < currentChildren.length; i += 1) {
      const tab = currentChildren[i];
      if (totalSize + tab[clientSize] > containerSize) {
        break;
      }
      totalSize += tab[clientSize];
    }
    return totalSize;
  };

  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize());
  };

  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize());
  };

  // TODO Remove <ScrollbarSize /> as browser support for hiding the scrollbar
  // with CSS improves.
  const handleScrollbarSizeChange = React.useCallback((scrollbarWidth) => {
    setScrollerStyle({
      overflow: null,
      scrollbarWidth,
    });
  }, []);

  const getConditionalElements = () => {
    const conditionalElements = {};

    conditionalElements.scrollbarSizeListener = scrollable ? (
      <TabsScrollbarSize
        onChange={handleScrollbarSizeChange}
        className={clsx(classes.scrollableX, classes.hideScrollbar)}
      />
    ) : null;

    const scrollButtonsActive = displayScroll.start || displayScroll.end;
    const showScrollButtons =
      scrollable && ((scrollButtons === 'auto' && scrollButtonsActive) || scrollButtons === true);

    conditionalElements.scrollButtonStart = showScrollButtons ? (
      <ScrollButtonComponent
        orientation={orientation}
        direction={isRtl ? 'right' : 'left'}
        onClick={handleStartScrollClick}
        disabled={!displayScroll.start}
        {...TabScrollButtonProps}
        className={clsx(classes.scrollButtons, TabScrollButtonProps.className)}
      />
    ) : null;

    conditionalElements.scrollButtonEnd = showScrollButtons ? (
      <ScrollButtonComponent
        orientation={orientation}
        direction={isRtl ? 'left' : 'right'}
        onClick={handleEndScrollClick}
        disabled={!displayScroll.end}
        {...TabScrollButtonProps}
        className={clsx(classes.scrollButtons, TabScrollButtonProps.className)}
      />
    ) : null;

    return conditionalElements;
  };

  const scrollSelectedIntoView = useEventCallback((animation) => {
    const { tabsMeta, tabMeta } = getTabsMeta();

    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta[start] < tabsMeta[start]) {
      // left side of button is out of view
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]);
      scroll(nextScrollStart, { animation });
    } else if (tabMeta[end] > tabsMeta[end]) {
      // right side of button is out of view
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);
      scroll(nextScrollStart, { animation });
    }
  });

  const updateScrollButtonState = useEventCallback(() => {
    if (scrollable && scrollButtons !== false) {
      const { scrollTop, scrollHeight, clientHeight, scrollWidth, clientWidth } = tabsRef.current;
      let showStartScroll;
      let showEndScroll;

      if (vertical) {
        showStartScroll = scrollTop > 1;
        showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
      } else {
        const scrollLeft = getNormalizedScrollLeft(tabsRef.current, theme.direction);
        // use 1 for the potential rounding error with browser zooms.
        showStartScroll = isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
        showEndScroll = !isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
      }

      if (showStartScroll !== displayScroll.start || showEndScroll !== displayScroll.end) {
        setDisplayScroll({ start: showStartScroll, end: showEndScroll });
      }
    }
  });

  React.useEffect(() => {
    const handleResize = debounce(() => {
      updateIndicatorState();
      updateScrollButtonState();
    });
    const win = ownerWindow(tabsRef.current);
    win.addEventListener('resize', handleResize);

    let resizeObserver;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      Array.from(tabListRef.current.children).forEach((child) => {
        resizeObserver.observe(child);
      });
    }

    return () => {
      handleResize.clear();
      win.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [updateIndicatorState, updateScrollButtonState]);

  const handleTabsScroll = React.useMemo(
    () =>
      debounce(() => {
        updateScrollButtonState();
      }),
    [updateScrollButtonState],
  );

  React.useEffect(() => {
    return () => {
      handleTabsScroll.clear();
    };
  }, [handleTabsScroll]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    updateIndicatorState();
    updateScrollButtonState();
  });

  React.useEffect(() => {
    // Don't animate on the first render.
    scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
  }, [scrollSelectedIntoView, indicatorStyle]);

  React.useImperativeHandle(
    action,
    () => ({
      updateIndicator: updateIndicatorState,
      updateScrollButtons: updateScrollButtonState,
    }),
    [updateIndicatorState, updateScrollButtonState],
  );

  const indicator = (
    <TabsIndicator
      {...TabIndicatorProps}
      className={clsx(classes.indicator, TabIndicatorProps.className)}
      ownerState={ownerState}
      style={{
        ...indicatorStyle,
        ...TabIndicatorProps.style,
      }}
    />
  );

  const conditionalElements = getConditionalElements();

  return (
    <TabsProvider value={tabsContextValue}>
      <TabsRoot
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        ref={ref}
        as={component}
        {...other}
      >
        {conditionalElements.scrollButtonStart}
        {conditionalElements.scrollbarSizeListener}
        <TabsScroller
          className={classes.scroller}
          ownerState={ownerState}
          style={{
            overflow: scrollerStyle.overflow,
            [vertical ? `margin${isRtl ? 'Left' : 'Right'}` : 'marginBottom']: visibleScrollbar
              ? undefined
              : -scrollerStyle.scrollbarWidth,
          }}
          ref={tabsRef}
          onScroll={handleTabsScroll}
        >
          {/* The tablist isn't interactive but the tabs are */}
          <TabsList
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            variant={variant}
            indicator={!mounted && indicator}
            textColor={textColor}
            className={classes.flexContainer}
            ownerState={ownerState}
            ref={tabListRef}
          >
            {children}
          </TabsList>
          {mounted && indicator}
        </TabsScroller>
        {conditionalElements.scrollButtonEnd}
      </TabsRoot>
    </TabsProvider>
  );
});

Tabs.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It supports two actions: `updateIndicator()` and `updateScrollButtons()`
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: refType,
  /**
   * If `true`, the scroll buttons aren't forced hidden on mobile.
   * By default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.
   * @default false
   */
  allowScrollButtonsMobile: PropTypes.bool,
  /**
   * The label for the Tabs as a string.
   */
  'aria-label': PropTypes.string,
  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * If `true`, the tabs are centered.
   * This prop is intended for large views.
   * @default false
   */
  centered: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
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
   * Determines the color of the indicator.
   * @default 'primary'
   */
  indicatorColor: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child (number)
   */
  onChange: PropTypes.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The component used to render the scroll buttons.
   * @default TabScrollButton
   */
  ScrollButtonComponent: PropTypes.elementType,
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `true` will always present them.
   * - `false` will never present them.
   *
   * By default the scroll buttons are hidden on mobile.
   * This behavior can be disabled with `allowScrollButtonsMobile`.
   * @default 'auto'
   */
  scrollButtons: PropTypes /* @typescript-to-proptypes-ignore */.oneOf(['auto', false, true]),
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Props applied to the tab indicator element.
   * @default  {}
   */
  TabIndicatorProps: PropTypes.object,
  /**
   * Props applied to the [`TabScrollButton`](/material-ui/api/tab-scroll-button/) element.
   * @default {}
   */
  TabScrollButtonProps: PropTypes.object,
  /**
   * Determines the color of the `Tab`.
   * @default 'primary'
   */
  textColor: PropTypes.oneOf(['inherit', 'primary', 'secondary']),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value: PropTypes.any,
  /**
   * Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  -`fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   * @default 'standard'
   */
  variant: PropTypes.oneOf(['fullWidth', 'scrollable', 'standard']),
  /**
   * If `true`, the scrollbar is visible. It can be useful when displaying
   * a long vertical list of tabs.
   * @default false
   */
  visibleScrollbar: PropTypes.bool,
};

export default Tabs;
