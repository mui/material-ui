import React, {Component, PropTypes} from 'react';

function getStyles(props, context) {
  const {
    backgroundColor,
    color,
    size,
  } = props;

  const {avatar} = context.muiTheme;

  const styles = {
    root: {
      color: color || avatar.color,
      backgroundColor: backgroundColor || avatar.backgroundColor,
      userSelect: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size / 2,
      borderRadius: '50%',
      height: size,
      width: size,
    },
    icon: {
      color: color || avatar.color,
      width: size * 0.6,
      height: size * 0.6,
      fontSize: size * 0.6,
      margin: size * 0.2,
    },
  };

  return styles;
}

class Avatar extends Component {
  static muiName = 'Avatar';

  static propTypes = {
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
  };

  static defaultProps = {
    size: 40,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      backgroundColor, // eslint-disable-line no-unused-vars
      icon,
      src,
      style,
      className,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    if (src) {
      return (
        <img
          style={prepareStyles(Object.assign(styles.root, style))}
          {...other}
          src={src}
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
  }
}

export default Avatar;
