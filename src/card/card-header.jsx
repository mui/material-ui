var React = require('react');
var Styles = require('../styles');
var Avatar = require('../avatar');
var StylePropable = require('../mixins/style-propable');

var CardHeader = React.createClass({
  
  mixins: [StylePropable],

  propTypes: {
    title: React.PropTypes.string,
    titleColor: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
    subtitle: React.PropTypes.string,
    subtitleColor: React.PropTypes.string,
    subtitleStyle: React.PropTypes.object,
    textStyle: React.PropTypes.object
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
        height: 72,
        padding: 16,
        fontWeight: Styles.Typography.fontWeightMedium,
        boxSizing: 'border-box'
      },
      text: {
        display: 'inline-block',
        verticalAlign: 'top'
      },
      avatar: {
        marginRight:16
      },
      title: {
        color: this.props.titleColor,
        display: 'block',
        fontSize: 15
      },
      subtitle: {
        color: this.props.subtitleColor,
        display: 'block',
        fontSize: 14
      }
    }
  },

  render: function () {
    var styles = this.getStyles();
    var rootStyle = this.mergeAndPrefix(styles.root, this.props.style);
    var textStyle = this.mergeAndPrefix(styles.text, this.props.textStyle);
    var titleStyle = this.mergeAndPrefix(styles.title, this.props.titleStyle);
    var subtitleStyle = this.mergeAndPrefix(styles.subtitle, this.props.subtitleStyle);

    var avatar = this.props.avatar;
    if (React.isValidElement(this.props.avatar)) {
      var avatarMergedStyle = this.mergeStyles(styles.avatar, avatar.props.style);
      avatar = React.cloneElement(avatar, {style:avatarMergedStyle})
    }
    else 
      avatar = <Avatar src={this.props.avatar} style={styles.avatar}/>

    return (
      <div {...this.props} style={rootStyle}>
        {avatar}
        <div style={textStyle}>
          <span style={titleStyle}>{this.props.title}</span>
          <span style={subtitleStyle}>{this.props.subtitle}</span>
        </div>
      </div>
    );
  }
});

module.exports = CardHeader;
