import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

class SimpleSelect extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { options, defaultOption, onChange, selectedIndex, selectedValue, className, isVisible } = this.props;

    const getAllOptions = function() {
      if (defaultOption) {
        options.unshift(defaultOption);
      }
      return options;
    };

    const allOptions = getAllOptions();

    const getSelectedValue = function() {
      if (selectedValue) {
        return selectedValue;
      }
      if (selectedIndex) {
        return allOptions[selectedIndex];
      }
      return null;
    };

    const createOptions = function() {
      return allOptions.map((option, index) => {
        return (
          <option key={index} value={option.value}>{option.text}</option>
        );
      });
    };

    return (
      <select
        className={'select primary ' + (className ? className : '' ) + (isVisible ? '' : 'hidden')}
        value={getSelectedValue()}
        onChange={() => onChange(1)}>
        {createOptions()}
      </select>
    );
   }
 }

SimpleSelect.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  defaultOption: PropTypes.object,
  className: PropTypes.string,
  selectedIndex: PropTypes.number,
  selectedValue: PropTypes.number
};

export default SimpleSelect;
