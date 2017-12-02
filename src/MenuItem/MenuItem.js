import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import Popover from '../Popover/Popover';
import CheckIcon from '../svg-icons/navigation/check';
import ListItem from '../List/ListItem';
import Menu from '../Menu/Menu';
import propTypes from '../utils/propTypes';

const nestedMenuStyle = {
  position: 'relative',
};

function getStyles(props, context) {
  const disabledColor = context.muiTheme.baseTheme.palette.disabledColor;
  const textColor = context.muiTheme.baseTheme.palette.textColor;
  const indent = props.desktop ? 64 : 72;
  const sidePadding = props.desktop ? 24 : 16;

  const styles = {
    root: {
      color: props.disabled ? disabledColor : textColor,
      cursor: props.disabled ? 'default' : 'pointer',
      minHeight: props.desktop ? '32px' : '48px',
      lineHeight: props.desktop ? '32px' : '48px',
      fontSize: props.desktop ? 15 : 16,
      whiteSpace: 'nowrap',
    },

    innerDivStyle: {
      paddingLeft: props.leftIcon || props.insetChildren || props.checked ? indent : sidePadding,
      paddingRight: props.rightIcon ? indent : sidePadding,
      paddingBottom: 0,
      paddingTop: 0,
    },

    secondaryText: {
      float: 'right',
    },

    leftIconDesktop: {
      margin: 0,
      left: 24,
      top: 4,
    },

    rightIconDesktop: {
      margin: 0,
      right: 24,
      top: 4,
      fill: context.muiTheme.menuItem.rightIconDesktopFill,
    },
  };

  return styles;
}

class MenuItem extends Component {
  static muiName = 'MenuItem';

  static propTypes = {
    /**
     * Location of the anchor for the popover of nested `MenuItem`
     * elements.
     * Options:
     * horizontal: [left, middle, right]
     * vertical: [top, center, bottom].
     */
    anchorOrigin: propTypes.origin,
    /**
     * Override the default animation component used.
     */
    animation: PropTypes.func,
    /**
     * If true, a left check mark will be rendered.
     */
    checked: PropTypes.bool,
    /**
     * Elements passed as children to the underlying `ListItem`.
     */
    children: PropTypes.node,
    /**
     * @ignore
     * If true, the menu item will render with compact desktop
     * styles.
     */
    desktop: PropTypes.bool,
    /**
     * If true, the menu item will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * The focus state of the menu item. This prop is used to set the focus
     * state of the underlying `ListItem`.
     */
    focusState: PropTypes.oneOf([
      'none',
      'focused',
      'keyboard-focused',
    ]),
    /**
     * Override the inline-styles of the inner div.
     */
    innerDivStyle: PropTypes.object,
    /**
     * If true, the children will be indented.
     * This is only needed when there is no `leftIcon`.
     */
    insetChildren: PropTypes.bool,
    /**
     * The `SvgIcon` or `FontIcon` to be displayed on the left side.
     */
    leftIcon: PropTypes.element,
    /**
     * `MenuItem` elements to nest within the menu item.
     */
    menuItems: PropTypes.node,
    /**
     * Callback function fired when the menu item is clicked.
     *
     * @param {object} event Click event targeting the menu item.
     */
    onClick: PropTypes.func,
    /**
     * Can be used to render primary text within the menu item.
     */
    primaryText: PropTypes.node,
    /**
     * The `SvgIcon` or `FontIcon` to be displayed on the right side.
     */
    rightIcon: PropTypes.element,
    /**
     * Can be used to render secondary text within the menu item.
     */
    secondaryText: PropTypes.node,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Location on the popover of nested `MenuItem` elements that will attach
     * to the anchor's origin.
     * Options:
     * horizontal: [left, middle, right]
     * vertical: [top, center, bottom].
     */
    targetOrigin: propTypes.origin,
    /**
     * The value of the menu item.
     */
    value: PropTypes.any,
  };

