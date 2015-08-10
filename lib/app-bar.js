'use strict';

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Typography = require('./styles/typography');
var IconButton = require('./icon-button');
var NavigationMenu = require('./svg-icons/navigation/menu');
var Paper = require('./paper');

var AppBar = React.createClass({
  displayName: 'AppBar',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
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
    zDepth: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      showMenuIconButton: true,
      title: '',
      zDepth: 1
    };
  },

  componentDidMount: function componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.iconElementLeft && this.props.iconClassNameLeft) {
        console.warn('Properties iconClassNameLeft and iconElementLeft cannot be simultaneously ' + 'defined. Please use one or the other.');
      }

      if (this.props.iconElementRight && this.props.iconClassNameRight) {
        console.warn('Properties iconClassNameRight and iconElementRight cannot be simultaneously ' + 'defined. Please use one or the other.');
      }
    }
  },

  getStyles: function getStyles() {
    var spacing = this.context.muiTheme.spacing;
    var themeVariables = this.context.muiTheme.component.appBar;
    var iconButtonSize = this.context.muiTheme.component.button.iconButtonSize;
    var flatButtonSize = 36;
    var styles = {
      root: {
        zIndex: 5,
        width: '100%',
        display: '-webkit-box; display: -webkit-flex; display: flex',
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
      },
      flatButton: {
        color: themeVariables.textColor,
        backgroundColor: 'transparent',
        marginTop: (iconButtonSize - flatButtonSize) / 2 + 2
      }
    };

    return styles;
  },

  render: function render() {
    var props = this.props;
    var menuElementLeft = undefined;
    var menuElementRight = undefined;
    var styles = this.getStyles();
    var title = props.title;
    var iconRightStyle = this.mergeAndPrefix(styles.iconButton.style, {
      marginRight: -16,
      marginLeft: 'auto'
    }, props.iconStyleRight);
    var titleElement = undefined;

    if (title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      titleElement = typeof title === 'string' || title instanceof String ? React.createElement(
        'h1',
        { style: this.mergeAndPrefix(styles.title, styles.mainElement) },
        title
      ) : React.createElement(
        'div',
        { style: this.mergeAndPrefix(styles.mainElement) },
        title
      );
    }

    if (props.showMenuIconButton) {
      var iconElementLeft = props.iconElementLeft;

      if (iconElementLeft) {
        switch (iconElementLeft.type.displayName) {
          case 'IconButton':
            iconElementLeft = React.cloneElement(iconElementLeft, {
              iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle)
            });
            break;
        }

        menuElementLeft = React.createElement(
          'div',
          { style: styles.iconButton.style },
          iconElementLeft
        );
      } else {
        var child = props.iconClassNameLeft ? '' : React.createElement(NavigationMenu, { style: this.mergeAndPrefix(styles.iconButton.iconStyle) });
        menuElementLeft = React.createElement(
          IconButton,
          {
            style: this.mergeAndPrefix(styles.iconButton.style),
            iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle),
            iconClassName: props.iconClassNameLeft,
            onTouchTap: this._onLeftIconButtonTouchTap },
          child
        );
      }

      if (props.iconElementRight) {
        var iconElementRight = props.iconElementRight;

        switch (iconElementRight.type.displayName) {
          case 'IconButton':
            iconElementRight = React.cloneElement(iconElementRight, {
              iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle)
            });
            break;

          case 'FlatButton':
            iconElementRight = React.cloneElement(iconElementRight, {
              style: this.mergeStyles(styles.flatButton, iconElementRight.props.style)
            });
            break;
        }

        menuElementRight = React.createElement(
          'div',
          { style: iconRightStyle },
          iconElementRight
        );
      } else if (props.iconClassNameRight) {
        menuElementRight = React.createElement(IconButton, {
          style: iconRightStyle,
          iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle),
          iconClassName: props.iconClassNameRight,
          onTouchTap: this._onRightIconButtonTouchTap });
      }
    }

    return React.createElement(
      Paper,
      {
        rounded: false,
        className: props.className,
        style: this.mergeAndPrefix(styles.root, props.style),
        zDepth: props.zDepth },
      menuElementLeft,
      titleElement,
      menuElementRight,
      props.children
    );
  },

  _onLeftIconButtonTouchTap: function _onLeftIconButtonTouchTap(event) {
    if (this.props.onLeftIconButtonTouchTap) {
      this.props.onLeftIconButtonTouchTap(event);
    }
  },

  _onRightIconButtonTouchTap: function _onRightIconButtonTouchTap(event) {
    if (this.props.onRightIconButtonTouchTap) {
      this.props.onRightIconButtonTouchTap(event);
    }
  }

});

module.exports = AppBar;