var React = require('react');
var StylePropable = require('../mixins/style-propable.js');
var Colors = require('../styles/colors.js')
var Tab = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    handleTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
    width: React.PropTypes.string
  },

  handleTouchTap: function(){
    this.props.handleTouchTap(this.props.tabIndex, this);
  },

  render: function(){
    var theme = this.context.muiTheme.component.tab;

    var styles = this.mergeAndPrefix({
      'display': theme.display,
      'cursor': theme.cursor,
      'textAlign': theme.textAlign,
      'verticalAlign': theme.verticalAlign,
      'height': theme.height,
      'color': theme.color,
      'opacity': theme.opacity,
      'fontSize': theme.fontSize,
      'fontWeight': theme.fontWeight,
      'whiteSpace': theme.whiteSpace,
      'fontFamily': this.context.muiTheme.contentFontFamily,
      'boxSizing': theme.boxSizing,
      'width': theme.width
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
