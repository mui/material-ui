import React from 'react';
import * as utils from './utils';
import SelectableGroupContext from './SelectableGroupContext';
import PropTypes from 'prop-types';

class SelectableGroup extends React.Component {
  state = {
    selected: [],
  };

  deselect = this.createReducer(utils.deselect);

  select = this.createReducer(utils.select);

  toggle = this.createReducer(utils.toggle);

  isValueSelected = value => utils.hasValue(this.state.selected, value);

  isSelected() {
    return this.state.selected.length > 0;
  }

  createReducer(handler) {
    return value => {
      this.setState(({ selected: prevSelected }, props) => {
        const selected = handler(prevSelected, value, props);

        if (selected.length === prevSelected.length) {
          const notChanged = selected
            .map((val, i) => prevSelected[i] === val)
            .every(isSame => isSame);

          if (notChanged) {
            return null;
          }
        }

        if (this.props.onChange) {
          this.props.onChange(selected, value);
        }

        return { selected };
      });
    };
  }

  render() {
    const { children, exclusive } = this.props;
    const { deselect, isValueSelected, select, toggle } = this;

    const childContext = {
      deselect,
      isValueSelected,
      select,
      toggle,
    };

    return (
      <SelectableGroupContext.Provider value={childContext}>
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
};

export default SelectableGroup;
