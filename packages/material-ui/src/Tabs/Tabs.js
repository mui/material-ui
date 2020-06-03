import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType } from '@material-ui/utils';
import debounce from '../utils/debounce';
import ownerWindow from '../utils/ownerWindow';
import { getNormalizedScrollLeft, detectScrollType } from '../utils/scrollLeft';
import animate from '../internal/animate';
import ScrollbarSize from './ScrollbarSize';
import withStyles from '../styles/withStyles';
import TabIndicator from './TabIndicator';
import TabScrollButton from '../TabScrollButton';
import useEventCallback from '../utils/useEventCallback';
import useTheme from '../styles/useTheme';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    overflow: 'hidden',
    minHeight: 48,
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    display: 'flex',
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    flexDirection: 'column',
  },
  /* Styles applied to the flex container element. */
  flexContainer: {
    display: 'flex',
  },
  /* Styles applied to the flex container element if `orientation="vertical"`. */
  flexContainerVertical: {
    flexDirection: 'column',
  },
  /* Styles applied to the flex container element if `centered={true}` & `!variant="scrollable"`. */
  centered: {
    justifyContent: 'center',
  },
  /* Styles applied to the tablist element. */
  scroller: {
    position: 'relative',
    display: 'inline-block',
    flex: '1 1 auto',
    whiteSpace: 'nowrap',
  },
  /* Styles applied to the tablist element if `!variant="scrollable"`. */
  fixed: {
    overflowX: 'hidden',
    width: '100%',
  },
  /* Styles applied to the tablist element if `variant="scrollable"`. */
  scrollable: {
    overflowX: 'scroll',
    // Hide dimensionless scrollbar on MacOS
    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // Safari + Chrome
    },
  },
  /* Styles applied to the `ScrollButtonComponent` component. */
  scrollButtons: {},
  /* Styles applied to the `ScrollButtonComponent` component if `scrollButtons="auto"` or scrollButtons="desktop"`. */
  scrollButtonsDesktop: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  /* Styles applied to the `TabIndicator` component. */
  indicator: {},
});

