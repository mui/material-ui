const React = require('react');
const RadioButton = require('./radio-button');
const StylePropable = require('./mixins/style-propable');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');


const RadioButtonGroup = React.createClass({
  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  propTypes: {
    name: React.PropTypes.string.isRequired,
    valueSelected: React.PropTypes.string,
    defaultSelected: React.PropTypes.string,
    labelPosition: React.PropTypes.oneOf(['left', 'right']),
    onChange: React.PropTypes.func,
    style: React.PropTypes.object,
  },

  _hasCheckAttribute(radioButton) {
    return radioButton.props.hasOwnProperty('checked') &&
      radioButton.props.checked;
  },

  getInitialState() {
    return {
      numberCheckedRadioButtons: 0,
      selected: this.props.valueSelected || this.props.defaultSelected || '',
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getDefaultProps() {
    return {
      style: {},
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

  render() {
    let options = React.Children.map(this.props.children, (option) => {
      let {
        name,
        value,
        label,
        onCheck,
        ...other,
      } = option.props;

      return <RadioButton
        {...other}
        ref={option.props.value}
        name={this.props.name}
        key={option.props.value}
        value={option.props.value}
        label={option.props.label}
        labelPosition={this.props.labelPosition}
        onCheck={this._onChange}
        checked={option.props.value === this.state.selected}/>;

    }, this);

    return (
      <div
        style={this.prepareStyles(this.props.style)}
        className={this.props.className || ''}>
        {options}
      </div>
    );
  },

  _updateRadioButtons(newSelection) {
    if (this.state.numberCheckedRadioButtons === 0) {
      this.setState({selected: newSelection});
    }
    else if (process.env.NODE_ENV !== 'production') {
      let message = "Cannot select a different radio button while another radio button " +
                    "has the 'checked' property set to true.";
      console.error(message);
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

});

module.exports = RadioButtonGroup;
