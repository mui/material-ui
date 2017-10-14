// @flow
// @inheritedComponent FormGroup

import React from 'react';
import type { Node } from 'react';
import FormGroup from '../Form/FormGroup';
import { find } from '../utils/helpers';

export type Props = {
  /**
   * The content of the component.
   */
  children?: Node,
  /**
   * The name used to reference the value of the control.
   */
  name?: string,
  /**
   * @ignore
   */
  onBlur?: Function,
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback
   * @param {string} value The `value` of the selected radio button
   */
  onChange?: Function,
  /**
   * @ignore
   */
  onKeyDown?: Function,
  /**
   * Value of the selected radio button.
   */
  value?: string,
};

class RadioGroup extends React.Component<Props> {
  radios: Array<HTMLInputElement> = [];

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

  handleRadioChange = (event: SyntheticInputEvent<*>, checked: boolean) => {
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
              this.radios.push(node);
            },
            checked: value === child.props.value,
            onChange: this.handleRadioChange,
          });
        })}
      </FormGroup>
    );
  }
}

export default RadioGroup;
