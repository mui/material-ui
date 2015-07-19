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
    waterfall: React.PropTypes.shape({
      minHeight: React.PropTypes.number,
      maxHeight: React.PropTypes.number,
    }),
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

    if (this.props.waterfall) {
      this.setupWaterfall();
    }
  },

  componentWillUnmount: function() {
    if (this.props.waterfall) {
      this.removeWaterfall();
    }
  },

  setupWaterfall() {
    window.addEventListener("scroll", this.waterfallScrollHandler.bind(this));
  },

  removeWaterfall() {
    window.removeEventListener("scroll", this.waterfallScrollHandler);
  },

  waterfallScrollHandler() {
    const waterfall = this.props.waterfall;

    const waterfallHeight = Math.max(waterfall.minHeight, waterfall.maxHeight - window.scrollY);
    if (this.state.waterfallHeight !== waterfallHeight) {
      this.setState({waterfallHeight: waterfallHeight});
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

  getInitialState() {
    if (this.props.waterfall) {
      return {waterfallHeight: this.props.waterfall.maxHeight};
    } else {
      return null;
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.waterfall){
      let waterfallHeight = this.state.waterfallHeight;
      waterfallHeight = Math.max(waterfallHeight, nextProps.waterfall.minHeight);
      waterfallHeight = Math.min(waterfallHeight, nextProps.waterfall.maxHeight);
      if (waterfallHeight !== this.state.waterfallHeight) {
        this.setState({waterfallHeight: waterfallHeight});
      }
    } else {
      this.removeWaterfall();
    }
  },

  render() {
    if (this.props.waterfall) {
      if ( this.props.waterfall.spring) {
        return this.renderWaterfallSpring();
      } else {
        return this.renderMain(this.state.waterfallHeight);
      }
    } else {
      return this.renderMain();
    }
  },

  renderWaterfallSpring() {
    let Spring = this.props.waterfall.spring;

    return (
        <Spring endValue={this.state.waterfallHeight}>
          {interpolatedHeight => this.renderMain(interpolatedHeight)}
        </Spring>
    );
  },

  renderMain(waterfallHeight) {
    let props = this.props;
    let title = props.title;

    let children = this.props.children;

    let waterfall = this.props.waterfall;
    let rootWaterfallStyles;
    let childWaterfallStyles;

    if (waterfall) {
      waterfallHeight = Math.max(waterfallHeight, waterfall.minHeight);
      let dY = waterfallHeight - waterfall.maxHeight;
      // define root translation and height styles
      rootWaterfallStyles = {
        height: waterfall.maxHeight,
        transform: 'translate3d(0,' + dY +'px,0)',
        transition: 'transform 0s',
      };
      // define children translation styles
      childWaterfallStyles = {
        transform: 'translate3d(0,' + (-dY) +'px,0)',
        transition: 'transform 0s',
      };
      // TODO is there a more performant way than clone?
      children = React.Children.map(children, child => React.cloneElement(child, {
        // cloneElement do only a shallow copy of style,
        // so we need to merge child style, in order to keep it
        style: this.mergeAndPrefix(child.props.style, childWaterfallStyles),
      }));
    }

    let menuElementLeft;
    let menuElementRight;
    let styles = this.getStyles();

    let iconRightStyle = this.mergeAndPrefix(styles.iconButton.style, {
      marginRight: -16,
      marginLeft: 'auto',
    }, props.iconStyleRight, childWaterfallStyles);
    let titleElement;

    if (title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      if (typeof title === 'string' || title instanceof String) {
        titleElement =
            <h1 style={this.mergeAndPrefix(styles.title, styles.mainElement, childWaterfallStyles)}>{title}</h1>;
      } else {
        let titleNode = title;
        if (waterfall && typeof title === 'function') {
          titleNode = title(waterfallHeight, this.getStyles());
        }
        titleElement =
            <div style={this.mergeAndPrefix(styles.mainElement, childWaterfallStyles)}>{titleNode}</div>;
      }
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
            <div style={this.mergeAndPrefix(styles.iconButton.style, childWaterfallStyles)}>
              {iconElementLeft}
            </div>
        );
      } else {
        let child = (props.iconClassNameLeft) ? '' : <NavigationMenu style={this.mergeAndPrefix(styles.iconButton.iconStyle)}/>;
        menuElementLeft = (
            <IconButton
                style={this.mergeAndPrefix(styles.iconButton.style, childWaterfallStyles)}
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
            style={this.mergeAndPrefix(styles.root, props.style, rootWaterfallStyles)}
            zDepth={props.zDepth}>
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

});

module.exports = AppBar;
