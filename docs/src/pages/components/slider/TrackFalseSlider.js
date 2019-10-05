import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 300,
    justifyContent: 'space-between',
  },
  horizontal: {
    width: 300,
  },
  margin: {
    width: theme.spacing(3),
  },
}));

function valuetext(value) {
  return `${value}°C`;
}

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

export default function TrackFalseSlider() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.horizontal}>
          <Slider
            track={false}
            orientation="horizontal"
            getAriaValueText={valuetext}
            defaultValue={30}
            marks={marks}
          />
          <Slider
            track={false}
            orientation="horizontal"
            getAriaValueText={valuetext}
            defaultValue={[20, 37]}
            marks={marks}
          />
        </div>
        <div className={classes.margin} />
        <Slider
          track={false}
          orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={30}
          marks={marks}
        />
        <div className={classes.margin} />
        <Slider
          track={false}
          orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={[20, 37]}
          marks={marks}
        />
      </div>
    </React.Fragment>
  );
}
