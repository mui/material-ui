var React = require('react/addons');
var Tab = require('./tab');
var TabTemplate = require('./tabTemplate');
var InkBar = require('../ink-bar');
var Transitions = require('../styles/mixins/transitions.js');
var StylePropable = require('../mixins/style-propable.js');
var Colors = require('../styles/colors.js')


var Tabs = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    initialSelectedIndex: React.PropTypes.number,
    onActive: React.PropTypes.func,
    tabWidth: React.PropTypes.number
  },

  getInitialState: function(){
    var selectedIndex = 0;
    if (this.props.initialSelectedIndex && this.props.initialSelectedIndex < this.props.children.length) {
      selectedIndex = this.props.initialSelectedIndex;
    }
    return {
      selectedIndex: selectedIndex,
      fixed: true,
      width: this.props.tabWidth || (100/this.props.children.length) + '%'
    };
  },

  getLeft: function(){
    return ((100/this.props.children.length) * this.state.selectedIndex) + '%'
  },

  handleTouchTap: function(tabIndex, tab){
    if (this.props.onChange && this.state.selectedIndex !== tabIndex) {
      this.props.onChange(tabIndex, tab);
    }

    this.setState({selectedIndex: tabIndex});
    //default CB is _onActive. Can be updated in tab.jsx
    if(tab.props.onActive) tab.props.onActive(tab);
  },

  render: function(){

    var tabItemContainerStyle = this.mergeStyles({
      margin: '0',
      padding: '0',
      width: '100%',
      height: '48px',
      backgroundColor: Colors.cyan500,
      whiteSpace: 'nowrap',
      display: 'block'
    }, this.props.tabItemContainerStyle);
    var _this = this; 
    var width = this.state.fixed ?
      this.state.width/this.props.children.length :
      this.props.tabWidth;
    var left = width * this.state.selectedIndex || 0;

    var currentTemplate;
    var tabs = React.Children.map(this.props.children, function(tab, index){
      if(tab.type.displayName === "Tab"){
        if(_this.state.selectedIndex === index) currentTemplate = tab.props.children;
         return React.addons.cloneWithProps(tab, {
            key: index,
            selected: _this.state.selectedIndex === index,
            tabIndex: index,
            width: width,
            handleTouchTap: _this.handleTouchTap
          })
      } else {
        var type = tab.type.displayName || tab.type;
        throw "Tabs only accepts Tab Components as children. Found " + type + " as child number " + (index + 1) + " of Tabs";
      }
    });

    return (
      <div style={{position: 'relative'}}>
        <div style={tabItemContainerStyle}>
          {tabs}
        </div>
        <InkBar left={left} width={width}/>
        <TabTemplate>
          {currentTemplate}
        </TabTemplate>
      </div>
    )
  },

});

module.exports = Tabs;
