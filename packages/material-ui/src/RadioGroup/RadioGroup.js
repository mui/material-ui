// @inheritedComponent FormGroup

import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';
import SelectableGroup from '@material-ui/lab/SelectableGroup';

function RadioGroup(props) {
  const { children, defaultValue, name, onChange, value: valueProp, ...other } = props;
  let { current: firstLoad } = React.useRef(true);

  let value = valueProp;

  if (firstLoad) {
    firstLoad = false;
    if (defaultValue) {
      value = defaultValue;
    }
  }

  return (
    <SelectableGroup onChange={onChange} value={value} additional={{ name }} exclusive>
      <FormGroup role="radiogroup" {...other}>
        {children}
      </FormGroup>
    </SelectableGroup>
  );
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
