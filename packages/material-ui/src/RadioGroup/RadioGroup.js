// @inheritedComponent FormGroup

import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import FormGroup from '../FormGroup';
import { createChainedFunction, find } from '../utils/helpers';

class RadioGroup extends React.Component {
  radios = [];

  constructor(props) {
    super();
    this.isControlled = props.value != null;

    if (!this.isControlled) {
      this.state = {
        value: props.defaultValue,
      };
    }
  }

  componentDidUpdate() {
    warning(
      this.isControlled === (this.props.value != null),
      [
        `Material-UI: A component is changing ${
          this.isControlled ? 'a ' : 'an un'
        }controlled RadioGroup to be ${this.isControlled ? 'un' : ''}controlled.`,
        'Input elements should not switch from uncontrolled to controlled (or vice versa).',
        'Decide between using a controlled or uncontrolled RadioGroup ' +
          'element for the lifetime of the component.',
        'More info: https://fb.me/react-controlled-components',
      ].join('\n'),
    );
  }

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

  handleChange = event => {
    if (!this.isControlled) {
      this.setState({
        value: event.target.value,
      });
    }

    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
  };

  render() {
    const { children, name, value: valueProp, onChange, ...other } = this.props;

    const value = this.isControlled ? valueProp : this.state.value;
    this.radios = [];

    return (
      <FormGroup role="radiogroup" {...other}>
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) {
            return null;
          }

          warning(
            child.type !== React.Fragment,
            [
              "Material-UI: the RadioGroup component doesn't accept a Fragment as a child.",
              'Consider providing an array instead.',
            ].join('\n'),
          );

          return React.cloneElement(child, {
            name,
            inputRef: node => {
              if (node) {
                this.radios.push(node);
              }
            },
            checked: value === child.props.value,
            onChange: createChainedFunction(child.props.onChange, this.handleChange),
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
   * The default input value, useful when not controlling the component.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
};

export default RadioGroup;
