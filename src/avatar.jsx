import React, {PropTypes} from 'react';
import getMuiTheme from './styles/getMuiTheme';

function getStyles(props, state) {
  const {
    backgroundColor,
    color,
    size,
    src,
  } = props;

  const {
    avatar,
  } = state.muiTheme;

  const styles = {
    root: {
      color: color || avatar.color,
      backgroundColor: backgroundColor || avatar.backgroundColor,
      userSelect: 'none',
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: `${size}px`,
      fontSize: size / 2 + 4,
      borderRadius: '50%',
      height: size,
      width: size,
    },
    icon: {
      color: color || avatar.color,
      margin: 8,
    },
  };

  if (src && avatar.borderColor) {
    Object.assign(styles.root, {
      border: `solid 1px ${avatar.borderColor}`,
      height: size - 2,
      width: size - 2,
    });
  }

  return styles;
}

const Avatar = React.createClass({

  propTypes: {
    /**
     * The backgroundColor of the avatar. Does not apply to image avatars.
     */
    backgroundColor: PropTypes.string,

    /**
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.node,

    /**
     * The css class name of the root `div` or `img` element.
     */
    className: PropTypes.string,

    /**
     * The icon or letter's color.
     */
    color: PropTypes.string,

    /**
     * This is the SvgIcon or FontIcon to be used inside the avatar.
     */
    icon: PropTypes.element,

    /**
     * This is the size of the avatar in pixels.
     */
    size: PropTypes.number,

    /**
     * If passed in, this component will render an img element. Otherwise, a div will be rendered.
     */
    src: PropTypes.string,

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  childContextTypes: {
    muiTheme: PropTypes.object,
  },

  getDefaultProps() {
    return {
      size: 40,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  render() {
    const {
      icon,
      src,
      style,
      className,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    if (src) {
      return (
        <img
          {...other}
          src={src}
          style={prepareStyles(Object.assign(styles.root, style))}
          className={className}
        />
      );
    } else {
      return (
        <div
          {...other}
          style={prepareStyles(Object.assign(styles.root, style))}
          className={className}
        >
          {icon && React.cloneElement(icon, {
            color: styles.icon.color,
            style: Object.assign(styles.icon, icon.props.style),
          })}
          {this.props.children}
        </div>
      );
    }
  },
});

export default Avatar;
