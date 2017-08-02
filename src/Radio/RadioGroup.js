// @flow

import React, { PureComponent, Children, cloneElement } from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import FormGroup from '../Form/FormGroup';
import { find } from '../utils/helpers';

export const styleSheet = createStyleSheet('MuiRadioGroup', {
  root: {
    flex: '1 1 auto',
    margin: 0,
    padding: 0,
  },
});

export type Props = {
  /**
   * The content of the component.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
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
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange?: Function,
  /**
   * @ignore
   */
  onKeyDown?: Function,
  /**
   * Value of the selected radio button
   */
  selectedValue?: string,
};

class RadioGroup extends PureComponent<void, Props, void> {
  props: Props;
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

  handleRadioChange = (event, checked) => {
    if (checked && this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
  };

  render() {
    const {
      children,
      classes,
      className: classNameProp,
      name,
      selectedValue,
      onChange,
      ...other
    } = this.props;

    this.radios = [];

    return (
      <FormGroup
        className={classNames(classes.root, classNameProp)}
        data-mui-test="RadioGroup"
        role="radiogroup"
        {...other}
      >
        {Children.map(children, (child, index) => {
          const selected = selectedValue === child.props.value;
          return cloneElement(child, {
            key: index,
            name,
            inputRef: node => {
              this.radios.push(node);
            },
            checked: selected,
            onChange: this.handleRadioChange,
          });
        })}
      </FormGroup>
    );
  }
}

export default withStyles(styleSheet)(RadioGroup);
