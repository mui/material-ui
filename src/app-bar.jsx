import React from 'react';
import MuiComponent from './MuiComponent';
import styleUtils from './utils/styles';
import Typography from './styles/typography';
import IconButton from './icon-button';
import NavigationMenu from './svg-icons/navigation/menu';
import Paper from './paper';
import PropTypes from './utils/prop-types';

export default class AppBar extends MuiComponent {

  static propTypes = {
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
    title: React.PropTypes.node,

    /**
     * Override the inline-styles of the app bar's title element.
     */
    titleStyle: React.PropTypes.object,

    /**
     * The zDepth of the app bar.
     * The shadow of the app bar is also dependent on this property.
     */
    zDepth: PropTypes.zDepth,
  }

  static defaultProps = {
    showMenuIconButton: true,
    title: '',
    zDepth: 1,
  }

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
  }

  getStyles() {
    const muiTheme = this.state.muiTheme;
    const rawTheme = muiTheme.rawTheme;

    let themeVariables = muiTheme.appBar;
    let iconButtonSize = muiTheme.button.iconButtonSize;
    let flatButtonSize = 36;

    let styles = {
      root: {
        position: 'relative',
        zIndex: muiTheme.zIndex.appBar,
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
  }

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
      children,
      ...other,
    } = this.props;

    const {muiTheme} = this.state;

    let menuElementLeft;
    let menuElementRight;
    let styles = this.getStyles();
    let iconRightStyle = styleUtils.merge(styles.iconButton.style, {
      marginRight: -16,
      marginLeft: 'auto',
    }, iconStyleRight);
    let titleElement;

    if (title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      titleElement = typeof title === 'string' || title instanceof String ?
        <h1 onTouchTap={this._onTitleTouchTap}
          style={styleUtils.prepareStyles(muiTheme, styles.title, styles.mainElement, titleStyle)}>
          {title}
        </h1> :
        <div onTouchTap={this._onTitleTouchTap}
          style={styleUtils.prepareStyles(muiTheme, styles.title, styles.mainElement, titleStyle)}>
          {title}
        </div>;
    }

    if (showMenuIconButton) {
      if (iconElementLeft) {
        switch (iconElementLeft.type.displayName) {
          case 'IconButton':
            iconElementLeft = React.cloneElement(iconElementLeft, {
              iconStyle: styleUtils.merge(styles.iconButton.iconStyle, iconElementLeft.props.iconStyle),
            });
            break;
        }

        menuElementLeft = (
          <div style={styleUtils.prepareStyles(muiTheme, styles.iconButton.style)}>
            {iconElementLeft}
          </div>
        );
      } else {
        let child = iconClassNameLeft ? '' : <NavigationMenu style={styleUtils.merge(styles.iconButton.iconStyle)}/>;
        menuElementLeft = (
          <IconButton
            style={styleUtils.merge(styles.iconButton.style)}
            iconStyle={styleUtils.merge(styles.iconButton.iconStyle)}
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
            iconStyle: styleUtils.merge(styles.iconButton.iconStyle, iconElementRight.props.iconStyle),
          });
          break;

        case 'FlatButton':
          iconElementRight = React.cloneElement(iconElementRight, {
            style: styleUtils.merge(styles.flatButton, iconElementRight.props.style),
          });
          break;
      }

      menuElementRight = (
        <div style={styleUtils.prepareStyles(muiTheme, iconRightStyle)}>
          {iconElementRight}
        </div>
      );
    } else if (iconClassNameRight) {
      menuElementRight = (
        <IconButton
          style={iconRightStyle}
          iconStyle={styleUtils.merge(styles.iconButton.iconStyle)}
          iconClassName={iconClassNameRight}
          onTouchTap={this._onRightIconButtonTouchTap} />
      );
    }

    return (
      <Paper
        {...other}
        rounded={false}
        className={className}
        style={styleUtils.merge(styles.root, style)}
        zDepth={zDepth}>
          {menuElementLeft}
          {titleElement}
          {menuElementRight}
          {children}
      </Paper>
    );
  }


  _onLeftIconButtonTouchTap = (event) => {
    if (this.props.onLeftIconButtonTouchTap) {
      this.props.onLeftIconButtonTouchTap(event);
    }
  }

  _onRightIconButtonTouchTap = (event) => {
    if (this.props.onRightIconButtonTouchTap) {
      this.props.onRightIconButtonTouchTap(event);
    }
  }

  _onTitleTouchTap = (event) => {
    if (this.props.onTitleTouchTap) {
      this.props.onTitleTouchTap(event);
    }
  }
}
