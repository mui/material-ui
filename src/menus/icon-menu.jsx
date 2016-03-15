import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Events from '../utils/events';
import MuiPropTypes from '../utils/mui-prop-types';
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
    anchorOrigin: MuiPropTypes.origin,

    /**
     * Should be used to pass `MenuItem` components.
     */
    children: PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,

    /**
     * This is the IconButton to render. This button will open the menu.
     */
    iconButtonElement: PropTypes.element.isRequired,

    /**
     * The style object to use to override underlying icon style.
     */
    iconStyle: PropTypes.object,

    /**
     * The style object to use to override underlying menu style.
     */
    menuStyle: PropTypes.object,

    /**
     * If true, the value can an be array and allow the menu to be a multi-select.
     */
    multiple: PropTypes.bool,

    /**
     * Fired when a menu item is touchTapped.
     */
    onItemTouchTap: PropTypes.func,

    /**
     * Fired when keyobard focuses on element.
     */
    onKeyboardFocus: PropTypes.func,

    /**
     * Fired when mouse is pressed on element.
     */
    onMouseDown: PropTypes.func,

    /**
     * Fired when mouse enters the element.
     */
    onMouseEnter: PropTypes.func,

    /**
     * Fired when mouse leaves the element.
     */
    onMouseLeave: PropTypes.func,

    /**
     * Fired when mouse is lifted inside the element.
     */
    onMouseUp: PropTypes.func,

    /**
     * Callback function that is fired when the open state
     * of the menu is requested to be changed. The provided
     * open argument determines whether the menu is requested
     * to be opened or closed. Also, the reason argument states
     * why the menu got closed or opened. It can be 'keyboard',
     * 'iconTap' for open action and 'enter', 'escape', 'itemTap',
     * 'clickAway' for close action.
     */
    onRequestChange: PropTypes.func,

    /**
     * Fired when element is touch tapped.
     */
    onTouchTap: PropTypes.func,

    /**
     * Controls whether the IconMenu is opened or not.
     */
    open: PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,

    /**
     * This is the point on the menu which will stick to the menu
     * origin.
     * Options:
     * vertical: [top, middle, bottom]
     * horizontal: [left, center, right].
     */
    targetOrigin: MuiPropTypes.origin,

    /**
     * Sets the delay in milliseconds before closing the
     * menu when an item is clicked.
     * If set to 0 then the auto close functionality
     * will be disabled.
     */
    touchTapCloseDelay: PropTypes.number,

    /**
     * If true, the popover will render on top of an invisible
     * layer, which will prevent clicks to the underlying elements.
     */
    useLayerForClickAway: PropTypes.bool,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  childContextTypes: {
    muiTheme: PropTypes.object,
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
        onEscKeyDown={this._handleMenuEscKeyDown}
        onItemTouchTap={this._handleItemTouchTap}
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
