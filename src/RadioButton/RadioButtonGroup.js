import React, {Component, PropTypes} from 'react';
import RadioButton from '../RadioButton';
import warning from 'warning';

class RadioButtonGroup extends Component {
  static propTypes = {
    /**
     * Should be used to pass `RadioButton` components.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The `value` property of the radio button that will be
     * selected by default. This takes precedence over the `checked` property
     * of the `RadioButton` elements.
     */
    defaultSelected: PropTypes.any,
    /**
     * Where the label will be placed for all child radio buttons.
     * This takes precedence over the `labelPosition` property of the
     * `RadioButton` elements.
     */
    labelPosition: PropTypes.oneOf(['left', 'right']),
    /**
     * The name that will be applied to all child radio buttons.
     */
    name: PropTypes.string.isRequired,
    /**
     * Callback function that is fired when a radio button has
     * been checked.
     *
     * @param {object} event `change` event targeting the selected
     * radio button.
     * @param {*} value The `value` of the selected radio button.
     */
    onChange: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The `value` of the currently selected radio button.
     */
    valueSelected: PropTypes.any,
  };

  static defaultProps = {
    style: {},
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    numberCheckedRadioButtons: 0,
    selected: '',
  };

  componentWillMount() {
    let cnt = 0;

    React.Children.forEach(this.props.children, (option) => {
      if (this.hasCheckAttribute(option)) cnt++;
    }, this);

    this.setState({
      numberCheckedRadioButtons: cnt,
      selected: this.props.valueSelected || this.props.defaultSelected || '',
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('valueSelected')) {
      this.setState({
        selected: nextProps.valueSelected,
      });
    }
  }

  hasCheckAttribute(radioButton) {
    return radioButton.props.hasOwnProperty('checked') &&
      radioButton.props.checked;
  }

  updateRadioButtons(newSelection) {
    if (this.state.numberCheckedRadioButtons === 0) {
      this.setState({selected: newSelection});
    } else {
      warning(false, `Cannot select a different radio button while another radio button
        has the 'checked' property set to true.`);
    }
  }

  handleChange = (event, newSelection) => {
    this.updateRadioButtons(newSelection);

    // Successful update
    if (this.state.numberCheckedRadioButtons === 0) {
      if (this.props.onChange) this.props.onChange(event, newSelection);
    }
  };

  getSelectedValue() {
    return this.state.selected;
  }

  setSelectedValue(newSelectionValue) {
    this.updateRadioButtons(newSelectionValue);
  }

  clearValue() {
    this.setSelectedValue('');
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;

    const options = React.Children.map(this.props.children, (option) => {
      const {
        name, // eslint-disable-line no-unused-vars
        value, // eslint-disable-line no-unused-vars
        label, // eslint-disable-line no-unused-vars
        onCheck, // eslint-disable-line no-unused-vars
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
          onCheck={this.handleChange}
          checked={option.props.value === this.state.selected}
        />
      );
    }, this);

    return (
      <div
        style={prepareStyles(Object.assign({}, this.props.style))}
        className={this.props.className}
      >
        {options}
      </div>
    );
  }
}

export default RadioButtonGroup;
