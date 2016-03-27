import React from 'react';
import ReactDOM from 'react-dom';
import Events from '../utils/events';
import propTypes from '../utils/propTypes';
import Menu from '../Menu/Menu';
import getMuiTheme from '../styles/getMuiTheme';
import Popover from '../Popover/Popover';

const IconMenu = React.createClass({

  propTypes: {
    /**
     * This is the point on the icon where the menu
     * `targetOrigin` will attach.
     * Options:
     * vertical: [top, middle, bottom]
     * horizontal: [left, center, right].
     */
    anchorOrigin: propTypes.origin,

    /**
     * Should be used to pass `MenuItem` components.
     */
    children: React.PropTypes.node,

    /**
     * The CSS class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * This is the `IconButton` to render. This button will open the menu.
     */
    iconButtonElement: React.PropTypes.element.isRequired,

    /**
     * Override the inline-styles of the underlying icon element.
     */
    iconStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the menu element.
     */
    menuStyle: React.PropTypes.object,

    /**
     * If true, the value can an be array and allow the menu to be a multi-select.
     */
    multiple: React.PropTypes.bool,

    /**
     * Callback function fired when a menu item is selected with a touch-tap.
     *
     * @param {object} event TouchTap event targeting the selected menu item element.
     * @param {object} child The selected element.
     */
    onItemTouchTap: React.PropTypes.func,

    /**
     * Callback function fired when the `IconButton` element is focused or blurred by the keyboard.
     *
     * @param {object} event `focus` or `blur` event targeting the `IconButton` element.
     * @param {boolean} keyboardFocused If true, the `IconButton` element is focused.
     */
    onKeyboardFocus: React.PropTypes.func,

    /**
     * Callback function fired when a mouse button is pressed down on the `IconButton` element.
     *
     * @param {object} event `mousedown` event targeting the `IconButton` element.
     */
    onMouseDown: React.PropTypes.func,

    /**
     * Callback function fired when the mouse enters the `IconButton` element.
     *
     * @param {object} event `mouseenter` event targeting the `IconButton` element.
     */
    onMouseEnter: React.PropTypes.func,

    /**
     * Callback function fired when the mouse leaves the `IconButton` element.
     *
     * @param {object} event `mouseleave` event targeting the `IconButton` element.
     */
    onMouseLeave: React.PropTypes.func,

    /**
     * Callback function fired when a mouse button is released on the `IconButton` element.
     *
     * @param {object} event `mouseup` event targeting the `IconButton` element.
     */
    onMouseUp: React.PropTypes.func,

    /**
     * Callback function fired when the `open` state of the menu is requested to be changed.
     *
     * @param {boolean} open If true, the menu was requested to be opened.
     * @param {string} reason The reason for the open or close request. Possible values are
     * 'keyboard' and 'iconTap' for open requests; 'enter', 'escape', 'itemTap', and 'clickAway'
     * for close requests.
     */
    onRequestChange: React.PropTypes.func,

    /**
     * Callback function fired when the `IconButton` element is touch-tapped.
     *
     * @param {object} event TouchTap event targeting the `IconButton` element.
     */
    onTouchTap: React.PropTypes.func,

    /**
     * If true, the `IconMenu` is opened.
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
    targetOrigin: propTypes.origin,

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

    if (nextProps.open != null) {
      this.setState({
        open: nextProps.open,
        anchorEl: this.refs.iconMenuContainer,
      });
    }
  },

  componentWillUnmount() {
    clearTimeout(this.timerCloseId);
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

  handleItemTouchTap(event, child) {
    if (this.props.touchTapCloseDelay !== 0 && !child.props.hasOwnProperty('menuItems')) {
      const isKeyboard = Events.isKeyboard(event);
      this.timerCloseId = setTimeout(() => {
        this.close(isKeyboard ? 'enter' : 'itemTap', isKeyboard);
      }, this.props.touchTapCloseDelay);
    }

    this.props.onItemTouchTap(event, child);
  },

  handleRequestClose(reason) {
    this.close(reason);
  },

  handleEscKeyDownMenu(event) {
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
      onKeyboardFocus: onKeyboardFocus,
      iconStyle: Object.assign({}, iconStyle, iconButtonElement.props.iconStyle),
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
        onEscKeyDown={this.handleEscKeyDownMenu}
        onItemTouchTap={this.handleItemTouchTap}
        style={mergedMenuStyles}
      >
        {this.props.children}
      </Menu>
    );

    return (
      <div
        ref="iconMenuContainer"
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
          onRequestClose={this.handleRequestClose}
          context={this.context}
        >
          {menu}
        </Popover>
      </div>
    );
  },

});

export default IconMenu;
