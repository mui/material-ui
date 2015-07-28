let React = require('react/addons');
let StylePropable = require('./mixins/style-propable');
let Colors = require('./styles/colors');

let Avatar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    backgroundColor: React.PropTypes.string,
    color: React.PropTypes.string,
    icon: React.PropTypes.element,
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
      const borderColor = this.context.muiTheme.component.avatar.borderColor;

      if(borderColor) {
        styles.root = this.mergeStyles(styles.root, {
          height: size - 2,
          width: size - 2,
          border: 'solid 1px ' + borderColor,
        });
      }

      return <img {...other} src={src} style={this.mergeAndPrefix(styles.root, style)} />;
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

      return <div {...other} style={this.mergeAndPrefix(styles.root, style)}>
        {iconElement}
        {this.props.children}
      </div>;
    }
  },
});

module.exports = Avatar;
