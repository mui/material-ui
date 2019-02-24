import React from 'react';
import PropTypes from 'prop-types';
import { exactProp } from '@material-ui/utils';
import * as utils from './utils';
import SelectableGroupContext from './SelectableGroupContext';

function SelectableGroup(props) {
  const [selected, setSelected] = React.useState(null);
  const { children, exclusive, value: valueProp } = props;

  const createReducer = handler => {
    return (event, value) => {
      setSelected(prevSelected => {
        const newSelected = handler(prevSelected, value, exclusive);

        // Only call onChange if it exists and state has changed (Object.is mimics React)
        if (props.onChange && !Object.is(newSelected, prevSelected)) {
          props.onChange(event, newSelected);
        }

        return newSelected;
      });
    };
  };

  const deselect = createReducer(utils.deselect);
  const select = createReducer(utils.select);
  const toggle = createReducer(utils.toggle);
  const isValueSelected = value => utils.hasValue(selected, value);

  React.useEffect(() => {
    if (valueProp !== undefined) {
      setSelected(valueProp);
    }
  }, [valueProp]);

  return (
    <SelectableGroupContext.Provider
      value={{
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

if (process.env.NODE_ENV !== 'production') {
  SelectableGroup.propTypes = exactProp(SelectableGroup.propTypes);
}

SelectableGroup.defaultProps = {
  exclusive: false,
};

export default SelectableGroup;
