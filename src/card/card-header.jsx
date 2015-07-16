let React = require('react');
let Styles = require('../styles');
let Avatar = require('../avatar');
let StylePropable = require('../mixins/style-propable');


let CardHeader = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    title: React.PropTypes.string,
    titleColor: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
    subtitle: React.PropTypes.string,
    subtitleColor: React.PropTypes.string,
    subtitleStyle: React.PropTypes.object,
    textStyle: React.PropTypes.object,
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
        height: 72,
        padding: 16,
        fontWeight: Styles.Typography.fontWeightMedium,
        boxSizing: 'border-box',
        position: 'relative',
      },
      text: {
        display: 'inline-block',
        verticalAlign: 'top',
      },
      avatar: {
        marginRight: 16,
      },
      title: {
        color: this.props.titleColor,
        display: 'block',
        fontSize: 15,
      },
      subtitle: {
        color: this.props.subtitleColor,
        display: 'block',
        fontSize: 14,
      },
    };
  },

  render() {
    let styles = this.getStyles();
    let rootStyle = this.mergeAndPrefix(styles.root, this.props.style);
    let textStyle = this.mergeAndPrefix(styles.text, this.props.textStyle);
    let titleStyle = this.mergeAndPrefix(styles.title, this.props.titleStyle);
    let subtitleStyle = this.mergeAndPrefix(styles.subtitle, this.props.subtitleStyle);

    let avatar = this.props.avatar;
    if (React.isValidElement(this.props.avatar)) {
      let avatarMergedStyle = this.mergeStyles(styles.avatar, avatar.props.style);
      avatar = React.cloneElement(avatar, {style:avatarMergedStyle});
    }
    else
      avatar = <Avatar src={this.props.avatar} style={styles.avatar}/>;

    return (
      <div {...this.props} style={rootStyle}>
        {avatar}
        <div style={textStyle}>
          <span style={titleStyle}>{this.props.title}</span>
          <span style={subtitleStyle}>{this.props.subtitle}</span>
        </div>
        {this.props.children}
      </div>
    );
  },
});

module.exports = CardHeader;
