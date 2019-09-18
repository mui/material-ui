import React from 'react';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginBottom: theme.spacing(3),
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  shapeContainer: {
    margin: theme.spacing(2),
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: '50%',
  },
}));

export default function BadgeOverlap() {
  const classes = useStyles();
  const [overlap, setOverlap] = React.useState('rectangle');

  const handleChange = event => {
    setOverlap(event.target.value);
  };

  return (
    <div>
      <div className={classes.row}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Overlap</FormLabel>
          <RadioGroup value={overlap} onChange={handleChange}>
            <FormControlLabel value="rectangle" control={<Radio />} label="Rectangle" />
            <FormControlLabel value="circle" control={<Radio />} label="Circle" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className={classes.row}>
        <div className={classes.shapeContainer}>
          <Badge color="secondary" overlap={overlap} badgeContent=" " variant="dot">
            <div className={clsx(classes.shape, overlap === 'circle' && classes.shapeCircle)} />
          </Badge>
        </div>
        <div className={classes.shapeContainer}>
          <Badge color="secondary" overlap={overlap} badgeContent=" ">
            <div className={clsx(classes.shape, overlap === 'circle' && classes.shapeCircle)} />
          </Badge>
        </div>
      </div>
    </div>
  );
}
