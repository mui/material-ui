const React = require('react');
const Styles = require('../styles');
const Avatar = require('../avatar');
const StylePropable = require('../mixins/style-propable');
const ThemeManager = require('../styles/theme-manager');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');


const CardHeader = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState() {
    return { 
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  propTypes: {
    title: React.PropTypes.node,
    titleColor: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
    style: React.PropTypes.object,
    subtitle: React.PropTypes.node,
    subtitleColor: React.PropTypes.string,
    subtitleStyle: React.PropTypes.object,
    textStyle: React.PropTypes.object,
    expandable: React.PropTypes.bool,
    actAsExpander: React.PropTypes.bool,
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
    let rootStyle = this.prepareStyles(styles.root, this.props.style);
    let textStyle = this.prepareStyles(styles.text, this.props.textStyle);
    let titleStyle = this.prepareStyles(styles.title, this.props.titleStyle);
    let subtitleStyle = this.prepareStyles(styles.subtitle, this.props.subtitleStyle);

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
