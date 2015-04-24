var React = require('react/addons');
var Tab = require('./tab');
var TabTemplate = require('./tabTemplate');
var InkBar = require('../ink-bar');
var Transitions = require('../styles/transitions.js');
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
      width: this.props.tabWidth || (100/this.props.children.length) + '%'
    };
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

    var tabItemContainerStyle = this.mergeAndPrefix({
      margin: '0',
      padding: '0',
      width: '100%',
      height: '48px',
      backgroundColor: Colors.cyan500,
      whiteSpace: 'nowrap',
      display: 'table'
    }, this.props.tabItemContainerStyle);
    
    var left = this.props.tabWidth ? 
      (this.props.tabWidth * this.state.selectedIndex) :
      (parseFloat(this.state.width) * this.state.selectedIndex) + '%';

    var currentTemplate;
    var tabs = React.Children.map(this.props.children, function(tab, index){
      if(tab.type.displayName === "Tab"){
        if(this.state.selectedIndex === index) currentTemplate = tab.props.children;
         return React.addons.cloneWithProps(tab, {
            key: index,
            selected: this.state.selectedIndex === index,
            tabIndex: index,
            width: this.state.width,
            handleTouchTap: this.handleTouchTap
          })
      } else {
        var type = tab.type.displayName || tab.type;
        throw "Tabs only accepts Tab Components as children. Found " + type + " as child number " + (index + 1) + " of Tabs";
      }
    }, this);

    return (
      <div style={this.mergeAndPrefix({position: 'relative'}, this.props.style)}>
        <div style={tabItemContainerStyle}>
          {tabs}
        </div>
        <InkBar left={left} width={this.state.width}/>
        <TabTemplate>
          {currentTemplate}
        </TabTemplate>
      </div>
    )
  },

});

module.exports = Tabs;
