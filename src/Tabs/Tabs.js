import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import TabTemplate from './TabTemplate';
import InkBar from './InkBar';
import warning from 'warning';
import Events from '../utils/events';
import TabPaginatorButton from './PaginatorButton';

const Constants = {
  TAB_ITEM_REF_NAME_PREFIX: 'tab-',
  TAB_WRAPPER_REF_NAME: 'tab-wrapper',
  TAB_SCROLL_WRAPPER_REF_NAME: 'tab-scroll-wrapper',
  TAB_CONTAINER_REF_NAME: 'tab-container',
  TAB_PAGINATOR_BUTTON_DEFAULT_WIDTH: 32,
};

function getStyles(props, context, state) {
  const {tabs} = context.muiTheme;

  return {
    tabItemContainer: {
      width: (props.fillWidth && !state.shouldPaginate) ? '100%' : 0,
      backgroundColor: tabs.backgroundColor,
      whiteSpace: 'nowrap',
      padding: state.shouldPaginate ? `0 ${Constants.TAB_PAGINATOR_BUTTON_DEFAULT_WIDTH}px` : 0,
      display: 'table',
    },
    tabWrapper: {
      position: 'relative',
      minWidth: '100%',
      backgroundColor: tabs.backgroundColor,
    },
    tabScrollWrapper: {
      position: 'relative',
      minWidth: '100%',
      overflowY: 'hidden',
      overflowX: 'hidden',
    },
  };
}


class Tabs extends Component {
  static propTypes = {
    /**
     * Should be used to pass `Tab` components.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The css class name of the content's container.
     */
    contentContainerClassName: PropTypes.string,
    /**
     * Override the inline-styles of the content's container.
     */
    contentContainerStyle: PropTypes.object,
    /**
     * Tab container fills the width of the window. Tabs will have equal width
     * as long as the container width is less than the window width.
     */
    fillWidth: React.PropTypes.bool,
    /**
     * Icon for paginator button
     */
    iconButtonLeft: React.PropTypes.string,
    iconButtonRight: React.PropTypes.string,
    /**
     * Specify initial visible tab index.
     * Initial selected index is set by default to 0.
     * If initialSelectedIndex is set but larger than the total amount of specified tabs,
     * initialSelectedIndex will revert back to default.
     */
    initialSelectedIndex: PropTypes.number,
    /**
     * Override the inline-styles of the InkBar.
     */
    inkBarStyle: PropTypes.object,
    /**
     * Called when the selected value change.
     */
    onChange: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Use svgIcon in material-ui
     */
    svgIcon: React.PropTypes.bool,
    /**
     * Override the inline-styles of the tab-labels container.
     */
    tabItemContainerStyle: PropTypes.object,
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
    tabTemplate: PropTypes.func,
    /**
     * Override the inline-styles of the tab items container.
     */
    tabWrapperStyle: React.PropTypes.object,
    /**
     * Makes Tabs controllable and selects the tab whose value prop matches this prop.
     */
    value: PropTypes.any,

  };

