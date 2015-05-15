var React = require('react');
var TabTemplate = require('./tabTemplate');
var StylePropable = require('../mixins/style-propable.js');
var Colors = require('../styles/colors.js')
var Tab = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    handleTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  handleTouchTap: function(){
    this.props.handleTouchTap(this.props.tabIndex, this);
  },

  render: function(){
    var styles = this.mergeAndPrefix({
      'display': 'table-cell',
      'height': '100%',
      'cursor': 'pointer',
      'textAlign': 'center',
      'verticalAlign': 'middle',
      'height': '48px',
      'color': Colors.white,
      'opacity': '.6',
      'fontSize': '14sp',
      'fontWeight': '500',
      'whiteSpace': 'initial',
      fontFamily: this.context.muiTheme.contentFontFamily,
      'width': this.props.width
    }, this.props.style);

    if (this.props.selected) styles.opacity = '1';

    return (
    <div style={styles} onTouchTap={this.handleTouchTap} routeName={this.props.route}>
      {this.props.label}
    </div>
    )
  }

});

module.exports = Tab;
