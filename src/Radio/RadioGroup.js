// @flow weak

import React, { Component, Children, cloneElement, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import FormGroup from '../Form/FormGroup';
import { find } from '../utils/helpers';

export const styleSheet = createStyleSheet('RadioGroup', () => {
  return {
    root: {
      flex: '1 1 auto',
      margin: 0,
      padding: 0,
    },
  };
});

class RadioGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    selectedValue: PropTypes.string,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

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
      className: classNameProp,
      name,
      selectedValue,
      onChange, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

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
            ref: (c) => { this.radios.push(c); },
            checked: selected,
            onChange: this.handleRadioChange,
          });
        })}
      </FormGroup>
    );
  }
}

export default RadioGroup;
