import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from '../mixins/style-propable';
import Events from '../utils/events';
import PropTypes from '../utils/prop-types';
import Menu from '../menus/menu';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';
import Popover from '../popover/popover';
import warning from 'warning';

const IconMenu = React.createClass({

  propTypes: {
    /**
     * This is the point on the icon where the menu
     * targetOrigin will stick to.
     * Options:
     * vertical: [top, middle, bottom]
     * horizontal: [left, center, right].
     */
    anchorOrigin: PropTypes.origin,

    /**
     * Should be used to pass `MenuItem` components.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * If true, menu will close after an item is touchTapped.
     */
    closeOnItemTouchTap: React.PropTypes.bool,

    /**
     * This is the IconButton to render. This button will open the menu.
     */
    iconButtonElement: React.PropTypes.element.isRequired,

    /**
     * The style object to use to override underlying icon style.
     */
    iconStyle: React.PropTypes.object,

    /**
     * The style object to use to override underlying menu style.
     */
    menuStyle: React.PropTypes.object,

    /**
     * Fired when a menu item is touchTapped.
     */
    onItemTouchTap: React.PropTypes.func,

    /**
     * Fired when keyobard focuses on element.
     */
    onKeyboardFocus: React.PropTypes.func,

    /**
     * Fired when mouse is pressed on element.
     */
    onMouseDown: React.PropTypes.func,

    /**
     * Fired when mouse enters the element.
     */
    onMouseEnter: React.PropTypes.func,

    /**
     * Fired when mouse leaves the element.
     */
    onMouseLeave: React.PropTypes.func,

    /**
     * Fired when mouse is lifted inside the element.
     */
    onMouseUp: React.PropTypes.func,

    /**
     * Callback function that is fired when the open state
     * of the menu is requested to be changed. The provided
     * open argument determines whether the menu is requested
     * to be opened or closed. Also, the reason argument states
     * why the menu got closed or opened. It can be 'keyboard',
     * 'iconTap' for open action and 'enter', 'escape', 'itemTap',
     * 'clickAway' for close action.
     */
    onRequestChange: React.PropTypes.func,

    /**
     * Fired when element is touch tapped.
     */
    onTouchTap: React.PropTypes.func,

    /**
     * Controls whether the IconMenu is opened or not.
     */
    open: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * This is the point on the menu which will stick to the menu
     * origin.
     * Options:
     * vertical: [top, middle, bottom]
     * horizontal: [left, center, right].
     */
    targetOrigin: PropTypes.origin,

    /**
     * Sets the delay in milliseconds before closing the
     * menu when an item is clicked.
     */
    touchTapCloseDelay: React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

  getDefaultProps() {
    return {
      closeOnItemTouchTap: true,
      open: null,
      onItemTouchTap: () => {},
      onKeyboardFocus: () => {},
      onMouseDown: () => {},
      onMouseLeave: () => {},
      onMouseEnter: () => {},
      onMouseUp: () => {},
      onTouchTap: () => {},
      onRequestChange: () => {},
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      targetOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      touchTapCloseDelay: 200,
    };
  },

  getInitialState() {
    if (process.env.NODE_ENV !== 'production') {
      this._warningIfNeeded();
    }

    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      iconButtonRef: this.props.iconButtonElement.props.ref || 'iconButton',
      menuInitiallyKeyboardFocused: false,
      open: false,
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    if (process.env.NODE_ENV !== 'production') {
      this._warningIfNeeded();
    }

    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    if (nextProps.open === true || nextProps.open === false) {
      this.setState({open: nextProps.open});
    }
  },

  componentWillUnmount() {
    if (this._timeout) clearTimeout(this._timeout);
  },

  _warningIfNeeded() {
    if (this.props.hasOwnProperty('open')) {
      warning(this.props.hasOwnProperty('closeOnItemTouchTap'),
        'closeOnItemTouchTap has been deprecated in favor of open, onRequestChange');
    }
  },

  isOpen() {
    return this.state.open;
  },

  close(reason, isKeyboard) {
    if (!this.state.open) {
      return;
    }

    if (this.props.open !== null) {
      this.props.onRequestChange(false, reason);
    }

    this.setState({open: false}, () => {
      //Set focus on the icon button when the menu close
      if (isKeyboard) {
        let iconButton = this.refs[this.state.iconButtonRef];
        ReactDOM.findDOMNode(iconButton).focus();
        iconButton.setKeyboardFocus();
      }
    });
  },

  open(reason, event) {
    if (this.props.open !== null) {
      this.props.onRequestChange(true, reason);

      return this.setState({
        menuInitiallyKeyboardFocused: Events.isKeyboard(event),
        anchorEl: event.currentTarget,
      });
    }

    this.setState({
      open: true,
      menuInitiallyKeyboardFocused: Events.isKeyboard(event),
      anchorEl: event.currentTarget,
    });

    event.preventDefault();
  },

  _handleItemTouchTap(event, child) {
    if (this.props.closeOnItemTouchTap) {
      const isKeyboard = Events.isKeyboard(event);
      this._timeout = setTimeout(() => {
        if (!this.isMounted()) {
          return;
        }

        this.close(isKeyboard ? 'enter' : 'itemTap', isKeyboard);
      }, this.props.touchTapCloseDelay);
    }

    this.props.onItemTouchTap(event, child);
  },

  _handleMenuEscKeyDown(event) {
    this.close('escape', event);
  },

  render() {
    let {
      anchorOrigin,
      className,
      closeOnItemTouchTap,
      iconButtonElement,
      iconStyle,
      onItemTouchTap,
      onKeyboardFocus,
      onMouseDown,
      onMouseLeave,
      onMouseEnter,
      onMouseUp,
      onTouchTap,
      menuStyle,
      style,
      targetOrigin,
      ...other,
    } = this.props;

    const {open, anchorEl} = this.state;

    let styles = {
      root: {
        display: 'inline-block',
        position: 'relative',
      },

      menu: {
        position: 'relative',
      },
    };

    let mergedRootStyles = this.mergeStyles(styles.root, style);
    let mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);

    let iconButton = React.cloneElement(iconButtonElement, {
      onKeyboardFocus: this.props.onKeyboardFocus,
      iconStyle: this.mergeStyles(iconStyle, iconButtonElement.props.iconStyle),
      onTouchTap: (e) => {
        this.open(Events.isKeyboard(e) ? 'keyboard' : 'iconTap', e);
        if (iconButtonElement.props.onTouchTap) iconButtonElement.props.onTouchTap(e);
      },
      ref: this.state.iconButtonRef,
    });

    let menu = (
      <Menu
        {...other}
        animateOpen={true}
        initiallyKeyboardFocused={this.state.menuInitiallyKeyboardFocused}
        onEscKeyDown={this._handleMenuEscKeyDown}
        onItemTouchTap={this._handleItemTouchTap}
        zDepth={0}
        style={mergedMenuStyles}
      >
        {this.props.children}
      </Menu>
    );

    return (
      <div
        className={className}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onMouseUp={onMouseUp}
        onTouchTap={onTouchTap}
        style={this.prepareStyles(mergedRootStyles)}
      >
        {iconButton}
        <Popover
          anchorOrigin={anchorOrigin}
          targetOrigin={targetOrigin}
          open={open}
          anchorEl={anchorEl}
          childContextTypes={this.constructor.childContextTypes}
          useLayerForClickAway={false}
          onRequestClose={this.close}
          context={this.context}
        >
          {menu}
        </Popover>
      </div>
    );
  },

});

export default IconMenu;
