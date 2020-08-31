import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

export default function ContinuousSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={{
      components: {
        MuiSlider: {
          overrides: {
            root: { background: 'green'},
            track: { background: 'yellow'},
            rail: { background: 'blue' },
            thumb: { background: 'red' },
          }
        }
      }
    }}>
      <div className={classes.root}>
        <Typography id="continuous-slider" gutterBottom>
          Volume
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <Slider
              value={value}
              onChange={handleChange}
              aria-labelledby="continuous-slider"
            />
          </Grid>
          <Grid item>
            <VolumeUp />
          </Grid>
        </Grid>
        <Typography id="disabled-slider" gutterBottom>
          Disabled slider
        </Typography>
        <Slider disabled defaultValue={30} aria-labelledby="disabled-slider" />
      </div>
    </ThemeProvider>
  );
}
