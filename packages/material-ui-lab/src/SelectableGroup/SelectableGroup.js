import React from 'react';
import PropTypes from 'prop-types';
import { exactProp } from '@material-ui/utils';
import * as utils from './utils';
import SelectableGroupContext from './SelectableGroupContext';

class SelectableGroup extends React.Component {
  state = {
    selected: null,
  };

  deselect = this.createReducer(utils.deselect);

  select = this.createReducer(utils.select);

  toggle = this.createReducer(utils.toggle);

  static getDerivedStateFromProps(props, state) {
    if (props.value !== undefined && props.value !== state.selected) {
      return {
        selected: props.value,
      };
    }
    return null;
  }

  isValueSelected = value => utils.hasValue(this.state.selected, value);

  createReducer(handler) {
    return (event, value) => {
      this.setState(({ selected: prevSelected }, props) => {
        const selected = handler(prevSelected, value, props);

        if (props.exclusive) {
          if (selected === prevSelected) {
            return null;
          }
        } else if (selected && prevSelected && selected.length === prevSelected.length) {
          const notChanged = selected
            .map((val, i) => prevSelected[i] === val)
            .every(isSame => isSame);

          if (notChanged) {
            return null;
          }
        }

        if (this.props.onChange) {
          this.props.onChange(event, selected);
        }

        return { selected };
      });
    };
  }

  render() {
    const { children } = this.props;
    const { deselect, isValueSelected, select, toggle } = this;

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
