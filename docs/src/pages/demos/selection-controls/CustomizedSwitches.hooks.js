import React from 'react';
import { makeStyles } from '@material-ui/styles';
import purple from '@material-ui/core/colors/purple';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
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
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#52d869',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
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
  iOSIcon: {
    width: 24,
    height: 24,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
}));

function CustomizedSwitches() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedA}
            onChange={handleChange('checkedA')}
            value="checkedA"
            classes={{
              switchBase: classes.colorSwitchBase,
              checked: classes.colorChecked,
              bar: classes.colorBar,
            }}
          />
        }
        label="Custom color"
      />
      <FormControlLabel
        control={
          <Switch
            classes={{
              switchBase: classes.iOSSwitchBase,
              bar: classes.iOSBar,
              icon: classes.iOSIcon,
              iconChecked: classes.iOSIconChecked,
              checked: classes.iOSChecked,
            }}
            disableRipple
            checked={state.checkedB}
            onChange={handleChange('checkedB')}
            value="checkedB"
          />
        }
        label="iOS style"
      />
    </FormGroup>
  );
}

export default CustomizedSwitches;
