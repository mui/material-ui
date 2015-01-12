var React = require('react');
var Tab = require('./tab.jsx');
var TabTemplate = require('./tabTemplate.jsx');
var InkBar = require('../ink-bar.jsx');

var Tabs = React.createClass({

  propTypes: {
    onTabsChange: React.PropTypes.func
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

  handleClick: function(tabIndex, tab){
    this.setState({selectedIndex: tabIndex});
    //default CB is _onTabsChange. Can be updated in tab.jsx
    if(tab.props.onTabsChange) tab.props.onTabsChange(tab);
  },

  render: function(){
    var _this = this; 
    var width = this.state.fixed ?
      this.state.width/this.props.children.length :
      this.props.tabWidth;
    var left = width * this.state.selectedIndex || 0;
    var currentTemplate = this.props.children[this.state.selectedIndex].props.template;
    var tabs = React.Children.map(this.props.children, function(tab, index){
      return (
        <Tab
          key={index}
          selected={_this.state.selectedIndex === index}
          tabIndex={index}
          value={tab.props.label}
          width={width}
          route={tab.props.route}
          template={tab.props.template}
          onTabsChange={tab.props.onTabsChange}
          handleClick={_this.handleClick} />
      );
    });

    return (
      <div className="mui-tabs-container">
        <div className="mui-tab-item-container">
          {tabs}
        </div>
        <InkBar left={left} width={width}/>
        <TabTemplate
          template={currentTemplate}>
        </TabTemplate>
      </div>
    )
  },

});

module.exports = Tabs;