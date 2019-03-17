import React from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';
import SelectableGroupContext from './SelectableGroupContext';
import is from 'object-is';

const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'toggle':
      newState = { selected: utils.toggle(state.selected, action.value, action.exclusive) };
      break;
    case 'select':
      newState = { selected: utils.select(state.selected, action.value, action.exclusive) };
      break;
    case 'deselect':
      newState = { selected: utils.deselect(state.selected, action.value, action.exclusive) };
      break;
    case 'set':
      newState = { selected: action.value };
      break;
    default:
      newState = state;
  }

  // Only call onChange if it exists and state has changed (Object.is mimics React)
  if (action.onChange && !is(newState.selected, state.selected)) {
    action.onChange(action.event, newState.selected);
  }

  return newState;
};

/**
 * @ignore - internal component.
 */
function SelectableGroup(props) {
  const { children, exclusive, name, onChange, value: valueProp } = props;
  const [state, dispatch] = React.useReducer(reducer, { selected: valueProp });
  const { current: isControlled } = React.useRef(valueProp != null);

  if (isControlled && !is(valueProp, state.selected)) {
    dispatch({ type: 'set', value: valueProp });
  }

  const deselect = (value, event) => {
    dispatch({ type: 'deselect', value, event, exclusive, onChange });
  };

  const select = (value, event) => {
    dispatch({ type: 'select', value, event, exclusive, onChange });
  };

  const toggle = (value, event) => {
    dispatch({ type: 'toggle', value, event, exclusive, onChange });
  };

  const isValueSelected = value => utils.hasValue(state.selected, value);

  return (
    <SelectableGroupContext.Provider
      value={{
        deselect,
        isValueSelected,
        name,
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
   * The contents of the selectable group.
   */
  children: PropTypes.node,
  /**
   * Only allows one value to be selected.
   */
  exclusive: PropTypes.bool,
  /**
   * Name to pass down.
   */
  name: PropTypes.string,
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
