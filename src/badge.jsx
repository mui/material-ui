import React from 'react';
import Typography from './styles/typography';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';
import StylePropable from './mixins/style-propable';

// Badge
const Badge = React.createClass({
  propTypes: {
    /**
     * This is the content rendered within the badge.
     */
    badgeContent: React.PropTypes.node.isRequired,

    /**
     * Override the inline-styles of the badge element.
     */
    badgeStyle: React.PropTypes.object,

    /**
     * The badge will be added relativelty to this node.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * If true, the badge will use the primary badge colors.
     */
    primary: React.PropTypes.bool,

    /**
     * If true, the badge will use the secondary badge colors.
     */
    secondary: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },
  contextTypes: {
    muiTheme: React.PropTypes.object,
  },
  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  mixins: [StylePropable],
  getDefaultProps() {
    return {
      primary: false,
      secondary: false,
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
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  },
  getStyles() {
    const theme = this.state.muiTheme.badge;

    const badgeBackgroundColor = this.props.primary
      ? theme.primaryColor
      : this.props.secondary
        ? theme.secondaryColor
        : theme.color;

    const badgeTextColor = this.props.primary
      ? theme.primaryTextColor
      : this.props.secondary
        ? theme.secondaryTextColor
        : theme.textColor;

    const radius = 12;
    const radius2x = Math.floor(2 * radius);

    return {
      root: {
        position: 'relative',
        display: 'inline-block',
        padding: [radius2x + 'px', radius2x + 'px', radius + 'px', radius + 'px'].join(' '),
      },
      badge: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        fontWeight: Typography.fontWeightMedium,
        fontSize: radius,
        width: radius2x,
        height: radius2x,
        borderRadius: '50%',
        backgroundColor: badgeBackgroundColor,
        color: badgeTextColor,
      },
    };
  },
  render() {
    const {
      style,
      children,
      badgeContent,
      badgeStyle,
      ...other,
    } = this.props;

    const styles = this.getStyles();

    return (
      <div {...other} style={this.prepareStyles(styles.root, style)}>
        {children}
        <span style={this.prepareStyles(styles.badge, badgeStyle)}>
          {badgeContent}
        </span>
      </div>
    );
  },
});

export default Badge;
