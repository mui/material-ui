var React = require('react');
var Colors = require('../styles/colors');
var StylePropable = require('../mixins/style-propable');

var ToolbarGroup = React.createClass({

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

  getTheme: function() {
    return this.context.muiTheme.component.toolbar;
  },

  getSpacing: function() {
    return this.context.muiTheme.spacing.desktopGutter;
  },

  getStyles: function() {
    var marginHorizontal = this.getSpacing();
    var marginVertical = (this.getTheme().height - this.context.muiTheme.component.button.height) / 2;
    var styles = {
      root: {
        position: 'relative',
        float: this.props.float
      },
      dropDownMenu: {
        root: {
          float: 'left',
          color: Colors.lightBlack,// removes hover color change, we want to keep it
          display: 'inline-block',
          marginRight: this.getSpacing()
        },
        controlBg: {
          backgroundColor: this.getTheme().menuHoverColor,
          borderRadius: 0
        },
        underline: {
          display: 'none'
        }
      },
      button: {
        float: 'left',
        margin: marginVertical + 'px ' + marginHorizontal + 'px',
        position: 'relative'
      },
      icon: {
        root: {
          float: 'left',
          cursor: 'pointer',
          color: this.getTheme().iconColor,
          lineHeight: this.getTheme().height + 'px',
          paddingLeft: this.getSpacing()
        },
        hover: {
          zIndex: 1,
          color: Colors.darkBlack
        }
      },
      span: {
        float: 'left',
        color: this.getTheme().iconColor,
        lineHeight: this.getTheme().height + 'px'
      }
    };
    return styles;
  },

  render: function() {
    var styles = this.getStyles();

    if (this.props.firstChild) styles.marginLeft = -24;
    if (this.props.lastChild) styles.marginRight = -24;

    var newChildren = React.Children.map(this.props.children, function(currentChild) {
      if(!currentChild) {
        return null;
      }
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
        case 'FontIcon' :
          return React.cloneElement(currentChild, {
            style: styles.icon.root,
            onMouseOver: this._handleMouseOverFontIcon,
            onMouseOut: this._handleMouseOutFontIcon
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
  },

  _handleMouseOverDropDownMenu: function(e) {
    e.target.style.zIndex = this.getStyles().icon.hover.zIndex;
    e.target.style.color = this.getStyles().icon.hover.color;
  },

  _handleMouseOutDropDownMenu: function(e) {
    e.target.style.zIndex = 'auto';
    e.target.style.color = this.getStyles().icon.root.color;
  },

  _handleMouseOverFontIcon: function(e) {
    e.target.style.zIndex = this.getStyles().icon.hover.zIndex;
    e.target.style.color = this.getStyles().icon.hover.color;
  },

  _handleMouseOutFontIcon: function(e) {
    e.target.style.zIndex = 'auto';
    e.target.style.color = this.getStyles().icon.root.color;
  },
});

module.exports = ToolbarGroup;