  static defaultProps = {
    initialSelectedIndex: 0,
    fillWidth: true,
    onChange: () => {
    },
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {selectedIndex: 0};

  componentWillMount() {
    const valueLink = this.getValueLink(this.props);
    const initialIndex = this.props.initialSelectedIndex;
    const selectedIndex = valueLink.value !== undefined ?
      this.getSelectedIndex(this.props) :
      initialIndex < this.getTabCount() ?
        initialIndex :
        0;

    this.setState({
      selectedIndex: selectedIndex,
      previousIndex: selectedIndex,
      disableLeftPaginatorButton: selectedIndex === 0,
      disableRightPaginatorButton: selectedIndex === this.getTabCount() - 1,
      tabInfo: [],
      shouldPaginate: false,
      tabContainerWidth: 0,
      tabWrapperWidth: 0,
    });
  }

  componentDidMount() {
    window.requestAnimationFrame(() => {
      window.setTimeout(this.handleWindowWidthChange, 10);
    });
    Events.on(window, 'resize', this.handleWindowWidthChange);
  }

  componentWillReceiveProps(newProps, nextContext) {
    const valueLink = this.getValueLink(newProps);
    const newState = {
      muiTheme: nextContext.muiTheme || this.context.muiTheme,
    };

    if (valueLink.value !== undefined) {
      newState.selectedIndex = this.getSelectedIndex(newProps);
    }

    this.setState(newState);
  }

  componentDidUpdate() {
    this.updateTabWrapperScrollOffset(this.state.tabInfo);
  }

  componentWillUnmount() {
    Events.off(window, 'resize', this.handleWindowWidthChange);
  }

  getTabs() {
    const tabs = [];
    React.Children.forEach(this.props.children, (tab) => {
      if (React.isValidElement(tab)) {
        tabs.push(tab);
      }
    });
    return tabs;
  }

  getTabCount() {
    return this.getTabs().length;
  }

  // Do not use outside of this component, it will be removed once valueLink is deprecated
  getValueLink(props) {
    return props.valueLink
      || {
        value: props.value,
        requestChange: props.onChange,
      };
  }

  getSelectedIndex(props) {
    const valueLink = this.getValueLink(props);
    let selectedIndex = -1;

    this.getTabs().forEach((tab, index) => {
      if (valueLink.value === tab.props.value) {
        selectedIndex = index;
      }
    });

    return selectedIndex;
  }

  handleTabTouchTap = (value, event, tab) => {
    const valueLink = this.getValueLink(this.props);
    const tabIndex = tab.props.tabIndex;

    if ((valueLink.value && valueLink.value !== value) ||
      this.state.selectedIndex !== tabIndex) {
      valueLink.requestChange(value, event, tab);
    }

    this.setState({selectedIndex: tabIndex});

    if (tab.props.onActive) {
      tab.props.onActive(tab);
    }
  };

  getSelected = (tab, index) => {
    const valueLink = this.getValueLink(this.props);
    return valueLink.value ? valueLink.value === tab.props.value :
    this.state.selectedIndex === index;
  };

  getDOMNode(refName) {
    return ReactDOM.findDOMNode(this.refs[refName]);
  }

  getDOMNodeWidth(refName) {
    return this.getDOMNode(refName).offsetWidth;
  }

  handleLeftTabPaginatorTap = () => {
    const tabContainerWidth = this.getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
    this.getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME).scrollLeft -=
      tabContainerWidth / this.getTabCount();
    // tabContainerWidth needed due to that element might not have proper width
    this.setState({
      disableLeftPaginatorButton: this.disableLeftPaginatorButton(),
      disableRightPaginatorButton: this.disableRightPaginatorButton(),
      tabContainerWidth: tabContainerWidth,
    });
  };

