// @flow weak

import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
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

class RadioGroup extends Component {
  radios = undefined;

  focus = () => {
    if (!this.radios || !this.radios.length) {
      return;
    }

    const focusRadios = this.radios.filter((n) => !n.props.disabled);

    if (!focusRadios.length) {
      return;
    }

    const selectedRadio = find(focusRadios, (n) => n.props.checked);

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
      onChange, // eslint-disable-line no-unused-vars
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
            innerRef: (node) => { this.radios.push(node); },
            checked: selected,
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
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
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
   * @param {object} event `change` event
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * Value of the selected radio button
   */
  selectedValue: PropTypes.string,
};

export default withStyles(styleSheet)(RadioGroup);
