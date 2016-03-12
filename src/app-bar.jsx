import React from 'react';
import IconButton from './icon-button';
import NavigationMenu from './svg-icons/navigation/menu';
import getMuiTheme from './styles/getMuiTheme';
import Paper from './paper';
import PropTypes from './utils/prop-types';
import warning from 'warning';

function getStyles(props, state) {
  const {
    appBar,
    button: {
      iconButtonSize,
    },
    zIndex,
  } = state.muiTheme;

  const flatButtonSize = 36;

  const styles = {
    root: {
      position: 'relative',
      zIndex: zIndex.appBar,
      width: '100%',
      display: 'flex',
      backgroundColor: appBar.color,
      paddingLeft: appBar.padding,
      paddingRight: appBar.padding,
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      fontWeight: appBar.titleFontWeight,
      color: appBar.textColor,
      height: appBar.height,
      lineHeight: `${appBar.height}px`,
    },
    mainElement: {
      boxFlex: 1,
      flex: '1',
    },
    iconButtonStyle: {
      marginTop: (appBar.height - iconButtonSize) / 2,
      marginRight: 8,
      marginLeft: -16,
    },
    iconButtonIconStyle: {
      fill: appBar.textColor,
      color: appBar.textColor,
    },
    flatButton: {
      color: appBar.textColor,
      marginTop: (iconButtonSize - flatButtonSize) / 2 + 1,
    },
  };

  return styles;
}

const AppBar = React.createClass({

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
     *
     * @param {object} event TouchTap event targeting the left `IconButton`.
     */
    onLeftIconButtonTouchTap: React.PropTypes.func,

    /**
     * Callback function for when the right icon is selected via a touch tap.
     *
     * @param {object} event TouchTap event targeting the right `IconButton`.
     */
    onRightIconButtonTouchTap: React.PropTypes.func,

    /**
     * Callback function for when the title text is selected via a touch tap.
     *
     * @param {object} event TouchTap event targeting the `title` node.
     */
    onTitleTouchTap: React.PropTypes.func,

    /**
     * Determines whether or not to display the Menu icon next to the title.
     * Setting this prop to false will hide the icon.
     */
    showMenuIconButton: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The title to display on the app bar.
     */
    title: React.PropTypes.node,

    /**
     * Override the inline-styles of the app bar's title element.
     */
    titleStyle: React.PropTypes.object,

    /**
     * The zDepth of the component.
     * The shadow of the app bar is also dependent on this property.
     */
    zDepth: PropTypes.zDepth,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      showMenuIconButton: true,
      title: '',
      zDepth: 1,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    warning(!this.props.iconElementLeft || !this.props.iconClassNameLeft, `Properties iconElementLeft
      and iconClassNameLeft cannot be simultaneously defined. Please use one or the other.`);

    warning(!this.props.iconElementRight || !this.props.iconClassNameRight, `Properties iconElementRight
      and iconClassNameRight cannot be simultaneously defined. Please use one or the other.`);
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
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

  handleTitleTouchTap(event) {
    if (this.props.onTitleTouchTap) {
      this.props.onTitleTouchTap(event);
    }
  },

  render() {
    const {
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
      children,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    let menuElementLeft;
    let menuElementRight;

    // If the title is a string, wrap in an h1 tag.
    // If not, wrap in a div tag.
    const titleComponent = typeof title === 'string' || title instanceof String ? 'h1' : 'div';

    const titleElement = React.createElement(titleComponent, {
      onTouchTap: this.handleTitleTouchTap,
      style: prepareStyles(Object.assign(styles.title, styles.mainElement, titleStyle)),
    }, title);

    if (showMenuIconButton) {
      let iconElementLeftNode = iconElementLeft;

      if (iconElementLeft) {
        switch (iconElementLeft.type.displayName) {
          case 'IconButton':
            iconElementLeftNode = React.cloneElement(iconElementLeft, {
              iconStyle: Object.assign({}, styles.iconButtonIconStyle, iconElementLeft.props.iconStyle),
            });
            break;
        }

        menuElementLeft = (
          <div style={prepareStyles(Object.assign({}, styles.iconButtonStyle))}>
            {iconElementLeftNode}
          </div>
        );
      } else {
        const child = iconClassNameLeft ? '' : <NavigationMenu style={Object.assign({}, styles.iconButtonIconStyle)} />;
        menuElementLeft = (
          <IconButton
            style={styles.iconButtonStyle}
            iconStyle={styles.iconButtonIconStyle}
            iconClassName={iconClassNameLeft}
            onTouchTap={this._onLeftIconButtonTouchTap}
          >
            {child}
          </IconButton>
        );
      }
    }

    const iconRightStyle = Object.assign({}, styles.iconButtonStyle, {
      marginRight: -16,
      marginLeft: 'auto',
    }, iconStyleRight);

    if (iconElementRight) {
      let iconElementRightNode = iconElementRight;

      switch (iconElementRight.type.displayName) {
        case 'IconMenu':
        case 'IconButton':
          iconElementRightNode = React.cloneElement(iconElementRight, {
            iconStyle: Object.assign({}, styles.iconButtonIconStyle, iconElementRight.props.iconStyle),
          });
          break;

        case 'FlatButton':
          iconElementRightNode = React.cloneElement(iconElementRight, {
            style: Object.assign({}, styles.flatButton, iconElementRight.props.style),
          });
          break;
      }

      menuElementRight = (
        <div style={prepareStyles(iconRightStyle)}>
          {iconElementRightNode}
        </div>
      );
    } else if (iconClassNameRight) {
      menuElementRight = (
        <IconButton
          style={iconRightStyle}
          iconStyle={styles.iconButtonIconStyle}
          iconClassName={iconClassNameRight}
          onTouchTap={this._onRightIconButtonTouchTap}
        />
      );
    }

    return (
      <Paper
        {...other}
        rounded={false}
        className={className}
        style={Object.assign({}, styles.root, style)}
        zDepth={zDepth}
      >
        {menuElementLeft}
        {titleElement}
        {menuElementRight}
        {children}
      </Paper>
    );
  },
});

export default AppBar;
