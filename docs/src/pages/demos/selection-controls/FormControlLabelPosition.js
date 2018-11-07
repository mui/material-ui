import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class FormControlLabelPosition extends React.Component {
  state = {
    value: 'female',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">labelPlacement</FormLabel>
        <RadioGroup
          aria-label="position"
          name="position"
          value={this.state.value}
          onChange={this.handleChange}
          row
        >
          <FormControlLabel
            value="top"
            control={<Radio color="primary" />}
            label="Top"
            labelPlacement="top"
          />
          <FormControlLabel
            value="left"
            control={<Radio color="primary" />}
            label="Left"
            labelPlacement="left"
          />
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" />}
            label="Bottom"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="right"
            control={<Radio color="primary" />}
            label="Right"
            labelPlacement="right"
          />
        </RadioGroup>
      </FormControl>
    );
  }
}

export default FormControlLabelPosition;
