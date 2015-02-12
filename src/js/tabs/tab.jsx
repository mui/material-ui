var React = require('react');
var TabTemplate = require('./tabTemplate');
var StylePropable = require('../mixins/style-propable.js');
var Theme = require('../styles/theme.js');

var Tab = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    handleTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool
  },


  handleTouchTap: function(){
    this.props.handleTouchTap(this.props.tabIndex, this);
  },

  render: function(){
    var styles = {
      'display': 'inline-block',
      'height': '100%',
      'cursor': 'pointer',
      'textAlign': 'center',
      'lineHeight': '48px',
      'opacity': '.6',
      'fontSize': '14sp',
      'fontWeight': '500',
      'font': Theme.fontFamily,
      'width': this.props.width
    };

    if (this.props.selected) styles.opacity = '1';

    return (
    <div style={styles} onTouchTap={this.handleTouchTap} routeName={this.props.route}>
      {this.props.label}
    </div>
    )
  }

});

module.exports = Tab;