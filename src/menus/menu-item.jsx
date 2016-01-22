import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import StylePropable from '../mixins/style-propable';
import Colors from '../styles/colors';
import Popover from '../popover/popover';
import CheckIcon from '../svg-icons/navigation/check';
import ListItem from '../lists/list-item';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';
import Menu from './menu';

const nestedMenuStyle = {
  position: 'relative',
};

const MenuItem = React.createClass({

  propTypes: {
    /**
     * If true, a left check mark will be rendered.
     */
    checked: React.PropTypes.bool,

    /**
     * Elements passed as children to inner ListItem.
     */
    children: React.PropTypes.node,

    /**
     * Indicates if the menu should render with compact desktop styles.
     */
    desktop: React.PropTypes.bool,

    /**
     * Disables a menu item.
     */
    disabled: React.PropTypes.bool,

    /**
     * Prop passed down to ListItem that tells it what kind of focus it has.
     */
    focusState: React.PropTypes.oneOf([
      'none',
      'focused',
      'keyboard-focused',
    ]),

    /**
     * Style overrides for the inner div.
     */
    innerDivStyle: React.PropTypes.object,

    /**
     * If true, the children will be indented.
     * Only needed when there is no leftIcon.
     */
    insetChildren: React.PropTypes.bool,

    /**
     * This is the SvgIcon or FontIcon to be displayed on the left side.
     */
    leftIcon: React.PropTypes.element,

    /**
     * Nested MenuItems for this MenuItem. Used to make nested menus.
     */
    menuItems: React.PropTypes.node,

    /**
     * Fired when the element is touchTapped.
     */
    onTouchTap: React.PropTypes.func,

    /**
     * This is the SvgIcon or FontIcon to be displayed on the right side.
     */
    rightIcon: React.PropTypes.element,

    /**
     * This is the block element that contains the secondary text.
     * If a string is passed in, a div tag will be rendered.
     */
    secondaryText: React.PropTypes.node,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The value of the menu item.
     */
    value: React.PropTypes.any,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
    StylePropable,
  ],

  getDefaultProps() {
    return {
      checked: false,
      desktop: false,
      disabled: false,
      focusState: 'none',
      insetChildren: false,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      open: false,
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this._applyFocusState();
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    if (this.state.open && nextProps.focusState === 'none') {
      this._onRequestClose();
    }
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

  _applyFocusState() {
    this.refs.listItem.applyFocusState(this.props.focusState);
  },

  _cloneMenuItem(item) {
    return React.cloneElement(item, {
      onTouchTap: (event) => {
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

  render() {
    const {
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

    const disabledColor = this.state.muiTheme.rawTheme.palette.disabledColor;
    const textColor = this.state.muiTheme.rawTheme.palette.textColor;
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
        margin: 0,
        left: 24,
        top: 4,
      },

      rightIconDesktop: {
        margin: 0,
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
          onRequestClose={this._onRequestClose}
        >
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
        style={mergedRootStyles}
      >
        {children}
        {secondaryTextElement}
        {childMenuPopover}
      </ListItem>
    );
  },

});

export default MenuItem;
