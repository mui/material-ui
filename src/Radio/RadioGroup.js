// @flow
// @inheritedComponent FormGroup

import React from 'react';
import type { ChildrenArray } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import FormGroup from '../Form/FormGroup';
import { find } from '../utils/helpers';

export const styles = {
  root: {
    flex: '1 1 auto',
    margin: 0,
    padding: 0,
  },
};

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * The content of the component.
   */
  children?: $ReadOnlyArray<ChildrenArray<*>>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
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

type AllProps = DefaultProps & Props;

class RadioGroup extends React.Component<AllProps, void> {
  props: AllProps;

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
      value,
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
        {React.Children.map(children, (child, index) => {
          const selected = value === child.props.value;
          return React.cloneElement(child, {
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

export default withStyles(styles, { name: 'MuiRadioGroup' })(RadioGroup);
