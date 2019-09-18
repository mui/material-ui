import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

export default function ShowcaseOption(props) {
  const {
    exclusive = false,
    options = [],
    title,
    selectedOptions = [],
    handleOptionChange,
    defaultValue
  } = props;

  let render;

  if (exclusive) {
    const selectedValue = selectedOptions.filter(
      option => options.map(opt => opt.name).indexOf(option) !== -1
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
