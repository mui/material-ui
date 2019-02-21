import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import SelectableGroup from '@material-ui/lab/SelectableGroup';
import withSelectableContext from '@material-ui/lab/SelectableGroup/withSelectableContext';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

const SelectableCheckbox = withSelectableContext(props => {
  const { muiSelectableGroup, value, ...other } = props;
  const handleChange = event => muiSelectableGroup.toggle(event, event.target.value);

  return (
    <Checkbox
      checked={muiSelectableGroup.isValueSelected(value)}
      onClick={handleChange}
      value={value}
      {...other}
    />
  );
});

SelectableCheckbox.propTypes = {
  value: PropTypes.any,
};

class Checkboxes extends React.Component {
  state = {
    selected: [],
  };

  handleChange = (event, selected) => {
    this.setState({
      selected,
    });
  };

  render() {
    const { classes } = this.props;
    const { selected } = this.state;
    return (
      <div className={classes.root}>
        <SelectableGroup onChange={this.handleChange}>
          <FormGroup>
            <FormControlLabel control={<SelectableCheckbox value="gilad" />} label="Gilad Gray" />
            <FormControlLabel
              control={<SelectableCheckbox value="jason" />}
              label="Jason Killian"
            />
            <FormControlLabel
              control={<SelectableCheckbox value="antoine" />}
              label="Antoine Llorca"
            />
          </FormGroup>
        </SelectableGroup>
        <Typography>{`Selected Value: ${JSON.stringify(selected)}`}</Typography>
      </div>
    );
  }
}

Checkboxes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Checkboxes);
