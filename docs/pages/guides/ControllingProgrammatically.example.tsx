import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { DatePicker } from '@material-ui/pickers';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default function ControllingProgrammaticallyExample() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, handleDateChange] = React.useState<Date | null>(
    new Date('2018-01-01T00:00:00.000Z')
  );

  return (
    <div className={classes.root}>
      <Button onClick={() => setIsOpen(true)}> Open picker </Button>

      <DatePicker
        renderInput={(props) => <TextField {...props} />}
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        label="Open me from button"
        inputFormat="d MMM yyyy"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
}
