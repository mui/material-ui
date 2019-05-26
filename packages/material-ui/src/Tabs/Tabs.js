/* eslint-disable no-restricted-globals */

import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import clsx from 'clsx';
import EventListener from 'react-event-listener';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.
import { getNormalizedScrollLeft, detectScrollType } from 'normalize-scroll-left';
import animate from '../internal/animate';
import ScrollbarSize from './ScrollbarSize';
import withStyles from '../styles/withStyles';
import TabIndicator from './TabIndicator';
import TabScrollButton from './TabScrollButton';
import withForwardedRef from '../utils/withForwardedRef';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    overflow: 'hidden',
    minHeight: 48,
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
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

class Tabs extends React.Component {
  constructor() {
    super();

    if (typeof window !== 'undefined') {
      this.handleResize = debounce(() => {
        this.updateIndicatorState(this.props);
        this.updateScrollButtonState();
      }, 166); // Corresponds to 10 frames at 60 Hz.

      this.handleTabsScroll = debounce(() => {
        this.updateScrollButtonState();
      }, 166); // Corresponds to 10 frames at 60 Hz.
    }
  }

  state = {
    indicatorStyle: {},
    scrollerStyle: {
      overflow: 'hidden',
      marginBottom: null,
    },
    showLeftScroll: false,
    showRightScroll: false,
    mounted: false,
  };

  componentDidMount() {
    this.setState({ mounted: true });
    this.updateIndicatorState(this.props);
    this.updateScrollButtonState();

    if (this.props.action) {
      this.props.action({
        updateIndicator: this.handleResize,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // The index might have changed at the same time.
    // We need to check again the right indicator position.
    this.updateIndicatorState(this.props);
    this.updateScrollButtonState();

    if (this.state.indicatorStyle !== prevState.indicatorStyle) {
      this.scrollSelectedIntoView();
    }
  }

  componentWillUnmount() {
    this.handleResize.clear();
    this.handleTabsScroll.clear();
  }

  getConditionalElements = () => {
    const { classes, ScrollButtonComponent, scrollButtons, theme, variant } = this.props;
    const { showLeftScroll, showRightScroll } = this.state;
    const conditionalElements = {};
    const scrollable = variant === 'scrollable';
    conditionalElements.scrollbarSizeListener = scrollable ? (
      <ScrollbarSize className={classes.scrollable} onChange={this.handleScrollbarSizeChange} />
    ) : null;

    const scrollButtonsActive = showLeftScroll || showRightScroll;
    const showScrollButtons =
      scrollable &&
      ((scrollButtons === 'auto' && scrollButtonsActive) ||
        scrollButtons === 'desktop' ||
        scrollButtons === 'on');

    conditionalElements.scrollButtonLeft = showScrollButtons ? (
      <ScrollButtonComponent
        direction={theme.direction === 'rtl' ? 'right' : 'left'}
        onClick={this.handleLeftScrollClick}
        visible={showLeftScroll}
        className={clsx(classes.scrollButtons, {
          [classes.scrollButtonsDesktop]: scrollButtons !== 'on',
        })}
      />
    ) : null;

    conditionalElements.scrollButtonRight = showScrollButtons ? (
      <ScrollButtonComponent
        direction={theme.direction === 'rtl' ? 'left' : 'right'}
        onClick={this.handleRightScrollClick}
        visible={showRightScroll}
        className={clsx(classes.scrollButtons, {
          [classes.scrollButtonsDesktop]: scrollButtons !== 'on',
        })}
      />
    ) : null;

    return conditionalElements;
  };

  getTabsMeta = (value, direction) => {
    let tabsMeta;
    if (this.tabsRef) {
      const rect = this.tabsRef.getBoundingClientRect();
      // create a new object with ClientRect class props + scrollLeft
      tabsMeta = {
        clientWidth: this.tabsRef.clientWidth,
        scrollLeft: this.tabsRef.scrollLeft,
        scrollLeftNormalized: getNormalizedScrollLeft(this.tabsRef, direction),
        scrollWidth: this.tabsRef.scrollWidth,
        left: rect.left,
        right: rect.right,
      };
    }

    let tabMeta;
    if (this.tabsRef && value !== false) {
      const children = this.tabsRef.children[0].children;

      if (children.length > 0) {
        const tab = children[this.valueToIndex.get(value)];
        warning(
          tab,
          [
            `Material-UI: the value provided \`${value}\` to the Tabs component is invalid.`,
            'None of the Tabs children have this value.',
            this.valueToIndex.keys
              ? `You can provide one of the following values: ${Array.from(
                  this.valueToIndex.keys(),
                ).join(', ')}.`
              : null,
          ].join('\n'),
        );
        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }
    return { tabsMeta, tabMeta };
  };

  handleLeftScrollClick = () => {
    this.moveTabsScroll(-this.tabsRef.clientWidth);
  };

  handleRightScrollClick = () => {
    this.moveTabsScroll(this.tabsRef.clientWidth);
  };

  handleScrollbarSizeChange = scrollbarHeight => {
    this.setState({
      scrollerStyle: {
        overflow: null,
        marginBottom: -scrollbarHeight,
      },
    });
  };

  handleTabsRef = ref => {
    this.tabsRef = ref;
  };

  moveTabsScroll = delta => {
    const { theme } = this.props;

    const multiplier = theme.direction === 'rtl' ? -1 : 1;
    const nextScrollLeft = this.tabsRef.scrollLeft + delta * multiplier;
    // Fix for Edge
    const invert = theme.direction === 'rtl' && detectScrollType() === 'reverse' ? -1 : 1;
    this.scroll(invert * nextScrollLeft);
  };

  scrollSelectedIntoView = () => {
    const { theme, value } = this.props;
    const { tabsMeta, tabMeta } = this.getTabsMeta(value, theme.direction);

    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta.left < tabsMeta.left) {
      // left side of button is out of view
      const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);
      this.scroll(nextScrollLeft);
    } else if (tabMeta.right > tabsMeta.right) {
      // right side of button is out of view
      const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);
      this.scroll(nextScrollLeft);
    }
  };

  scroll = value => {
    animate('scrollLeft', this.tabsRef, value);
  };

  updateScrollButtonState = () => {
    const { scrollButtons, theme, variant } = this.props;
    const scrollable = variant === 'scrollable';

    if (scrollable && scrollButtons !== 'off') {
      const { scrollWidth, clientWidth } = this.tabsRef;
      const scrollLeft = getNormalizedScrollLeft(this.tabsRef, theme.direction);

      // use 1 for the potential rounding error with browser zooms.
      const showLeftScroll =
        theme.direction === 'rtl' ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
      const showRightScroll =
        theme.direction !== 'rtl' ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;

      if (
        showLeftScroll !== this.state.showLeftScroll ||
        showRightScroll !== this.state.showRightScroll
      ) {
        this.setState({ showLeftScroll, showRightScroll });
      }
    }
  };

  updateIndicatorState(props) {
    const { theme, value } = props;

    const { tabsMeta, tabMeta } = this.getTabsMeta(value, theme.direction);
    let left = 0;

    if (tabMeta && tabsMeta) {
      const correction =
        theme.direction === 'rtl'
          ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth
          : tabsMeta.scrollLeft;
      left = Math.round(tabMeta.left - tabsMeta.left + correction);
    }

    const indicatorStyle = {
      left,
      // May be wrong until the font is loaded.
      width: tabMeta ? Math.round(tabMeta.width) : 0,
    };

    if (
      (indicatorStyle.left !== this.state.indicatorStyle.left ||
        indicatorStyle.width !== this.state.indicatorStyle.width) &&
      !isNaN(indicatorStyle.left) &&
      !isNaN(indicatorStyle.width)
    ) {
      this.setState({ indicatorStyle });
    }
  }

  render() {
    const {
      action,
      centered,
      children: childrenProp,
      classes,
      className,
      component: Component,
      indicatorColor,
      innerRef,
      onChange,
      ScrollButtonComponent,
      scrollButtons,
      TabIndicatorProps = {},
      textColor,
      theme,
      value,
      variant,
      ...other
    } = this.props;

    const scrollable = variant === 'scrollable';

    warning(
      !centered || !scrollable,
      'Material-UI: you can not use the `centered={true}` and `variant="scrollable"` properties ' +
        'at the same time on a `Tabs` component.',
    );

    const indicator = (
      <TabIndicator
        className={classes.indicator}
        color={indicatorColor}
        {...TabIndicatorProps}
        style={{
          ...this.state.indicatorStyle,
          ...TabIndicatorProps.style,
        }}
      />
    );

    this.valueToIndex = new Map();
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
      this.valueToIndex.set(childValue, childIndex);
      const selected = childValue === value;

      childIndex += 1;
      return React.cloneElement(child, {
        fullWidth: variant === 'fullWidth',
        indicator: selected && !this.state.mounted && indicator,
        selected,
        onChange,
        textColor,
        value: childValue,
      });
    });

