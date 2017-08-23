// @flow

import * as React from 'react';
import warning from 'warning';
import compose from 'recompose/compose';
import classNames from 'classnames';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import ScrollbarSize from 'react-scrollbar-size';
import scroll from 'scroll';
import pick from 'lodash/pick';
import withStyles from '../styles/withStyles';
import withWidth, { isWidthUp } from '../utils/withWidth';
import TabIndicator from './TabIndicator';
import TabScrollButton from './TabScrollButton';

export const styles = {
  root: {
    overflow: 'hidden',
  },
  flexContainer: {
    display: 'flex',
  },
  scrollingContainer: {
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
};

type DefaultProps = {
  classes: Object,
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
  children?: $ReadOnlyArray<React.ChildrenArray<*>>,
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
   * This property is intended for small views.
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
   * Determines the color of the `Tab`.
   */
  textColor?: 'accent' | 'primary' | 'inherit',
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
   */
  value: any,
  /**
   * @ignore
   * width prop provided by withWidth decorator
   */
  width?: string,
};

type AllProps = DefaultProps & Props;

type State = {
  indicatorStyle: Object,
  scrollerStyle: Object,
  showLeftScroll: boolean,
  showRightScroll: boolean,
};

type TabsMeta = {
  scrollLeft: number,
  // ClientRect
  left: number,
  width: number,
  right: number,
  top: number,
  bottom: number,
  height: number,
};

/**
 * Notice that this Component is incompatible with server side rendering.
 */
class Tabs extends React.Component<AllProps, State> {
  props: AllProps;
  static defaultProps = {
    centered: false,
    fullWidth: false,
    indicatorColor: 'accent',
    scrollable: false,
    scrollButtons: 'auto',
    textColor: 'inherit',
  };

  state = {
    indicatorStyle: {},
    scrollerStyle: {
      marginBottom: 0,
    },
    showLeftScroll: false,
    showRightScroll: false,
  };

  componentDidMount() {
    this.updateIndicatorState(this.props);
    this.updateScrollButtonState();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.updateIndicatorState(nextProps);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateScrollButtonState();
    if (
      this.props.width !== prevProps.width ||
      this.state.indicatorStyle !== prevState.indicatorStyle
    ) {
      this.scrollSelectedIntoView();
    }
  }

  componentWillUnmount() {
    this.handleResize.cancel();
    this.handleTabsScroll.cancel();
  }

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

  getConditionalElements = () => {
    const { buttonClassName, scrollable, scrollButtons, width } = this.props;
    const conditionalElements = {};
    conditionalElements.scrollbarSizeListener = scrollable
      ? <ScrollbarSize
          onLoad={this.handleScrollbarSizeChange}
          onChange={this.handleScrollbarSizeChange}
        />
      : null;

    const showScrollButtons =
      scrollable &&
      ((isWidthUp('md', width) && scrollButtons === 'auto') || scrollButtons === 'on');

    conditionalElements.scrollButtonLeft = showScrollButtons
      ? <TabScrollButton
          direction="left"
          onClick={this.handleLeftScrollClick}
          visible={this.state.showLeftScroll}
          className={buttonClassName}
        />
      : null;

    conditionalElements.scrollButtonRight = showScrollButtons
      ? <TabScrollButton
          className={buttonClassName}
          direction="right"
          onClick={this.handleRightScrollClick}
          visible={this.state.showRightScroll}
        />
      : null;

    return conditionalElements;
  };

  getTabsMeta = (value): { tabsMeta: ?TabsMeta, tabMeta: ?ClientRect } => {
    let tabsMeta;
    if (this.tabs) {
      // create a new object with ClientRect class props + scrollLeft
      tabsMeta = {
        scrollLeft: this.tabs.scrollLeft,
        ...pick(this.tabs.getBoundingClientRect(), [
          'left',
          'width',
          'right',
          'top',
          'bottom',
          'height',
        ]),
      };
    }

    let tabMeta;
    if (this.tabs && value !== false) {
      const tab = this.tabs.children[0].children[this.valueToIndex[value]];
      warning(tab, `Material-UI: the value provided \`${value}\` is invalid`);
      tabMeta = tab ? tab.getBoundingClientRect() : null;
    }
    return { tabsMeta, tabMeta };
  };

  moveTabsScroll = delta => {
    if (this.tabs) {
      const nextScrollLeft = this.tabs.scrollLeft + delta;
      scroll.left(this.tabs, nextScrollLeft);
    }
  };

  updateIndicatorState(props) {
    const { tabsMeta, tabMeta } = this.getTabsMeta(props.value);
    const indicatorStyle = {
      left: tabMeta && tabsMeta ? tabMeta.left + (tabsMeta.scrollLeft - tabsMeta.left) : 0,
      // May be wrong until the font is loaded.
      width: tabMeta ? tabMeta.width : 0,
    };

    if (
      indicatorStyle.left !== this.state.indicatorStyle.left ||
      indicatorStyle.width !== this.state.indicatorStyle.width
    ) {
      this.setState({ indicatorStyle });
    }
  }

  scrollSelectedIntoView = () => {
    const { tabsMeta, tabMeta } = this.getTabsMeta(this.props.value);

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
    const { scrollable, scrollButtons } = this.props;

    if (this.tabs && scrollable && scrollButtons !== 'off') {
      const { scrollLeft, scrollWidth, clientWidth } = this.tabs;
      const showLeftScroll = scrollLeft > 0;
      const showRightScroll = scrollWidth > clientWidth + scrollLeft;

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
      textColor,
      value,
      width,
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

    this.valueToIndex = {};
    const children = React.Children.map(childrenProp, (child, childIndex) => {
      const childValue = child.props.value || childIndex;
      this.valueToIndex[childValue] = childIndex;
      return React.cloneElement(child, {
        fullWidth,
        selected: childValue === value,
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
            <div className={tabItemContainerClassName}>
              {children}
            </div>
            <TabIndicator
              style={this.state.indicatorStyle}
              className={indicatorClassName}
              color={indicatorColor}
            />
          </div>
          {conditionalElements.scrollButtonRight}
        </div>
      </div>
    );
  }
}

export default compose(withStyles(styles, { name: 'MuiTabs' }), withWidth())(Tabs);
