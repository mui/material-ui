const React = require('react');
const StylePropable = require('./mixins/style-propable');
const Typography = require('./styles/typography');
const IconButton = require('./icon-button');
const NavigationMenu = require('./svg-icons/navigation/menu');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');
const Paper = require('./paper');
const PropTypes = require('./utils/prop-types');

const AppBar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
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

  propTypes: {
    onLeftIconButtonTouchTap: React.PropTypes.func,
    onRightIconButtonTouchTap: React.PropTypes.func,
    onTitleTouchTap: React.PropTypes.func,
    showMenuIconButton: React.PropTypes.bool,
    style: React.PropTypes.object,
    iconClassNameLeft: React.PropTypes.string,
    iconClassNameRight: React.PropTypes.string,
    iconElementLeft: React.PropTypes.element,
    iconElementRight: React.PropTypes.element,
    iconStyleRight: React.PropTypes.object,
    title: React.PropTypes.node,
    zDepth: PropTypes.zDepth,
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

  getDefaultProps() {
    return {
      showMenuIconButton: true,
      title: '',
      zDepth: 1,
    };
  },

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.iconElementLeft && this.props.iconClassNameLeft) {
        console.warn(
          'Properties iconClassNameLeft and iconElementLeft cannot be simultaneously ' +
          'defined. Please use one or the other.'
        );
      }

      if (this.props.iconElementRight && this.props.iconClassNameRight) {
        console.warn(
          'Properties iconClassNameRight and iconElementRight cannot be simultaneously ' +
          'defined. Please use one or the other.'
        );
      }
    }
  },

  getStyles() {
    let spacing = this.state.muiTheme.rawTheme.spacing;
    let themeVariables = this.state.muiTheme.appBar;
    let iconButtonSize = this.state.muiTheme.button.iconButtonSize;
    let flatButtonSize = 36;
    let styles = {
      root: {
        position: 'relative',
        zIndex: 5,
        width: '100%',
        display: '-webkit-box; display: -webkit-flex; display: flex',
        minHeight: themeVariables.height,
        backgroundColor: themeVariables.color,
        paddingLeft: spacing.desktopGutter,
        paddingRight: spacing.desktopGutter,
      },
      title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: 0,
        paddingTop: 0,
        letterSpacing: 0,
        fontSize: 24,
        fontWeight: Typography.fontWeightNormal,
        color: themeVariables.textColor,
        lineHeight: themeVariables.height + 'px',
      },
      mainElement: {
        boxFlex: 1,
        flex: '1',
      },
      iconButton: {
        style: {
          marginTop: (themeVariables.height - iconButtonSize) / 2,
          marginRight: 8,
          marginLeft: -16,
        },
        iconStyle: {
          fill: themeVariables.textColor,
          color: themeVariables.textColor,
        },
      },
      flatButton: {
        color: themeVariables.textColor,
        backgroundColor: 'transparent',
        marginTop: (iconButtonSize - flatButtonSize) / 2 + 2,
      },
    };

    return styles;
  },

  render() {
    let {
      title,
      iconStyleRight,
      showMenuIconButton,
      iconElementLeft,
      iconElementRight,
      iconClassNameLeft,
      iconClassNameRight,
      className,
      style,
      zDepth,
      children,
      ...other,
    } = this.props;

    let menuElementLeft;
    let menuElementRight;
    let styles = this.getStyles();
    let iconRightStyle = this.mergeStyles(styles.iconButton.style, {
      marginRight: -16,
      marginLeft: 'auto',
    }, iconStyleRight);
    let titleElement;

    if (title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      titleElement = typeof title === 'string' || title instanceof String ?
        <h1 onTouchTap={this._onTitleTouchTap} style={this.prepareStyles(styles.title, styles.mainElement)}>{title}</h1> :
        <div onTouchTap={this._onTitleTouchTap} style={this.prepareStyles(styles.title, styles.mainElement)}>{title}</div>;
    }

    if (showMenuIconButton) {
      if (iconElementLeft) {
        switch (iconElementLeft.type.displayName) {
          case 'IconButton':
            iconElementLeft = React.cloneElement(iconElementLeft, {
              iconStyle: this.mergeStyles(styles.iconButton.iconStyle),
            });
            break;
        }

        menuElementLeft = (
          <div style={this.prepareStyles(styles.iconButton.style)}>
            {iconElementLeft}
          </div>
        );
      } else {
        let child = (iconClassNameLeft) ? '' : <NavigationMenu style={this.mergeStyles(styles.iconButton.iconStyle)}/>;
        menuElementLeft = (
          <IconButton
            style={this.mergeStyles(styles.iconButton.style)}
            iconStyle={this.mergeStyles(styles.iconButton.iconStyle)}
            iconClassName={iconClassNameLeft}
            onTouchTap={this._onLeftIconButtonTouchTap}>
              {child}
          </IconButton>
        );
      }
    }

    if (iconElementRight) {
      switch (iconElementRight.type.displayName) {
        case 'IconMenu':
        case 'IconButton':
          iconElementRight = React.cloneElement(iconElementRight, {
            iconStyle: this.mergeStyles(styles.iconButton.iconStyle),
          });
          break;

        case 'FlatButton':
          iconElementRight = React.cloneElement(iconElementRight, {
            style: this.mergeStyles(styles.flatButton, iconElementRight.props.style),
          });
          break;
      }

      menuElementRight = (
        <div style={this.prepareStyles(iconRightStyle)}>
          {iconElementRight}
        </div>
      );
    } else if (iconClassNameRight) {
      menuElementRight = (
        <IconButton
          style={iconRightStyle}
          iconStyle={this.mergeStyles(styles.iconButton.iconStyle)}
          iconClassName={iconClassNameRight}
          onTouchTap={this._onRightIconButtonTouchTap}>
        </IconButton>
      );
    }

    return (
      <Paper
        {...other}
        rounded={false}
        className={className}
        style={this.mergeStyles(styles.root, style)}
        zDepth={zDepth}>
          {menuElementLeft}
          {titleElement}
          {menuElementRight}
          {children}
      </Paper>
    );
  },

  _onLeftIconButtonTouchTap(event) {
    if (this.props.onLeftIconButtonTouchTap) {
      this.props.onLeftIconButtonTouchTap(event);
    }
  },

  _onRightIconButtonTouchTap(event) {
    if (this.props.onRightIconButtonTouchTap) {
      this.props.onRightIconButtonTouchTap(event);
    }
  },

  _onTitleTouchTap(event) {
    if (this.props.onTitleTouchTap) {
      this.props.onTitleTouchTap(event);
    }
  },

});

module.exports = AppBar;
