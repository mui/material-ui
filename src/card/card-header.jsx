import React from 'react';
import Styles from '../styles';
import Avatar from '../avatar';
import StylePropable from '../mixins/style-propable';
import ThemeManager from '../styles/theme-manager';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';

const CardHeader = React.createClass({

  propTypes: {
    actAsExpander: React.PropTypes.bool,
    avatar: React.PropTypes.node,
    children: React.PropTypes.node,
    expandable: React.PropTypes.bool,
    showExpandableButton: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    subtitle: React.PropTypes.node,
    subtitleColor: React.PropTypes.string,
    subtitleStyle: React.PropTypes.object,
    textStyle: React.PropTypes.object,
    title: React.PropTypes.node,
    titleColor: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

  getDefaultProps() {
    return {
      titleColor: Styles.Colors.darkBlack,
      subtitleColor: Styles.Colors.lightBlack,
      avatar: null,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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
    let rootStyle = this.mergeStyles(styles.root, this.props.style);
    let textStyle = this.mergeStyles(styles.text, this.props.textStyle);
    let titleStyle = this.mergeStyles(styles.title, this.props.titleStyle);
    let subtitleStyle = this.mergeStyles(styles.subtitle, this.props.subtitleStyle);

    let avatar = this.props.avatar;
    if (React.isValidElement(this.props.avatar)) {
      let avatarMergedStyle = this.mergeStyles(styles.avatar, avatar.props.style);
      avatar = React.cloneElement(avatar, {style: avatarMergedStyle});
    } else if (avatar !== null) {
      avatar = <Avatar src={this.props.avatar} style={styles.avatar}/>;
    }

    return (
      <div {...this.props} style={this.prepareStyles(rootStyle)}>
        {avatar}
        <div style={this.prepareStyles(textStyle)}>
          <span style={this.prepareStyles(titleStyle)}>{this.props.title}</span>
          <span style={this.prepareStyles(subtitleStyle)}>{this.props.subtitle}</span>
        </div>
        {this.props.children}
      </div>
    );
  },
});

export default CardHeader;
