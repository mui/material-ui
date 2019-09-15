import React from 'react';
import Badge from '@material-ui/core/Badge';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';

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
  }),
);

export default function BadgeAlignment() {
  const classes = useStyles();
  const [horizontal, setHorizontal] = React.useState<'left' | 'right'>('right');
  const [vertical, setVertical] = React.useState<'top' | 'bottom'>('top');

  const handleHorizontalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHorizontal((event.target as HTMLInputElement).value as 'left' | 'right');
  };

  const handleVerticalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVertical((event.target as HTMLInputElement).value as 'top' | 'bottom');
  };

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Vertical</FormLabel>
          <RadioGroup value={vertical} onChange={handleVerticalChange}>
            <FormControlLabel value="top" control={<Radio />} label="Top" />
            <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Horizontal</FormLabel>
          <RadioGroup value={horizontal} onChange={handleHorizontalChange}>
            <FormControlLabel value="right" control={<Radio />} label="Right" />
            <FormControlLabel value="left" control={<Radio />} label="Left" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className={classes.row}>
        <Badge
          color="secondary"
          variant="dot"
          badgeContent={1}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
          className={classes.margin}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          badgeContent={1}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
          className={classes.margin}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          badgeContent={12}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
          className={classes.margin}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          badgeContent={123}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
          className={classes.margin}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          max={999}
          badgeContent={1337}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
          className={classes.margin}
        >
          <MailIcon />
        </Badge>
      </div>
    </div>
  );
}
