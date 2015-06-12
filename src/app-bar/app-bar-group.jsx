var React = require('react');
var Colors = require('../styles/colors');
var Typography = require('../styles/typography');
var StylePropable = require('../mixins/style-propable');

var AppBarGroup = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    float: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      float: 'left'
    };
  },

  getSpacing: function() {
    return this.context.muiTheme.spacing;
  },

  getTheme: function () {
    return this.context.muiTheme.component.appBar;
  },

  getStyles: function() {
    var iconButtonSize = this.context.muiTheme.component.button.iconButtonSize;
    var marginVertical = (this.getTheme().height - this.context.muiTheme.component.button.height) / 2;
    var styles = {
      root: {
        position: 'relative',
        float: this.props.float
      },
      dropDownMenu: {
        root: {
          backgroundColor: 'transparent',
          float: 'left',
          height: this.getTheme().height,
          display: 'inline-block'
        },
        controlBg: {
          borderRadius: 0
        },
        underline: {
          display: 'none'
        },
        label: {
          lineHeight: this.getTheme().height + 'px',
          fontSize: 24,
          fontWeight: Typography.fontWeightNormal,
          color: this.getTheme().textColor
        },
        menuItem: {
          fontSize: 24,
          height: this.getTheme().height,
          lineHeight: this.getTheme().height + 'px'
        },
        icon: {
          top: (this.getTheme().height - 24) / 2
        },
        labelWhenOpen: {
          top: this.getTheme().height / 2
        }
      },
      button: {
        float: 'left',
        margin: marginVertical + 'px ' + 0 + 'px',
        position: 'relative'
      },
      iconButton: {
        style: {
          marginTop: (this.getTheme().height - iconButtonSize) / 2,
          float: 'left',
          marginRight: 8,
          marginLeft: 8,
        },
        iconStyle: {
          fill: this.getTheme().textColor,
          color: this.getTheme().textColor
        }
      },
      span: {
        float: 'left'
      }
    };
    return styles;
  },

  render: function() {
    var styles = this.getStyles();

    if (this.props.firstChild) styles.marginLeft = -24;
    if (this.props.lastChild) styles.marginRight = -24;

    var newChildren = React.Children.map(this.props.children, function(currentChild) {
      switch (currentChild.type.displayName) {
        case 'DropDownMenu' :
          return React.cloneElement(currentChild, {
            style: styles.dropDownMenu.root,
            controlBgStyle: styles.dropDownMenu.controlBg,
            underlineStyle: styles.dropDownMenu.underline,
            labelStyle: styles.dropDownMenu.label,
            menuItemStyle: styles.dropDownMenu.menuItem,
            labelWhenOpenStyle: styles.dropDownMenu.labelWhenOpen,
            iconStyle: styles.dropDownMenu.icon
          });
        case 'DropDownIcon' :
          return React.cloneElement(currentChild, {
            style: {float: 'left'},
            iconStyle: styles.icon.root,
            onMouseOver: this._handleMouseOverDropDownMenu,
            onMouseOut: this._handleMouseOutDropDownMenu
          });
        case 'IconButton':
          return React.cloneElement(currentChild, {
            style: styles.iconButton.style,
            iconStyle: styles.iconButton.iconStyle
          });
        case 'RaisedButton' : case 'FlatButton' :
          return React.cloneElement(currentChild, {
            style: styles.button
          });
        case 'AppBarTitle' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles(styles.span, currentChild.props.style)
          });
        default:
          return currentChild;
      }
    }, this);

    return (
      <div className={this.props.className} style={this.mergeAndPrefix(styles.root, this.props.style)}>
        {newChildren}
      </div>
    );
  }
});

module.exports = AppBarGroup;
