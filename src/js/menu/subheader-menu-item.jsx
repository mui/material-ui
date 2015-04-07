var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Typography = require('../styles/core/typography');
var CustomVariables = require('../styles/variables/custom-variables');

var SubheaderMenuItem = React.createClass({
  
  mixins: [StylePropable],

  propTypes: {
      index: React.PropTypes.number.isRequired,
      text: React.PropTypes.string.isRequired,
      firstChild: React.PropTypes.bool,
      className: React.PropTypes.string,
  },
  
  /** Styles */
  _main: function() {

    var gutterMini = CustomVariables.spacing.desktopGutterMini;
    var subheaderHeight = CustomVariables.spacing.desktopSubheaderHeight;

    var style = {
      fontSize: '13px',
      letterSpacing: 0,
      fontWeight: Typography.fontWeightMedium,
      color: Typography.textDarkBlack,
      margin: 0,
      height: subheaderHeight + gutterMini,
      lineHeight: subheaderHeight + 'px',
      color: CustomVariables.subheaderTextColor,
      borderTop: 'solid 1px ' + CustomVariables.subheaderBorderColor,
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