var React = require('react');
var Typography = require('../styles/typography');
var StylePropable = require('../mixins/style-propable');

var AppBarTitle = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    text: React.PropTypes.string,
  },

  getTheme: function() {
    return this.context.muiTheme.component.appBar;
  },

  render: function() {
    var {
      style,
      text,
      ...other
    } = this.props;

    var styles = this.mergeAndPrefix({
      float: 'left',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      fontWeight: Typography.fontWeightNormal,
      color: this.getTheme().textColor,
      lineHeight: this.getTheme().height + 'px'
    }, style);

    return (
      <span style={styles} {...other} >{text}</span>
    );
  }

});

module.exports = AppBarTitle;
