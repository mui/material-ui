var React = require('react/addons');
var StylePropable = require('./mixins/style-propable');
var Colors = require('./styles/colors');
var Typography = require('./styles/typography');

var SvgIcon = React.createClass({

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

  getDefaultProps: function() {
    return {
      backgroundColor: Colors.grey400,
      color: Colors.white
    };
  },

  render: function() {

    var {
      icon,
      backgroundColor,
      color,
      src,
      style,
      ...other
    } = this.props;

    var styles = {
      root: {
        height: src ? 38 : 40,
        width: src ? 38 : 40,
        userSelect: 'none',
        backgroundColor: backgroundColor,
        borderRadius: '50%',
        border: src ? 'solid 1px' : 'none',
        borderColor: this.context.muiTheme.palette.borderColor,

        //Needed for letter avatars
        textAlign: 'center',
        lineHeight: '40px',
        fontSize: 24,
        color: color
      },

      iconStyles: {
        color: color,
        fill: color,
        margin: 8
      }
    };

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    var mergedIconStyles = icon ? 
      this.mergeStyles(styles.iconStyles, icon.props.style) : null;

    var iconElement = icon ? React.cloneElement(icon, {
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