const Tabs = React.forwardRef(function Tabs(props, ref) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    action,
    centered = false,
    children: childrenProp,
    classes,
    className,
    component: Component = 'div',
    indicatorColor = 'secondary',
    onChange,
    orientation = 'horizontal',
    ScrollButtonComponent = TabScrollButton,
    scrollButtons = 'auto',
    selectionFollowsFocus,
    TabIndicatorProps = {},
    TabScrollButtonProps,
    textColor = 'inherit',
    value,
    variant = 'standard',
    ...other
  } = props;
  const theme = useTheme();
  const scrollable = variant === 'scrollable';
  const isRtl = theme.direction === 'rtl';
  const vertical = orientation === 'vertical';

  const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
  const start = vertical ? 'top' : 'left';
  const end = vertical ? 'bottom' : 'right';
  const clientSize = vertical ? 'clientHeight' : 'clientWidth';
  const size = vertical ? 'height' : 'width';

  if (process.env.NODE_ENV !== 'production') {
    if (centered && scrollable) {
      console.error(
        'Material-UI: You can not use the `centered={true}` and `variant="scrollable"` properties ' +
          'at the same time on a `Tabs` component.',
      );
    }
  }

  const [mounted, setMounted] = React.useState(false);
  const [indicatorStyle, setIndicatorStyle] = React.useState({});
  const [displayScroll, setDisplayScroll] = React.useState({
    start: false,
    end: false,
  });

  const [scrollerStyle, setScrollerStyle] = React.useState({
    overflow: 'hidden',
    marginBottom: null,
  });

  const valueToIndex = new Map();
  const tabsRef = React.useRef(null);
  const tabListRef = React.useRef(null);

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
    if (tabsNode && value !== false) {
      const children = tabListRef.current.children;

      if (children.length > 0) {
        const tab = children[valueToIndex.get(value)];
        if (process.env.NODE_ENV !== 'production') {
          if (!tab) {
            console.error(
              [
                `Material-UI: The value provided to the Tabs component is invalid.`,
                `None of the Tabs' children match with \`${value}\`.`,
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
      }
    }
    return { tabsMeta, tabMeta };
  };

  const updateIndicatorState = useEventCallback(() => {
    const { tabsMeta, tabMeta } = getTabsMeta();
    let startValue = 0;

    if (tabMeta && tabsMeta) {
      if (vertical) {
        startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
      } else {
        const correction = isRtl
          ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth
          : tabsMeta.scrollLeft;
        startValue = tabMeta.left - tabsMeta.left + correction;
      }
    }

    const newIndicatorStyle = {
      [start]: startValue,
      // May be wrong until the font is loaded.
      [size]: tabMeta ? tabMeta[size] : 0,
    };

    if (isNaN(indicatorStyle[start]) || isNaN(indicatorStyle[size])) {
      setIndicatorStyle(newIndicatorStyle);
    } else {
      const dStart = Math.abs(indicatorStyle[start] - newIndicatorStyle[start]);
      const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);

      if (dStart >= 1 || dSize >= 1) {
        setIndicatorStyle(newIndicatorStyle);
      }
    }
  });

  const scroll = (scrollValue) => {
    animate(scrollStart, tabsRef.current, scrollValue);
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

  const handleStartScrollClick = () => {
    moveTabsScroll(-tabsRef.current[clientSize]);
  };

  const handleEndScrollClick = () => {
    moveTabsScroll(tabsRef.current[clientSize]);
  };

  const handleScrollbarSizeChange = React.useCallback((scrollbarHeight) => {
    setScrollerStyle({
      overflow: null,
      marginBottom: -scrollbarHeight,
    });
  }, []);

  const getConditionalElements = () => {
    const conditionalElements = {};
    conditionalElements.scrollbarSizeListener = scrollable ? (
      <ScrollbarSize className={classes.scrollable} onChange={handleScrollbarSizeChange} />
    ) : null;

    const scrollButtonsActive = displayScroll.start || displayScroll.end;
    const showScrollButtons =
      scrollable &&
      ((scrollButtons === 'auto' && scrollButtonsActive) ||
        scrollButtons === 'desktop' ||
        scrollButtons === 'on');

    conditionalElements.scrollButtonStart = showScrollButtons ? (
      <ScrollButtonComponent
        orientation={orientation}
        direction={isRtl ? 'right' : 'left'}
        onClick={handleStartScrollClick}
        disabled={!displayScroll.start}
        className={clsx(classes.scrollButtons, {
          [classes.scrollButtonsDesktop]: scrollButtons !== 'on',
        })}
        {...TabScrollButtonProps}
      />
    ) : null;

    conditionalElements.scrollButtonEnd = showScrollButtons ? (
      <ScrollButtonComponent
        orientation={orientation}
        direction={isRtl ? 'left' : 'right'}
        onClick={handleEndScrollClick}
        disabled={!displayScroll.end}
        className={clsx(classes.scrollButtons, {
          [classes.scrollButtonsDesktop]: scrollButtons !== 'on',
        })}
        {...TabScrollButtonProps}
      />
    ) : null;

    return conditionalElements;
  };

  const scrollSelectedIntoView = useEventCallback(() => {
    const { tabsMeta, tabMeta } = getTabsMeta();

    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta[start] < tabsMeta[start]) {
      // left side of button is out of view
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]);
      scroll(nextScrollStart);
    } else if (tabMeta[end] > tabsMeta[end]) {
      // right side of button is out of view
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);
      scroll(nextScrollStart);
    }
  });

  const updateScrollButtonState = useEventCallback(() => {
    if (scrollable && scrollButtons !== 'off') {
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
    return () => {
      handleResize.clear();
      win.removeEventListener('resize', handleResize);
    };
  }, [updateIndicatorState, updateScrollButtonState]);

  const handleTabsScroll = React.useCallback(
    debounce(() => {
      updateScrollButtonState();
    }),
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
    scrollSelectedIntoView();
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
    <TabIndicator
      className={classes.indicator}
      orientation={orientation}
      color={indicatorColor}
      {...TabIndicatorProps}
      style={{
        ...indicatorStyle,
        ...TabIndicatorProps.style,
      }}
    />
  );

  let childIndex = 0;
  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          [
            "Material-UI: The Tabs component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );
      }
    }

    const childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    const selected = childValue === value;

    childIndex += 1;
    return React.cloneElement(child, {
      fullWidth: variant === 'fullWidth',
      indicator: selected && !mounted && indicator,
      selected,
      selectionFollowsFocus,
      onChange,
      textColor,
      value: childValue,
    });
  });

  const handleKeyDown = (event) => {
    const { target } = event;
    // Keyboard navigation assumes that [role="tab"] are siblings
    // though we might warn in the future about nested, interactive elements
    // as a a11y violation
    const role = target.getAttribute('role');
    if (role !== 'tab') {
      return;
    }

    let newFocusTarget = null;
    let previousItemKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    let nextItemKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    if (orientation === 'horizontal' && theme.direction === 'rtl') {
      // swap previousItemKey with nextItemKey
      previousItemKey = 'ArrowRight';
      nextItemKey = 'ArrowLeft';
    }

    switch (event.key) {
      case previousItemKey:
        newFocusTarget = target.previousElementSibling || tabListRef.current.lastChild;
        break;
      case nextItemKey:
        newFocusTarget = target.nextElementSibling || tabListRef.current.firstChild;
        break;
      case 'Home':
        newFocusTarget = tabListRef.current.firstChild;
        break;
      case 'End':
        newFocusTarget = tabListRef.current.lastChild;
        break;
      default:
        break;
    }

    if (newFocusTarget !== null) {
      newFocusTarget.focus();
      event.preventDefault();
    }
  };

  const conditionalElements = getConditionalElements();

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes.vertical]: vertical,
        },
        className,
      )}
      ref={ref}
      {...other}
    >
      {conditionalElements.scrollButtonStart}
      {conditionalElements.scrollbarSizeListener}
      <div
        className={clsx(classes.scroller, {
          [classes.fixed]: !scrollable,
          [classes.scrollable]: scrollable,
        })}
        style={scrollerStyle}
        ref={tabsRef}
        onScroll={handleTabsScroll}
      >
        {/* The tablist isn't interactive but the tabs are */}
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        <div
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={clsx(classes.flexContainer, {
            [classes.flexContainerVertical]: vertical,
            [classes.centered]: centered && !scrollable,
          })}
          onKeyDown={handleKeyDown}
          ref={tabListRef}
          role="tablist"
        >
          {children}
        </div>
        {mounted && indicator}
      </div>
      {conditionalElements.scrollButtonEnd}
    </Component>
  );
});

