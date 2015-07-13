let React = require('react/addons');
let TabTemplate = require('./tabTemplate');
let InkBar = require('../ink-bar');
let StylePropable = require('../mixins/style-propable');
let Events = require('../utils/events');


let Tabs = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    initialSelectedIndex: React.PropTypes.number,
    onActive: React.PropTypes.func,
    tabWidth: React.PropTypes.number,
    tabItemContainerStyle: React.PropTypes.object,
    contentContainerStyle: React.PropTypes.object,
    inkBarStyle: React.PropTypes.object,
  },

  getInitialState(){
    let selectedIndex = 0;
    if (this.props.initialSelectedIndex && this.props.initialSelectedIndex < this.getTabCount()) {
      selectedIndex = this.props.initialSelectedIndex;
    }
    return {
      selectedIndex: selectedIndex,
    };
  },

  getEvenWidth(){
    return (
      parseInt(window
        .getComputedStyle(React.findDOMNode(this))
        .getPropertyValue('width'), 10)
    );
  },

  getTabCount() {
    return React.Children.count(this.props.children);
  },

  componentDidMount() {
    this._updateTabWidth();
    Events.on(window, 'resize', this._updateTabWidth);
  },

  componentWillUnmount() {
    Events.off(window, 'resize', this._updateTabWidth);
  },

  componentWillReceiveProps(newProps) {
    if (newProps.hasOwnProperty('style')) this._updateTabWidth();
  },

  handleTouchTap(tabIndex, tab){
    if (this.props.onChange && this.state.selectedIndex !== tabIndex) {
      this.props.onChange(tabIndex, tab);
    }

    this.setState({selectedIndex: tabIndex});
    //default CB is _onActive. Can be updated in tab.jsx
    if (tab.props.onActive) tab.props.onActive(tab);
  },

  getStyles() {
    let themeVariables = this.context.muiTheme.component.tabs;

    return {
      tabItemContainer: {
        margin: '0',
        padding: '0',
        width: '100%',
        height: '48px',
        backgroundColor: themeVariables.backgroundColor,
        whiteSpace: 'nowrap',
        display: 'table',
      },
    };
  },

  render() {
    let styles = this.getStyles();

    let tabContent = [];
    let width = this.state.fixedWidth ?
      100 / this.getTabCount() +'%' :
      this.props.tabWidth + 'px';

    let left = 'calc(' + width + '*' + this.state.selectedIndex + ')';

    let tabs = React.Children.map(this.props.children, (tab, index) => {
      if (tab.type.displayName === "Tab") {
        if (tab.props.children) {
          tabContent.push(React.createElement(TabTemplate, {
            key: index,
            selected: this.state.selectedIndex === index,
          }, tab.props.children));
        }
        else {
          tabContent.push(undefined);
        }

        return React.addons.cloneWithProps(tab, {
          key: index,
          selected: this.state.selectedIndex === index,
          tabIndex: index,
          width: width,
          handleTouchTap: this.handleTouchTap,
        });
      }
      else {
        let type = tab.type.displayName || tab.type;
        throw 'Tabs only accepts Tab Components as children. Found ' +
              type + ' as child number ' + (index + 1) + ' of Tabs';
      }
    }, this);

    return (
      <div style={this.mergeAndPrefix(this.props.style)}>
        <div style={this.mergeAndPrefix(styles.tabItemContainer, this.props.tabItemContainerStyle)}>
          {tabs}
        </div>
        <InkBar left={left} width={width} style={this.props.inkBarStyle}/>
        <div style={this.mergeAndPrefix(this.props.contentContainerStyle)}>
          {tabContent}
        </div>
      </div>
    );
  },

  _tabWidthPropIsValid() {
    return this.props.tabWidth &&
      (this.props.tabWidth * this.getTabCount() <= this.getEvenWidth());
  },

  // Validates that the tabWidth can fit all tabs on the tab bar. If not, the
  // tabWidth is recalculated and fixed.
  _updateTabWidth() {
    if (this._tabWidthPropIsValid()) {
      this.setState({
        fixedWidth: false,
      });
    }
    else {
      this.setState({
        fixedWidth: true,
      });
    }
  },

});

module.exports = Tabs;

