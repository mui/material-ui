// @flow

import React from 'react';
import type { Node, ComponentType } from 'react';
import warning from 'warning';
import classNames from 'classnames';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import ScrollbarSize from 'react-scrollbar-size';
import { getNormalizedScrollLeft, detectScrollType } from 'normalize-scroll-left';
import scroll from 'scroll';
import withStyles from '../styles/withStyles';
import TabIndicator from './TabIndicator';
import TabScrollButton from './TabScrollButton';
import type { IndicatorStyle } from './TabIndicator';

export const styles = (theme: Object) => ({
  root: {
    overflow: 'hidden',
    minHeight: 48,
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
  },
  flexContainer: {
    display: 'flex',
  },
  scrollingContainer: {
    position: 'relative',
    display: 'inline-block',
    flex: '1 1 auto',
    whiteSpace: 'nowrap',
  },
  fixed: {
    overflowX: 'hidden',
    width: '100%',
  },
  scrollable: {
    overflowX: 'scroll',
  },
  centered: {
    justifyContent: 'center',
  },
  buttonAuto: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
});

type ProvidedProps = {
  classes: Object,
  indicatorColor: string,
  TabScrollButton: ComponentType<*>,
  theme: Object,
};

export type Props = {
  /**
   * The CSS class name of the scroll button elements.
   */
  buttonClassName?: string,
  /**
   * If `true`, the tabs will be centered.
   * This property is intended for large views.
   */
  centered?: boolean,
  /**
   * The content of the component.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the tabs will grow to use all the available space.
   * This property is intended for small views, like on mobile.
   */
  fullWidth?: boolean,
  /**
   * The CSS class name of the indicator element.
   */
  indicatorClassName?: string,
  /**
   * Determines the color of the indicator.
   */
  indicatorColor?: 'accent' | 'primary' | string,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {number} value We default to the index of the child
   */
  onChange: Function,
  /**
   * True invokes scrolling properties and allow for horizontally scrolling
   * (or swiping) the tab bar.
   */
  scrollable?: boolean,
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll
   * `auto` will only present them on medium and larger viewports
   * `on` will always present them
   * `off` will never present them
   */
  scrollButtons?: 'auto' | 'on' | 'off',
  /**
   * The component used to render the scroll buttons.
   */
  TabScrollButton?: ComponentType<*>,
  /**
   * Determines the color of the `Tab`.
   */
  textColor?: 'accent' | 'primary' | 'inherit',
  /**
   * @ignore
   */
  theme?: Object,
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
   */
  value: any,
};

type State = {
  indicatorStyle: IndicatorStyle,
  scrollerStyle: Object,
  showLeftScroll: boolean,
  showRightScroll: boolean,
  mounted: boolean,
};

export type TabsMeta = {
  clientWidth: number,
  scrollLeft: number,
  scrollLeftNormalized: number,
  scrollWidth: number,
  // ClientRect
  left: number,
  right: number,
};

class Tabs extends React.Component<ProvidedProps & Props, State> {
  static defaultProps = {
    centered: false,
    fullWidth: false,
    indicatorColor: 'accent',
    scrollable: false,
    scrollButtons: 'auto',
    TabScrollButton,
    textColor: 'inherit',
  };

