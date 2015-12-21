import React from 'react';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';

let Tab = React.createClass({

  mixins: [
    StylePropable,
  ],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

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
     * This property is overriden by the Tabs component.
     */
    onTouchTap: React.PropTypes.func,

    /**
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
     * This property is overriden by the Tabs component.
     */
    width: React.PropTypes.string,
  },

  render() {
    const {
      _muiTheme,
      label,
      onActive,
      onTouchTap,
      selected,
      style,
      value,
      width,
      ...other,
    } = this.props;

    const styles = this.prepareStyles({
      display: 'table-cell',
      cursor: 'pointer',
      textAlign: 'center',
      verticalAlign: 'middle',
      height: 48,
      color: selected ? _muiTheme.tabs.selectedTextColor : _muiTheme.tabs.textColor,
      outline: 'none',
      fontSize: 14,
      fontWeight: 500,
      whiteSpace: 'initial',
      fontFamily: _muiTheme.baseTheme.fontFamily,
      boxSizing: 'border-box',
      width: width,
    }, style);

    return (
      <div
        {...other}
        style={styles}
        onTouchTap={this._handleTouchTap}>
        {label}
      </div>
    );
  },

  _handleTouchTap(event) {
    if (this.props.onTouchTap) {
      this.props.onTouchTap(this.props.value, event, this);
    }
  },

});

Tab = muiThemeable(Tab);

export default Tab;
