var React = require('react');
var Styles = require('../styles');
var Avatar = require('../avatar');
var StylePropable = require('../mixins/style-propable');

var CardHeader = React.createClass({
  
  mixins: [StylePropable],

  propTypes: {
    avatar: React.PropTypes.any,
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
    var avatar = this.props.avatar;
    if (React.isValidElement(this.props.avatar)) {
      var avatarMergedStyle = this.mergeStyles(styles.avatar, avatar.props.style);
      avatar = React.cloneElement(avatar, {style:avatarMergedStyle})
    }
    else 
      avatar = <Avatar src={this.props.avatar} style={styles.avatar}/>



    return (
      <div style={styles.root}>
        {avatar}
        <div style={styles.text}>
          <span style={styles.title}>{this.props.title}</span>
          <span style={styles.subtitle}>{this.props.subtitle}</span>
        </div>
      </div>
    );
  }
});

module.exports = CardHeader;
