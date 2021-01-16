import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, alpha } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  slider: {
    width: 300,
  },
  sliderSuccess: {
    color: theme.palette.success.main,
    '& .MuiSlider-thumb': {
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
      },
      '&.Mui-active': {
        boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
      },
    },
  },
}));

export default function DynamicClassName() {
  const classes = useStyles();
  const [success, setSuccess] = React.useState(false);

  const handleChange = (event) => {
    setSuccess(event.target.checked);
  };

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Switch
            checked={success}
            onChange={handleChange}
            color="primary"
            value="dynamic-class-name"
          />
        }
        label="Success"
      />
      <Slider
        className={clsx(classes.slider, {
          [classes.sliderSuccess]: success,
        })}
        defaultValue={30}
        sx={{ mt: 1 }}
      />
    </React.Fragment>
  );
}
