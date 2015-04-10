var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Typography = require('../styles/typography');

var SubheaderMenuItem = React.createClass({
  
  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
      index: React.PropTypes.number.isRequired,
      text: React.PropTypes.string.isRequired,
      firstChild: React.PropTypes.bool,
      className: React.PropTypes.string,
  },
  
  /** Styles */
  _main: function() {

    var gutterMini = this.getSpacing().desktopGutterMini;
    var subheaderHeight = this.getSpacing().desktopSubheaderHeight;

    var style = {
      boxSizing: 'border-box',
      fontSize: '13px',
      letterSpacing: 0,
      fontWeight: Typography.fontWeightMedium,
      color: Typography.textDarkBlack,
      margin: 0,
      height: subheaderHeight + gutterMini,
      lineHeight: subheaderHeight + 'px',
      color: this.getTheme().textColor,
      borderTop: 'solid 1px ' + this.getTheme().borderColor,
      paddingTop: gutterMini,
      marginTop: gutterMini,
    };

    if (this.props.firstChild) {
      style = this.mergeAndPrefix(style, {
        height: subheaderHeight,
        borderTop: 'none',
        paddingTop: 0,
        marginTop: 0,
      });
    }

    return this.mergeAndPrefix(style);
  },

  getTheme: function() {
    return this.context.theme.menuSubheader;
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  render: function() {
    return (
        <div 
        	key={this.props.index} 
        	style={this._main()}
          className={this.props.className}>
        		{this.props.text}
        </div>
    );
  }
  
});

module.exports = SubheaderMenuItem;