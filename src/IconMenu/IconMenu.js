import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Events from '../utils/events';
import propTypes from '../utils/propTypes';
import Menu from '../Menu/Menu';
import Popover from '../Popover/Popover';
import warning from 'warning';

class IconMenu extends Component {
  static muiName = 'IconMenu';

  static propTypes = {
    /**
     * This is the point on the icon where the menu
     * `targetOrigin` will attach.
     * Options:
     * vertical: [top, center, bottom]
     * horizontal: [left, middle, right].
     */
    anchorOrigin: propTypes.origin,
    /**
     * If true, the popover will apply transitions when
     * it gets added to the DOM.
     */
    animated: PropTypes.bool,
    /**
     * Override the default animation component used.
     */
    animation: PropTypes.func,
    /**
     * Should be used to pass `MenuItem` components.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Sets the delay in milliseconds before closing the
     * menu when an item is clicked.
     * If set to 0 then the auto close functionality
     * will be disabled.
     */
    clickCloseDelay: PropTypes.number,
    /**
     * This is the `IconButton` to render. This button will open the menu.
     */
    iconButtonElement: PropTypes.element.isRequired,
    /**
     * Override the inline-styles of the underlying icon element.
     */
    iconStyle: PropTypes.object,
    /**
     * Override the inline-styles of the underlying `List` element.
     */
    listStyle: PropTypes.object,
    /**
     * Override the inline-styles of the menu element.
     */
    menuStyle: PropTypes.object,
    /**
     * If true, the value can an be array and allow the menu to be a multi-select.
     */
    multiple: PropTypes.bool,
    /**
     * Callback function fired when the `IconButton` element is clicked.
     *
     * @param {object} event Click event targeting the `IconButton` element.
     */
    onClick: PropTypes.func,
    /**
     * Callback function fired when a menu item is selected with a click.
     *
     * @param {object} event Click event targeting the selected menu item element.
     * @param {object} child The selected element.
     */
    onItemClick: PropTypes.func,
    /**
     * Callback function fired when the `IconButton` element is focused or blurred by the keyboard.
     *
     * @param {object} event `focus` or `blur` event targeting the `IconButton` element.
     * @param {boolean} keyboardFocused If true, the `IconButton` element is focused.
     */
    onKeyboardFocus: PropTypes.func,
    /** @ignore */
    onMouseDown: PropTypes.func,
    /** @ignore */
    onMouseEnter: PropTypes.func,
    /** @ignore */
    onMouseLeave: PropTypes.func,
    /** @ignore */
    onMouseUp: PropTypes.func,
    /**
     * Callback function fired when the `open` state of the menu is requested to be changed.
     *
     * @param {boolean} open If true, the menu was requested to be opened.
     * @param {string} reason The reason for the open or close request. Possible values are
     * 'keyboard' and 'iconTap' for open requests; 'enter', 'escape', 'itemTap', and 'clickAway'
     * for close requests.
     */
    onRequestChange: PropTypes.func,
    /**
     * If true, the `IconMenu` is opened.
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
     * vertical: [top, center, bottom]
     * horizontal: [left, middle, right].
     */
    targetOrigin: propTypes.origin,
    /**
     * If true, the popover will render on top of an invisible
     * layer, which will prevent clicks to the underlying elements.
     */
    useLayerForClickAway: PropTypes.bool,
  };

  static defaultProps = {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    animated: true,
    multiple: false,
    open: null,
    onItemClick: () => {},
    onKeyboardFocus: () => {},
    onMouseDown: () => {},
    onMouseLeave: () => {},
    onMouseEnter: () => {},
    onMouseUp: () => {},
    onRequestChange: () => {},
    onClick: () => {},
    targetOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    clickCloseDelay: 200,
    useLayerForClickAway: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    menuInitiallyKeyboardFocused: false,
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open != null) {
      this.setState({
        open: nextProps.open,
        anchorEl: this.refs.iconMenuContainer,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerCloseId);
  }

  isOpen() {
    return this.state.open;
  }

  close(reason, isKeyboard) {
    if (!this.state.open) {
      return;
    }

    if (this.props.open !== null) {
      this.props.onRequestChange(false, reason);
    } else {
      this.setState({open: false}, () => {
        // Set focus on the icon button when the menu close
        if (isKeyboard) {
          const iconButton = this.refs.iconButton;
          ReactDOM.findDOMNode(iconButton).focus();
          iconButton.setKeyboardFocus();
        }
      });
    }
  }

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
  }

  handleItemClick = (event, child) => {
    if (this.props.clickCloseDelay !== 0 && !child.props.hasOwnProperty('menuItems')) {
      const isKeyboard = Events.isKeyboard(event);
      this.timerCloseId = setTimeout(() => {
        this.close(isKeyboard ? 'enter' : 'itemTap', isKeyboard);
      }, this.props.clickCloseDelay);
    }

    this.props.onItemClick(event, child);
  };

  handleRequestClose = (reason) => {
    this.close(reason);
  };

  handleEscKeyDownMenu = (event) => {
    this.close('escape', event);
  };

  render() {
    const {
      anchorOrigin,
      className,
      animated,
      animation,
      iconButtonElement,
      iconStyle,
      onItemClick, // eslint-disable-line no-unused-vars
      onKeyboardFocus,
      onMouseDown,
      onMouseLeave,
      onMouseEnter,
      onMouseUp,
      onRequestChange, // eslint-disable-line no-unused-vars
      onClick,
      listStyle,
      menuStyle,
      style,
      targetOrigin,
      clickCloseDelay, // eslint-disable-line no-unused-vars
      useLayerForClickAway,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
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

    warning(iconButtonElement.type.muiName !== 'SvgIcon',
      `Material-UI: You shoud not provide an <SvgIcon /> to the 'iconButtonElement' property of <IconMenu />.
You should wrapped it with an <IconButton />.`);

    const iconButtonProps = {
      onKeyboardFocus: onKeyboardFocus,
      onClick: (event) => {
        this.open(Events.isKeyboard(event) ? 'keyboard' : 'iconTap', event);
        if (iconButtonElement.props.onClick) {
          iconButtonElement.props.onClick(event);
        }
      },
      ref: 'iconButton',
    };
    if (iconStyle || iconButtonElement.props.iconStyle) {
      iconButtonProps.iconStyle = iconStyle ?
        Object.assign({}, iconStyle, iconButtonElement.props.iconStyle) :
        iconButtonElement.props.iconStyle;
    }
    const iconButton = React.cloneElement(iconButtonElement, iconButtonProps);

    const menu = (
      <Menu
        {...other}
        initiallyKeyboardFocused={this.state.menuInitiallyKeyboardFocused}
        onEscKeyDown={this.handleEscKeyDownMenu}
        onItemClick={this.handleItemClick}
        style={mergedMenuStyles}
        listStyle={listStyle}
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
        onClick={onClick}
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
          animated={animated}
          animation={animation}
          context={this.context}
        >
          {menu}
        </Popover>
      </div>
    );
  }
}

export default IconMenu;
