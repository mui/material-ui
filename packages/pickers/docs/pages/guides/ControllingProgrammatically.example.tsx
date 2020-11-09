import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default function ControllingProgrammaticallyExample() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Date | null>(new Date('2018-01-01T00:00:00.000Z'));

  return (
    <div className={classes.root}>
      <Button onClick={() => setOpen(true)}> Open picker </Button>
      <DatePicker
        renderInput={(props) => <TextField {...props} />}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        label="Open me from button"
        inputFormat="d MMM yyyy"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </div>
  );
}
