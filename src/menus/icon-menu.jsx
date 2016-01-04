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
    anchorOrigin: PropTypes.origin,
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    closeOnItemTouchTap: React.PropTypes.bool,
    iconButtonElement: React.PropTypes.element.isRequired,
    iconStyle: React.PropTypes.object,
    menuStyle: React.PropTypes.object,
    onItemTouchTap: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onRequestChange: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    open: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    targetOrigin: PropTypes.origin,
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

    let mergedRootStyles = this.prepareStyles(styles.root, style);
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
        style={mergedMenuStyles}>
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
        style={mergedRootStyles}>
        {iconButton}
        <Popover
          anchorOrigin={anchorOrigin}
          targetOrigin={targetOrigin}
          open={open}
          anchorEl={anchorEl}
          childContextTypes={this.constructor.childContextTypes}
          useLayerForClickAway={false}
          onRequestClose={this.close}
          context={this.context}>
            {menu}
        </Popover>
      </div>
    );
  },

});

export default IconMenu;
