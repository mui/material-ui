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

  getEvenWidth: function(){
    return (
      parseInt(window
        .getComputedStyle(React.findDOMNode(this))
        .getPropertyValue('width'), 10)
    );
  },

  // Validates that the tabWidth can fit all tabs on the tab bar. If not, the 
  // tabWidth is recalculated and fixed. 
  componentDidMount: function(){
    if(this.props.tabWidth) {
      if(!(this.props.children.length * this.props.tabWidth > this.getEvenWidth())){
        this.setState({
          width: this.props.tabWidth,
          fixed: false
        });
        return;
      }
    }
    this.setState({
      width: this.getEvenWidth(),
      fixed: true
    });
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
    
    var width = this.state.fixed ?
      this.state.width/this.props.children.length :
      this.props.tabWidth;
    var left = width * this.state.selectedIndex || 0;

    var currentTemplate;
    var tabs = React.Children.map(this.props.children, function(tab, index){
      if(tab.type.displayName === "Tab"){
        if(this.state.selectedIndex === index) currentTemplate = tab.props.children;
         return React.addons.cloneWithProps(tab, {
            key: index,
            selected: this.state.selectedIndex === index,
            tabIndex: index,
            width: width,
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
        <InkBar left={left} width={width}/>
        <TabTemplate>
          {currentTemplate}
        </TabTemplate>
      </div>
    )
  },

});

module.exports = Tabs;
