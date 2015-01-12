var React = require('react');
var Classable = require('../mixins/classable.js');
var TabTemplate = require('./tabTemplate.jsx');


var Tab = React.createClass({

  mixins: [Classable],

  propTypes: {
    selected: React.PropTypes.bool
  },


  handleClick: function(){
    this.props.handleClick(this.props.tabIndex, this);
  },

  render: function(){
    var styles = {
      width: this.props.width
    };

    var classes = this.getClasses('mui-tab-item', {
      'mui-tab-is-active': this.props.selected
    });

    return (
    <div className={classes} style={styles}>
      <div onClick={this.handleClick} routeName={this.props.route}>
        {this.props.value}
      </div>
    </div>
    )
  }

});

module.exports = Tab;