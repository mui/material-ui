import * as React from 'react';
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const PurpleSwitch = styled(Switch)(({ theme }) => ({
  '.MuiSwitch-switchBase': {
    color: purple[300],
    '&.Mui-checked': {
      color: purple[500],
      '&:hover': {
        backgroundColor: alpha(purple[500], theme.palette.action.hoverOpacity),
      },
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: purple[500],
    },
  },
}));

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch
    // focusVisibleClassName={classes.focusVisible}
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  margin: theme.spacing(1),
  '.MuiSwitch-switchBase': {
    padding: 1,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + .MuiSwitch-track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  '.MuiSwitch-thumb': {
    width: 24,
    height: 24,
  },
  '.MuiSwitch-track': {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border-color']),
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '.MuiSwitch-switchBase': {
    padding: 2,
    color: theme.palette.grey[500],
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  '.MuiSwitch-thumb': {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  '.MuiSwitch-track': {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
}));

export default function CustomizedSwitches() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <PurpleSwitch
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
          />
        }
        label="Custom color"
      />
      <FormControlLabel
        control={
          <IOSSwitch
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
          />
        }
        label="iOS style"
      />
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch
              checked={state.checkedC}
              onChange={handleChange}
              name="checkedC"
            />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}
