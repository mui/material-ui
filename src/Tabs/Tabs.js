// @flow weak

import React, { Component, Children, cloneElement } from 'react';
import warning from 'warning';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import ScrollbarSize from 'react-scrollbar-size';
import scroll from 'scroll';
import withStyles from '../styles/withStyles';
import withWidth, { isWidthUp } from '../utils/withWidth';
import TabIndicator from './TabIndicator';
import TabScrollButton from './TabScrollButton';

export const styleSheet = createStyleSheet('MuiTabs', {
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
});

/**
 * Notice that this Component is incompatible with server side rendering.
 */
class Tabs extends Component {
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
    if (this.props.index !== nextProps.index) {
      this.updateIndicatorState(nextProps);
    }
  }

  componentDidUpdate(prevProps, prevState) {
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

  tabs = undefined;

  handleResize = debounce(() => {
    this.updateIndicatorState(this.props);
    this.updateScrollButtonState();
  }, 100);

  handleLeftScrollClick = () => {
    this.moveTabsScroll(-this.tabs.clientWidth);
  };

  handleRightScrollClick = () => {
    this.moveTabsScroll(this.tabs.clientWidth);
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
  }, 100);

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

  getTabsMeta = index => {
    let tabsMeta;
    if (this.tabs) {
      tabsMeta = this.tabs.getBoundingClientRect();
      tabsMeta.scrollLeft = this.tabs.scrollLeft;
    }

    let tabMeta;
    if (this.tabs && index !== false) {
      const tab = this.tabs.children[0].children[index];
      warning(tab, `Material-UI: the index provided \`${index}\` is invalid`);
      tabMeta = tab ? this.tabs.children[0].children[index].getBoundingClientRect() : null;
    }
    return { tabsMeta, tabMeta };
  };

  moveTabsScroll = delta => {
    const nextScrollLeft = this.tabs.scrollLeft + delta;
    scroll.left(this.tabs, nextScrollLeft);
  };

  updateIndicatorState(props) {
    const { tabsMeta, tabMeta } = this.getTabsMeta(props.index);
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
    const { tabsMeta, tabMeta } = this.getTabsMeta(this.props.index);

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

    if (scrollable && scrollButtons !== 'off') {
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
      index,
      indicatorClassName,
      indicatorColor,
      onChange,
      scrollable,
      scrollButtons,
      textColor,
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

    const children = Children.map(childrenProp, (tab, childIndex) => {
      return cloneElement(tab, {
        fullWidth,
        selected: childIndex === index,
        index: childIndex,
        onChange,
        textColor,
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

Tabs.propTypes = {
  /**
   * The CSS class name of the scroll button elements.
   */
  buttonClassName: PropTypes.string,
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
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the tabs will grow to use all the available space.
   * This property is intended for small views.
   */
  fullWidth: PropTypes.bool,
  /**
   * The index of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
   */
  index: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.number]).isRequired,
  /**
   * The CSS class name of the indicator element.
   */
  indicatorClassName: PropTypes.string,
  /**
   * Determines the color of the indicator.
   */
  indicatorColor: PropTypes.oneOfType([PropTypes.oneOf(['accent', 'primary']), PropTypes.string]),
  /**
   * Function called when the index change.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * True invokes scrolling properties and allow for horizontally scrolling
   * (or swiping) the tab bar.
   */
  scrollable: PropTypes.bool,
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll
   * `auto` will only present them on medium and larger viewports
   * `on` will always present them
   * `off` will never present them
   */
  scrollButtons: PropTypes.oneOf(['auto', 'on', 'off']),
  /**
   * Determines the color of the `Tab`.
   */
  textColor: PropTypes.oneOfType([
    PropTypes.oneOf(['accent', 'primary', 'inherit']),
    PropTypes.string,
  ]),
  /**
   * @ignore
   * width prop provided by withWidth decorator
   */
  width: PropTypes.string,
};

export default compose(withStyles(styleSheet), withWidth())(Tabs);
