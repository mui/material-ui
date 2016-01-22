import React from 'react';
import RadioButton from './radio-button';
import StylePropable from './mixins/style-propable';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';
import warning from 'warning';

const RadioButtonGroup = React.createClass({

  propTypes: {
    /**
     * Should be used to pass `RadioButton` components.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Sets the default radio button to be the one whose
     * value matches defaultSelected (case-sensitive).
     * This will override any individual radio button with
     * the defaultChecked or checked property stated.
     */
    defaultSelected: React.PropTypes.string,

    /**
     * Where the label will be placed for all radio buttons.
     * This will override any labelPosition properties defined
     * for an individual radio button.
     */
    labelPosition: React.PropTypes.oneOf(['left', 'right']),

    /**
     * The name that will be applied to all radio buttons inside it.
     */
    name: React.PropTypes.string.isRequired,

    /**
     * Callback function that is fired when a radio button has
     * been clicked. Returns the event and the value of the radio
     * button that has been selected.
     */
    onChange: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The value of the currently selected radio button.
     */
    valueSelected: React.PropTypes.string,
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
      style: {},
    };
  },

  getInitialState() {
    return {
      numberCheckedRadioButtons: 0,
      selected: this.props.valueSelected || this.props.defaultSelected || '',
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    let cnt = 0;

    React.Children.forEach(this.props.children, (option) => {
      if (this._hasCheckAttribute(option)) cnt++;
    }, this);

    this.setState({numberCheckedRadioButtons: cnt});
  },

  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    let newState = {muiTheme: newMuiTheme};

    if (nextProps.hasOwnProperty('valueSelected')) {
      newState.selected = nextProps.valueSelected;
    }

    this.setState(newState);
  },

  _hasCheckAttribute(radioButton) {
    return radioButton.props.hasOwnProperty('checked') &&
      radioButton.props.checked;
  },

  _updateRadioButtons(newSelection) {
    if (this.state.numberCheckedRadioButtons === 0) {
      this.setState({selected: newSelection});
    } else {
      warning(false, `Cannot select a different radio button while another radio button
        has the 'checked' property set to true.`);
    }
  },

  _onChange(e, newSelection) {
    this._updateRadioButtons(newSelection);

    // Successful update
    if (this.state.numberCheckedRadioButtons === 0) {
      if (this.props.onChange) this.props.onChange(e, newSelection);
    }
  },

  getSelectedValue() {
    return this.state.selected;
  },

  setSelectedValue(newSelectionValue) {
    this._updateRadioButtons(newSelectionValue);
  },

  clearValue() {
    this.setSelectedValue('');
  },

  render() {
    let options = React.Children.map(this.props.children, (option) => {
      let {
        name,
        value,
        label,
        onCheck,
        ...other,
      } = option.props;

      return (
        <RadioButton
          {...other}
          ref={option.props.value}
          name={this.props.name}
          key={option.props.value}
          value={option.props.value}
          label={option.props.label}
          labelPosition={this.props.labelPosition}
          onCheck={this._onChange}
          checked={option.props.value === this.state.selected}
        />
      );
    }, this);

    return (
      <div
        style={this.prepareStyles(this.props.style)}
        className={this.props.className}
      >
        {options}
      </div>
    );
  },

});

export default RadioButtonGroup;