  static defaultProps = {
    anchorOrigin: {horizontal: 'right', vertical: 'top'},
    checked: false,
    desktop: false,
    disabled: false,
    focusState: 'none',
    insetChildren: false,
    targetOrigin: {horizontal: 'left', vertical: 'top'},
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  componentDidMount() {
    this.applyFocusState();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.open && nextProps.focusState === 'none') {
      this.handleRequestClose();
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context, nextContext)
    );
  }

  componentDidUpdate() {
    this.applyFocusState();
  }

  componentWillUnmount() {
    if (this.state.open) {
      this.setState({
        open: false,
      });
    }
  }

  applyFocusState() {
    this.refs.listItem.applyFocusState(this.props.focusState);
  }

  cloneMenuItem = (item) => {
    return React.cloneElement(item, {
      onClick: (event) => {
        if (!item.props.menuItems) {
          this.handleRequestClose();
        }

        if (item.props.onClick) {
          item.props.onClick(event);
        }
      },
    });
  };

  handleClick = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: ReactDOM.findDOMNode(this),
    });

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
      anchorEl: null,
    });
  };

  render() {
    const {
      checked,
      children,
      desktop,
      disabled,
      focusState, // eslint-disable-line no-unused-vars
      innerDivStyle,
      insetChildren,
      leftIcon,
      menuItems,
      rightIcon,
      secondaryText,
      style,
      animation,
      anchorOrigin,
      targetOrigin,
      value, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const mergedRootStyles = Object.assign(styles.root, style);
    const mergedInnerDivStyles = Object.assign(styles.innerDivStyle, innerDivStyle);

    // Left Icon
    let leftIconElement = leftIcon ? leftIcon : checked ? <CheckIcon /> : null;
    if (leftIconElement) {
      const mergedLeftIconStyles = desktop ?
        Object.assign(styles.leftIconDesktop, leftIconElement.props.style) : leftIconElement.props.style;
      leftIconElement = React.cloneElement(leftIconElement, {style: mergedLeftIconStyles});
    }

    // Right Icon
    let rightIconElement;
    if (rightIcon) {
      const mergedRightIconStyles = desktop ?
        Object.assign(styles.rightIconDesktop, rightIcon.props.style) : rightIcon.props.style;
      rightIconElement = React.cloneElement(rightIcon, {style: mergedRightIconStyles});
    }

    // Secondary Text
    let secondaryTextElement;
    if (secondaryText) {
      const secondaryTextIsAnElement = React.isValidElement(secondaryText);
      const mergedSecondaryTextStyles = secondaryTextIsAnElement ?
      Object.assign(styles.secondaryText, secondaryText.props.style) : null;

      secondaryTextElement = secondaryTextIsAnElement ?
        React.cloneElement(secondaryText, {style: mergedSecondaryTextStyles}) :
        <div style={prepareStyles(styles.secondaryText)}>{secondaryText}</div>;
    }
    let childMenuPopover;
    if (menuItems) {
      childMenuPopover = (
        <Popover
          animation={animation}
          anchorOrigin={anchorOrigin}
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          targetOrigin={targetOrigin}
          useLayerForClickAway={false}
          onRequestClose={this.handleRequestClose}
        >
          <Menu desktop={desktop} disabled={disabled} style={nestedMenuStyle}>
            {React.Children.map(menuItems, this.cloneMenuItem)}
          </Menu>
        </Popover>
      );
      other.onClick = this.handleClick;
    }

    return (
      <ListItem
        {...other}
        disabled={disabled}
        hoverColor={this.context.muiTheme.menuItem.hoverColor}
        innerDivStyle={mergedInnerDivStyles}
        insetChildren={insetChildren}
        leftIcon={leftIconElement}
        ref="listItem"
        rightIcon={rightIconElement}
        role="menuitem"
        style={mergedRootStyles}
      >
        {children}
        {secondaryTextElement}
        {childMenuPopover}
      </ListItem>
    );
  }
}

export default MenuItem;
