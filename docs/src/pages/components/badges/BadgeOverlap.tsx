import React from 'react';
import {
  Badge,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    formControl: {
      margin: theme.spacing(3),
    },
    row: {
      display: 'flex',
      justifyContent: 'center',
    },
    margin: {
      margin: theme.spacing(2),
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
  }),
);

export default function BadgeAlignment() {
  const classes = useStyles();
  const [overlap, setOverlap] = React.useState<'circle' | 'rectangle' | 'none'>('rectangle');

  function handleOverlapChange(event: any, value: string) {
    setOverlap(value as any);
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Overlap</FormLabel>
          <RadioGroup value={overlap} onChange={handleOverlapChange}>
            <FormControlLabel value="circle" control={<Radio />} label="Circle" />
            <FormControlLabel value="rectangle" control={<Radio />} label="Rectangle" />
            <FormControlLabel value="none" control={<Radio />} label="None" />
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
