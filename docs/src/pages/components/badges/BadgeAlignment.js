import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
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
  const [horizontalAlignment, sethorizontalAlignment] = React.useState('right');
  const [verticalAlignment, setverticalAlignment] = React.useState('top');

  function handlehorizontalAlignmentChange() {
    sethorizontalAlignment(previoushorizontalAlignment =>
      previoushorizontalAlignment === 'right' ? 'left' : 'right',
    );
  }

  function handleverticalAlignmentChange() {
    setverticalAlignment(previousverticalAlignment =>
      previousverticalAlignment === 'top' ? 'bottom' : 'top',
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Horizontal</FormLabel>
          <RadioGroup value={horizontalAlignment} onChange={handlehorizontalAlignmentChange}>
            <FormControlLabel value="right" control={<Radio />} label="Right" />
            <FormControlLabel value="left" control={<Radio />} label="Left" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Vertical</FormLabel>
          <RadioGroup value={verticalAlignment} onChange={handleverticalAlignmentChange}>
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
          badgeContent={1}
          horizontalAlignment={horizontalAlignment}
          verticalAlignment={verticalAlignment}
          className={classes.margin}
        >
          <Typography>Badges!</Typography>
        </Badge>
      </div>
    </div>
  );
}
