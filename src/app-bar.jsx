var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Typography = require('./styles/typography');
var IconButton = require('./icon-button');
var NavigationMenu = require('./svg-icons/navigation-menu');
var Paper = require('./paper');

var AppBar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    onLeftIconButtonTouchTap: React.PropTypes.func,
    onRightIconButtonTouchTap: React.PropTypes.func,
    showMenuIconButton: React.PropTypes.bool,
    iconClassNameLeft: React.PropTypes.string,
    iconClassNameRight: React.PropTypes.string,
    iconElementLeft: React.PropTypes.element,
    iconElementRight: React.PropTypes.element,
    iconStyleRight: React.PropTypes.object,
    title : React.PropTypes.node,
    zDepth: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      showMenuIconButton: true,
      title: '',
      zDepth: 1
    }
  },

  componentDidMount: function() {
    if (process.env.NODE_ENV !== 'production' &&
      this.props.iconElementLeft &&
      this.props.iconClassNameLeft) {

      console.warn(
        'Properties iconClassNameLeft and iconElementLeft cannot be simultaneously ' +
        'defined. Please use one or the other.'
      );
    }
  },

  getStyles: function() {
    var spacing = this.context.muiTheme.spacing;
    var themeVariables = this.context.muiTheme.component.appBar;
    var iconButtonSize = this.context.muiTheme.component.button.iconButtonSize;
    var styles = {
      root: {
        zIndex: 5,
        width: '100%',
        display: '-webkit-box; display: flex',
        minHeight: themeVariables.height,
        backgroundColor: themeVariables.color,
        paddingLeft: spacing.desktopGutter,
        paddingRight: spacing.desktopGutter
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
        lineHeight: themeVariables.height + 'px'
      },
      mainElement: {
        boxFlex: 1,
        flex: '1'
      },
      iconButton: {
        style: {
          marginTop: (themeVariables.height - iconButtonSize) / 2,
          marginRight: 8,
          marginLeft: -16
        },
        iconStyle: {
          fill: themeVariables.textColor,
          color: themeVariables.textColor
        }
      }
    };
    return styles;
  },

  render: function() {
    var styles = this.getStyles();

    var iconRightStyle = this.mergeAndPrefix(styles.iconButton.style, {
      marginRight: -16,
      marginLeft: 'auto'
    }, this.props.iconStyleRight);

    var title = this.props.title;

    var titleElement;
    var menuElementLeft;
    var menuElementRight;

    if (title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      titleElement = typeof title === 'string' || title instanceof String ?
        <h1 style={this.mergeAndPrefix(styles.title, styles.mainElement)}>{title}</h1> :
        <div style={this.mergeAndPrefix(styles.mainElement)}>{title}</div>;
    }

    if (this.props.showMenuIconButton) {
      if (this.props.iconElementLeft) {
        menuElementLeft = (
          <div style={styles.iconButton.style}>
            {this.props.iconElementLeft}
          </div>
        );
      } else {
        var child = (this.props.iconClassNameLeft) ? '' : <NavigationMenu style={this.mergeAndPrefix(styles.iconButton.iconStyle)}/>;
        menuElementLeft = (
          <IconButton
            style={this.mergeAndPrefix(styles.iconButton.style)}
            iconStyle={this.mergeAndPrefix(styles.iconButton.iconStyle)}
            iconClassName={this.props.iconClassNameLeft}
            onTouchTap={this._onLeftIconButtonTouchTap}>
              {child}
          </IconButton>
        );
      }

      if (this.props.iconElementRight) {
        menuElementRight = (
          <div style={iconRightStyle}>
            {this.props.iconElementRight}
          </div>
        );
      } else if (this.props.iconClassNameRight) {
        menuElementRight = (
          <IconButton
            style={iconRightStyle}
            iconStyle={this.mergeAndPrefix(styles.iconButton.iconStyle)}
            iconClassName={this.props.iconClassNameRight}
            onTouchTap={this._onRightIconButtonTouchTap}>
          </IconButton>
        );
      }
    }

    return (
      <Paper
        rounded={false}
        className={this.props.className}
        style={this.mergeAndPrefix(styles.root, this.props.style)}
        zDepth={this.props.zDepth}>
          {menuElementLeft}
          {titleElement}
          {menuElementRight}
          {this.props.children}
      </Paper>
    );
  },

  _onLeftIconButtonTouchTap: function(event) {
    if (this.props.onLeftIconButtonTouchTap) {
      this.props.onLeftIconButtonTouchTap(event);
    }
  },

  _onRightIconButtonTouchTap: function(event) {
    if (this.props.onRightIconButtonTouchTap) {
      this.props.onRightIconButtonTouchTap(event);
    }
  }

});

module.exports = AppBar;
