const React = require('react');
const Colors = require('../styles/colors');
const StylePropable = require('../mixins/style-propable');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const ToolbarGroup = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    className: React.PropTypes.string,
    float: React.PropTypes.string,
    style: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getDefaultProps() {
    return {
      float: 'left',
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getTheme() {
    return this.state.muiTheme.toolbar;
  },

  getSpacing() {
    return this.state.muiTheme.rawTheme.spacing.desktopGutter;
  },

  getStyles() {
    let marginHorizontal = this.getSpacing();
    let marginVertical = (this.getTheme().height - this.state.muiTheme.button.height) / 2;
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
      if (!currentChild.type) {
        return currentChild;
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
      <div className={this.props.className} style={this.prepareStyles(styles.root, this.props.style)}>
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
