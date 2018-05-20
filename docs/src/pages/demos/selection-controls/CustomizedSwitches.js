import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  colorSwitchBase: {
    color: purple[300],
    '&$colorChecked': {
      color: purple[500],
      '& + $colorBar': {
        backgroundColor: purple[500],
      },
    },
  },
  colorBar: {},
  colorChecked: {},
  switchBase: {
    '&$checked': {
      color: theme.palette.common.white,
      '& + $bar': {
        backgroundColor: '#52d869',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  checked: {
    transform: 'translateX(15px)',
    '& + $bar': {
      opacity: 1,
      border: 'none',
    },
  },
  bar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconChecked: {
    boxShadow: theme.shadows[1],
  },
});

class CustomizedSwitches extends React.Component {
  state = {
    checkedA: true,
    checkedB: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const {
      colorSwitchBase,
      colorChecked,
      colorBar,
      switchBase,
      checked,
      bar,
      icon,
      iconChecked,
    } = this.props.classes;

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedA}
              onChange={this.handleChange('checkedA')}
              value="checkedA"
              classes={{
                switchBase: colorSwitchBase,
                checked: colorChecked,
                bar: colorBar,
              }}
            />
          }
          label="Custom color"
        />
        <FormControlLabel
          control={
            <Switch
              classes={{ switchBase, bar, icon, iconChecked, checked }}
              disableRipple
              checked={this.state.checkedB}
              onChange={this.handleChange('checkedB')}
              value="checkedB"
            />
          }
          label="iOS style"
        />
      </FormGroup>
    );
  }
}

CustomizedSwitches.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedSwitches);
