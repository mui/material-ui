import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const styles = {};

class CheckboxesGroup extends React.Component {
  state = {
    gilad: true,
    jason: false,
    antoine: true,
  };

  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  render() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.gilad}
                onChange={this.handleChange('gilad')}
                value="gilad"
              />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.jason}
                onChange={this.handleChange('jason')}
                value="jason"
              />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.antoine}
                onChange={this.handleChange('antoine')}
                value="antoine"
              />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
    );
  }
}

CheckboxesGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxesGroup);
