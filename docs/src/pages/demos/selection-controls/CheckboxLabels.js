import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import CheckBoxOutlineBlankIcon from 'material-ui-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from 'material-ui-icons/CheckBox';

const styles = {
  checked: {
    color: green[500],
  },
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
};

class CheckboxLabels extends React.Component {
  state = {
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedA}
              onChange={this.handleChange('checkedA')}
              value="checkedA"
            />
          }
          label="Secondary"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedB}
              onChange={this.handleChange('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
          label="Primary"
        />
        <FormControlLabel control={<Checkbox value="checkedC" />} label="Uncontrolled" />
        <FormControlLabel disabled control={<Checkbox value="checkedD" />} label="Disabled" />
        <FormControlLabel
          disabled
          control={<Checkbox checked value="checkedE" />}
          label="Disabled"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedF}
              onChange={this.handleChange('checkedF')}
              value="checkedF"
              indeterminate
            />
          }
          label="Indeterminate"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedG}
              onChange={this.handleChange('checkedG')}
              value="checkedG"
              classes={{
                checked: classes.checked,
              }}
            />
          }
          label="Custom color"
        />
        <FormControlLabel
          control={
            <Checkbox
              className={classes.size}
              icon={<CheckBoxOutlineBlankIcon className={classes.sizeIcon} />}
              checkedIcon={<CheckBoxIcon className={classes.sizeIcon} />}
              value="checkedH"
            />
          }
          label="Custom size"
        />
      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);
