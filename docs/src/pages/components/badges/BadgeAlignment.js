import React from 'react';
import Badge from '@material-ui/core/Badge';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
  const [horizontal, setHorizontal] = React.useState('right');
  const [vertical, setVertical] = React.useState('top');

  const handleHorizontalChange = (event) => {
    setHorizontal(event.target.value);
  };

  const handleVerticalChange = (event) => {
    setVertical(event.target.value);
  };

  const jsx = `
<Badge
  anchorOrigin={{
    vertical: '${vertical}',
    horizontal: '${horizontal}',
  }}
>
`;

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Vertical</FormLabel>
          <RadioGroup name="vertical" value={vertical} onChange={handleVerticalChange}>
            <FormControlLabel value="top" control={<Radio />} label="Top" />
            <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Horizontal</FormLabel>
          <RadioGroup name="horizontal" value={horizontal} onChange={handleHorizontalChange}>
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
      <HighlightedCode code={jsx} language="jsx" />
    </div>
  );
}
