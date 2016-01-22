import React from 'react';
import ReactDOM from 'react-dom';
import TabTemplate from './tabTemplate';
import InkBar from '../ink-bar';
import StylePropable from '../mixins/style-propable';
import Controllable from '../mixins/controllable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';
import warning from 'warning';

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
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Override the inline-styles of the tab-labels container.
     */
    tabItemContainerStyle: React.PropTypes.object,

    /**
     * Override the default tab template used to wrap the content of each tab element.
     */
    tabTemplate: React.PropTypes.func,

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
    Controllable,
  ],

  getDefaultProps() {
    return {
      initialSelectedIndex: 0,
    };
  },

  getInitialState() {
    let valueLink = this.getValueLink(this.props);
    let initialIndex = this.props.initialSelectedIndex;

    return {
      selectedIndex: valueLink.value !== undefined ?
        this._getSelectedIndex(this.props) :
        initialIndex < this.getTabCount() ?
        initialIndex :
        0,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(newProps, nextContext) {
    const valueLink = this.getValueLink(newProps);
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;

    if (valueLink.value !== undefined) {
      this.setState({selectedIndex: this._getSelectedIndex(newProps)});
    }

    this.setState({muiTheme: newMuiTheme});
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

  render() {
    let {
      children,
      contentContainerClassName,
      contentContainerStyle,
      initialSelectedIndex,
      inkBarStyle,
      style,
      tabItemContainerStyle,
      tabTemplate,
      ...other,
    } = this.props;

    let themeVariables = this.state.muiTheme.tabs;
    let styles = {
      tabItemContainer: {
        margin: 0,
        padding: 0,
        width: '100%',
        height: 48,
        backgroundColor: themeVariables.backgroundColor,
        whiteSpace: 'nowrap',
        display: 'table',
      },
    };

    let valueLink = this.getValueLink(this.props);
    let tabValue = valueLink.value;
    let tabContent = [];

    let width = 100 / this.getTabCount() + '%';

    let left = 'calc(' + width + '*' + this.state.selectedIndex + ')';

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
        selected: this._getSelected(tab, index),
        tabIndex: index,
        width: width,
        onTouchTap: this._handleTabTouchTap,
      });
    });

    const inkBar = this.state.selectedIndex !== -1 ? (
      <InkBar
        left={left}
        width={width}
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
        <div style={this.prepareStyles(styles.tabItemContainer, tabItemContainerStyle)}>
          {tabs}
        </div>
        <div style={{width: inkBarContainerWidth}}>
         {inkBar}
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
