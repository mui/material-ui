import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { capitalize } from '@material-ui/core/utils';
import { DispatchContext } from 'docs/src/modules/components/ThemeContext';
import SpacingIcon from '@material-ui/icons/Storage'

const useStyles = makeStyles({}, { name: 'DensityTool' });

export default function DensityTool() {
  const dispatch = React.useContext(DispatchContext);
  function handleDensityChange(event) {
    dispatch({ type: 'SET_DENSE', payload: event.target.checked })
  }

  function handleSpacingChange() { }

  const classes = useStyles()
  const theme = useTheme();

  return <React.Fragment>
    <FormControlLabel
      control={
        <Switch
          checked={theme.dense}
          onChange={handleDensityChange}
          value="dense"
          color="secondary"
        />
      }
      label="Dense theme?"
    />
    <Typography id="input-slider" gutterBottom>
      Volume
      </Typography>
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <SpacingIcon />
      </Grid>
      <Grid item xs>
        <Slider
          value={theme.spacing.unit}
          onChange={handleSpacingChange}
          aria-labelledby="input-slider"
        />
      </Grid>
      <Grid item>
        <Input
          className={classes.input}
          value={theme.spacing.unit}
          margin="dense"
          onChange={handleSpacingChange}
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Grid>
    </Grid>
  </React.Fragment>

}
