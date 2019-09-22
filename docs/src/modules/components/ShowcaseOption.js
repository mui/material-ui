import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';

function ShowcaseOption(props) {
  const {
    defaultValue,
    exclusive = false,
    handleOptionChange,
    options = [],
    selectedOptions = [],
    title,
  } = props;

  let render;

  if (exclusive) {
    const selectedValue = selectedOptions.filter(
      option => options.map(opt => opt.name).indexOf(option) !== -1,
    )[0];
    render = (
      <RadioGroup
        aria-label={title}
        name={title}
        value={selectedValue || defaultValue}
        onChange={e => handleOptionChange(e.target.value, selectedValue)}
      >
        {options.map(option => (
          <FormControlLabel
            value={option.name}
            disabled={option.disabled}
            control={<Radio />}
            label={option.name}
            key={option.name}
          />
        ))}
      </RadioGroup>
    );
  } else {
    render = options.map(option => (
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedOptions.indexOf(option.name) !== -1}
            disabled={option.disabled}
            onChange={() => handleOptionChange(option.name)}
            value={option.name}
          />
        }
        key={option.name}
        label={option.name}
      />
    ));
  }

  return (
    <FormControl component="fieldset" margin="dense">
      <FormLabel component="legend">{title}</FormLabel>
      {render}
    </FormControl>
  );
}

ShowcaseOption.propTypes = {
  /**
   * Only works when exclusive={true}.
   */
  defaultValue: PropTypes.string,
  exclusive: PropTypes.bool,
  handleOptionChange: PropTypes.func,
  options: PropTypes.array,
  selectedOptions: PropTypes.array,
  title: PropTypes.string,
};

export default ShowcaseOption;
