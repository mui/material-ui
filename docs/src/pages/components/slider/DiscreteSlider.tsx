import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
    },
    margin: {
      margin: theme.spacing(1.5, 0),
    },
  }),
);

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

function thumbLabelFormat(value: number) {
  return marks.findIndex(mark => mark.value === value) + 1;
}

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Temperature
      </Typography>
      <Slider
        defaultValue={20}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        step={10}
        marks
        className={classes.margin}
      />
      <Slider
        defaultValue={20}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        step={10}
        marks={marks}
        className={classes.margin}
      />
      <Slider
        defaultValue={20}
        thumbLabelFormat={thumbLabelFormat}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        step={null}
        marks={marks}
        className={classes.margin}
      />
      <Slider
        defaultValue={80}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        step={10}
        marks={marks}
        thumbLabelDisplay="on"
        className={classes.margin}
      />
    </div>
  );
}
