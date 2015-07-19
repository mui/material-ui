let React = require('react/addons');
let StylePropable = require('./mixins/style-propable');
let Colors = require('./styles/colors');

let Avatar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    icon: React.PropTypes.element,
    backgroundColor: React.PropTypes.string,
    color: React.PropTypes.string,
    size: React.PropTypes.number,
    src: React.PropTypes.string,
    style: React.PropTypes.object,
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
      icon,
      backgroundColor,
      color,
      size,
      src,
      style,
      ...other,
    } = this.props;

    const boxShadow = (style && style.boxShadow) ? style.boxShadow : '0 0 1px 0 rgba(0, 0, 0, 0.2) inset';
    const borderRadius = (style && style.borderRadius) ? style.borderRadius : '50%';

    let styles = {
      root: {
        height: size,
        width: size,
        userSelect: 'none',
        backgroundColor: backgroundColor,
        boxShadow: src ? null : boxShadow, // Doesn't apply above an img
        borderRadius: borderRadius,
        display: 'inline-block',

        //Needed for img
        position: 'relative',

        //Needed for letter avatars
        textAlign: 'center',
        lineHeight: size + 'px',
        fontSize: size / 2 + 4,
        color: color,
      },
    };

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);

    if (src) {
      const styleImg = {
        height: size,
        width: size,
        borderRadius: borderRadius,
      };

      const styleImgShadow = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        boxShadow: boxShadow,
        borderRadius: borderRadius,
      };

      return <div {...other} style={mergedRootStyles} >
          <img src={src} style={styleImg} />
          <div style={this.mergeAndPrefix(styleImgShadow)} />
        </div>;
    } else {
      const styleIcon = {
        margin: 8,
      };

      let iconElement = icon ? React.cloneElement(icon, {
        color: color,
        style: this.mergeStyles(styleIcon, icon.props.style),
      }) : null;

      return <div {...other} style={mergedRootStyles}>
        {iconElement}
        {this.props.children}
      </div>;
    }
  },
});

module.exports = Avatar;
