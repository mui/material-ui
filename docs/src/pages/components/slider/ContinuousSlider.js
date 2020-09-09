import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider, { SliderRoot } from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { ThemeProvider } from '@material-ui/styles';
import styled from '@emotion/styled';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

const componentOverrides = {
  Root: styled(SliderRoot)`
    background-color: pink;
    border-color: green;
  `,
};

export default function ContinuousSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = {
    components: {
      MuiSlider: {
        // @ts-ignore MuiSlider does not support variants, this is added just for testing
        variants: [
          {
            props: { color: 'primary', orientation: 'vertical' },
            style: {
              backgroundColor: 'green',
              border: '3px solid orange',
            },
          },
        ],
        styleOverrides: {
          root: {
            background: 'red',
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
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
        <Typography id="disabled-slider" gutterBottom>
          Vertical primary slider
        </Typography>
        <Slider
          orientation="vertical"
          color="primary"
          defaultValue={30}
          components={componentOverrides}
        />
      </div>
    </ThemeProvider>
  );
}
