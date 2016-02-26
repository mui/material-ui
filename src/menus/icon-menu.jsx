import React from 'react';
import ReactDOM from 'react-dom';
import Events from '../utils/events';
import PropTypes from '../utils/prop-types';
import Menu from '../menus/menu';
import getMuiTheme from '../styles/getMuiTheme';
import Popover from '../popover/popover';

const IconMenu = React.createClass({

  propTypes: {
    /**
     * This is the point on the icon where the menu
     * targetOrigin will attach.
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
     * If true, the value can an be array and allow the menu to be a multi-select.
     */
    multiple: React.PropTypes.bool,

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
     * If set to 0 then the auto close functionality
     * will be disabled.
     */
    touchTapCloseDelay: React.PropTypes.number,

    /**
     * If true, the popover will render on top of an invisible
     * layer, which will prevent clicks to the underlying elements.
     */
    useLayerForClickAway: React.PropTypes.bool,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      multiple: false,
      open: null,
      onItemTouchTap: () => {},
      onKeyboardFocus: () => {},
      onMouseDown: () => {},
      onMouseLeave: () => {},
      onMouseEnter: () => {},
      onMouseUp: () => {},
      onTouchTap: () => {},
      onRequestChange: () => {},
      targetOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      touchTapCloseDelay: 200,
      useLayerForClickAway: false,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
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

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });

    if (nextProps.open === true || nextProps.open === false) {
      this.setState({open: nextProps.open});
    }
  },

  componentWillUnmount() {
    if (this.timerCloseId) {
      clearTimeout(this.timerCloseId);
    }
  },

  timerCloseId: undefined,

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
        const iconButton = this.refs[this.state.iconButtonRef];
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
    if (this.props.touchTapCloseDelay !== 0 && !child.props.hasOwnProperty('menuItems')) {
      const isKeyboard = Events.isKeyboard(event);
      this.timerCloseId = setTimeout(() => {
        this.close(isKeyboard ? 'enter' : 'itemTap', isKeyboard);
      }, this.props.touchTapCloseDelay);
    }

    this.props.onItemTouchTap(event, child);
  },

  _handleMenuEscKeyDown(event) {
    this.close('escape', event);
  },

  render() {
    const {
      anchorOrigin,
      className,
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
      useLayerForClickAway,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const {open, anchorEl} = this.state;

    const styles = {
      root: {
        display: 'inline-block',
        position: 'relative',
      },

      menu: {
        position: 'relative',
      },
    };

    const mergedRootStyles = Object.assign(styles.root, style);
    const mergedMenuStyles = Object.assign(styles.menu, menuStyle);

    const iconButton = React.cloneElement(iconButtonElement, {
      onKeyboardFocus: this.props.onKeyboardFocus,
      iconStyle: Object.assign(iconStyle, iconButtonElement.props.iconStyle),
      onTouchTap: (event) => {
        this.open(Events.isKeyboard(event) ? 'keyboard' : 'iconTap', event);
        if (iconButtonElement.props.onTouchTap) iconButtonElement.props.onTouchTap(event);
      },
      ref: this.state.iconButtonRef,
    });

    const menu = (
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
        style={prepareStyles(mergedRootStyles)}
      >
        {iconButton}
        <Popover
          anchorOrigin={anchorOrigin}
          targetOrigin={targetOrigin}
          open={open}
          anchorEl={anchorEl}
          childContextTypes={this.constructor.childContextTypes}
          useLayerForClickAway={useLayerForClickAway}
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
