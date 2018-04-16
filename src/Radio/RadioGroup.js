// @inheritedComponent FormGroup

import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../Form/FormGroup';
import { find } from '../utils/helpers';

class RadioGroup extends React.Component {
  radios = [];

  focus = () => {
    if (!this.radios || !this.radios.length) {
      return;
    }

    const focusRadios = this.radios.filter(n => !n.disabled);

    if (!focusRadios.length) {
      return;
    }

    const selectedRadio = find(focusRadios, n => n.checked);

    if (selectedRadio) {
      selectedRadio.focus();
      return;
    }

    focusRadios[0].focus();
  };

  handleRadioChange = (event, checked) => {
    if (checked && this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
  };

  render() {
    const { children, name, value, onChange, ...other } = this.props;

    this.radios = [];

    return (
      <FormGroup data-mui-test="RadioGroup" role="radiogroup" {...other}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          return React.cloneElement(child, {
            key: index,
            name,
            inputRef: node => {
              if (node) {
                this.radios.push(node);
              }
            },
            checked: value === child.props.value,
            onChange: this.handleRadioChange,
          });
        })}
      </FormGroup>
    );
  }
}

RadioGroup.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The name used to reference the value of the control.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   * @param {string} value The `value` of the selected radio button
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * Value of the selected radio button.
   */
  value: PropTypes.string,
};

export default RadioGroup;
