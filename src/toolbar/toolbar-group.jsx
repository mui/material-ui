let React = require('react');
let Colors = require('../styles/colors');
let StylePropable = require('../mixins/style-propable');


let ToolbarGroup = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    className: React.PropTypes.string,
    float: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      float: 'left',
    };
  },

  getTheme() {
    return this.context.muiTheme.component.toolbar;
  },

  getSpacing() {
    return this.context.muiTheme.spacing.desktopGutter;
  },

  getStyles() {
    let marginHorizontal = this.getSpacing();
    let marginVertical = (this.getTheme().height - this.context.muiTheme.component.button.height) / 2;
    let styles = {
      root: {
        position: 'relative',
        float: this.props.float,
      },
      dropDownMenu: {
        root: {
          float: 'left',
          color: Colors.lightBlack,// removes hover color change, we want to keep it
          display: 'inline-block',
          marginRight: this.getSpacing(),
        },
        controlBg: {
          backgroundColor: this.getTheme().menuHoverColor,
          borderRadius: 0,
        },
        underline: {
          display: 'none',
        },
      },
      button: {
        float: 'left',
        margin: marginVertical + 'px ' + marginHorizontal + 'px',
        position: 'relative',
      },
      icon: {
        root: {
          float: 'left',
          cursor: 'pointer',
          color: this.getTheme().iconColor,
          lineHeight: this.getTheme().height + 'px',
          paddingLeft: this.getSpacing(),
        },
        hover: {
          color: Colors.darkBlack,
        },
      },
      span: {
        float: 'left',
        color: this.getTheme().iconColor,
        lineHeight: this.getTheme().height + 'px',
      },
    };

    return styles;
  },

  render() {
    let styles = this.getStyles();

    if (this.props.firstChild) styles.marginLeft = -24;
    if (this.props.lastChild) styles.marginRight = -24;

    let newChildren = React.Children.map(this.props.children, (currentChild) => {
      if (!currentChild) {
        return null;
      }
      switch (currentChild.type.displayName) {
        case 'DropDownMenu' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles(styles.dropDownMenu.root, currentChild.props.style),
            styleControlBg: styles.dropDownMenu.controlBg,
            styleUnderline: styles.dropDownMenu.underline,
          });
        case 'DropDownIcon' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles({float: 'left'}, currentChild.props.style),
            iconStyle: styles.icon.root,
            onMouseEnter: this._handleMouseEnterDropDownMenu,
            onMouseLeave: this._handleMouseLeaveDropDownMenu,
          });
        case 'RaisedButton' : case 'FlatButton' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles(styles.button, currentChild.props.style),
          });
        case 'FontIcon' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles(styles.icon.root, currentChild.props.style),
            onMouseEnter: this._handleMouseEnterFontIcon,
            onMouseLeave: this._handleMouseLeaveFontIcon,
          });
        case 'ToolbarSeparator' : case 'ToolbarTitle' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles(styles.span, currentChild.props.style),
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

  _handleMouseEnterDropDownMenu(e) {
    e.target.style.zIndex = this.getStyles().icon.hover.zIndex;
    e.target.style.color = this.getStyles().icon.hover.color;
  },

  _handleMouseLeaveDropDownMenu(e) {
    e.target.style.zIndex = 'auto';
    e.target.style.color = this.getStyles().icon.root.color;
  },

  _handleMouseEnterFontIcon(e) {
    e.target.style.zIndex = this.getStyles().icon.hover.zIndex;
    e.target.style.color = this.getStyles().icon.hover.color;
  },

  _handleMouseLeaveFontIcon(e) {
    e.target.style.zIndex = 'auto';
    e.target.style.color = this.getStyles().icon.root.color;
  },
});

module.exports = ToolbarGroup;
