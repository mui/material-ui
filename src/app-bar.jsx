import React from 'react';
import StylePropable from './mixins/style-propable';
import Typography from './styles/typography';
import IconButton from './icon-button';
import NavigationMenu from './svg-icons/navigation/menu';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';
import Paper from './paper';
import PropTypes from './utils/prop-types';

const AppBar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  propTypes: {
    /**
     * Can be used to render a tab inside an app bar for instance.
     */
    children: React.PropTypes.node,

    /**
     * Applied to the app bar's root element.
     */
    className: React.PropTypes.string,

    /**
     * The classname of the icon on the left of the app bar.
     * If you are using a stylesheet for your icons, enter the class name for the icon to be used here.
     */
    iconClassNameLeft: React.PropTypes.string,

    /**
     * Similiar to the iconClassNameLeft prop except that
     * it applies to the icon displayed on the right of the app bar.
     */
    iconClassNameRight: React.PropTypes.string,

    /**
     * The custom element to be displayed on the left side of the
     * app bar such as an SvgIcon.
     */
    iconElementLeft: React.PropTypes.element,

    /**
     * Similiar to the iconElementLeft prop except that this element is displayed on the right of the app bar.
     */
    iconElementRight: React.PropTypes.element,

    /**
     * Override the inline-styles of the element displayed on the right side of the app bar.
     */
    iconStyleRight: React.PropTypes.object,

    /**
     * Callback function for when the left icon is selected via a touch tap.
     */
    onLeftIconButtonTouchTap: React.PropTypes.func,

    /**
     * Callback function for when the right icon is selected via a touch tap.
     */
    onRightIconButtonTouchTap: React.PropTypes.func,

    /**
     * Callback function for when the title text is selected via a touch tap.
     */
    onTitleTouchTap: React.PropTypes.func,

    /**
     * Specify position and behavior. Fixed - will have a fixed position at the top of viewport.
     * Static - will have a static position. Waterfall - will have a fixed position at the top
     * of viewport and will decrease its height on window scroll down (see waterfall prop for
     * additional settings).
     */
    position: React.PropTypes.oneOf(['fixed', 'static', 'waterfall']),

    /**
     * Determines whether or not to display the Menu icon next to the title.
     * Setting this prop to false will hide the icon.
     */
    showMenuIconButton: React.PropTypes.bool,

    /**
     * Override the inline-styles of the app bar's root element.
     */
    style: React.PropTypes.object,

    /**
     * The title to display on the app bar.
     */
    title: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.func,
    ]),

    /**
     * Override the inline-styles of the app bar's title element.
     */
    titleStyle: React.PropTypes.object,

    /**
     * Settings object for position waterfall. Should at least have minHeight
     * and maxHeight properties, both numeric. These specify min and max visual heigth
     * of the component while window scrolling. Optional children property can be a node
     * or a function (will receive component styles object as argument) returning a node. This node will
     * be inserted in the slide (scrolled) element of the component. Optional onHeightChange property
     * is a function called when visual height of the component changes on scroll. This function will
     * receive as arguments an object with height, minHeight, maxHeight and childrenEl (DOM element of
     * the component) properties. Using onHeightChange, animation effects can be achieved
     * by altering style properties of specific DOM elements.
     */
    waterfall: React.PropTypes.shape({
      minHeight: React.PropTypes.number,
      maxHeight: React.PropTypes.number,
      onHeightChange: React.PropTypes.func,
      children: React.PropTypes.oneOfType([
        React.PropTypes.node,
        React.PropTypes.func,
      ]),
    }),
    /**
     * The zDepth of the app bar.
     * The shadow of the app bar is also dependent on this property.
     */
    zDepth: PropTypes.zDepth,
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getDefaultProps() {
    return {
      showMenuIconButton: true,
      title: '',
      zDepth: 1,
      position: 'fixed',
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

    if (this.props.waterfall && this.props.waterfall.onHeightChange) {
      this.setupWaterfall();
    }
  },

  componentDidUpdate: function(prevProps) {
    if (this.props.waterfall && this.props.waterfall.onHeightChange) {
      if (!(prevProps.waterfall && prevProps.waterfall.onHeightChange)) {
        this.setupWaterfall();
      }
    } else if (prevProps.waterfall && prevProps.waterfall.onHeightChange) {
      this.removeWaterfall();
    }
  },

  componentWillUnmount: function() {
    if (this.props.waterfall && this.props.waterfall.onHeightChange) {
      this.removeWaterfall();
    }
  },

  setupWaterfall() {
    // in some cases scroll event is not triggered
    // after page reloaded and kept it's scroll
    // so we call the handler from the start
    this.waterfallScrollHandler();

    this.waterfallSlideEL.style.position = 'absolute';

    window.addEventListener('scroll', this.waterfallScrollHandler);
  },

  removeWaterfall() {
    window.removeEventListener('scroll', this.waterfallScrollHandler);
  },

  waterfallScrollHandler() {
    if (this.waterfallRunning) { return; }
    this.waterfallRunning = true;
    requestAnimationFrame(() => {
      let waterfall = this.props.waterfall;

      let waterfallHeight = this.calculateWaterfallHeight();
      if (this.waterfallHeight !== waterfallHeight) {
        this.waterfallHeight = waterfallHeight;
        if (waterfall.onHeightChange) {
          waterfall.onHeightChange({
            height: waterfallHeight,
            maxHeight: waterfall.maxHeight,
            minHeight: waterfall.minHeight,
            childrenEl: this.waterfallRootEl,
          });
        }
      }

      this.waterfallRunning = false;
    });

  },

  calculateWaterfallHeight() {
    let waterfall = this.props.waterfall;
    let windowScroll = window ? window.scrollY : 0;
    return Math.max(waterfall.minHeight, waterfall.maxHeight - windowScroll);
  },

  getStyles() {
    const muiTheme = this.state.muiTheme;
    const rawTheme = muiTheme.rawTheme;

    let themeVariables = muiTheme.appBar;
    let iconButtonSize = muiTheme.button.iconButtonSize;
    let flatButtonSize = 36;

    let styles = {
      root: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: rawTheme.zIndex.appBar,
        width: '100%',
        display: 'flex',
        minHeight: themeVariables.height,
        backgroundColor: themeVariables.color,
        paddingLeft: rawTheme.spacing.desktopGutter,
        paddingRight: rawTheme.spacing.desktopGutter,
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
        marginTop: (iconButtonSize - flatButtonSize) / 2 + 2,
      },
    };

    return styles;
  },

  render() {
    let {
      title,
      titleStyle,
      iconStyleRight,
      showMenuIconButton,
      iconElementLeft,
      iconElementRight,
      iconClassNameLeft,
      iconClassNameRight,
      className,
      style,
      zDepth,
      position,
      waterfall,
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
      if (typeof title === 'string' || title instanceof String) {
        titleElement = (<h1 onTouchTap={this._onTitleTouchTap}
          style={this.prepareStyles(styles.title, styles.mainElement, titleStyle)}>
          {title}
        </h1>);
      } else {
        let titleNode = title;
        if (typeof title === 'function') {
          // pass styles, otherwise inaccesible
          titleNode = title(this.getStyles());
        }
        titleElement = (<div onTouchTap={this._onTitleTouchTap}
          style={this.prepareStyles(styles.title, styles.mainElement, titleStyle)}>
          {titleNode}
        </div>);
      }
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
        let child = iconClassNameLeft ? '' : <NavigationMenu style={this.mergeStyles(styles.iconButton.iconStyle)}/>;
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
          onTouchTap={this._onRightIconButtonTouchTap} />
      );
    }

    let paperElStyle = this.mergeStyles(styles.root, style);

    if (position === 'static') {
      paperElStyle.position = 'static';
    }

    if (position === 'waterfall') {
      let waterfallChildren;
      if (typeof waterfall.children === 'function') {
        waterfallChildren = waterfall.children(this.getStyles());
      } else {
        waterfallChildren = waterfall.children || null;
      }
      return (
        <div
          {...other}
          className={className}
          ref={el => { this.waterfallRootEl = el; }}
          style={{
            height: waterfall.maxHeight,
          }}>
          <Paper
            rounded={false}
            style={this.mergeStyles(styles.root, {
              height: waterfall.minHeight,
            }, style)}
            zDepth={zDepth} />
          {/* this is the visual element that will slide.
            position will be transformed to absolute in setupWaterfall
          */}
          <div
            ref={el => { this.waterfallSlideEL = el; }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: paperElStyle.zIndex + 1,
              width: '100%',
              height: waterfall.maxHeight,
              paddingTop: waterfall.minHeight,
              boxSizing: 'border-box',
              backgroundColor: paperElStyle.backgroundColor,
            }}>{waterfallChildren}</div>
          {/* this is the container for icons and children
           * same styles ar for root but with no background - transparent */}
          <div style={this.mergeStyles(styles.root, {
            position: 'fixed',
            top: 0,
            zIndex: paperElStyle.zIndex + 2,
            background: 'none',
            boxSizing: 'border-box',
          })}>
            {menuElementLeft}
            {titleElement}
            {menuElementRight}
            {children}
          </div>
        </div>
      );
    } else {
      let paperEl = (<Paper
        {...other}
        rounded={false}
        className={className}
        style={paperElStyle}
        zDepth={zDepth}>
          {menuElementLeft}
          {titleElement}
          {menuElementRight}
          {children}
        </Paper>);

      if (position === 'fixed') {
        return (
          <div style={{
            height: paperElStyle.height,
            minHeight: paperElStyle.minHeight,
          }}>{paperEl}</div>
        );
      } else if (position === 'static') {
        return paperEl;
      }
    }
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

export default AppBar;
