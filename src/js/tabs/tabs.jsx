var React = require('react/addons');
var Tab = require('./tab');
var TabTemplate = require('./tabTemplate');
var InkBar = require('../ink-bar');
var Transitions = require('../styles/mixins/transitions.js');
var StylePropable = require('../mixins/style-propable.js');

var Tabs = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    onActive: React.PropTypes.func
  },

  getInitialState: function(){
    return {
      selectedIndex: 0
    };
  },

  getEvenWidth: function(){
    return (
      parseInt(window
        .getComputedStyle(this.getDOMNode())
        .getPropertyValue('width'), 10)
    );
  },

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
    if (this.props.onChange && this.state.selectedIndex !== tabIndex) this.props.onChange();
    this.setState({selectedIndex: tabIndex});
    //default CB is _onActive. Can be updated in tab.jsx
    if(tab.props.onActive) tab.props.onActive(tab);
  },

  render: function(){
    var tabItemContainerStyle = this.mergePropStyles({
      margin: '0',
      padding: '0',
      width: '100%',
      height: '48px',
      'backgroundColor': '#00bcd4',
      'whiteSpace': 'nowrap',
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