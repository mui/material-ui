import React from 'react';
import ReactDOM from 'react-dom';
import TabTemplate from './tabTemplate';
import InkBar from '../ink-bar';
import TabPaginatorButton from './tab-paginator-button';
import StylePropable from '../mixins/style-propable';
import StyleResizable from '../mixins/style-resizable';
import getMuiTheme from '../styles/getMuiTheme';
import Events from '../utils/events';
import warning from 'warning';

const Constants = {
  TAB_ITEM_REF_NAME_PREFIX: 'tab-',
  TAB_WRAPPER_REF_NAME: 'tab-wrapper',
  TAB_SCROLL_WRAPPER_REF_NAME: 'tab-scroll-wrapper',
  TAB_CONTAINER_REF_NAME: 'tab-container',
  TAB_PAGINATOR_BUTTON_DEFAULT_WIDTH: 32,
};

const Tabs = React.createClass({

  propTypes: {
    /**
     * Should be used to pass `Tab` components.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * The css class name of the content's container.
     */
    contentContainerClassName: React.PropTypes.string,

    /**
     * Override the inline-styles of the content's container.
     */
    contentContainerStyle: React.PropTypes.object,

    /**
     * Specify initial visible tab index.
     * Initial selected index is set by default to 0.
     * If initialSelectedIndex is set but larger than the total amount of specified tabs,
     * initialSelectedIndex will revert back to default.
     */
    initialSelectedIndex: React.PropTypes.number,

    /**
     * Override the inline-styles of the InkBar.
     */
    inkBarStyle: React.PropTypes.object,

    /**
     * Called when the selected value change.
     */
    onChange: React.PropTypes.func,

    /**
     * Stretch tab container to occupy the whole width
     */
    stretchTabContainer: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Override the inline-styles of the tab-labels container.
     */
    tabItemContainerStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the tab paginator button icon.
     */
    tabPaginatorButtonIconStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the tab paginator buttons.
     */
    tabPaginatorButtonStyle: React.PropTypes.object,

    /**
     * Override the default tab template used to wrap the content of each tab element.
     */
    tabTemplate: React.PropTypes.func,

    /**
     * Override the inline-styles of the tab items container.
     */
    tabWrapperStyle: React.PropTypes.object,

    /**
     * Makes Tabs controllable and selects the tab whose value prop matches this prop.
     */
    value: React.PropTypes.any,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
    StyleResizable,
  ],

  getDefaultProps() {
    return {
      initialSelectedIndex: 0,
      stretchTabContainer: false,
      onChange: () => {},
    };
  },

  getInitialState() {
    let valueLink = this.getValueLink(this.props);
    let initialIndex = this.props.initialSelectedIndex;
    let selectedIndex = valueLink.value !== undefined ?
      this._getSelectedIndex(this.props) :
      initialIndex < this.getTabCount() ?
        initialIndex :
        0;

    return {
      selectedIndex: selectedIndex,
      previousIndex: selectedIndex,
      muiTheme: this.context.muiTheme || getMuiTheme(),
      disableLeftPaginatorButton: selectedIndex === 0,
      disableRightPaginatorButton: selectedIndex === this.getTabCount() - 1,
      tabInfo: [],
      shouldPaginate: false,
      tabContainerWidth: 0,
      tabWrapperWidth: 0,
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    Events.on(window, 'resize', this.handleWindowWidthChange);
    this.replaceState(this.getNewState());
  },

  componentWillReceiveProps(newProps, nextContext) {
    const valueLink = this.getValueLink(newProps);
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;

    if (valueLink.value !== undefined) {
      this.setState({selectedIndex: this._getSelectedIndex(newProps)});
    }

    this.setState({muiTheme: newMuiTheme});
  },

  componentDidUpdate() {
    this.updateTabWrapperScrollOffset(this.state.tabInfo);
  },

  componentWillUnmount() {
    Events.off(window, 'resize', this.handleWindowWidthChange);
  },

  getEvenWidth() {
    return (
      parseInt(window
        .getComputedStyle(ReactDOM.findDOMNode(this))
        .getPropertyValue('width'), 10)
    );
  },

  getTabCount() {
    return React.Children.count(this.props.children);
  },

  // Do not use outside of this component, it will be removed once valueLink is deprecated
  getValueLink(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange,
    };
  },

  _getSelectedIndex(props) {
    let valueLink = this.getValueLink(props);
    let selectedIndex = -1;

    React.Children.forEach(props.children, (tab, index) => {
      if (valueLink.value === tab.props.value) {
        selectedIndex = index;
      }
    });

    return selectedIndex;
  },

  _handleTabTouchTap(value, e, tab) {
    let valueLink = this.getValueLink(this.props);
    let tabIndex = tab.props.tabIndex;

    if ((valueLink.value && valueLink.value !== value) ||
      this.state.selectedIndex !== tabIndex) {
      valueLink.requestChange(value, e, tab);
    }

    this.setState({selectedIndex: tabIndex});

    if (tab.props.onActive) {
      tab.props.onActive(tab);
    }
  },

  _getSelected(tab, index) {
    let valueLink = this.getValueLink(this.props);
    return valueLink.value ? valueLink.value === tab.props.value :
      this.state.selectedIndex === index;
  },

  _getDOMNode(refName) {
    return ReactDOM.findDOMNode(this.refs[refName]);
  },

  _getDOMNodeWidth(refName) {
    return this._getDOMNode(refName).offsetWidth;
  },

  _getSelectedTabWidth(tabIndex) {
    return this._getDOMNode(Constants.TAB_ITEM_REF_NAME_PREFIX + tabIndex).offsetWidth;
  },

  _getSelectedTabLeftOffset(tabIndex) {
    let tabLeftOffset = 0;
    React.Children.forEach(this.props.children, (tab, index) => {
      let tempWidth = this._getDOMNodeWidth(Constants.TAB_ITEM_REF_NAME_PREFIX + index);
      if (index < tabIndex) {
        tabLeftOffset += tempWidth;
      }
    });
    return tabLeftOffset;
  },

  _handleLeftTabPaginatorTap() {
    let tabContainerWidth = this._getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
    this._getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME).scrollLeft -=
      tabContainerWidth / this.getTabCount();
    // tabContainerWidth needed due to that element might not have proper width
    this.setState({
      disableLeftPaginatorButton: this._disableLeftPaginatorButton(),
      disableRightPaginatorButton: this._disableRightPaginatorButton(),
      tabContainerWidth: tabContainerWidth,
    });
  },

  _handleRightTabPaginatorTap() {
    let tabContainerWidth = this._getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
    this._getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME).scrollLeft +=
      tabContainerWidth / this.getTabCount();
    // tabContainerWidth needed due to that element might not have proper width
    this.setState({
      disableLeftPaginatorButton: this._disableLeftPaginatorButton(),
      disableRightPaginatorButton: this._disableRightPaginatorButton(),
      tabContainerWidth: tabContainerWidth,
    });
  },

  _disableLeftPaginatorButton() {
    return this._getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME).scrollLeft === 0;
  },


  _disableRightPaginatorButton() {
    let tabContainerWidth = this._getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
    let tabWrapperWidth = this._getDOMNodeWidth(Constants.TAB_WRAPPER_REF_NAME);
    return this._getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME).scrollLeft === tabContainerWidth - tabWrapperWidth;
  },

  handleWindowWidthChange() {
    this.replaceState(this.getNewState());
  },

  getNewState() {
    let newState = {};
    let tabContainerWidth = this._getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
    let tabWrapperWidth = this._getDOMNodeWidth(Constants.TAB_WRAPPER_REF_NAME);
    let nextShouldPaginate = tabContainerWidth > tabWrapperWidth;
    let tabInfo = [];
    React.Children.forEach(this.props.children, (tab, index) => {
      let tabWidth = this._getDOMNodeWidth(Constants.TAB_ITEM_REF_NAME_PREFIX + index);
      let leftOffset = nextShouldPaginate ? Constants.TAB_PAGINATOR_BUTTON_DEFAULT_WIDTH : 0;
      if (tabInfo.length > 0) {
        let lastAddedTab = tabInfo[tabInfo.length - 1];
        leftOffset = lastAddedTab.rightOffset;
      }
      tabInfo[index] = {
        width: tabWidth,
        leftOffset: leftOffset,
        rightOffset: leftOffset + tabWidth,
        right: tabWrapperWidth - leftOffset - tabWidth,
      };
    });
    this.updateTabWrapperScrollOffset(tabInfo);
    newState.tabContainerWidth = tabContainerWidth;
    newState.tabInfo = tabInfo;
    newState.tabWrapperWidth = tabWrapperWidth;
    newState.shouldPaginate = nextShouldPaginate;
    newState.muiTheme = this.state.muiTheme;
    newState.selectedIndex = this.state.selectedIndex;
    newState.previousIndex = this.state.previousIndex;
    newState.deviceSize = this.getDeviceSize();
    newState.disableLeftPaginatorButton = this._disableLeftPaginatorButton();
    newState.disableRightPaginatorButton = this._disableRightPaginatorButton();
    return newState;
  },

  updateTabWrapperScrollOffset(tabInfo) {
    // make selected tab visible on either first entry or device orientation change
    let tabContainerWidth = this._getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
    let tabWrapperWidth = this._getDOMNodeWidth(Constants.TAB_WRAPPER_REF_NAME);
    let nextShouldPaginate = tabContainerWidth > tabWrapperWidth;
    let tabWrapperWidthChange = this.state.tabWrapperWidth !== tabWrapperWidth;
    let paginationChange = this.state.shouldPaginate !== nextShouldPaginate;
    if (paginationChange || tabContainerWidth !== this.state.tabContainerWidth || tabWrapperWidthChange) {
      let nextSelectedTab = tabInfo[this.state.selectedIndex];
      let tabScrollWrapper = this._getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME);
      let tabScrollWrapperLeftScroll = tabScrollWrapper.scrollLeft;
      let tabScrollWrapperWidth = tabScrollWrapper.offsetWidth;
      let tabPaginationButtonMargin = nextShouldPaginate ? Constants.TAB_PAGINATOR_BUTTON_DEFAULT_WIDTH : 0;
      let tabVisible = nextSelectedTab.leftOffset - tabPaginationButtonMargin >= tabScrollWrapperLeftScroll
        && tabScrollWrapperLeftScroll + tabScrollWrapperWidth - nextSelectedTab.rightOffset
        - tabPaginationButtonMargin >= 0;
      if (!tabVisible) {
        let shouldScrollRight = tabScrollWrapperLeftScroll + tabScrollWrapperWidth
          - nextSelectedTab.rightOffset - tabPaginationButtonMargin < 0;
        // calculate how much to set tag scroll wrapper's scrollLeft to
        if (shouldScrollRight) {
          tabScrollWrapper.scrollLeft = nextSelectedTab.rightOffset + tabPaginationButtonMargin - tabScrollWrapperWidth;
        } else {
          tabScrollWrapper.scrollLeft = nextSelectedTab.leftOffset - tabPaginationButtonMargin;
        }
      }
    }
  },

  render() {
    let {
      children,
      contentContainerClassName,
      contentContainerStyle,
      initialSelectedIndex,
      inkBarStyle,
      style,
      tabWrapperStyle,
      tabPaginatorButtonStyle,
      tabPaginatorButtonIconStyle,
      tabItemContainerStyle,
      tabTemplate,
      stretchTabContainer,
      ...other,
    } = this.props;


    // stretch tabs if stretchTabContainer is true and if device screen size is large
    let shouldStretch = stretchTabContainer && this.isDeviceSize(StyleResizable.statics.Sizes.LARGE);

    let themeVariables = this.state.muiTheme.tabs;
    let styles = {
      tabWrapper: {
        position: 'relative',
        minWidth: '100%',
        backgroundColor: themeVariables.backgroundColor,
      },
      tabScrollWrapper: {
        position: 'relative',
        minWidth: '100%',
        overflowY: 'hidden',
        overflowX: 'hidden',
      },
      tabItemContainer: {
        margin: 0,
        height: 48,
        padding: this.state.shouldPaginate ? `0 ${Constants.TAB_PAGINATOR_BUTTON_DEFAULT_WIDTH}px` : 0,
        backgroundColor: themeVariables.backgroundColor,
        whiteSpace: 'nowrap',
        display: 'table',
        width: shouldStretch ? '100%' : 0,
      },
    };

    // calculate selected tab's width and offset, used to animate inl-bar
    let width = 0;
    let left = 0;
    let right = 0;
    if (shouldStretch) {
      width = this.state.tabWrapperWidth / this.getTabCount();
      left = width * this.state.selectedIndex;
      right = this.state.tabWrapperWidth - width - left;
    } else if (this.state.tabInfo.length > 0) {
      width = this.state.tabInfo[this.state.selectedIndex].width;
      left = this.state.tabInfo[this.state.selectedIndex].leftOffset;
      right = this.state.tabInfo[this.state.selectedIndex].right;
    }

    let valueLink = this.getValueLink(this.props);
    let tabValue = valueLink.value;
    let tabContent = [];

    let tabs = React.Children.map(children, (tab, index) => {
      warning(tab.type && tab.type.displayName === 'Tab',
        `Tabs only accepts Tab Components as children.
        Found ${tab.type.displayName || tab.type} as child number ${index + 1} of Tabs`);

      warning(!tabValue || tab.props.value !== undefined,
        `Tabs value prop has been passed, but Tab ${index}
        does not have a value prop. Needs value if Tabs is going
        to be a controlled component.`);

      tabContent.push(tab.props.children ?
        React.createElement(tabTemplate || TabTemplate, {
          key: index,
          selected: this._getSelected(tab, index),
        }, tab.props.children) : undefined);

      return React.cloneElement(tab, {
        key: index,
        ref: Constants.TAB_ITEM_REF_NAME_PREFIX + index,
        selected: this._getSelected(tab, index),
        tabIndex: index,
        width: shouldStretch ? width : 0,
        onTouchTap: this._handleTabTouchTap,
      });
    });

    const inkBar = this.state.selectedIndex !== -1 ? (
      <InkBar
        left={left}
        right={right}
        moveBarLeft={this.state.selectedIndex < this.state.previousIndex}
        style={inkBarStyle}
      />
    ) : null;

    const inkBarContainerWidth = tabItemContainerStyle ?
      tabItemContainerStyle.width : '100%';

    return (
      <div
        {...other}
        style={this.prepareStyles(style)}
      >
        <div
          ref={Constants.TAB_WRAPPER_REF_NAME}
          style={this.prepareStyles(styles.tabWrapper, tabWrapperStyle)}>
          <TabPaginatorButton display={this.state.shouldPaginate}
            isLeftPaginatorButton={true}
            style={tabPaginatorButtonStyle}
            iconStyle={tabPaginatorButtonIconStyle}
            disabled={this.state.disableLeftPaginatorButton}
            onTouchTap={this._handleLeftTabPaginatorTap}/>
          <TabPaginatorButton display={this.state.shouldPaginate}
            isLeftPaginatorButton={false}
            style={tabPaginatorButtonStyle}
            iconStyle={tabPaginatorButtonIconStyle}
            disabled={this.state.disableRightPaginatorButton}
            onTouchTap={this._handleRightTabPaginatorTap}/>
          <div
            ref={Constants.TAB_SCROLL_WRAPPER_REF_NAME}
            style={styles.tabScrollWrapper}>
            <div
              ref={Constants.TAB_CONTAINER_REF_NAME}
              style={this.prepareStyles(styles.tabItemContainer, tabItemContainerStyle)}>
              {tabs}
            </div>
            <div style={{width: inkBarContainerWidth}}>
              {inkBar}
            </div>
          </div>
        </div>
        <div
          style={this.prepareStyles(contentContainerStyle)}
          className={contentContainerClassName}
        >
          {tabContent}
        </div>
      </div>
    );
  },
});

export default Tabs;
