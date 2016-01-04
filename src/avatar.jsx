import React from 'react';
import StylePropable from './mixins/style-propable';
import Colors from './styles/colors';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

const Avatar = React.createClass({

  propTypes: {
    /**
     * The backgroundColor of the avatar. Does not apply to image avatars.
     */
    backgroundColor: React.PropTypes.string,

    /**
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root `div` or `img` element.
     */
    className: React.PropTypes.string,

    /**
     * The icon or letter's color.
     */
    color: React.PropTypes.string,

    /**
     * This is the SvgIcon or FontIcon to be used inside the avatar.
     */
    icon: React.PropTypes.element,

    /**
     * This is the size of the avatar in pixels.
     */
    size: React.PropTypes.number,

    /**
     * If passed in, this component will render an img element. Otherwise, a div will be rendered.
     */
    src: React.PropTypes.string,

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
      backgroundColor: Colors.grey400,
      color: Colors.white,
      size: 40,
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

  render() {
    let {
      backgroundColor,
      color,
      icon,
      size,
      src,
      style,
      className,
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

      if (borderColor) {
        styles.root = this.mergeStyles(styles.root, {
          height: size - 2,
          width: size - 2,
          border: 'solid 1px ' + borderColor,
        });
      }

      return (
        <img
          {...other}
          src={src}
          style={this.prepareStyles(styles.root, style)}
          className={className}
        />
      );
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

      return (
        <div
          {...other}
          style={this.prepareStyles(styles.root, style)}
          className={className}
        >
          {iconElement}
          {this.props.children}
        </div>
      );
    }
  },
});

export default Avatar;
