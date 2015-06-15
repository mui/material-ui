var React = require('react');
var Styles = require('../styles');

var CardTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    titleColor: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    subtitleColor: React.PropTypes.string
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

    return (
      <div style={styles.root}>
        <span style={styles.title}>{this.props.title}</span>
        <span style={styles.subtitle}>{this.props.subtitle}</span>
      </div>
    );
  }
});

module.exports = CardTitle;
