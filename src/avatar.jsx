import React from 'react';
import MuiComponent from './MuiComponent';
import styleUtils from './utils/styles';
import Colors from './styles/colors';

export default class Avatar extends MuiComponent {

  static propTypes = {
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
  }

  static defaultProps = {
    backgroundColor: Colors.grey400,
    color: Colors.white,
    size: 40,
  }

  render() {
    let {
      backgroundColor,
      children,
      color,
      icon,
      size,
      src,
      style,
      className,
      ...other,
    } = this.props;

    const {muiTheme} = this.state;

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
      const borderColor = muiTheme.avatar.borderColor;

      if (borderColor) {
        styles.root = styleUtils.merge(styles.root, {
          height: size - 2,
          width: size - 2,
          border: 'solid 1px ' + borderColor,
        });
      }

      return (
        <img
          {...other}
          src={src}
          style={styleUtils.prepareStyles(muiTheme, styles.root, style)}
          className={className}
        />
      );
    } else {
      styles.root = styleUtils.merge(styles.root, {
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
        style: styleUtils.merge(styleIcon, icon.props.style),
      }) : null;

      return (
        <div
          {...other}
          style={styleUtils.prepareStyles(muiTheme, styles.root, style)}
          className={className}
        >
          {iconElement}
          {children}
        </div>
      );
    }
  }
}
