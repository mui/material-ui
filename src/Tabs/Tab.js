import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';
import EnhancedButton from '../internal/EnhancedButton';

function getStyles(props, state) {
  const {
    tabs,
  } = state.muiTheme;

  return {
    root: {
      padding: '0px 12px',
      height: (props.label && props.icon) ? 72 : 48,
      color: props.selected ? tabs.selectedTextColor : tabs.textColor,
      fontWeight: 500,
      fontSize: 14,
      width: props.width,
      textTransform: 'uppercase',
    },
  };
}

const Tab = React.createClass({

  propTypes: {
    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Sets the icon of the tab, you can pass `FontIcon` or `SvgIcon` elements.
     */
    icon: React.PropTypes.node,

    /**
     * Sets the text value of the tab item to the string specified.
     */
    label: React.PropTypes.node,

    /**
     * Fired when the active tab changes by touch or tap.
     * Use this event to specify any functionality when an active tab changes.
     * For example - we are using this to route to home when the third tab becomes active.
     * This function will always recieve the active tab as it\'s first argument.
     */
    onActive: React.PropTypes.func,

    /**
     * @ignore
     * This property is overriden by the Tabs component.
     */
    onTouchTap: React.PropTypes.func,

    /**
     * @ignore
     * Defines if the current tab is selected or not.
     * The Tabs component is responsible for setting this property.
     */
    selected: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * If value prop passed to Tabs component, this value prop is also required.
     * It assigns a value to the tab so that it can be selected by the Tabs.
     */
    value: React.PropTypes.any,

    /**
     * @ignore
     * This property is overriden by the Tabs component.
     */
    width: React.PropTypes.string,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
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
  },

  handleTouchTap(event) {
    if (this.props.onTouchTap) {
      this.props.onTouchTap(this.props.value, event, this);
    }
  },

  render() {
    const {
      label,
      onActive,
      onTouchTap,
      selected,
      style,
      value,
      width,
      icon,
      ...other,
    } = this.props;

    const styles = getStyles(this.props, this.state);

    let iconElement;
    if (icon && React.isValidElement(icon)) {
      const params = {
        style: {
          fontSize: 24,
          marginBottom: (label) ? 5 : 0,
          display: label ? 'block' : 'inline-block',
          color: styles.root.color,
        },
      };
      // If it's svg icon set color via props
      if (icon.type.displayName !== 'FontIcon') {
        params.color = styles.root.color;
      }
      iconElement = React.cloneElement(icon, params);
    }

    const rippleColor = styles.color;
    const rippleOpacity = 0.3;

    return (
      <EnhancedButton
        {...other}
        style={Object.assign(styles.root, style)}
        focusRippleColor={rippleColor}
        touchRippleColor={rippleColor}
        focusRippleOpacity={rippleOpacity}
        touchRippleOpacity={rippleOpacity}
        onTouchTap={this.handleTouchTap}
      >
        {iconElement}
        {label}
      </EnhancedButton>
    );
  },

});

export default Tab;
