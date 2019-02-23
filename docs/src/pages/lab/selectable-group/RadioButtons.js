import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import SelectableGroup from '@material-ui/lab/SelectableGroup';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import withSelectableContext from '@material-ui/lab/SelectableGroup/withSelectableContext';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  radioRoot: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

const SelectableRadio = withSelectableContext(props => {
  const { selectState, value, ...other } = props;
  const handleChange = event => selectState.toggle(event, event.target.value);

  return (
    <Radio
      checked={selectState.isValueSelected(value)}
      onClick={handleChange}
      value={value}
      {...other}
    />
  );
});

SelectableRadio.propTypes = {
  value: PropTypes.any,
};

class RadioButtons extends React.Component {
  state = {
    selected: null,
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
        <SelectableGroup exclusive onChange={this.handleChange}>
          <div>
            <SelectableRadio value="b" name="radio-button-demo" aria-label="B" />
            <SelectableRadio
              value="c"
              name="radio-button-demo"
              aria-label="C"
              classes={{
                root: classes.radioRoot,
                checked: classes.checked,
              }}
            />
            <SelectableRadio value="d" color="default" name="radio-button-demo" aria-label="D" />
            <SelectableRadio
              value="e"
              color="default"
              name="radio-button-demo"
              aria-label="E"
              icon={<RadioButtonUncheckedIcon fontSize="small" />}
              checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
            />
          </div>
        </SelectableGroup>
        <Typography>{`Selected Value: ${selected}`}</Typography>
      </div>
    );
  }
}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtons);
