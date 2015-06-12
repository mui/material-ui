var React = require('react/addons');
var StylePropable = require('./mixins/style-propable');
var Colors = require('./styles/colors');

var SvgIcon = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    icon: React.PropTypes.element,
    iconBgColor: React.PropTypes.string,
    iconColor: React.PropTypes.string,
    src: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      iconBgColor: Colors.grey400,
      iconColor: Colors.white
    };
  },

  render: function() {

    var {
      icon,
      iconBgColor,
      iconColor,
      src,
      style,
      ...other
    } = this.props;

    var styles = {
      root: {
        height: src ? 38 : 40,
        width: src ? 38 : 40,
        userSelect: 'none',
        backgroundColor: iconBgColor,
        borderRadius: '50%',
        border: src ? 'solid 1px' : 'none',
        borderColor: this.context.muiTheme.palette.borderColor,
      },

      iconStyles: {
        color: iconColor,
        fill: iconColor,
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
      </div>
    );
  }
});

module.exports = SvgIcon;
