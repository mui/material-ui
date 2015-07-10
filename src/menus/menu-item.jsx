let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let Colors = require('../styles/colors');
let CheckIcon = require('../svg-icons/navigation/check');
let ListItem = require('../lists/list-item');


let MenuItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    checked: React.PropTypes.bool,
    desktop: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    innerDivStyle: React.PropTypes.object,
    insetChildren: React.PropTypes.bool,
    focusState: React.PropTypes.oneOf([
      'none',
      'focused',
      'keyboard-focused',
    ]),
    leftIcon: React.PropTypes.element,
    rightIcon: React.PropTypes.element,
    secondaryText: React.PropTypes.node,
    value: React.PropTypes.string,
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

  render() {
    let {
      checked,
      desktop,
      disabled,
      focusState,
      innerDivStyle,
      insetChildren,
      leftIcon,
      rightIcon,
      secondaryText,
      style,
      value,
      ...other,
    } = this.props;

    let disabledColor = this.context.muiTheme.palette.disabledColor;
    let textColor = this.context.muiTheme.palette.textColor;
    let leftIndent = desktop ? 64 : 72;
    let sidePadding = desktop ? 24 : 16;

    let styles = {
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

    let secondaryTextIsAnElement = React.isValidElement(secondaryText);
    let leftIconElement = leftIcon ? leftIcon : checked ? <CheckIcon /> : null;

    let mergedRootStyles = this.mergeStyles(styles.root, style);
    let mergedInnerDivStyles = this.mergeStyles(styles.innerDivStyle, innerDivStyle);
    let mergedSecondaryTextStyles = secondaryTextIsAnElement ?
      this.mergeStyles(styles.secondaryText, secondaryText.props.style) : null;
    let mergedLeftIconStyles = leftIconElement && desktop ?
      this.mergeStyles(styles.leftIconDesktop, leftIconElement.props.style) : null;
    let mergedRightIconStyles = rightIcon && desktop ?
      this.mergeStyles(styles.rightIconDesktop, rightIcon.props.style) : null;

    let secondaryTextElement = secondaryText ? (
      secondaryTextIsAnElement ?
        React.cloneElement(secondaryText, {style: mergedSecondaryTextStyles}) :
        <div style={styles.secondaryText}>{secondaryText}</div>
    ) : null;

    let styledLeftIcon = leftIconElement && desktop ?
      React.cloneElement(leftIconElement, {style: mergedLeftIconStyles}) :
      leftIconElement;

    let rightIconElement = rightIcon ?
      React.cloneElement(rightIcon, {style: mergedRightIconStyles}) : null;

    return (
      <ListItem
        {...other}
        disabled={disabled}
        innerDivStyle={mergedInnerDivStyles}
        insetChildren={insetChildren}
        leftIcon={styledLeftIcon}
        ref="listItem"
        rightIcon={rightIconElement}
        style={mergedRootStyles}>
        {this.props.children}
        {secondaryTextElement}
      </ListItem>
    );
  },

  _applyFocusState() {
    this.refs.listItem.applyFocusState(this.props.focusState);
  },
});

module.exports = MenuItem;
