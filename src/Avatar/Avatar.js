import React, {Component, PropTypes} from 'react';
import {mixout, remix, muiMixout} from '../utils/muiMixout';

function getStyles(props) {
  const {
    backgroundColor,
    color,
    size,
    muiTheme: {avatar},
  } = props;

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

const propTypes = {
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

const defaultProps = {
  size: 40,
};

let Avatar = (props) => {
  const {
    icon,
    src,
    style,
    className,
    muiTheme: {prepareStyles},
    ...other,
  } = props;

  const styles = getStyles(props);

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
        {props.children}
      </div>
    );
  }
}

Avatar = mixout(muiMixout)(remix('Avatar', Avatar));
Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;
Avatar.muiName = 'Avatar';

export default Avatar;
