import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import StylePropable from '../mixins/style-propable';
import Colors from '../styles/colors';
import Popover from '../popover/popover';
import CheckIcon from '../svg-icons/navigation/check';
import ListItem from '../lists/list-item';
import muiThemeable from '../muiThemeable';
import Menu from './menu';

const nestedMenuStyle = {
  position: 'relative',
};

let MenuItem = React.createClass({

  mixins: [
    PureRenderMixin,
    StylePropable,
  ],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    checked: React.PropTypes.bool,
    children: React.PropTypes.node,
    desktop: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    focusState: React.PropTypes.oneOf([
      'none',
      'focused',
      'keyboard-focused',
    ]),
    innerDivStyle: React.PropTypes.object,
    insetChildren: React.PropTypes.bool,
    leftIcon: React.PropTypes.element,
    menuItems: React.PropTypes.node,
    onTouchTap: React.PropTypes.func,
    rightIcon: React.PropTypes.element,
    secondaryText: React.PropTypes.node,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    value: React.PropTypes.any,
  },

  getInitialState() {
    return {
      open: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.state.open && nextProps.focusState === 'none') {
      this._onRequestClose();
    }
  },

  getDefaultProps() {
    return {
      focusState: 'none',
    };
  },

  componentDidMount() {
    this._applyFocusState();
  },

  componentDidUpdate() {
    this._applyFocusState();
  },

  componentWillUnmount() {
    if (this.state.open) {
      this.setState({
        open: false,
      });
    }
  },

  render() {
    const {
      _muiTheme,
      checked,
      children,
      desktop,
      disabled,
      focusState,
      innerDivStyle,
      insetChildren,
      leftIcon,
      menuItems,
      rightIcon,
      secondaryText,
      style,
      value,
      ...other,
    } = this.props;

    const disabledColor = _muiTheme.baseTheme.palette.disabledColor;
    const textColor = _muiTheme.baseTheme.palette.textColor;
    const leftIndent = desktop ? 64 : 72;
    const sidePadding = desktop ? 24 : 16;

    const styles = {
      root: {
        color: disabled ? disabledColor : textColor,
        lineHeight: desktop ? '32px' : '48px',
        fontSize: desktop ? 15 : 16,
        whiteSpace: 'nowrap',
      },

      innerDivStyle: {
        paddingLeft: leftIcon || insetChildren || checked ? leftIndent : sidePadding,
        paddingRight: sidePadding,
        paddingBottom: 0,
        paddingTop: 0,
      },

      secondaryText: {
        float: 'right',
      },

      leftIconDesktop: {
        padding: 0,
        left: 24,
        top: 4,
      },

      rightIconDesktop: {
        padding: 0,
        right: 24,
        top: 4,
        fill: Colors.grey600,
      },
    };

    let mergedRootStyles = this.mergeStyles(styles.root, style);
    let mergedInnerDivStyles = this.mergeStyles(styles.innerDivStyle, innerDivStyle);

    //Left Icon
    let leftIconElement = leftIcon ? leftIcon : checked ? <CheckIcon /> : null;
    if (leftIconElement && desktop) {
      const mergedLeftIconStyles = this.mergeStyles(styles.leftIconDesktop, leftIconElement.props.style);
      leftIconElement = React.cloneElement(leftIconElement, {style: mergedLeftIconStyles});
    }

    //Right Icon
    let rightIconElement;
    if (rightIcon) {
      const mergedRightIconStyles = desktop ?
        this.mergeStyles(styles.rightIconDesktop, rightIcon.props.style) : rightIcon.props.style;
      rightIconElement = React.cloneElement(rightIcon, {style: mergedRightIconStyles});
    }

    //Secondary Text
    let secondaryTextElement;
    if (secondaryText) {
      const secondaryTextIsAnElement = React.isValidElement(secondaryText);
      const mergedSecondaryTextStyles = secondaryTextIsAnElement ?
      this.mergeStyles(styles.secondaryText, secondaryText.props.style) : null;

      secondaryTextElement = secondaryTextIsAnElement ?
        React.cloneElement(secondaryText, {style: mergedSecondaryTextStyles}) :
        <div style={this.prepareStyles(styles.secondaryText)}>{secondaryText}</div>;
    }
    let childMenuPopover;
    if (menuItems) {
      childMenuPopover = (
        <Popover
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          useLayerForClickAway={false}
          onRequestClose={this._onRequestClose}>
          <Menu desktop={desktop} disabled={disabled} style={nestedMenuStyle}>
            {React.Children.map(menuItems, this._cloneMenuItem)}
          </Menu>
        </Popover>
      );
      other.onTouchTap = this._onTouchTap;
    }

    return (
      <ListItem
        {...other}
        disabled={disabled}
        innerDivStyle={mergedInnerDivStyles}
        insetChildren={insetChildren}
        leftIcon={leftIconElement}
        ref="listItem"
        rightIcon={rightIconElement}
        style={mergedRootStyles}>
        {children}
        {secondaryTextElement}
        {childMenuPopover}
      </ListItem>
    );
  },

  _applyFocusState() {
    this.refs.listItem.applyFocusState(this.props.focusState);
  },

  _cloneMenuItem(item) {
    return React.cloneElement(item, {
      onTouchTap: (event) =>
      {
        if (!item.props.menuItems) {
          this._onRequestClose();
        }

        if (item.props.onTouchTap) {
          item.props.onTouchTap(event);
        }
      },
      onRequestClose: this._onRequestClose,
    });
  },

  _onTouchTap(event) {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: ReactDOM.findDOMNode(this),
    });

    if (this.props.onTouchTap) {
      this.props.onTouchTap(event);
    }
  },

  _onRequestClose() {
    this.setState({
      open: false,
      anchorEl: null,
    });
  },
});

MenuItem = muiThemeable(MenuItem);

export default MenuItem;
