let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Typography = require('./styles/typography');
let IconButton = require('./icon-button');
let NavigationMenu = require('./svg-icons/navigation/menu');
let Paper = require('./paper');


let AppBar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    onLeftIconButtonTouchTap: React.PropTypes.func,
    onRightIconButtonTouchTap: React.PropTypes.func,
    showMenuIconButton: React.PropTypes.bool,
    style: React.PropTypes.object,
    iconClassNameLeft: React.PropTypes.string,
    iconClassNameRight: React.PropTypes.string,
    iconElementLeft: React.PropTypes.element,
    iconElementRight: React.PropTypes.element,
    iconStyleRight: React.PropTypes.object,
    title: React.PropTypes.node,
    zDepth: React.PropTypes.number,
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
    let spacing = this.context.muiTheme.spacing;
    let themeVariables = this.context.muiTheme.component.appBar;
    let iconButtonSize = this.context.muiTheme.component.button.iconButtonSize;
    let flatButtonSize = 36;
    let styles = {
      root: {
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
    let props = this.props;
    let menuElementLeft;
    let menuElementRight;
    let styles = this.getStyles();
    let title = props.title;
    let iconRightStyle = this.mergeAndPrefix(styles.iconButton.style, {
      marginRight: -16,
      marginLeft: 'auto',
    }, props.iconStyleRight);
    let titleElement;

    if (title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      titleElement = typeof title === 'string' || title instanceof String ?
        <h1 style={this.mergeAndPrefix(styles.title, styles.mainElement)}>{title}</h1> :
        <div style={this.mergeAndPrefix(styles.mainElement)}>{title}</div>;
    }

    if (props.showMenuIconButton) {
      let iconElementLeft = props.iconElementLeft;

      if (iconElementLeft) {
        switch (iconElementLeft.type.displayName) {
          case 'IconButton':
            iconElementLeft = React.cloneElement(iconElementLeft, {
              iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle),
            });
            break;
        }

        menuElementLeft = (
          <div style={styles.iconButton.style}>
            {iconElementLeft}
          </div>
        );
      } else {
        let child = (props.iconClassNameLeft) ? '' : <NavigationMenu style={this.mergeAndPrefix(styles.iconButton.iconStyle)}/>;
        menuElementLeft = (
          <IconButton
            style={this.mergeAndPrefix(styles.iconButton.style)}
            iconStyle={this.mergeAndPrefix(styles.iconButton.iconStyle)}
            iconClassName={props.iconClassNameLeft}
            onTouchTap={this._onLeftIconButtonTouchTap}>
              {child}
          </IconButton>
        );
      }

      if (props.iconElementRight) {
        let iconElementRight = props.iconElementRight;

        switch (iconElementRight.type.displayName) {
          case 'IconButton':
            iconElementRight = React.cloneElement(iconElementRight, {
              iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle),
            });
            break;

          case 'FlatButton':
            iconElementRight = React.cloneElement(iconElementRight, {
              style: this.mergeStyles(styles.flatButton, iconElementRight.props.style),
            });
            break;
        }

        menuElementRight = (
          <div style={iconRightStyle}>
            {iconElementRight}
          </div>
        );
      } else if (props.iconClassNameRight) {
        menuElementRight = (
          <IconButton
            style={iconRightStyle}
            iconStyle={this.mergeAndPrefix(styles.iconButton.iconStyle)}
            iconClassName={props.iconClassNameRight}
            onTouchTap={this._onRightIconButtonTouchTap}>
          </IconButton>
        );
      }
    }

    return (
      <Paper
        rounded={false}
        className={props.className}
        style={this.mergeAndPrefix(styles.root, props.style)}
        zDepth={props.zDepth}>
          {menuElementLeft}
          {titleElement}
          {menuElementRight}
          {props.children}
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

});

module.exports = AppBar;