    const conditionalElements = this.getConditionalElements();

    return (
      <Component className={clsx(classes.root, className)} ref={innerRef} {...other}>
        <EventListener target="window" onResize={this.handleResize} />
        <div className={classes.flexContainer}>
          {conditionalElements.scrollButtonLeft}
          {conditionalElements.scrollbarSizeListener}
          <div
            className={clsx(classes.scroller, {
              [classes.fixed]: !scrollable,
              [classes.scrollable]: scrollable,
            })}
            style={this.state.scrollerStyle}
            ref={this.handleTabsRef}
            role="tablist"
            onScroll={this.handleTabsScroll}
          >
            <div
              className={clsx(classes.flexContainer, {
                [classes.centered]: centered && !scrollable,
              })}
            >
              {children}
            </div>
            {this.state.mounted && indicator}
          </div>
          {conditionalElements.scrollButtonRight}
        </div>
      </Component>
    );
  }
}

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
   * @ignore
   * from `withForwardRef`
   */
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
   * Determine behavior of scroll buttons when tabs are set to scroll
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

Tabs.defaultProps = {
  centered: false,
  component: 'div',
  indicatorColor: 'secondary',
  ScrollButtonComponent: TabScrollButton,
  scrollButtons: 'auto',
  textColor: 'inherit',
  variant: 'standard',
};

export default withStyles(styles, { name: 'MuiTabs', withTheme: true })(withForwardedRef(Tabs));
