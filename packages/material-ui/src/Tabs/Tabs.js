/* eslint-disable no-restricted-globals */

import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import clsx from 'clsx';
import debounce from '../utils/debounce';
import ownerWindow from '../utils/ownerWindow';
import { getNormalizedScrollLeft, detectScrollType } from 'normalize-scroll-left';
import animate from '../internal/animate';
import ScrollbarSize from './ScrollbarSize';
import withStyles from '../styles/withStyles';
import TabIndicator from './TabIndicator';
import TabScrollButton from './TabScrollButton';
import useEventCallback from '../utils/useEventCallback';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    overflow: 'hidden',
    minHeight: 48,
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    display: 'flex',
  },
  /* Styles applied to the flex container element. */
  flexContainer: {
    display: 'flex',
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
    action,
    centered = false,
    children: childrenProp,
    classes,
    className,
    component: Component = 'div',
    indicatorColor = 'secondary',
    onChange,
    ScrollButtonComponent = TabScrollButton,
    scrollButtons = 'auto',
    TabIndicatorProps = {},
    textColor = 'inherit',
    theme,
    value,
    variant = 'standard',
    ...other
  } = props;
  const scrollable = variant === 'scrollable';
  const isRtl = theme.direction === 'rtl';

  warning(
    !centered || !scrollable,
    'Material-UI: you can not use the `centered={true}` and `variant="scrollable"` properties ' +
      'at the same time on a `Tabs` component.',
  );

  const [mounted, setMounted] = React.useState(false);
  const [indicatorStyle, setIndicatorStyle] = React.useState({});
  const [displayScroll, setDisplayScroll] = React.useState({
    left: false,
    right: false,
  });
  const [scrollerStyle, setScrollerStyle] = React.useState({
    overflow: 'hidden',
    marginBottom: null,
  });
  const valueToIndex = new Map();
  const tabsRef = React.useRef(null);
  const childrenWrapperRef = React.useRef(null);

  const getTabsMeta = () => {
    const tabsNode = tabsRef.current;
    let tabsMeta;
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();
      // create a new object with ClientRect class props + scrollLeft
      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollLeftNormalized: getNormalizedScrollLeft(tabsNode, theme.direction),
        scrollWidth: tabsNode.scrollWidth,
        left: rect.left,
        right: rect.right,
      };
    }

    let tabMeta;
    if (tabsNode && value !== false) {
      const children = childrenWrapperRef.current.children;

      if (children.length > 0) {
        const tab = children[valueToIndex.get(value)];
        warning(
          tab,
          [
            `Material-UI: the value provided \`${value}\` to the Tabs component is invalid.`,
            'None of the Tabs children have this value.',
            valueToIndex.keys
              ? `You can provide one of the following values: ${Array.from(
                  valueToIndex.keys(),
                ).join(', ')}.`
              : null,
          ].join('\n'),
        );
        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }
    return { tabsMeta, tabMeta };
  };

  const updateIndicatorState = useEventCallback(() => {
    const { tabsMeta, tabMeta } = getTabsMeta();
    let left = 0;

    if (tabMeta && tabsMeta) {
      const correction = isRtl
        ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth
        : tabsMeta.scrollLeft;
      left = Math.round(tabMeta.left - tabsMeta.left + correction);
    }

    const newIndicatorStyle = {
      left,
      // May be wrong until the font is loaded.
      width: tabMeta ? Math.round(tabMeta.width) : 0,
    };

    if (
      (newIndicatorStyle.left !== indicatorStyle.left ||
        newIndicatorStyle.width !== indicatorStyle.width) &&
      !isNaN(newIndicatorStyle.left) &&
      !isNaN(newIndicatorStyle.width)
    ) {
      setIndicatorStyle(newIndicatorStyle);
    }
  });

  const scroll = scrollValue => {
    animate('scrollLeft', tabsRef.current, scrollValue);
  };

  const moveTabsScroll = delta => {
    const multiplier = isRtl ? -1 : 1;
    const nextScrollLeft = tabsRef.current.scrollLeft + delta * multiplier;
    // Fix for Edge
    const invert = isRtl && detectScrollType() === 'reverse' ? -1 : 1;
    scroll(invert * nextScrollLeft);
  };

  const handleLeftScrollClick = () => {
    moveTabsScroll(-tabsRef.current.clientWidth);
  };

  const handleRightScrollClick = () => {
    moveTabsScroll(tabsRef.current.clientWidth);
  };

  const handleScrollbarSizeChange = React.useCallback(scrollbarHeight => {
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

    const scrollButtonsActive = displayScroll.left || displayScroll.right;
    const showScrollButtons =
      scrollable &&
      ((scrollButtons === 'auto' && scrollButtonsActive) ||
        scrollButtons === 'desktop' ||
        scrollButtons === 'on');

    conditionalElements.scrollButtonLeft = showScrollButtons ? (
      <ScrollButtonComponent
        direction={isRtl ? 'right' : 'left'}
        onClick={handleLeftScrollClick}
        visible={displayScroll.left}
        className={clsx(classes.scrollButtons, {
          [classes.scrollButtonsDesktop]: scrollButtons !== 'on',
        })}
      />
    ) : null;

    conditionalElements.scrollButtonRight = showScrollButtons ? (
      <ScrollButtonComponent
        direction={isRtl ? 'left' : 'right'}
        onClick={handleRightScrollClick}
        visible={displayScroll.right}
        className={clsx(classes.scrollButtons, {
          [classes.scrollButtonsDesktop]: scrollButtons !== 'on',
        })}
      />
    ) : null;

    return conditionalElements;
  };

  const scrollSelectedIntoView = useEventCallback(() => {
    const { tabsMeta, tabMeta } = getTabsMeta();

    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta.left < tabsMeta.left) {
      // left side of button is out of view
      const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);
      scroll(nextScrollLeft);
    } else if (tabMeta.right > tabsMeta.right) {
      // right side of button is out of view
      const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);
      scroll(nextScrollLeft);
    }
  });

  const updateScrollButtonState = useEventCallback(() => {
    if (scrollable && scrollButtons !== 'off') {
      const { scrollWidth, clientWidth } = tabsRef.current;
      const scrollLeft = getNormalizedScrollLeft(tabsRef.current, theme.direction);

      // use 1 for the potential rounding error with browser zooms.
      const showLeftScroll = isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
      const showRightScroll = !isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;

      if (showLeftScroll !== displayScroll.left || showRightScroll !== displayScroll.right) {
        setDisplayScroll({ left: showLeftScroll, right: showRightScroll });
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
    }),
    [updateIndicatorState],
  );

  const indicator = (
    <TabIndicator
      className={classes.indicator}
      color={indicatorColor}
      {...TabIndicatorProps}
      style={{
        ...indicatorStyle,
        ...TabIndicatorProps.style,
      }}
    />
  );

  let childIndex = 0;
  const children = React.Children.map(childrenProp, child => {
    if (!React.isValidElement(child)) {
      return null;
    }

    warning(
      child.type !== React.Fragment,
      [
        "Material-UI: the Tabs component doesn't accept a Fragment as a child.",
        'Consider providing an array instead.',
      ].join('\n'),
    );

    const childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    const selected = childValue === value;

    childIndex += 1;
    return React.cloneElement(child, {
      fullWidth: variant === 'fullWidth',
      indicator: selected && !mounted && indicator,
      selected,
      onChange,
      textColor,
      value: childValue,
    });
  });

  const conditionalElements = getConditionalElements();

  return (
    <Component className={clsx(classes.root, className)} ref={ref} {...other}>
      {conditionalElements.scrollButtonLeft}
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
        <div
          className={clsx(classes.flexContainer, {
            [classes.centered]: centered && !scrollable,
          })}
          ref={childrenWrapperRef}
          role="tablist"
        >
          {children}
        </div>
        {mounted && indicator}
      </div>
      {conditionalElements.scrollButtonRight}
    </Component>
  );
});

Tabs.propTypes = {
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports `updateIndicator()` action.
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: PropTypes.func,
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
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Determines the color of the indicator.
   */
  indicatorColor: PropTypes.oneOf(['secondary', 'primary']),
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value We default to the index of the child (number)
   */
  onChange: PropTypes.func,
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
  scrollButtons: PropTypes.oneOf(['auto', 'desktop', 'on', 'off']),
  /**
   * Properties applied to the `TabIndicator` element.
   */
  TabIndicatorProps: PropTypes.object,
  /**
   * Determines the color of the `Tab`.
   */
  textColor: PropTypes.oneOf(['secondary', 'primary', 'inherit']),
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
   */
  value: PropTypes.any,
  /**
   *  Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  -`fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   */
  variant: PropTypes.oneOf(['standard', 'scrollable', 'fullWidth']),
};

export default withStyles(styles, { name: 'MuiTabs', withTheme: true })(Tabs);
