import React, {Component, PropTypes} from 'react';
import EnhancedButton from '../internal/EnhancedButton';

function getStyles(props, context, state) {
  const {tabs} = context.muiTheme;

  return {
    root: {
      color: props.selected ? tabs.selectedTextColor : tabs.textColor,
      backgroundColor: props.selected ? tabs.selectedBackgroundColor : state.hovered ? tabs.hoveredBackgroundColor : tabs.backgroundColor,
      fontWeight: 500,
      fontSize: 12,
      width: props.width,
      textTransform: 'uppercase',
      padding: 0,
      border: '1px solid ' + (props.selected ?  tabs.selectedBackgroundColor : '#cccccc'),     
      borderBottomWidth: 0,      
      borderRightWidth: props.selected ? 1 : props.isLastTab ? 1 : 0,
      height: (props.label && props.icon) ? 74 : 50,
    },
    button: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: (props.label && props.icon) ? 74 : 50,
    },
  };
}

class Tab extends Component {
  static muiName = 'Tab';

  static propTypes = {
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Sets the icon of the tab, you can pass `FontIcon` or `SvgIcon` elements.
     */
    icon: PropTypes.node,
    /**
     * Sets the text value of the tab item to the string specified.
     */
    label: PropTypes.node,
    /**
     * Fired when the active tab changes by touch or tap.
     * Use this event to specify any functionality when an active tab changes.
     * For example - we are using this to route to home when the third tab becomes active.
     * This function will always recieve the active tab as it\'s first argument.
     */
    onActive: PropTypes.func,
    /**
     * @ignore
     * This property is overriden by the Tabs component.
     */
    onTouchTap: PropTypes.func,
    /**
     * @ignore
     * Defines if the current tab is selected or not.
     * The Tabs component is responsible for setting this property.
     */
    selected: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * If value prop passed to Tabs component, this value prop is also required.
     * It assigns a value to the tab so that it can be selected by the Tabs.
     */
    value: PropTypes.any,
    /**
     * @ignore
     * This property is overriden by the Tabs component.
     */
    width: PropTypes.string,
    /**
     * @ignore
     * Defines if the current tab is teh last oned or not.
     * The Tabs component is responsible for setting this property.
     */
    isLastTab: PropTypes.bool,
  };

  state = {
    hovered: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  handleMouseLeave = (event) => {
    this.setState({hovered: false,});       
  };

  handleMouseEnter = (event) => {    
    this.setState({ hovered: true });    
  };
  
  handleTouchTap = (event) => {
    if (this.props.onTouchTap) {
      this.props.onTouchTap(this.props.value, event, this);
    }
  };

  render() {
    const {
      /* eslint-disable no-unused-vars */
      onActive,
      onTouchTap,
      selected,
      value,
      width,
      /* eslint-enable no-unused-vars */
      label,
      style,
      icon,
      ...other,
    } = this.props;

    const styles = getStyles(this.props, this.context, this.state);

    let iconElement;
    if (icon && React.isValidElement(icon)) {
      const iconProps = {
        style: {
          fontSize: 24,
          color: styles.root.color,
          marginBottom: label ? 5 : 0,
        },
      };
      // If it's svg icon set color via props
      if (icon.type.muiName !== 'FontIcon') {
        iconProps.color = styles.root.color;
      }
      iconElement = React.cloneElement(icon, iconProps);
    }

    const rippleOpacity = 0.3;
    const rippleColor = this.context.muiTheme.tabs.selectedTextColor;
    const buttonEventHandlers = {     
      onMouseLeave: this.handleMouseLeave,
      onMouseEnter: this.handleMouseEnter,
      onTouchTap: this.handleTouchTap,
      onTouchEnd: this.handleTouchEnd
    };

    return (
      <EnhancedButton
        {...other}
        {...buttonEventHandlers}
        style={Object.assign(styles.root, style)}
        focusRippleColor={rippleColor}
        touchRippleColor={rippleColor}
        focusRippleOpacity={rippleOpacity}
        touchRippleOpacity={rippleOpacity}
        disableFocusRipple= {true}
        disableKeyboardFocus= {true}
        disableTouchRipple= {true}
      >
        <div style={styles.button} >
          {iconElement}
          {label}
        </div>
      </EnhancedButton>
    );
  }
}

export default Tab;
