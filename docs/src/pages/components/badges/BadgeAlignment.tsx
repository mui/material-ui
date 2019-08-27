import React from 'react';
import {
  Badge,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Theme,
  makeStyles,
} from '@material-ui/core';
import { Mail as MailIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
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
}));

export default function BadgeAlignment() {
  const classes = useStyles();
  const [horizontalAlignment, setHorizontalAlignment] = React.useState<'left' | 'right'>('right');
  const [verticalAlignment, setVerticalAlignment] = React.useState<'top' | 'bottom'>('top');

  function handleHorizontalAlignmentChange() {
    setHorizontalAlignment(previousHorizontalAlignment =>
      previousHorizontalAlignment === 'right' ? 'left' : 'right',
    );
  }

  function handleVerticalAlignmentChange() {
    setVerticalAlignment(previousVerticalAlignment =>
      previousVerticalAlignment === 'top' ? 'bottom' : 'top',
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Horizontal</FormLabel>
          <RadioGroup value={horizontalAlignment} onChange={handleHorizontalAlignmentChange}>
            <FormControlLabel value="right" control={<Radio />} label="Right" />
            <FormControlLabel value="left" control={<Radio />} label="Left" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Vertical</FormLabel>
          <RadioGroup value={verticalAlignment} onChange={handleVerticalAlignmentChange}>
            <FormControlLabel value="top" control={<Radio />} label="Top" />
            <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className={classes.row}>
        <Badge
          color="secondary"
          variant="dot"
          badgeContent={1}
          horizontalAlignment={horizontalAlignment}
          verticalAlignment={verticalAlignment}
          className={classes.margin}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          badgeContent={1}
          horizontalAlignment={horizontalAlignment}
          verticalAlignment={verticalAlignment}
          className={classes.margin}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          badgeContent={12}
          horizontalAlignment={horizontalAlignment}
          verticalAlignment={verticalAlignment}
          className={classes.margin}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          badgeContent={123}
          horizontalAlignment={horizontalAlignment}
          verticalAlignment={verticalAlignment}
          className={classes.margin}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          max={999}
          badgeContent={1337}
          horizontalAlignment={horizontalAlignment}
          verticalAlignment={verticalAlignment}
          className={classes.margin}
        >
          <MailIcon />
        </Badge>
      </div>
    </div>
  );
}