Tabs.propTypes = {
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
   * The label for the Tabs as a string.
   */
  'aria-label': PropTypes.string,
  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * If `true`, the tabs will be centered.
   * This property is intended for large views.
   */
  centered: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
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
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * Determines the color of the indicator.
   */
  indicatorColor: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value We default to the index of the child (number)
   */
  onChange: PropTypes.func,
  /**
   * The tabs orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The component used to render the scroll buttons.
   */
  ScrollButtonComponent: PropTypes.elementType,
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `desktop` will only present them on medium and larger viewports.
   * - `on` will always present them.
   * - `off` will never present them.
   */
  scrollButtons: PropTypes.oneOf(['auto', 'desktop', 'off', 'on']),
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: PropTypes.bool,
  /**
   * Props applied to the tab indicator element.
   */
  TabIndicatorProps: PropTypes.object,
  /**
   * Props applied to the [`TabScrollButton`](/api/tab-scroll-button/) element.
   */
  TabScrollButtonProps: PropTypes.object,
  /**
   * Determines the color of the `Tab`.
   */
  textColor: PropTypes.oneOf(['inherit', 'primary', 'secondary']),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
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
   */
  variant: PropTypes.oneOf(['fullWidth', 'scrollable', 'standard']),
};

export default withStyles(styles, { name: 'MuiTabs' })(Tabs);
