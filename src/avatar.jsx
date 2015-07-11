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

    let styles = {
      root: {
        height: src ? size - 2 : size,
        width: src ? size - 2 : size,
        userSelect: 'none',
        backgroundColor: backgroundColor,
        borderRadius: '50%',
        border: src ? 'solid 1px' : 'none',
        borderColor: this.context.muiTheme.palette.borderColor,
        display: 'inline-block',

        //Needed for letter avatars
        textAlign: 'center',
        lineHeight: size + 'px',
        fontSize: size / 2 + 4,
        color: color,
      },

      iconStyles: {
        margin: 8,
      },
    };

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);

    if (src) {
      return <img {...other} src={src} style={mergedRootStyles} />;
    } else {
      let iconElement = icon ? React.cloneElement(icon, {
        color: color,
        style: this.mergeStyles(styles.iconStyles, icon.props.style),
      }) : null;

      return <div {...other} style={mergedRootStyles}>
        {iconElement}
        {this.props.children}
      </div>;
    }
  },
});

module.exports = Avatar;
