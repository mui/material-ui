import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class NativeSelect extends React.Component {
  state = {
    age: '',
    name: 'hai',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Age</InputLabel>
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange('age')}
            inputProps={{
              id: 'age-native-simple',
            }}
          >
            <option value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-helper">Age</InputLabel>
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange('age')}
            input={<Input id="age-native-helper" />}
          >
            <option value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange('age')}
            className={classes.selectEmpty}
          >
            <option value="">None</option>
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
          <FormHelperText>Without label</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} disabled>
          <InputLabel htmlFor="name-native-disabled">Name</InputLabel>
          <Select
            native
            value={this.state.name}
            onChange={this.handleChange('name')}
            input={<Input id="name-native-disabled" />}
          >
            <option value="" />
            <optgroup label="Author">
              <option value="hai">Hai</option>
            </optgroup>
            <optgroup label="Contributors">
              <option value="olivier">Olivier</option>
              <option value="kevin">Kevin</option>
            </optgroup>
          </Select>
          <FormHelperText>Disabled</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} error>
          <InputLabel htmlFor="name-native-error">Name</InputLabel>
          <Select
            native
            value={this.state.name}
            onChange={this.handleChange('name')}
            input={<Input id="name-native-error" />}
          >
            <option value="" />
            <optgroup label="Author">
              <option value="hai">Hai</option>
            </optgroup>
            <optgroup label="Contributors">
              <option value="olivier">Olivier</option>
              <option value="kevin">Kevin</option>
            </optgroup>
          </Select>
          <FormHelperText>Error</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="uncontrolled-native">Name</InputLabel>
          <Select native defaultValue={30} input={<Input id="uncontrolled-native" />}>
            <option value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
          <FormHelperText>Uncontrolled</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

NativeSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelect);
