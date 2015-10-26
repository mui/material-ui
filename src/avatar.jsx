const React = require('react');
const StylePropable = require('./mixins/style-propable');
const Colors = require('./styles/colors');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');

const Avatar = React.createClass({

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

  propTypes: {
    backgroundColor: React.PropTypes.string,
    color: React.PropTypes.string,
    icon: React.PropTypes.element,
    size: React.PropTypes.number,
    src: React.PropTypes.string,
    style: React.PropTypes.object,
  },

  getInitialState () {
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

  getDefaultProps() {
    return {
      backgroundColor: Colors.grey400,
      color: Colors.white,
      size: 40,
    };
  },

  render() {
    let {
      backgroundColor,
      color,
      icon,
      size,
      src,
      style,
      ...other,
    } = this.props;

    let styles = {
      root: {
        height: size,
        width: size,
        userSelect: 'none',
        borderRadius: '50%',
        display: 'inline-block',
      },
    };

    if (src) {
      const borderColor = this.state.muiTheme.avatar.borderColor;

      if(borderColor) {
        styles.root = this.mergeStyles(styles.root, {
          height: size - 2,
          width: size - 2,
          border: 'solid 1px ' + borderColor,
        });
      }

      return <img {...other} src={src} style={this.prepareStyles(styles.root, style)} />;
    } else {
      styles.root = this.mergeStyles(styles.root, {
        backgroundColor: backgroundColor,
        textAlign: 'center',
        lineHeight: size + 'px',
        fontSize: size / 2 + 4,
        color: color,
      });

      const styleIcon = {
        margin: 8,
      };

      const iconElement = icon ? React.cloneElement(icon, {
        color: color,
        style: this.mergeStyles(styleIcon, icon.props.style),
      }) : null;

      return <div {...other} style={this.prepareStyles(styles.root, style)}>
        {iconElement}
        {this.props.children}
      </div>;
    }
  },
});

module.exports = Avatar;
