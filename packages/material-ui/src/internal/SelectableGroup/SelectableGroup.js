import React from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';
import SelectableGroupContext from './SelectableGroupContext';
import objectIs from '../../../../material-ui-lab/src/utils/objectIs';

/**
 * @ignore - internal component.
 */
function SelectableGroup(props) {
  const [selected, setSelected] = React.useState(null);
  const { additional, children, exclusive, value: valueProp } = props;
  const { current: isControlled } = React.useRef(valueProp != null);

  const createReducer = handler => {
    return (value, event) => {
      const newSelected = handler(selected, value, exclusive);

      setSelected(newSelected);

      // Only call onChange if it exists and state has changed (Object.is mimics React)
      if (props.onChange && !objectIs(newSelected, selected)) {
        props.onChange(event, newSelected);
      }
    };
  };

  if (isControlled && valueProp !== selected) {
    setSelected(valueProp);
  }

  const deselect = createReducer(utils.deselect);
  const select = createReducer(utils.select);
  const toggle = createReducer(utils.toggle);
  const isValueSelected = value => utils.hasValue(selected, value);

  return (
    <SelectableGroupContext.Provider
      value={{
        additional,
        deselect,
        isValueSelected,
        select,
        toggle,
      }}
    >
      {children}
    </SelectableGroupContext.Provider>
  );
}

SelectableGroup.propTypes = {
  /**
   * Additional props to pass down.
   */
  additional: PropTypes.object,
  /**
   * The contents of the selectable group.
   */
  children: PropTypes.node,
  /**
   * Only allows one value to be selected.
   */
  exclusive: PropTypes.bool,
  /**
   * Functioned called when value changes.
   */
  onChange: PropTypes.func,
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   */
  value: PropTypes.any,
};

SelectableGroup.defaultProps = {
  exclusive: false,
};

export default SelectableGroup;
