var React = require('react');
var Styles = require('../styles');
var StylePropable = require('../mixins/style-propable');

var CardTitle = React.createClass({

  mixins:[StylePropable],

  propTypes: {
    title: React.PropTypes.string,
    titleColor: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
    subtitle: React.PropTypes.string,
    subtitleColor: React.PropTypes.string,
    subtitleStyle: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      titleColor: Styles.Colors.darkBlack,
      subtitleColor: Styles.Colors.lightBlack
    };
  },
  getStyles: function () {
    return {
      root: {
        padding: 16
      },
      title: {
        fontSize: 24,
        color: this.props.titleColor,
        display: 'block',
        lineHeight: '36px'
      },
      subtitle: {
        fontSize: 14,
        color: this.props.subtitleColor,
        display: 'block'
      }
    }
  },
  render: function () {
    var styles = this.getStyles();
    var rootStyle = this.mergeAndPrefix(styles.root, this.props.style);
    var titleStyle = this.mergeAndPrefix(styles.title, this.props.titleStyle);
    var subtitleStyle = this.mergeAndPrefix(styles.subtitle, this.props.subtitleStyle);

    return (
      <div {...this.props} style={rootStyle}>
        <span style={titleStyle}>{this.props.title}</span>
        <span style={subtitleStyle}>{this.props.subtitle}</span>
      </div>
    );
  }
});

module.exports = CardTitle;