  handleRightTabPaginatorTap = () => {
    const tabContainerWidth = this.getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
    this.getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME).scrollLeft +=
      tabContainerWidth / this.getTabCount();
    // tabContainerWidth needed due to that element might not have proper width
    this.setState({
      disableLeftPaginatorButton: this.disableLeftPaginatorButton(),
      disableRightPaginatorButton: this.disableRightPaginatorButton(),
      tabContainerWidth: tabContainerWidth,
    });
  };

  disableLeftPaginatorButton() {
    return this.getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME).scrollLeft === 0;
  }

  disableRightPaginatorButton() {
    const tabContainerWidth = this.getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
    const tabWrapperWidth = this.getDOMNodeWidth(Constants.TAB_WRAPPER_REF_NAME);
    return this.getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME).scrollLeft === tabContainerWidth - tabWrapperWidth;
  }

  handleWindowWidthChange = () => {
    this.setState(this.getNewState());
  };

  getNewState() {
    const newState = {};
    const tabInfo = [];

    const tabContainerWidth = this.getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
    const tabWrapperWidth = this.getDOMNodeWidth(Constants.TAB_WRAPPER_REF_NAME);
    const nextShouldPaginate = tabContainerWidth > tabWrapperWidth;

    React.Children.forEach(this.props.children, (tab, index) => {
      const tabWidth = this.getDOMNodeWidth(Constants.TAB_ITEM_REF_NAME_PREFIX + index);
      let leftOffset = nextShouldPaginate ? Constants.TAB_PAGINATOR_BUTTON_DEFAULT_WIDTH : 0;
      if (tabInfo.length > 0) {
        const lastAddedTab = tabInfo[tabInfo.length - 1];
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
    newState.muiTheme = this.context.muiTheme;
    newState.selectedIndex = this.state.selectedIndex;
    newState.previousIndex = this.state.previousIndex;
    newState.disableLeftPaginatorButton = this.disableLeftPaginatorButton();
    newState.disableRightPaginatorButton = this.disableRightPaginatorButton();
    return newState;
  }

  updateTabWrapperScrollOffset(tabInfo) {
    // make selected tab visible on either first entry or device orientation change
    const tabContainerWidth = this.getDOMNodeWidth(Constants.TAB_CONTAINER_REF_NAME);
    const tabWrapperWidth = this.getDOMNodeWidth(Constants.TAB_WRAPPER_REF_NAME);
    const nextShouldPaginate = tabContainerWidth > tabWrapperWidth;
    const tabWrapperWidthChange = this.state.tabWrapperWidth !== tabWrapperWidth;
    const paginationChange = this.state.shouldPaginate !== nextShouldPaginate;
    if (paginationChange || tabContainerWidth !== this.state.tabContainerWidth || tabWrapperWidthChange) {
      const nextSelectedTab = tabInfo[this.state.selectedIndex];
      if (nextSelectedTab !== undefined) {
        const tabScrollWrapper = this.getDOMNode(Constants.TAB_SCROLL_WRAPPER_REF_NAME);
        const tabScrollWrapperLeftScroll = tabScrollWrapper.scrollLeft;
        const tabScrollWrapperWidth = tabScrollWrapper.offsetWidth;
        const tabPaginationButtonMargin = nextShouldPaginate ? Constants.TAB_PAGINATOR_BUTTON_DEFAULT_WIDTH : 0;
        const tabVisible = nextSelectedTab.leftOffset - tabPaginationButtonMargin >= tabScrollWrapperLeftScroll &&
          tabScrollWrapperLeftScroll + tabScrollWrapperWidth - nextSelectedTab.rightOffset - tabPaginationButtonMargin >= 0;
        if (!tabVisible) {
          const shouldScrollRight = tabScrollWrapperLeftScroll + tabScrollWrapperWidth - nextSelectedTab.rightOffset - tabPaginationButtonMargin < 0;
          // calculate how much to set tag scroll wrapper's scrollLeft to
          if (shouldScrollRight) {
            tabScrollWrapper.scrollLeft = nextSelectedTab.rightOffset + tabPaginationButtonMargin
              - tabScrollWrapperWidth;
          } else {
            tabScrollWrapper.scrollLeft = nextSelectedTab.leftOffset - tabPaginationButtonMargin;
          }
        }
      }
    }
  }

  render() {
    const {
      contentContainerClassName,
      contentContainerStyle,
      initialSelectedIndex, // eslint-disable-line no-unused-vars
      inkBarStyle,
      style,
      tabItemContainerStyle,
      tabTemplate,
      tabWrapperStyle,
      tabPaginatorButtonStyle,
      tabPaginatorButtonIconStyle,
      fillWidth,
      ...other,
    } = this.props;

    let equalTabWidth = fillWidth && !this.state.shouldPaginate;

    // calculate selected tab's width and offset, used to animate inl-bar
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const valueLink = this.getValueLink(this.props);
    const tabValue = valueLink.value;
    const tabContent = [];

    let width = 0;
    let left = 0;
    let right = 0;

    if (equalTabWidth) {
      width = this.state.tabWrapperWidth / this.getTabCount();
      left = width * this.state.selectedIndex;
      right = this.state.tabWrapperWidth - width - left;
    } else if (this.state.tabInfo.length > 0) {
      width = this.state.tabInfo[this.state.selectedIndex].width;
      left = this.state.tabInfo[this.state.selectedIndex].leftOffset;
      right = this.state.tabInfo[this.state.selectedIndex].right;
    }

    const tabs = this.getTabs().map((tab, index) => {
      warning(tab.type && tab.type.muiName === 'Tab',
        `Tabs only accepts Tab Components as children.
        Found ${tab.type.muiName || tab.type} as child number ${index + 1} of Tabs`);

      warning(!tabValue || tab.props.value !== undefined,
        `Tabs value prop has been passed, but Tab ${index}
        does not have a value prop. Needs value if Tabs is going
        to be a controlled component.`);

      tabContent.push(tab.props.children ?
        React.createElement(tabTemplate || TabTemplate, {
          key: index,
          selected: this.getSelected(tab, index),
        }, tab.props.children) : undefined);

      return React.cloneElement(tab, {
        key: index,
        ref: Constants.TAB_ITEM_REF_NAME_PREFIX + index,
        selected: this.getSelected(tab, index),
        tabIndex: index,
        width: equalTabWidth ? width : 0,
        onTouchTap: this.handleTabTouchTap,
      });
    });

    const inkBar = this.state.selectedIndex !== -1 ? (
      <InkBar
        left={left}
        width={width}
        right={right}
        moveBarLeft={this.state.selectedIndex < this.state.previousIndex}
        style={inkBarStyle}
      />
    ) : null;

    const inkBarContainerWidth = tabItemContainerStyle ?
      tabItemContainerStyle.width : '100%';

    const paginatorButtons = this.state.shouldPaginate ? [
      <TabPaginatorButton key={1}
                          isLeftPaginatorButton={true}
                          style={tabPaginatorButtonStyle}
                          iconStyle={tabPaginatorButtonIconStyle}
                          disabled={this.state.disableLeftPaginatorButton}
                          onTouchTap={this.handleLeftTabPaginatorTap}
                          iconClassName={this.props.iconButtonLeft}
                          svgIcon={this.props.svgIcon}
      />,
      <TabPaginatorButton key={2}
                          isLeftPaginatorButton={false}
                          style={tabPaginatorButtonStyle}
                          iconStyle={tabPaginatorButtonIconStyle}
                          disabled={this.state.disableRightPaginatorButton}
                          onTouchTap={this.handleRightTabPaginatorTap}
                          iconClassName={this.props.iconButtonRight}
                          svgIcon={this.props.svgIcon}
      />
    ] : null;

    return (
      <div
        {...other}
        style={prepareStyles(Object.assign({}, style))}
        className="tabs-container"
      >
        <div
          className="tab-wrapper"
          ref={Constants.TAB_WRAPPER_REF_NAME}
          style={prepareStyles(Object.assign(styles.tabWrapper, tabWrapperStyle))}
        >
          {paginatorButtons}
          <div
            className="tab-scroll-wrapper"
            ref={Constants.TAB_SCROLL_WRAPPER_REF_NAME}
            style={styles.tabScrollWrapper}
          >
            <div
              className="tab-container"
              ref={Constants.TAB_CONTAINER_REF_NAME}
              style={prepareStyles(Object.assign(styles.tabItemContainer, tabItemContainerStyle))}
            >
              {tabs}
            </div>
            <div style={{width: inkBarContainerWidth}}>
              {inkBar}
            </div>
          </div>
        </div>
        <div
          style={prepareStyles(Object.assign({}, contentContainerStyle))}
          className={contentContainerClassName}
        >
          {tabContent}
        </div>
      </div>
    );
  }
}

export default Tabs;
