let React = require('react');
let Styles = require('../styles');
let StylePropable = require('../mixins/style-propable');


let CardTitle = React.createClass({

  mixins:[StylePropable],

  propTypes: {
    title: React.PropTypes.string,
    titleColor: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
    subtitle: React.PropTypes.string,
    subtitleColor: React.PropTypes.string,
    subtitleStyle: React.PropTypes.object,
    expandable: React.PropTypes.bool,
    showExpandableButton: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      titleColor: Styles.Colors.darkBlack,
      subtitleColor: Styles.Colors.lightBlack,
    };
  },

  getStyles() {
    return {
      root: {
        padding: 16,
        position: 'relative',
      },
      title: {
        fontSize: 24,
        color: this.props.titleColor,
        display: 'block',
        lineHeight: '36px',
      },
      subtitle: {
        fontSize: 14,
        color: this.props.subtitleColor,
        display: 'block',
      },
    };
  },

  render() {
    let styles = this.getStyles();
    let rootStyle = this.mergeAndPrefix(styles.root, this.props.style);
    let titleStyle = this.mergeAndPrefix(styles.title, this.props.titleStyle);
    let subtitleStyle = this.mergeAndPrefix(styles.subtitle, this.props.subtitleStyle);

    return (
      <div {...this.props} style={rootStyle}>
        <span style={titleStyle}>{this.props.title}</span>
        <span style={subtitleStyle}>{this.props.subtitle}</span>
        {this.props.children}
      </div>
    );
  },
});

module.exports = CardTitle;
