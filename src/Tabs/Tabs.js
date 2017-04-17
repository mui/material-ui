// @flow weak

import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import EventListener from 'react-event-listener';
import throttle from 'lodash/throttle';
import ScrollbarSize from 'react-scrollbar-size';
import scroll from 'scroll';
import customPropTypes from '../utils/customPropTypes';
import withWidth, { isWidthUp } from '../utils/withWidth';
import TabIndicator from './TabIndicator';
import TabScrollButton from './TabScrollButton';

export const styleSheet = createStyleSheet('MuiTabs', () => {
  return {
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
});

class Tabs extends Component {
  static propTypes = {
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
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If `true`, the tabs will grow to use all the available space.
     * This property is intended for small views.
     */
    fullWidth: PropTypes.bool,
    /**
     * The index of the currently selected `Tab`.
     */
    index: PropTypes.number,
    /**
     * The CSS class name of the indicator element.
     */
    indicatorClassName: PropTypes.string,
    /**
     * Determines the color of the indicator.
     */
    indicatorColor: PropTypes.oneOfType([
      PropTypes.oneOf([
        'accent',
      ]),
      PropTypes.string,
    ]),
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
    scrollButtons: PropTypes.oneOf([
      'auto',
      'on',
      'off',
    ]),
    /**
     * Determines the color of the `Tab`.
     */
    textColor: PropTypes.oneOfType([
      PropTypes.oneOf([
        'accent',
        'inherit',
      ]),
      PropTypes.string,
    ]),
    /**
     * @ignore
     * width prop provided by withWidth decorator
     */
    width: PropTypes.string,
  };

  static defaultProps = {
    centered: false,
    fullWidth: false,
    indicatorColor: 'accent',
    scrollable: false,
    scrollButtons: 'auto',
    textColor: 'inherit',
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
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
    this.updatePositionStates(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updatePositionStates(nextProps);
  }

  tabs = undefined;

  handleResize = throttle(() => {
    this.updateScrollButtonState();
  }, 100);

  handleLeftScrollClick = () => {
    this.moveTabsScroll(-this.tabs.clientWidth);
  }

  handleRightScrollClick = () => {
    this.moveTabsScroll(this.tabs.clientWidth);
  }

  handleScrollbarSizeChange = ({ scrollbarHeight }) => {
    this.setState({
      scrollerStyle: {
        marginBottom: -scrollbarHeight,
      },
    });
  }

  handleTabsScroll = throttle(() => {
    this.updateScrollButtonState();
  }, 100);

  getClassGroups = () => {
    const {
      centered,
      className: classNameProp,
      scrollable,
    } = this.props;
    const classGroups = {};
    const classes = this.context.styleManager.render(styleSheet);

    classGroups.flexContainer = classNames(
      classes.flexContainer,
    );

    classGroups.root = classNames(
      classes.root,
      classNameProp,
    );

    classGroups.scroller = classNames(
      classes.scrollingContainer,
      {
        [classes.fixed]: !scrollable,
        [classes.scrollable]: scrollable,
      },
    );

    classGroups.tabItemContainer = classNames(
      classes.flexContainer,
      { [classes.centered]: centered && !scrollable },
    );

    return classGroups;
  }

  getConditionalElements = () => {
    const {
      buttonClassName,
      scrollable,
      scrollButtons,
      width,
    } = this.props;
    const conditionalElements = {};
    conditionalElements.scrollbarSizeListener = (
      scrollable ? (
        <ScrollbarSize
          onLoad={this.handleScrollbarSizeChange}
          onChange={this.handleScrollbarSizeChange}
        />
      ) : null
    );

    const showScrollButtons = scrollable && (
      (isWidthUp('md', width) && scrollButtons === 'auto') ||
      (scrollButtons === 'on')
    );

    conditionalElements.windowResizeListener = (
      showScrollButtons ? (
        <EventListener
          target="window"
          onResize={this.handleResize}
        />
      ) : null
    );

    conditionalElements.scrollButtonLeft = (
      showScrollButtons ? (
        <TabScrollButton
          direction="left"
          onClick={this.handleLeftScrollClick}
          visible={this.state.showLeftScroll}
          className={buttonClassName}
        />
      ) : null
    );

    conditionalElements.scrollButtonRight = (
      showScrollButtons ? (
        <TabScrollButton
          className={buttonClassName}
          direction="right"
          onClick={this.handleRightScrollClick}
          visible={this.state.showRightScroll}
        />
      ) : null
    );

    return conditionalElements;
  }

  moveTabsScroll = (delta) => {
    const nextScrollLeft = this.tabs.scrollLeft + delta;
    scroll.left(this.tabs, nextScrollLeft);
  }

  updatePositionStates(props) {
    if (this.tabs) {
      const tabsMeta = this.tabs.getBoundingClientRect();
      tabsMeta.scrollLeft = this.tabs.scrollLeft;

      const tabMeta = this.tabs.children[0].children[props.index].getBoundingClientRect();

      this.setState({
        indicatorStyle: {
          left: tabMeta.left + (tabsMeta.scrollLeft - tabsMeta.left),
          width: tabMeta.width, // May be wrong until the font is loaded.
        },
      });

      this.scrollSelectedIntoView(tabsMeta, tabMeta);

      this.updateScrollButtonState(); // determine if scroll buttons should be shown
    }
  }

  scrollSelectedIntoView = (tabsMeta, tabMeta) => {
    if (tabMeta.left < tabsMeta.left) {
      // left side of button is out of view
      const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);
      scroll.left(this.tabs, nextScrollLeft);
    } else if (tabMeta.right > tabsMeta.right) {
      // right side of button is out of view
      const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);
      scroll.left(this.tabs, nextScrollLeft);
    }
  }

  updateScrollButtonState = () => {
    const showLeftScroll = this.tabs.scrollLeft > 0;
    const showRightScroll = this.tabs.scrollWidth > (this.tabs.clientWidth + this.tabs.scrollLeft);

    if (
      showLeftScroll !== this.state.showLeftScroll ||
      showRightScroll !== this.state.showRightScroll
    ) {
      this.setState({
        showLeftScroll,
        showRightScroll,
      });
    }
  };

  render() {
    const {
      buttonClassName, // eslint-disable-line no-unused-vars
      centered, // eslint-disable-line no-unused-vars
      children: childrenProp,
      className: classNameProp, // eslint-disable-line no-unused-vars
      fullWidth,
      index,
      indicatorClassName,
      indicatorColor,
      onChange,
      scrollable, // eslint-disable-line no-unused-vars
      scrollButtons, // eslint-disable-line no-unused-vars
      textColor,
      width, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classGroups = this.getClassGroups();

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
      <div className={classGroups.root} {...other}>
        {conditionalElements.windowResizeListener}
        {conditionalElements.scrollbarSizeListener}
        <div className={classGroups.flexContainer}>
          {conditionalElements.scrollButtonLeft}
          <div
            className={classGroups.scroller}
            style={this.state.scrollerStyle}
            ref={(c) => { this.tabs = c; }}
            role="tablist"
            onScroll={this.handleTabsScroll}
          >
            <div className={classGroups.tabItemContainer}>
              {children}
            </div>
            <TabIndicator
              style={this.state.indicatorStyle}
              className={indicatorClassName}
              indicatorColor={indicatorColor}
            />
          </div>
          {conditionalElements.scrollButtonRight}
        </div>
      </div>
    );
  }
}

export default withWidth()(Tabs);
