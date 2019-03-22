// @inheritedComponent FormGroup

import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import FormGroup from '../FormGroup';
import { createChainedFunction, find } from '../utils/helpers';

const RadioGroup = React.forwardRef(function RadioGroup(props, ref) {
  const { actions, children, defaultValue, name, value: valueProp, onChange, ...other } = props;
  const radiosRef = React.useRef([]);
  const { current: isControlled } = React.useRef(props.value != null);
  const [valueState, setValue] = React.useState(() => {
    if (!isControlled) {
      return defaultValue;
    }
    return null;
  });

  React.useImperativeHandle(actions, () => ({
    focus: () => {
      const radios = radiosRef.current;
      if (!radios.length) {
        return;
      }

      const focusRadios = radios.filter(n => !n.disabled);

      if (!focusRadios.length) {
        return;
      }

      const selectedRadio = find(focusRadios, n => n.checked);

      if (selectedRadio) {
        selectedRadio.focus();
        return;
      }

      focusRadios[0].focus();
    },
  }));

  React.useEffect(() => {
    warning(
      isControlled === (valueProp != null),
      [
        `Material-UI: A component is changing ${
          isControlled ? 'a ' : 'an un'
        }controlled RadioGroup to be ${isControlled ? 'un' : ''}controlled.`,
        'Input elements should not switch from uncontrolled to controlled (or vice versa).',
        'Decide between using a controlled or uncontrolled RadioGroup ' +
          'element for the lifetime of the component.',
        'More info: https://fb.me/react-controlled-components',
      ].join('\n'),
    );
  }, [valueProp, isControlled]);

  const value = isControlled ? valueProp : valueState;

  const handleChange = event => {
    if (!isControlled) {
      setValue(event.target.value);
    }

    if (onChange) {
      onChange(event, event.target.value);
    }
  };

  radiosRef.current = [];
  return (
    <FormGroup role="radiogroup" ref={ref} defaultValue={defaultValue} {...other}>
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
              radiosRef.current.push(node);
            }
          },
          checked: value === child.props.value,
          onChange: createChainedFunction(child.props.onChange, handleChange),
        });
      })}
    </FormGroup>
  );
});

RadioGroup.propTypes = {
  /**
   * @ignore
   */
  actions: PropTypes.shape({ current: PropTypes.object }),
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
