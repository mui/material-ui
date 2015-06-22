let React = require('react/addons');
let StylePropable = require('./mixins/style-propable');
let Colors = require('./styles/colors');
let Typography = require('./styles/typography');

let SvgIcon = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    icon: React.PropTypes.element,
    backgroundColor: React.PropTypes.string,
    color: React.PropTypes.string,
    src: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      backgroundColor: Colors.grey400,
      color: Colors.white
    };
  },

  render() {

    let {
      icon,
      backgroundColor,
      color,
      src,
      style,
      ...other
    } = this.props;

    let styles = {
      root: {
        height: src ? 38 : 40,
        width: src ? 38 : 40,
        userSelect: 'none',
        backgroundColor: backgroundColor,
        borderRadius: '50%',
        border: src ? 'solid 1px' : 'none',
        borderColor: this.context.muiTheme.palette.borderColor,
        display:'inline-block',

        //Needed for letter avatars
        textAlign: 'center',
        lineHeight: '40px',
        fontSize: 24,
        color: color
      },

      iconStyles: {
        margin: 8
      }
    };

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    let mergedIconStyles = icon ?
      this.mergeStyles(styles.iconStyles, icon.props.style) : null;

    let iconElement = icon ? React.cloneElement(icon, {
      color: color,
      style: mergedIconStyles
    }) : null;

    return src ? (
      <img {...other} src={src} style={mergedRootStyles} />
    ) : (
      <div {...other} style={mergedRootStyles}>
        {iconElement}
        {this.props.children}
      </div>
    );
  }
});

module.exports = SvgIcon;
