const React = require('react');
const ReactDOM = require('react-dom');
const TabTemplate = require('./tabTemplate');
const InkBar = require('../ink-bar');
const StylePropable = require('../mixins/style-propable');
const Controllable = require('../mixins/controllable');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const Tabs = React.createClass({

  mixins: [StylePropable, Controllable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    contentContainerStyle: React.PropTypes.object,
    initialSelectedIndex: React.PropTypes.number,
    inkBarStyle: React.PropTypes.object,
    tabItemContainerStyle: React.PropTypes.object,
    tabTemplate: React.PropTypes.func,
    style: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getDefaultProps() {
    return {
      initialSelectedIndex : 0,
      tabTemplate: TabTemplate,
    };
  },

  getInitialState(){
    let valueLink = this.getValueLink(this.props);
    let initialIndex = this.props.initialSelectedIndex;

    return {
      selectedIndex: valueLink.value ?
        this._getSelectedIndex(this.props) :
        initialIndex < this.getTabCount() ?
        initialIndex :
        0,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getEvenWidth(){
    return (
      parseInt(window
        .getComputedStyle(ReactDOM.findDOMNode(this))
        .getPropertyValue('width'), 10)
    );
  },

  getTabCount() {
    return React.Children.count(this.props.children);
  },

  componentWillReceiveProps(newProps, nextContext) {
    let valueLink = this.getValueLink(newProps);
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;

    if (valueLink.value){
      this.setState({selectedIndex: this._getSelectedIndex(newProps)});
    }

    this.setState({muiTheme: newMuiTheme});
  },

  render() {
    let {
      children,
      contentContainerStyle,
      initialSelectedIndex,
      inkBarStyle,
      style,
      tabWidth,
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

    let width = 100 / this.getTabCount() +'%';

    let left = 'calc(' + width + '*' + this.state.selectedIndex + ')';

    let tabs = React.Children.map(children, (tab, index) => {
      if (tab.type.displayName === "Tab") {
        if (!tab.props.value && tabValue && process.env.NODE_ENV !== 'production') {
          console.error('Tabs value prop has been passed, but Tab ' + index +
          ' does not have a value prop. Needs value if Tabs is going' +
          ' to be a controlled component.');
        }

        tabContent.push(tab.props.children ?
          React.createElement(tabTemplate, {
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
      }
      else {
        let type = tab.type.displayName || tab.type;
        console.error('Tabs only accepts Tab Components as children. Found ' +
              type + ' as child number ' + (index + 1) + ' of Tabs');
      }
    }, this);

    let inkBar = this.state.selectedIndex !== -1 ? (
      <InkBar
        left={left}
        width={width}
        style={inkBarStyle}/>
    ) : null;

    let inkBarContainerWidth = tabItemContainerStyle ?
      tabItemContainerStyle.width : '100%';

    return (
      <div
        {...other}
        style={this.prepareStyles(style)}>
        <div style={this.prepareStyles(styles.tabItemContainer, tabItemContainerStyle)}>
          {tabs}
        </div>
        <div style={{width: inkBarContainerWidth}}>
         {inkBar}
        </div>
        <div style={this.prepareStyles(contentContainerStyle)}>
          {tabContent}
        </div>
      </div>
    );
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

  _handleTabTouchTap(value, e, tab){
    let valueLink = this.getValueLink(this.props);
    let tabIndex = tab.props.tabIndex;

    if ((valueLink.value && valueLink.value !== value) ||
      this.state.selectedIndex !== tabIndex) {
      valueLink.requestChange(value, e, tab);
    }

    this.setState({selectedIndex: tabIndex});
    tab.props.onActive(tab);
  },

  _getSelected(tab, index) {
    let valueLink = this.getValueLink(this.props);
    return valueLink.value ? valueLink.value === tab.props.value :
      this.state.selectedIndex === index;
  },

});

module.exports = Tabs;
