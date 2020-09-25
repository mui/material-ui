import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/core/Rating';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > legend': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function BasicRating() {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);

  return (
    <div className={classes.root}>
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly />
      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} />
    </div>
  );
}
