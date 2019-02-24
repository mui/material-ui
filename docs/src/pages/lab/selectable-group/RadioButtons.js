import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import SelectableGroup from '@material-ui/lab/SelectableGroup';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
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
            <Radio value="b" name="radio-button-demo" aria-label="B" />
            <Radio
              value="c"
              name="radio-button-demo"
              aria-label="C"
              classes={{
                root: classes.radioRoot,
                checked: classes.checked,
              }}
            />
            <Radio value="d" color="default" name="radio-button-demo" aria-label="D" />
            <Radio
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
