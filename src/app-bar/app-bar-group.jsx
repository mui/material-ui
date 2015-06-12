var React = require('react');
var Colors = require('../styles/colors');
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

  getStyles: function() {
    var spacing = this.context.muiTheme.spacing;
    var themeVariables = this.context.muiTheme.component.appBar;
    var iconButtonSize = this.context.muiTheme.component.button.iconButtonSize;
    var marginVertical = (themeVariables.height - this.context.muiTheme.component.button.height) / 2;
    var styles = {
      root: {
        position: 'relative',
        float: this.props.float
      },
      dropDownMenu: {
        root: {
          backgroundColor: 'transparent',
          float: 'left',
          color: themeVariables.textColor,
          display: 'inline-block'
        },
        controlBg: {
          borderRadius: 0
        },
        underline: {
          display: 'none'
        }
      },
      button: {
        float: 'left',
        margin: marginVertical + 'px ' + 0 + 'px',
        position: 'relative'
      },
      iconButton: {
        style: {
          marginTop: (themeVariables.height - iconButtonSize) / 2,
          float: 'left',
          marginRight: 8,
          marginLeft: -16
        },
        iconStyle: {
          fill: themeVariables.textColor,
          color: themeVariables.textColor
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
            styleControlBg: styles.dropDownMenu.controlBg,
            styleUnderline: styles.dropDownMenu.underline
          });
        case 'DropDownIcon' :
          return React.cloneElement(currentChild, {
            style: {float: 'left'},
            iconStyle: styles.icon.root,
            onMouseOver: this._handleMouseOverDropDownMenu,
            onMouseOut: this._handleMouseOutDropDownMenu
          });
        case 'RaisedButton' : case 'FlatButton' :
          return React.cloneElement(currentChild, {
            style: styles.button
          });
        case 'ToolbarSeparator' : case 'ToolbarTitle' :
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