  state = {
    indicatorStyle: {
      left: 0,
      width: 0,
    },
    scrollerStyle: {
      marginBottom: 0,
    },
    showLeftScroll: false,
    showRightScroll: false,
    mounted: false,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ mounted: true });
    this.updateIndicatorState(this.props);
    this.updateScrollButtonState();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateScrollButtonState();

    // The index might have changed at the same time.
    // We need to check again the right indicator position.
    this.updateIndicatorState(this.props);

    if (this.state.indicatorStyle !== prevState.indicatorStyle) {
      this.scrollSelectedIntoView();
    }
  }

  componentWillUnmount() {
    this.handleResize.cancel();
    this.handleTabsScroll.cancel();
  }

  getConditionalElements = () => {
    const {
      classes,
      buttonClassName,
      scrollable,
      scrollButtons,
      TabScrollButton: TabScrollButtonProp,
      theme,
    } = this.props;
    const conditionalElements = {};
    conditionalElements.scrollbarSizeListener = scrollable ? (
      <ScrollbarSize
        onLoad={this.handleScrollbarSizeChange}
        onChange={this.handleScrollbarSizeChange}
      />
    ) : null;

    const showScrollButtons = scrollable && (scrollButtons === 'auto' || scrollButtons === 'on');

    conditionalElements.scrollButtonLeft = showScrollButtons ? (
      <TabScrollButtonProp
        direction={theme.direction === 'rtl' ? 'right' : 'left'}
        onClick={this.handleLeftScrollClick}
        visible={this.state.showLeftScroll}
        className={classNames(
          {
            [classes.buttonAuto]: scrollButtons === 'auto',
          },
          buttonClassName,
        )}
      />
    ) : null;

    conditionalElements.scrollButtonRight = showScrollButtons ? (
      <TabScrollButtonProp
        direction={theme.direction === 'rtl' ? 'left' : 'right'}
        onClick={this.handleRightScrollClick}
        visible={this.state.showRightScroll}
        className={classNames(
          {
            [classes.buttonAuto]: scrollButtons === 'auto',
          },
          buttonClassName,
        )}
      />
    ) : null;

    return conditionalElements;
  };

  getTabsMeta = (value, direction): { tabsMeta: ?TabsMeta, tabMeta: ?ClientRect } => {
    let tabsMeta;
    if (this.tabs) {
      const rect = this.tabs.getBoundingClientRect();
      // create a new object with ClientRect class props + scrollLeft
      tabsMeta = {
        clientWidth: this.tabs ? this.tabs.clientWidth : 0,
        scrollLeft: this.tabs ? this.tabs.scrollLeft : 0,
        scrollLeftNormalized: this.tabs ? getNormalizedScrollLeft(this.tabs, direction) : 0,
        scrollWidth: this.tabs ? this.tabs.scrollWidth : 0,
        left: rect.left,
        right: rect.right,
      };
    }

    let tabMeta;
    if (this.tabs && value !== false) {
      const children = this.tabs.children[0].children;

      if (children.length > 0) {
        const tab = children[this.valueToIndex[value]];
        warning(Boolean(tab), `Material-UI: the value provided \`${value}\` is invalid`);
        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }
    return { tabsMeta, tabMeta };
  };

  tabs: ?HTMLElement = undefined;
  valueToIndex: { [key: any]: any } = {};

  handleResize = debounce(() => {
    this.updateIndicatorState(this.props);
    this.updateScrollButtonState();
  }, 166);

  handleLeftScrollClick = () => {
    if (this.tabs) {
      this.moveTabsScroll(-this.tabs.clientWidth);
    }
  };

  handleRightScrollClick = () => {
    if (this.tabs) {
      this.moveTabsScroll(this.tabs.clientWidth);
    }
  };

  handleScrollbarSizeChange = ({ scrollbarHeight }) => {
    this.setState({
      scrollerStyle: {
        marginBottom: -scrollbarHeight,
      },
    });
  };

  handleTabsScroll = debounce(() => {
    this.updateScrollButtonState();
  }, 166);

  moveTabsScroll = delta => {
    const { theme } = this.props;

    if (this.tabs) {
      const multiplier = theme.direction === 'rtl' ? -1 : 1;
      const nextScrollLeft = this.tabs.scrollLeft + delta * multiplier;
      // Fix for Edge
      const invert = theme.direction === 'rtl' && detectScrollType() === 'reverse' ? -1 : 1;
      scroll.left(this.tabs, invert * nextScrollLeft);
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
      left = tabMeta.left - tabsMeta.left + correction;
    }

    const indicatorStyle = {
      left,
      // May be wrong until the font is loaded.
      width: tabMeta ? tabMeta.width : 0,
    };

    if (
      (indicatorStyle.left !== this.state.indicatorStyle.left ||
        indicatorStyle.width !== this.state.indicatorStyle.width) &&
      !Number.isNaN(indicatorStyle.left) &&
      !Number.isNaN(indicatorStyle.width)
    ) {
      this.setState({ indicatorStyle });
    }
  }

  scrollSelectedIntoView = () => {
    const { theme, value } = this.props;

    const { tabsMeta, tabMeta } = this.getTabsMeta(value, theme.direction);

    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta.left < tabsMeta.left) {
      // left side of button is out of view
      const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);
      scroll.left(this.tabs, nextScrollLeft);
    } else if (tabMeta.right > tabsMeta.right) {
      // right side of button is out of view
      const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);
      scroll.left(this.tabs, nextScrollLeft);
    }
  };

  updateScrollButtonState = () => {
    const { scrollable, scrollButtons, theme } = this.props;

    if (this.tabs && scrollable && scrollButtons !== 'off') {
      const { scrollWidth, clientWidth } = this.tabs;
      const scrollLeft = getNormalizedScrollLeft(this.tabs, theme.direction);

      const showLeftScroll =
        theme.direction === 'rtl' ? scrollWidth > clientWidth + scrollLeft : scrollLeft > 0;

      const showRightScroll =
        theme.direction === 'rtl' ? scrollLeft > 0 : scrollWidth > clientWidth + scrollLeft;

      if (
        showLeftScroll !== this.state.showLeftScroll ||
        showRightScroll !== this.state.showRightScroll
      ) {
        this.setState({ showLeftScroll, showRightScroll });
      }
    }
  };

  render() {
    const {
      buttonClassName,
      centered,
      classes,
      children: childrenProp,
      className: classNameProp,
      fullWidth,
      indicatorClassName,
      indicatorColor,
      onChange,
      scrollable,
      scrollButtons,
      TabScrollButton: TabScrollButtonProp,
      textColor,
      theme,
      value,
      ...other
    } = this.props;

    const className = classNames(classes.root, classNameProp);
    const scrollerClassName = classNames(classes.scrollingContainer, {
      [classes.fixed]: !scrollable,
      [classes.scrollable]: scrollable,
    });
    const tabItemContainerClassName = classNames(classes.flexContainer, {
      [classes.centered]: centered && !scrollable,
    });

    const indicator = (
      <TabIndicator
        style={this.state.indicatorStyle}
        className={indicatorClassName}
        color={indicatorColor}
      />
    );

    this.valueToIndex = {};
    let childIndex = 0;
    const children = React.Children.map(childrenProp, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      const childValue = child.props.value || childIndex;
      this.valueToIndex[childValue] = childIndex;
      const selected = childValue === value;

      childIndex += 1;
      return React.cloneElement(child, {
        fullWidth,
        indicator: selected && !this.state.mounted && indicator,
        selected,
        onChange,
        textColor,
        value: childValue,
      });
    });

    const conditionalElements = this.getConditionalElements();

    return (
      <div className={className} {...other}>
        <EventListener target="window" onResize={this.handleResize} />
        {conditionalElements.scrollbarSizeListener}
        <div className={classes.flexContainer}>
          {conditionalElements.scrollButtonLeft}
          <div
            className={scrollerClassName}
            style={this.state.scrollerStyle}
            ref={node => {
              this.tabs = node;
            }}
            role="tablist"
            onScroll={this.handleTabsScroll}
          >
            <div className={tabItemContainerClassName}>{children}</div>
            {this.state.mounted && indicator}
          </div>
          {conditionalElements.scrollButtonRight}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true, name: 'MuiTabs' })(Tabs);
