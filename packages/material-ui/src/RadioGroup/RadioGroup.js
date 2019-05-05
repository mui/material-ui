import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import FormGroup from '../FormGroup';
import { useForkRef } from '../utils/reactHelpers';
import RadioGroupContext from './RadioGroupContext';

const RadioGroup = React.forwardRef(function RadioGroup(props, ref) {
  const { actions, children, name, value: valueProp, onChange, ...other } = props;
  const rootRef = React.useRef(null);
  const { current: isControlled } = React.useRef(props.value != null);
  const [valueState, setValue] = React.useState(() => {
    if (!isControlled) {
      return props.defaultValue;
    }
    return null;
  });

  React.useImperativeHandle(
    actions,
    () => ({
      focus: () => {
        let input = rootRef.current.querySelector('input:not(:disabled):checked');

        if (!input) {
          input = rootRef.current.querySelector('input:not(:disabled)');
        }

        if (input) {
          input.focus();
        }
      },
    }),
    [],
  );

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
  const context = { name, onChange: handleChange, value };

  const handleRef = useForkRef(ref, rootRef);

  return (
    <FormGroup role="radiogroup" ref={handleRef} {...other}>
      <RadioGroupContext.Provider value={context}>{children}</RadioGroupContext.Provider>
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
   * The default `input` element value, useful when not controlling the component.
   */
  defaultValue: PropTypes.any,
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
